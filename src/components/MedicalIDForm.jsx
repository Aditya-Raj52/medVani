// src/components/MedicalIDForm.jsx
import React, { useState, useEffect } from 'react';
import { saveMedicalID, getMedicalID } from '../db/schema';
import { BLOOD_GROUPS } from '../config/emergencyConfig';
import { generateQRCodeSVG } from '../utils/qrCode';
import { User, QrCode, Save, Phone, MapPin, AlertTriangle, Sparkles, CheckCircle2, ShieldCheck, Share2 } from 'lucide-react';

export default function MedicalIDForm() {
  const [formData, setFormData] = useState({
    name: '',
    bloodGroup: 'B+',
    emergencyContact: '',
    secondaryContact: '',
    chronicConditions: '',
    allergies: '',
    medications: '',
    organDonor: 'Yes',
    insuranceNumber: ''
  });

  const [saved, setSaved] = useState(false);
  const [qrSvg, setQrSvg] = useState('');
  const [location, setLocation] = useState(null);
  const [loadingLocation, setLoadingLocation] = useState(false);
  const [showQrModal, setShowQrModal] = useState(false);

  useEffect(() => {
    // Load stored IndexedDB profile on mount
    getMedicalID().then((data) => {
      if (data) {
        setFormData(data);
        generateQR(data);
      }
    });
  }, []);

  const generateQR = (data) => {
    const payload = JSON.stringify({
      N: data.name || 'Anonymous',
      BG: data.bloodGroup || 'Unknown',
      ICE: data.emergencyContact || 'N/A',
      Cond: data.chronicConditions || 'None',
      Alg: data.allergies || 'None',
      Med: data.medications || 'None'
    });
    const svgString = generateQRCodeSVG(payload, 220);
    setQrSvg(svgString);
  };

  const handleFillDemoData = () => {
    const demoData = {
      name: 'Rajesh Sharma (राजेश शर्मा)',
      bloodGroup: 'B+',
      emergencyContact: '+91 98765 43210',
      secondaryContact: '+91 91234 56789',
      chronicConditions: 'Hypertension (उच्च रक्तचाप), Type-2 Diabetes',
      allergies: 'Penicillin, Dust Mites',
      medications: 'Telmisartan 40mg, Metformin 500mg',
      organDonor: 'Yes (अंगदाता)',
      insuranceNumber: 'ABHA-9876-5432-1098'
    };
    setFormData(demoData);
    generateQR(demoData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await saveMedicalID(formData);
    generateQR(formData);
    setSaved(true);
    setTimeout(() => setSaved(false), 3500);
  };

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser.');
      return;
    }
    setLoadingLocation(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation({
          lat: pos.coords.latitude.toFixed(5),
          lng: pos.coords.longitude.toFixed(5)
        });
        setLoadingLocation(false);
      },
      (err) => {
        setLoadingLocation(false);
        alert('Could not fetch location: ' + err.message);
      }
    );
  };

  const getSosMessage = () => {
    let msg = `🚨 EMERGENCY MEDICAL SOS 🚨\nName: ${formData.name || 'Patient'}\nBlood Group: ${formData.bloodGroup}\nEmergency Contact: ${formData.emergencyContact}\nConditions: ${formData.chronicConditions || 'None'}\nAllergies: ${formData.allergies || 'None'}`;
    if (location) {
      msg += `\n📍 Location: https://maps.google.com/?q=${location.lat},${location.lng}`;
    }
    return encodeURIComponent(msg);
  };

  return (
    <div className="medical-id-card">
      <div className="section-header">
        <div className="section-title-wrap">
          <User className="section-icon" />
          <div>
            <h2>2. आपातकालीन मेडिकल ID & QR (Emergency Medical Profile)</h2>
            <p className="subtitle">100% Offline IndexedDB Data Storage & Scannable QR for First Responders</p>
          </div>
        </div>

        <button className="demo-autofill-btn" onClick={handleFillDemoData}>
          <Sparkles size={16} />
          <span>⚡ Demo Data भरें (Fill Demo)</span>
        </button>
      </div>

      <div className="medical-id-grid">
        {/* Left Side: Medical ID Form */}
        <form onSubmit={handleSubmit} className="id-form">
          <div className="form-row two-cols">
            <div className="form-group">
              <label><strong>नाम (Full Name) *</strong></label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. राजेश शर्मा"
                required
              />
            </div>

            <div className="form-group">
              <label><strong>ब्लड ग्रुप (Blood Group) *</strong></label>
              <select
                value={formData.bloodGroup}
                onChange={(e) => setFormData({ ...formData, bloodGroup: e.target.value })}
              >
                {BLOOD_GROUPS.map((bg) => (
                  <option key={bg.value} value={bg.value}>{bg.label}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-row two-cols">
            <div className="form-group">
              <label><strong>आपातकालीन नंबर (Primary ICE Contact) *</strong></label>
              <input
                type="tel"
                value={formData.emergencyContact}
                onChange={(e) => setFormData({ ...formData, emergencyContact: e.target.value })}
                placeholder="+91 9876543210"
                required
              />
            </div>

            <div className="form-group">
              <label><strong>द्वितीयक संपर्क (Secondary Contact)</strong></label>
              <input
                type="tel"
                value={formData.secondaryContact}
                onChange={(e) => setFormData({ ...formData, secondaryContact: e.target.value })}
                placeholder="+91 9123456789"
              />
            </div>
          </div>

          <div className="form-group">
            <label><strong>पुरानी बीमारियां (Chronic Conditions - बीपी / डायबिटीज / दिल)</strong></label>
            <input
              type="text"
              value={formData.chronicConditions}
              onChange={(e) => setFormData({ ...formData, chronicConditions: e.target.value })}
              placeholder="e.g. Hypertension, Diabetes, Asthma"
            />
          </div>

          <div className="form-row two-cols">
            <div className="form-group">
              <label><strong>एलर्जी (Allergies - दवाएं / खाद्य)</strong></label>
              <input
                type="text"
                value={formData.allergies}
                onChange={(e) => setFormData({ ...formData, allergies: e.target.value })}
                placeholder="e.g. Penicillin, Dust, Sulfa"
              />
            </div>

            <div className="form-group">
              <label><strong>वर्तमान दवाएं (Current Medications)</strong></label>
              <input
                type="text"
                value={formData.medications}
                onChange={(e) => setFormData({ ...formData, medications: e.target.value })}
                placeholder="e.g. Telmisartan 40mg"
              />
            </div>
          </div>

          <div className="form-row two-cols">
            <div className="form-group">
              <label><strong>अंगदाता स्थिति (Organ Donor Status)</strong></label>
              <select
                value={formData.organDonor}
                onChange={(e) => setFormData({ ...formData, organDonor: e.target.value })}
              >
                <option value="Yes">Yes (अंगदाता हैं)</option>
                <option value="No">No</option>
              </select>
            </div>

            <div className="form-group">
              <label><strong>ABHA / बीमा आईडी (Health ID Number)</strong></label>
              <input
                type="text"
                value={formData.insuranceNumber}
                onChange={(e) => setFormData({ ...formData, insuranceNumber: e.target.value })}
                placeholder="ABHA-1234-5678-90"
              />
            </div>
          </div>

          <button type="submit" className="save-id-btn">
            <Save size={18} />
            <span>ऑफ़लाइन सुरक्षित करें (Save to IndexedDB)</span>
          </button>

          {saved && (
            <div className="save-toast">
              <CheckCircle2 size={18} />
              <span>Medical ID saved 100% offline to IndexedDB!</span>
            </div>
          )}
        </form>

        {/* Right Side: Emergency QR Code & SOS Transmitter */}
        <div className="qr-sos-panel">
          <div className="qr-card">
            <div className="qr-header">
              <QrCode size={20} />
              <h4>आपातकालीन QR कोड (Emergency QR)</h4>
            </div>
            <p className="qr-sub">प्रथम प्रतिक्रियादाता (First Responders) कैमरा से स्कैन कर मेडिकल जानकारी देख सकते हैं।</p>
            
            <div className="qr-wrapper">
              {qrSvg ? (
                <div dangerouslySetInnerHTML={{ __html: qrSvg }} />
              ) : (
                <div className="qr-placeholder">विवरण भरकर सेव करें</div>
              )}
            </div>

            <div className="patient-mini-summary">
              <div><strong>मरीज़:</strong> {formData.name || '---'}</div>
              <div><strong>ब्लड ग्रुप:</strong> <span className="bg-badge">{formData.bloodGroup}</span></div>
            </div>
          </div>

          {/* SOS Dispatch Box */}
          <div className="sos-box">
            <div className="sos-box-header">
              <AlertTriangle size={18} />
              <h4>SOS आपातकालीन अलर्ट संदेश</h4>
            </div>

            <button className="location-btn" onClick={handleGetLocation} disabled={loadingLocation}>
              <MapPin size={16} />
              <span>{loadingLocation ? 'GPS प्राप्त हो रहा है...' : location ? `GPS Lat: ${location.lat}, Lng: ${location.lng}` : 'GPS लोकेशन संलग्न करें'}</span>
            </button>

            <div className="sos-action-buttons">
              <a
                href={`https://wa.me/?text=${getSosMessage()}`}
                target="_blank"
                rel="noopener noreferrer"
                className="whatsapp-sos-btn"
              >
                <Share2 size={16} />
                <span>WhatsApp SOS भेजें</span>
              </a>

              <a
                href={`sms:${formData.emergencyContact || '112'}?body=${getSosMessage()}`}
                className="sms-sos-btn"
              >
                <Phone size={16} />
                <span>SMS SOS भेजें</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}