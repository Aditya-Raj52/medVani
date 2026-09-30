// src/components/HospitalDirectory.jsx
import React, { useState } from 'react';
import { EMERGENCY_HELPLINES, SAMPLE_HOSPITALS } from '../config/emergencyConfig';
import { PhoneCall, Building2, Shield, MapPin, ExternalLink, Activity, Search, Phone } from 'lucide-react';

export default function HospitalDirectory() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('All');

  const filteredHospitals = SAMPLE_HOSPITALS.filter((hosp) => {
    const matchesSearch = hosp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          hosp.address.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'All' || hosp.type.includes(selectedType);
    return matchesSearch && matchesType;
  });

  return (
    <div className="hospital-directory-card">
      <div className="section-header">
        <div className="section-title-wrap">
          <PhoneCall className="section-icon" />
          <div>
            <h2>4. हेल्पलाइन & आपातकालीन अस्पताल (Offline Emergency Directory)</h2>
            <p className="subtitle">वन-टैप कॉल डायल एवं 24x7 आपातकालीन अस्पताल निर्देशिका</p>
          </div>
        </div>
      </div>

      {/* Emergency Helplines Grid */}
      <div className="helplines-section">
        <h3>🚨 24x7 राष्ट्रीय हेल्पलाइन नंबर (National Emergency Dials):</h3>
        <div className="helpline-grid">
          {EMERGENCY_HELPLINES.map((h) => (
            <div key={h.number} className="helpline-card">
              <div className="helpline-icon">{h.icon}</div>
              <div className="helpline-info">
                <h4>{h.name}</h4>
                <p>{h.desc}</p>
              </div>
              <a href={`tel:${h.number.replace(/-/g, '')}`} className="call-btn">
                <Phone size={16} />
                <span>{h.number} (Call)</span>
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Nearby Emergency Hospitals */}
      <div className="hospitals-section">
        <div className="hospitals-header">
          <h3>🏥 निकटतम 24x7 आपातकालीन अस्पताल & ट्रॉमा सेंटर:</h3>
          
          <div className="search-and-filter">
            <input
              type="text"
              placeholder="अस्पताल या स्थान खोजें..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="hosp-search-input"
            />
            
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="hosp-select-filter"
            >
              <option value="All">सभी अस्पताल (All Types)</option>
              <option value="Government">सरकारी अस्पताल (Government)</option>
              <option value="Trauma">ट्रॉमा सेंटर (Trauma)</option>
              <option value="Cardiac">हृदय रोग (Cardiac)</option>
            </select>
          </div>
        </div>

        <div className="hospital-list-grid">
          {filteredHospitals.map((hosp) => (
            <div key={hosp.id} className="hospital-card">
              <div className="hosp-card-header">
                <div>
                  <span className="hosp-type-badge">{hosp.type}</span>
                  <h4>{hosp.name}</h4>
                  <p className="hosp-address"><MapPin size={14} /> {hosp.address}</p>
                </div>
                <div className="dist-badge">{hosp.distance}</div>
              </div>

              <div className="hosp-stats-row">
                <div className="stat-pill icu">
                  <Activity size={14} />
                  <span>{hosp.icubeds}</span>
                </div>

                <div className="stat-pill oxygen">
                  <span>⚡ 24x7 Oxygen Ready</span>
                </div>
              </div>

              <div className="hosp-action-bar">
                <a href={`tel:${hosp.phone}`} className="hosp-dial-btn">
                  <Phone size={14} />
                  <span>कॉल करें ({hosp.phone})</span>
                </a>

                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(hosp.name + ' ' + hosp.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hosp-directions-btn"
                >
                  <ExternalLink size={14} />
                  <span>दिशा-निर्देश (Maps)</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
