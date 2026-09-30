// src/App.jsx
import React, { useState } from 'react';
import Navbar from './components/Navbar';
import EmergencyVoicePlayer from './components/EmergencyVoicePlayer';
import MedicalIDForm from './components/MedicalIDForm';
import MedicineScanner from './components/MedicineScanner';
import HospitalDirectory from './components/HospitalDirectory';
import SupervisorPitchModal from './components/SupervisorPitchModal';
import { AlertTriangle, Phone, X, ShieldAlert, HeartPulse } from 'lucide-react';
import './App.css';

export default function App() {
  const [activeTab, setActiveTab] = useState('audio');
  const [showPitchModal, setShowPitchModal] = useState(false);
  const [showSosModal, setShowSosModal] = useState(false);

  const handleQuickSOS = () => {
    setShowSosModal(true);
  };

  return (
    <div className="app-container">
      {/* Top Navigation Bar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenPitch={() => setShowPitchModal(true)}
        onQuickSOS={handleQuickSOS}
      />

      {/* Main Tab Content */}
      <main className="main-content">
        {activeTab === 'audio' && <EmergencyVoicePlayer />}
        {activeTab === 'medical-id' && <MedicalIDForm />}
        {activeTab === 'ocr' && <MedicineScanner />}
        {activeTab === 'hospitals' && <HospitalDirectory />}
      </main>

      {/* Footer */}
      <footer className="app-footer">
        <div className="footer-content">
          <div className="footer-brand">
            <HeartPulse size={18} className="footer-icon" />
            <span><strong>MedVani Engine</strong> — Offline-First Emergency Response & Medicine Parsing</span>
          </div>
          <p className="footer-note">Designed for zero-network emergency readiness & first responders across India.</p>
        </div>
      </footer>

      {/* Supervisor Presentation Overview Modal */}
      {showPitchModal && (
        <SupervisorPitchModal onClose={() => setShowPitchModal(false)} />
      )}

      {/* Quick Emergency SOS Modal */}
      {showSosModal && (
        <div className="modal-overlay" onClick={() => setShowSosModal(false)}>
          <div className="modal-content sos-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header sos-modal-header">
              <div className="modal-title">
                <AlertTriangle className="sos-alert-icon" size={28} />
                <div>
                  <h3>🚨 आपातकालीन SOS डायल (Emergency Alert)</h3>
                  <p>तत्काल चिकित्सा सहायता के लिए डायल करें</p>
                </div>
              </div>
              <button className="close-btn" onClick={() => setShowSosModal(false)}><X size={20} /></button>
            </div>

            <div className="modal-body">
              <div className="sos-dial-grid">
                <a href="tel:112" className="sos-dial-card emergency-112">
                  <span className="sos-number">112</span>
                  <div className="sos-label">
                    <strong>राष्ट्रीय आपातकालीन हेल्पलाइन</strong>
                    <span>National Emergency Hotline (Police / Ambulance / Fire)</span>
                  </div>
                  <Phone className="dial-icon" />
                </a>

                <a href="tel:108" className="sos-dial-card emergency-108">
                  <span className="sos-number">108</span>
                  <div className="sos-label">
                    <strong>आपातकालीन एम्बुलेंस (Ambulance)</strong>
                    <span>State Free Emergency Medical Service</span>
                  </div>
                  <Phone className="dial-icon" />
                </a>

                <a href="tel:102" className="sos-dial-card emergency-102">
                  <span className="sos-number">102</span>
                  <div className="sos-label">
                    <strong>मातृ एवं शिशु एम्बुलेंस</strong>
                    <span>Pregnancy & Neonatal Emergency Express</span>
                  </div>
                  <Phone className="dial-icon" />
                </a>
              </div>
            </div>

            <div className="modal-footer">
              <button className="close-sos-btn" onClick={() => setShowSosModal(false)}>
                बंद करें (Close)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}