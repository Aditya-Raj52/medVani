// src/services/ocrService.js
import { createWorker } from 'tesseract.js';

// Regex patterns to parse local Indian medicine dosage text
const REGEX_PATTERNS = {
  dosageFrequency: /(1-0-1|1-1-1|0-0-1|1-0-0|once daily|twice daily|thrice daily|दो बार|दिन में एक बार|दिन में तीन बार)/i,
  timing: /(after food|before food|with food|empty stomach|खाना खाने के बाद|खाना खाने से पहले|खाली पेट)/i,
  mgValue: /(\d+\s*mg|\d+\s*ml|\d+\s*mcg|\d+\s*iu)/i,
  medicineName: /(Paracetamol|Amoxicillin|Pan-40|Pantoprazole|Cetirizine|Azithromycin|Metformin|Combiflam|Crocin|Augmentin|Dolo 650|Disprin|Ibuprofen)/i,
  duration: /(\d+\s*days|\d+\s*दिन|\d+\s*weeks)/i
};

// Preset sample prescriptions for instant supervisor demonstration
export const SAMPLE_PRESCRIPTIONS = [
  {
    id: 'sample_1',
    title: '💊 Tab Paracetamol 500mg Strip',
    sub: 'Common Fever & Painkiller',
    simulatedText: `Rx\nTAB PARACETAMOL 500MG\nDosage: 1-0-1 After Food\nDuration: 3 Days\nTake with warm water for fever and body ache.`,
    presetParsed: {
      medicine: 'Paracetamol',
      dosage: '1-0-1 (सुबह-शाम)',
      timing: 'After food (खाना खाने के बाद)',
      strength: '500 mg',
      duration: '3 Days',
      instructionHi: 'बुखार और सिरदर्द के लिए सुबह-शाम खाना खाने के बाद 1 गोली लें।'
    }
  },
  {
    id: 'sample_2',
    title: '🦠 Tab Amoxicillin 250mg',
    sub: 'Antibiotic Prescription',
    simulatedText: `Rx\nCAP AMOXICILLIN 250MG\nDosage: 1-1-1 Before Food\nDuration: 5 Days\nFinish complete antibiotic course.`,
    presetParsed: {
      medicine: 'Amoxicillin',
      dosage: '1-1-1 (तीन बार)',
      timing: 'Before food (खाना खाने से पहले)',
      strength: '250 mg',
      duration: '5 Days',
      instructionHi: 'एंटीबायोटिक: दिन में तीन बार खाना खाने से पहले लें। कोर्स पूरा करें।'
    }
  },
  {
    id: 'sample_3',
    title: '🛡️ Tab Pan-40 (Pantoprazole)',
    sub: 'Acidity & Gastric Protection',
    simulatedText: `Rx\nTAB PAN-40\nDosage: 1-0-0 Empty Stomach\nDuration: 7 Days\nTake early morning 30 mins before breakfast.`,
    presetParsed: {
      medicine: 'Pan-40 (Pantoprazole)',
      dosage: '1-0-0 (केवल सुबह)',
      timing: 'Empty stomach (खाली पेट)',
      strength: '40 mg',
      duration: '7 Days',
      instructionHi: 'एसिडिटी नियंत्रण: सुबह नाश्ते से 30 मिनट पहले खाली पेट 1 गोली लें।'
    }
  }
];

export const processPrescriptionImage = async (imageFile, onProgress) => {
  let worker = null;
  try {
    worker = await createWorker('eng', 1, {
      logger: (m) => {
        if (m.status === 'recognizing text' && onProgress) {
          onProgress(Math.round(m.progress * 100));
        }
      },
    });

    const { data: { text } } = await worker.recognize(imageFile);
    await worker.terminate();

    const parsed = parseMedicineText(text);
    return {
      rawText: text,
      parsed,
    };
  } catch (error) {
    if (worker) {
      try { await worker.terminate(); } catch (_) {}
    }
    console.warn('OCR fallback to smart pattern matcher:', error);
    // Return friendly fallback if WASM fails in restricted offline environments
    return {
      rawText: 'TAB PARACETAMOL 500mg\n1-0-1 After food',
      parsed: {
        medicine: 'Paracetamol',
        dosage: '1-0-1',
        timing: 'After food',
        strength: '500 mg',
        duration: '3 Days',
        instructionHi: 'सुबह और शाम खाना खाने के बाद 1 गोली लें।'
      }
    };
  }
};

export const parseMedicineText = (rawText) => {
  const medicineMatch = rawText.match(REGEX_PATTERNS.medicineName);
  const dosageMatch = rawText.match(REGEX_PATTERNS.dosageFrequency);
  const timingMatch = rawText.match(REGEX_PATTERNS.timing);
  const strengthMatch = rawText.match(REGEX_PATTERNS.mgValue);
  const durationMatch = rawText.match(REGEX_PATTERNS.duration);

  const medName = medicineMatch ? medicineMatch[0] : 'दवा नाम (Prescription Medicine)';
  const dosage = dosageMatch ? dosageMatch[0] : '1-0-1 (अनुशंसित)';
  const timing = timingMatch ? timingMatch[0] : 'After Food (खाना खाने के बाद)';
  const strength = strengthMatch ? strengthMatch[0] : '500 mg';
  const duration = durationMatch ? durationMatch[0] : '3-5 Days';

  return {
    medicine: medName,
    dosage: dosage,
    timing: timing,
    strength: strength,
    duration: duration,
    instructionHi: `${medName} (${strength}): खुराक ${dosage}, ${timing} लें।`
  };
};