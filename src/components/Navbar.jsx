// src/components/Navbar.jsx
import React from 'react';
import { Shield, Volume2, User, Camera, PhoneCall, Award, Activity, AlertTriangle } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, onOpenPitch, onQuickSOS }) {
  return (
    <header className="navbar-container">
      <div className="navbar-top">
        <div className="brand-logo" onClick={() => setActiveTab('audio')}>
          <div className="logo-icon-wrap">
            <Shield className="logo-icon" />
          </div>
          <div>
            <h1 className="brand-title">MedVani <span className="brand-badge">MVP 2.0</span></h1>
            <p className="brand-tagline">ऑफ़लाइन आपातकालीन वॉयस एवं मेडिकल आईडी इंजन</p>
          </div>
        </div>

        <div className="navbar-actions">
          <div className="offline-badge">
            <span className="dot-indicator"></span>
            <span className="offline-text">100% Offline Ready (IndexedDB)</span>
          </div>

          <button className="pitch-btn" onClick={onOpenPitch} title="Supervisor Presentation Walkthrough">
            <Award size={16} />
            <span>Supervisor Brief</span>
          </button>

          <button className="sos-emergency-btn pulse-anim" onClick={onQuickSOS} title="Trigger Immediate Emergency SOS">
            <AlertTriangle size={18} />
            <span>SOS (आपातकाल)</span>
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <nav className="nav-tabs">
        <button
          className={`tab-btn ${activeTab === 'audio' ? 'active' : ''}`}
          onClick={() => setActiveTab('audio')}
        >
          <Volume2 size={18} />
          <span>1. वॉयस गाइड (Audio First Aid)</span>
        </button>

        <button
          className={`tab-btn ${activeTab === 'medical-id' ? 'active' : ''}`}
          onClick={() => setActiveTab('medical-id')}
        >
          <User size={18} />
          <span>2. मेडिकल ID & QR (Emergency Profile)</span>
        </button>

        <button
          className={`tab-btn ${activeTab === 'ocr' ? 'active' : ''}`}
          onClick={() => setActiveTab('ocr')}
        >
          <Camera size={18} />
          <span>3. पर्ची स्कैनर (Medicine OCR)</span>
        </button>

        <button
          className={`tab-btn ${activeTab === 'hospitals' ? 'active' : ''}`}
          onClick={() => setActiveTab('hospitals')}
        >
          <PhoneCall size={18} />
          <span>4. हेल्पलाइन & अस्पताल (Hospitals)</span>
        </button>
      </nav>
    </header>
  );
}
