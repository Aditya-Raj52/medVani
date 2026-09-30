// src/components/EmergencyVoicePlayer.jsx
import React, { useState, useEffect, useRef } from 'react';
import { ttsEngine } from '../services/speechService';
import { EMERGENCY_PROCEDURES } from '../config/emergencyConfig';
import { Volume2, Square, Zap, BookOpen, AlertTriangle, Activity, Search, ShieldAlert, Play, CheckCircle } from 'lucide-react';

export default function EmergencyVoicePlayer() {
  const [activeProcedure, setActiveProcedure] = useState(EMERGENCY_PROCEDURES[1]); // CPR default
  const [isRapid, setIsRapid] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  // CPR Metronome State
  const [cprBeatActive, setCprBeatActive] = useState(false);
  const cprIntervalRef = useRef(null);

  const categories = ['All', 'Cardiovascular', 'Trauma', 'Environmental', 'Airway', 'First Aid'];

  const filteredProcedures = EMERGENCY_PROCEDURES.filter((proc) => {
    const matchesSearch = proc.titleHi.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          proc.titleEn.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = selectedCategory === 'All' || proc.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  const handleModeToggle = (rapidState) => {
    setIsRapid(rapidState);
    ttsEngine.setMode(rapidState);
  };

  const handlePlayVoice = (procedure) => {
    setActiveProcedure(procedure);
    setIsPlaying(true);
    
    // Stop any existing CPR beat
    stopCprMetronome();

    // Text to speak
    const fullText = `${procedure.titleHi}। ${procedure.rapidInstruction} घबराएं नहीं, तुरंत एम्बुलेंस को कॉल करें। विवरण: ${procedure.steps ? procedure.steps.join('. ') : ''}`;
    const rapidText = `त्वरित निर्देश: ${procedure.rapidInstruction} 112 पर कॉल करें।`;

    // Trigger Speech Engine
    ttsEngine.speak(fullText, rapidText, () => {
      setIsPlaying(false);
    });

    // If CPR selected, trigger rhythmic visual metronome (105 BPM = ~571ms per beat)
    if (procedure.id === 'cpr') {
      startCprMetronome();
    }
  };

  const startCprMetronome = () => {
    stopCprMetronome();
    let toggle = false;
    cprIntervalRef.current = setInterval(() => {
      toggle = !toggle;
      setCprBeatActive(toggle);
    }, 285); // half of 571ms for pulse effect
  };

  const stopCprMetronome = () => {
    if (cprIntervalRef.current) {
      clearInterval(cprIntervalRef.current);
      cprIntervalRef.current = null;
    }
    setCprBeatActive(false);
  };

  const handleStop = () => {
    ttsEngine.stop();
    stopCprMetronome();
    setIsPlaying(false);
  };

  useEffect(() => {
    return () => {
      stopCprMetronome();
      ttsEngine.stop();
    };
  }, []);

  return (
    <div className="voice-player-card">
      {/* Header Banner */}
      <div className="section-header">
        <div className="section-title-wrap">
          <Volume2 className="section-icon" />
          <div>
            <h2>1. वॉयस गाइड (Offline Voice Guidance Engine)</h2>
            <p className="subtitle">सर्वेक्षण आधारित प्राथमिकता (Least-Confidence First Aid Protocols)</p>
          </div>
        </div>

        {/* Mode Toggle Switches */}
        <div className="mode-toggle-group">
          <button
            className={`mode-btn ${!isRapid ? 'active-detailed' : ''}`}
            onClick={() => handleModeToggle(false)}
          >
            <BookOpen size={16} />
            <span>गहन गाइड (Detailed)</span>
          </button>

          <button
            className={`mode-btn ${isRapid ? 'active-rapid' : ''}`}
            onClick={() => handleModeToggle(true)}
          >
            <Zap size={16} />
            <span>त्वरित मोड (Rapid Action)</span>
          </button>
        </div>
      </div>

      {/* Mode Indicator Note */}
      <div className={`mode-banner ${isRapid ? 'rapid-banner' : 'detailed-banner'}`}>
        {isRapid ? (
          <span>⚡ <strong>त्वरित मोड सक्रिय:</strong> केवल आपातकालीन तुरंत करने योग्य 1-लाइन निर्देश तेज गति में पढ़े जाएंगे।</span>
        ) : (
          <span>📖 <strong>गहन गाइड सक्रिय:</strong> विस्तृत चरण-दर-चरण निर्देश एवं सावधानियां सुनाई जाएंगी।</span>
        )}
      </div>

      {/* Filter and Search Bar */}
      <div className="filter-bar">
        <div className="search-input-wrap">
          <Search size={16} className="search-icon" />
          <input
            type="text"
            placeholder="खोजें (e.g. फ्रैक्चर, सीपीआर, सर्पदंश, जलना)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="category-pills">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`cat-pill ${selectedCategory === cat ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="procedure-grid">
        {/* Left Side: Procedure Cards List */}
        <div className="procedure-list">
          <h4 className="list-title">📋 आपातकालीन प्रक्रियाएं ({filteredProcedures.length})</h4>
          {filteredProcedures.map((proc) => {
            const isSelected = activeProcedure?.id === proc.id;
            return (
              <div
                key={proc.id}
                className={`procedure-item ${isSelected ? 'selected' : ''}`}
                onClick={() => setActiveProcedure(proc)}
              >
                <div className="proc-info">
                  <span className="proc-icon">{proc.icon}</span>
                  <div>
                    <h4 className="proc-title">{proc.titleHi}</h4>
                    <span className="proc-sub">{proc.titleEn}</span>
                  </div>
                </div>

                <button
                  className={`play-btn ${isPlaying && isSelected ? 'playing' : ''}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (isPlaying && isSelected) {
                      handleStop();
                    } else {
                      handlePlayVoice(proc);
                    }
                  }}
                >
                  {isPlaying && isSelected ? (
                    <>
                      <Square size={14} />
                      <span>रुकें (Stop)</span>
                    </>
                  ) : (
                    <>
                      <Play size={14} />
                      <span>सुनें (Play)</span>
                    </>
                  )}
                </button>
              </div>
            );
          })}
        </div>

        {/* Right Side: Active Procedure Visual & Audio Detail */}
        <div className="procedure-detail-card">
          {activeProcedure ? (
            <>
              <div className="detail-header">
                <span className="detail-icon">{activeProcedure.icon}</span>
                <div>
                  <span className="category-tag">{activeProcedure.category}</span>
                  <h3>{activeProcedure.titleHi}</h3>
                  <p className="en-title">{activeProcedure.titleEn}</p>
                </div>
              </div>

              {/* Action Button */}
              <div className="action-row">
                <button
                  className={`voice-trigger-btn ${isPlaying ? 'speaking' : ''}`}
                  onClick={() => (isPlaying ? handleStop() : handlePlayVoice(activeProcedure))}
                >
                  {isPlaying ? (
                    <>
                      <Square size={18} />
                      <span>ऑडियो बंद करें (Stop Voice)</span>
                    </>
                  ) : (
                    <>
                      <Volume2 size={18} />
                      <span>वॉयस निर्देश चालू करें ({isRapid ? 'Rapid' : 'Detailed'})</span>
                    </>
                  )}
                </button>
              </div>

              {/* CPR Metronome Pulse Widget if CPR is selected */}
              {activeProcedure.id === 'cpr' && (
                <div className={`cpr-metronome-box ${cprBeatActive ? 'pulse-beat' : ''}`}>
                  <div className="cpr-info">
                    <Activity className={`cpr-pulse-icon ${cprBeatActive ? 'beat' : ''}`} />
                    <div>
                      <strong>CPR 105 BPM Metronome Beats</strong>
                      <p>छाती दबाने की सही गति (100 - 120 rhythmic compressions/min)</p>
                    </div>
                  </div>
                  <div className={`beat-visualizer ${cprBeatActive ? 'active-flash' : ''}`}>
                    {cprBeatActive ? '💥 PUSH NOW (105 BPM)' : 'READY'}
                  </div>
                </div>
              )}

              {/* Rapid Instruction Banner */}
              <div className="rapid-instruction-box">
                <strong>⚡ त्वरित कार्यवाही (Rapid Action):</strong>
                <p>{activeProcedure.rapidInstruction}</p>
              </div>

              {/* Step-by-Step Checklist */}
              {activeProcedure.steps && (
                <div className="steps-container">
                  <h4>📝 चरण-दर-चरण निर्देश (Steps):</h4>
                  <ul className="steps-list">
                    {activeProcedure.steps.map((step, idx) => (
                      <li key={idx}>
                        <CheckCircle size={16} className="step-check" />
                        <span>{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Critical Warnings */}
              {activeProcedure.warnings && (
                <div className="warning-box">
                  <div className="warning-header">
                    <ShieldAlert size={18} />
                    <strong>सावधानियां (DO NOT DO THIS):</strong>
                  </div>
                  <ul>
                    {activeProcedure.warnings.map((warn, i) => (
                      <li key={i}>⚠️ {warn}</li>
                    ))}
                  </ul>
                </div>
              )}
            </>
          ) : (
            <div className="empty-selection">
              <p>कृपया बाईं ओर से कोई भी प्राथमिक चिकित्सा गाइड चुनें।</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}