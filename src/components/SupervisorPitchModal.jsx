// src/components/SupervisorPitchModal.jsx
import React from 'react';
import { ShieldCheck, Cpu, Database, Volume2, QrCode, Camera, Award, X, CheckCircle, Zap } from 'lucide-react';

export default function SupervisorPitchModal({ onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content pitch-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title">
            <Award className="gold-icon" size={24} />
            <div>
              <h3>MedVani 2.0 - Supervisor Presentation & Executive Briefing</h3>
              <p>Offline-First Emergency Audio Guidance & Prescription Parser Engine</p>
            </div>
          </div>
          <button className="close-btn" onClick={onClose}><X size={20} /></button>
        </div>

        <div className="modal-body">
          {/* Key Value Proposition */}
          <div className="pitch-card highlight-card">
            <h4>🚀 Why MedVani? (Problem Statement & Solution)</h4>
            <p>
              In critical Indian medical emergencies (accidents, heart attacks, snakebites), internet connectivity is frequently unavailable or slow.
              <strong>MedVani</strong> is a zero-latency, 100% offline-capable emergency assistant designed to guide bystanders, paramedics, and family members using local-language voice cues and scannable emergency medical IDs.
            </p>
          </div>

          {/* Core Technical Highlights Grid */}
          <div className="pitch-grid">
            <div className="pitch-feature">
              <Volume2 className="feat-icon text-red" />
              <div>
                <h5>1. Dual-Mode Voice Engine (Web Speech API)</h5>
                <p>Features <strong>Gahan (Detailed)</strong> and <strong>Tvarit (Rapid)</strong> audio modes backed by survey findings (76.7% Hindi preference). Includes real-time 105 BPM CPR metronome beat visualizer.</p>
              </div>
            </div>

            <div className="pitch-feature">
              <QrCode className="feat-icon text-blue" />
              <div>
                <h5>2. Offline Medical ID & SVG QR Code</h5>
                <p>Stores patient profile locally in IndexedDB (`medvani_local_db`). Generates zero-dependency SVG QR code scannable off-grid by first responders.</p>
              </div>
            </div>

            <div className="pitch-feature">
              <Camera className="feat-icon text-green" />
              <div>
                <h5>3. Offline Tesseract WASM Prescription OCR</h5>
                <p>Executes WebAssembly OCR in browser thread to parse dosage frequency (1-0-1), timing (after food), and strength (500mg) without sending patient data to remote cloud servers.</p>
              </div>
            </div>

            <div className="pitch-feature">
              <Database className="feat-icon text-purple" />
              <div>
                <h5>4. IndexedDB Offline Architecture</h5>
                <p>Full client-side data persistence with zero backend server downtime risks during power or network grid outages.</p>
              </div>
            </div>
          </div>

          {/* Survey & Empirical Data Summary */}
          <div className="survey-metrics-box">
            <h4>📊 Key Empirical Survey Insights (30 Respondents Benchmark):</h4>
            <div className="metrics-grid">
              <div className="metric-pill">
                <span className="metric-num">76.7%</span>
                <span className="metric-lbl">Hindi Voice Instruction Preference</span>
              </div>

              <div className="metric-pill">
                <span className="metric-num">33.3%</span>
                <span className="metric-lbl">Lowest Confidence: Fracture Handling</span>
              </div>

              <div className="metric-pill">
                <span className="metric-num">20.0%</span>
                <span className="metric-lbl">CPR & Bleeding Panic Index</span>
              </div>

              <div className="metric-pill">
                <span className="metric-num">0 ms</span>
                <span className="metric-lbl">Offline Server Latency (Client WASM)</span>
              </div>
            </div>
          </div>

          {/* Tech Stack Tech Pills */}
          <div className="tech-stack-row">
            <strong>Built with:</strong>
            <span className="tech-tag">React 19</span>
            <span className="tech-tag">Vite 6</span>
            <span className="tech-tag">IndexedDB (W3C Standard)</span>
            <span className="tech-tag">Tesseract.js (WebAssembly OCR)</span>
            <span className="tech-tag">Web Speech API</span>
            <span className="tech-tag">Lucide Icons</span>
          </div>
        </div>

        <div className="modal-footer">
          <button className="primary-modal-btn" onClick={onClose}>
            <CheckCircle size={18} />
            <span>लाइव ऐप में लौटें (Return to Live App Demo)</span>
          </button>
        </div>
      </div>
    </div>
  );
}
