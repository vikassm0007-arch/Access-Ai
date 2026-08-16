import { SupportedLanguage } from '@/types/accessai';

export function isTTSSupported(): boolean {
  return typeof window !== 'undefined' && 'speechSynthesis' in window;
}

const LANGUAGE_VOICE_MAP: Record<SupportedLanguage, string> = {
  en: 'en-US',
  kn: 'kn-IN',
  hi: 'hi-IN',
};

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
  utterance.lang = LANGUAGE_VOICE_MAP[lang] || 'en-US';
  utterance.rate = 0.95; // Slightly slower for enhanced accessibility
  utterance.pitch = 1.0;

  utterance.onend = () => {
    if (onEnd) onEnd();
  };

  utterance.onerror = (err) => {
    console.error('TTS utterance error:', err);
    if (onEnd) onEnd();
  };

  window.speechSynthesis.speak(utterance);
}

export function stopSpeech(): void {
  if (isTTSSupported()) {
    window.speechSynthesis.cancel();
  }
}
