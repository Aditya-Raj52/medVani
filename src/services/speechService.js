// src/services/speechService.js
import { APP_DEFAULTS } from '../config/emergencyConfig';

class TextToSpeechEngine {
  constructor() {
    this.synth = typeof window !== 'undefined' ? window.speechSynthesis : null;
    this.selectedVoice = null;
    this.isRapidMode = false;
    this.onEndCallback = null;
    this.initVoice();
  }

  initVoice() {
    if (!this.synth) return;

    const loadVoices = () => {
      const voices = this.synth.getVoices();
      // Look for Hindi voice first, or English Indian voice
      const hindiVoice = voices.find(
        (v) => v.lang === 'hi-IN' || v.lang.includes('hi') || v.lang.includes('Hindi')
      );
      const indianEngVoice = voices.find(
        (v) => v.lang === 'en-IN' || v.name.includes('India')
      );

      this.selectedVoice = hindiVoice || indianEngVoice || voices[0] || null;
    };

    loadVoices();
    if (this.synth.onvoiceschanged !== undefined) {
      this.synth.onvoiceschanged = loadVoices;
    }
  }

  setMode(rapid) {
    this.isRapidMode = rapid;
  }

  speak(textHi, rapidTextHi = null, onEnd = null) {
    if (!this.synth) {
      console.warn('Web Speech API not supported in this browser environment.');
      if (onEnd) onEnd();
      return;
    }

    // Cancel any ongoing speech instantly
    this.synth.cancel();

    const textToSpeak = (this.isRapidMode && rapidTextHi) ? rapidTextHi : textHi;
    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    
    utterance.lang = APP_DEFAULTS.language; // 'hi-IN'
    utterance.rate = this.isRapidMode ? 1.25 : APP_DEFAULTS.voiceRate;
    utterance.pitch = APP_DEFAULTS.voicePitch;

    if (this.selectedVoice) {
      utterance.voice = this.selectedVoice;
    }

    utterance.onend = () => {
      if (onEnd) onEnd();
    };

    utterance.onerror = (e) => {
      console.warn('Speech synthesis notice:', e);
      if (onEnd) onEnd();
    };

    this.synth.speak(utterance);
  }

  stop() {
    if (this.synth) {
      this.synth.cancel();
    }
  }

  isSpeaking() {
    return this.synth ? this.synth.speaking : false;
  }
}

export const ttsEngine = new TextToSpeechEngine();