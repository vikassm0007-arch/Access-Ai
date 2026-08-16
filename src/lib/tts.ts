import { SupportedLanguage } from '@/types/accessai';

export function isTTSSupported(): boolean {
  return typeof window !== 'undefined' && 'speechSynthesis' in window;
}

const LANGUAGE_CODE_MAP: Record<SupportedLanguage, string> = {
  en: 'en-US',
  kn: 'kn-IN',
  hi: 'hi-IN',
};

/**
 * Finds the best matching SpeechSynthesisVoice for a given language code.
 */
function findVoiceForLanguage(lang: SupportedLanguage): SpeechSynthesisVoice | null {
  if (!isTTSSupported()) return null;
  const voices = window.speechSynthesis.getVoices();
  if (!voices || voices.length === 0) return null;

  const targetLang = LANGUAGE_CODE_MAP[lang];
  const targetPrefix = lang === 'kn' ? 'kn' : lang === 'hi' ? 'hi' : 'en';

  // 1. Exact match on language code e.g. 'kn-IN' or 'hi-IN'
  let matched = voices.find((v) => v.lang.toLowerCase() === targetLang.toLowerCase());
  if (matched) return matched;

  // 2. Partial match on lang prefix e.g. 'kn' or 'hi'
  matched = voices.find((v) => v.lang.toLowerCase().startsWith(targetPrefix));
  if (matched) return matched;

  // 3. Name match containing language name e.g. "Kannada" or "Hindi"
  const langName = lang === 'kn' ? 'kannada' : lang === 'hi' ? 'hindi' : 'english';
  matched = voices.find((v) => v.name.toLowerCase().includes(langName));
  if (matched) return matched;

  // Fallback to any voice with 'IN' for Indian regional languages
  if (lang === 'kn' || lang === 'hi') {
    matched = voices.find((v) => v.lang.toLowerCase().includes('in'));
    if (matched) return matched;
  }

  return null;
}

export function speakText(
  text: string,
  lang: SupportedLanguage = 'en',
  onEnd?: () => void
): void {
  if (!isTTSSupported()) {
    console.warn('Text-to-speech is not supported in this browser.');
    if (onEnd) onEnd();
    return;
  }

  // Cancel any ongoing speech
  window.speechSynthesis.cancel();

  if (!text || text.trim() === '') {
    if (onEnd) onEnd();
    return;
  }

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = LANGUAGE_CODE_MAP[lang] || 'en-US';
  utterance.rate = 0.92; // Clear rate for accessibility
  utterance.pitch = 1.0;

  // Attempt to select specific voice if loaded
  const voice = findVoiceForLanguage(lang);
  if (voice) {
    utterance.voice = voice;
  }

  utterance.onend = () => {
    if (onEnd) onEnd();
  };

  utterance.onerror = (err) => {
    console.warn('TTS utterance event:', err);
    if (onEnd) onEnd();
  };

  window.speechSynthesis.speak(utterance);
}

export function stopSpeech(): void {
  if (isTTSSupported()) {
    window.speechSynthesis.cancel();
  }
}
