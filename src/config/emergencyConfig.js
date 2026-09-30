// src/config/emergencyConfig.js

export const APP_DEFAULTS = {
  language: 'hi-IN',
  voiceRate: 1.0,
  voicePitch: 1.0,
};

export const BLOOD_GROUPS = [
  { label: 'B+ (33.3% Frequency)', value: 'B+' },
  { label: 'A+ (23.3% Frequency)', value: 'A+' },
  { label: 'O+ (23.3% Frequency)', value: 'O+' },
  { label: 'O- (Universal Donor)', value: 'O-' },
  { label: 'B- (Rare)', value: 'B-' },
  { label: 'A- (Rare)', value: 'A-' },
  { label: 'AB+ (Universal Recipient)', value: 'AB+' },
  { label: 'AB- (Rare)', value: 'AB-' },
];

export const EMERGENCY_PROCEDURES = [
  {
    id: 'fracture',
    titleHi: 'फ्रैक्चर / हड्डी टूटना',
    titleEn: 'Fracture Management',
    category: 'Trauma',
    priority: 1,
    icon: '🦴',
    audioKey: 'fracture_hi',
    rapidInstruction: 'टूटे अंग को हिलाएं नहीं। छड़ी, कार्डबोर्ड या कपड़े की पट्टी से स्थिर करें।',
    steps: [
      'मरीज़ को शांत करें और प्रभावित अंग की गति रोकें।',
      'यदि त्वचा खुली है, तो घाव पर साफ कपड़ा रखें।',
      'कार्डबोर्ड या लकड़ी की छड़ी से टूटी हड्डी को सपोर्ट दें (Splinting)।',
      'अंग को दिल के स्तर से थोड़ा ऊपर उठाकर रखें यदि संभव हो।',
      'तुरंत निकटतम अस्पताल या एम्बुलेंस को संपर्क करें।'
    ],
    warnings: ['टूटी हुई हड्डी को खुद सीधा करने की कोशिश न करें!', 'घाव को जोर से न दबाएं।']
  },
  {
    id: 'cpr',
    titleHi: 'सीपीआर / कार्डियोपल्मोनरी पुनर्जीवन',
    titleEn: 'CPR & Resuscitation',
    category: 'Cardiovascular',
    priority: 2,
    icon: '🫁',
    audioKey: 'cpr_hi',
    bpm: 105,
    rapidInstruction: 'छाती के बीच में दो उंगली/हथेली रखकर 105 BPM की गति से 2 इंच गहरा तेज़ी से दबाएं।',
    steps: [
      'जांचें कि व्यक्ति सांस ले रहा है या होश में है।',
      'यदि कोई प्रतिक्रिया न मिले तो तुरंत 112 / 108 एम्बुलेंस को कॉल करें।',
      'दोनों हाथों को मिलाकर छाती के केंद्र (Sternum) पर रखें।',
      '100-120 की गति (105 BPM ताल) से छाती को 2 इंच गहरा दबाएं।',
      'हर 30 दबाव के बाद 2 बार कृत्रिम सांस (Mouth-to-Mouth) दें यदि प्रशिक्षित हों।'
    ],
    warnings: ['दबाव देने के दौरान छाती को पूरी तरह वापस उभरने दें।', 'रुकें नहीं जब तक एम्बुलेंस न आ जाए।']
  },
  {
    id: 'bleeding',
    titleHi: 'गंभीर रक्तस्राव नियंत्रण',
    titleEn: 'Severe Bleeding Control',
    category: 'Trauma',
    priority: 3,
    icon: '🩸',
    audioKey: 'bleeding_hi',
    rapidInstruction: 'घाव पर सीधा तेज दबाव (Direct Pressure) बनाएं। घाव को दिल के ऊपर उठाएं।',
    steps: [
      'साफ कपड़ा या गॉज पैड लें और घाव पर सीधे कसकर दबाएं।',
      'यदि कपड़ा खून से भर जाए तो उसे हटाए बिना ऊपर से दूसरा कपड़ा लगाएं।',
      'यदि संभव हो तो घायल हिस्से को दिल के स्तर से ऊपर उठाएं।',
      'पट्टी (Bandage) को कसकर बांधें लेकिन रक्त प्रवाह पूरी तरह न रोकें।',
      'मरीज़ को गर्म रखें और सदमे (Shock) से बचाएं।'
    ],
    warnings: ['गंभीर मामलों में दबाव छोड़ें नहीं।', 'घाव में धंसी वस्तु को बाहर न निकालें!']
  },
  {
    id: 'snakebite',
    titleHi: 'सर्पदंश / सांप का काटना',
    titleEn: 'Snakebite Emergency',
    category: 'Environmental',
    priority: 4,
    icon: '🐍',
    audioKey: 'snakebite_hi',
    rapidInstruction: 'मरीज़ को स्थिर रखें। कटे स्थान पर चीरा या चूषण (Suction) न करें। तुरंत अस्पताल ले जाएं।',
    steps: [
      'मरीज़ को शांत रखें (घबराहट से ज़हर तेज़ी से फैलता है)।',
      'प्रभावित अंग से अंगूठी, घड़ी या तंग कपड़े तुरंत हटा दें।',
      'अंग को स्थिर रखें और दिल के स्तर से नीचे रखें।',
      'घाव को साफ पानी से धोएं, बर्फ न लगाएं।',
      'एंटी-वेनम (Anti-Venom) के लिए तुरंत निकटतम सरकारी अस्पताल जाएं।'
    ],
    warnings: ['घाव पर चीरा न लगाएं!', 'मुंह से ज़हर चूसने की कोशिश न करें!', 'कसकर रस्सी न बांधें (Tourniquet avoid)।']
  },
  {
    id: 'burns',
    titleHi: 'जलना और झुलसना',
    titleEn: 'Burns & Scalds',
    category: 'First Aid',
    priority: 5,
    icon: '🩹',
    audioKey: 'burns_hi',
    rapidInstruction: 'जले हुए स्थान पर 10-15 मिनट ठंडा बहता पानी डालें। बर्फ या टूथपेस्ट न लगाएं।',
    steps: [
      'जले स्थान को तुरंत 15 मिनट तक ठंडे बहते पानी के नीचे रखें।',
      'जले कपड़े जो त्वचा से चिपके न हों उन्हें धीरे से हटाएं।',
      'घाव को साफ सूती कपड़े या स्टेराइल गॉज से ढके।',
      'मरीज़ को ORS या पानी पिलाएं।',
      'चेहरे, हाथ या बड़े हिस्से में जलने पर तुरंत डॉक्टर दिखाएं।'
    ],
    warnings: ['बर्फ न लगाएं (ऊतक क्षतिग्रस्त हो सकते हैं)।', 'टूथपेस्ट, तेल या मक्खन न लगाएं!', 'छाले (Flashes/Blisters) को न फोड़ें।']
  },
  {
    id: 'choking',
    titleHi: 'दम घुटना / गले में अटकाव',
    titleEn: 'Choking (Heimlich Maneuver)',
    category: 'Airway',
    priority: 6,
    icon: '🗣️',
    audioKey: 'choking_hi',
    rapidInstruction: 'पीठ पर 5 बार थपकी दें। काम न करे तो पेट के ऊपरी हिस्से में हेमलिच पुश (Heimlich Maneuver) दें।',
    steps: [
      'व्यक्ति से पूछें क्या वह बोल सकता है। यदि हां, तो जोर से खांसने को कहें।',
      'यदि व्यक्ति सांस न ले पाए, तो पीठ के बीच में हथेली से 5 बार थपकी दें।',
      'काम न करने पर व्यक्ति के पीछे खड़े होकर पेट के ऊपरी हिस्से (Navel above) पर मुट्ठी रखकर ऊपर की तरफ 5 बार पुश करें।',
      'वस्तु बाहर निकलने तक प्रक्रिया दोहराएं।',
      'यदि बेहोश हो जाए तो सीपीआर शुरू करें।'
    ],
    warnings: ['1 साल से छोटे बच्चे के लिए हेमलिच न करें, उल्टा लिटाकर पीठ थपथपाएं।']
  },
  {
    id: 'heart_attack',
    titleHi: 'दिल का दौरा / सीने में दर्द',
    titleEn: 'Heart Attack Warning',
    category: 'Cardiovascular',
    priority: 7,
    icon: '🫀',
    audioKey: 'heart_attack_hi',
    rapidInstruction: 'मरीज़ को आराम से बैठाएं। 300mg एस्पिरिन चबाने को दें यदि एलर्जी न हो। एम्बुलेंस बुलाएं।',
    steps: [
      'मरीज़ को तुरंत बैठने की स्थिति में लाएं (पीठ को सहारा दें)।',
      'तंग कपड़े, टाई या बेल्ट ढीली करें।',
      'यदि डॉक्टर द्वारा अनुशंसित हो या उपलब्ध हो, तो Disprin/Aspirin 300mg चबाने दें।',
      'मरीज़ को शांत रखें और घबराने न दें।',
      '108 / 112 एम्बुलेंस को तुरंत कॉल करें।'
    ],
    warnings: ['मरीज़ को पैदल न चलने दें।', 'यदि बेहोश हो जाए और सांस न चले तो सीपीआर दें।']
  }
];

export const EMERGENCY_HELPLINES = [
  { name: 'National Emergency Number', number: '112', icon: '🚨', desc: 'All-in-one Emergency Helpline' },
  { name: 'Medical Ambulance', number: '108', icon: '🚑', desc: 'Free Emergency Ambulance Dispatch' },
  { name: 'Pregnancy & Infant Ambulance', number: '102', icon: '👶', desc: 'Maternal & Child Health Express' },
  { name: 'Poison Information Center', number: '1800-116-117', icon: '🧪', desc: 'AIIMS Poison Advisory' },
  { name: 'Women Helpline', number: '1091', icon: '🛡️', desc: '24x7 Safety & SOS' },
  { name: 'Disaster Management', number: '1078', icon: '🌊', desc: 'NDRF Disaster Response' },
];

export const SAMPLE_HOSPITALS = [
  {
    id: 'h1',
    name: 'AIIMS Trauma & Emergency Care',
    type: 'Government Super-specialty',
    distance: '1.2 km',
    icubeds: '14 Available',
    phone: '+91-11-26588500',
    address: 'Ansari Nagar, New Delhi',
    open24x7: true,
    oxygenReady: true
  },
  {
    id: 'h2',
    name: 'District Civil Emergency Hospital',
    type: 'Government General Hospital',
    distance: '2.8 km',
    icubeds: '8 Available',
    phone: '108',
    address: 'Central Station Road',
    open24x7: true,
    oxygenReady: true
  },
  {
    id: 'h3',
    name: 'Apollo Emergency Trauma Center',
    type: 'Private Multi-specialty',
    distance: '4.1 km',
    icubeds: '5 Available',
    phone: '+91-11-26925858',
    address: 'Mathura Road, Sarita Vihar',
    open24x7: true,
    oxygenReady: true
  },
  {
    id: 'h4',
    name: 'Fortis Escorts Heart & Trauma Institute',
    type: 'Cardiac Emergency',
    distance: '5.5 km',
    icubeds: '9 Available',
    phone: '+91-11-47135000',
    address: 'Okhla Road, New Delhi',
    open24x7: true,
    oxygenReady: true
  }
];