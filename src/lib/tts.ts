import { SupportedLanguage } from '@/types/accessai';

export function isTTSSupported(): boolean {
  return typeof window !== 'undefined';
}

const LANGUAGE_CODE_MAP: Record<SupportedLanguage, string> = {
  en: 'en-US',
  kn: 'kn-IN',
  hi: 'hi-IN',
};

let currentAudio: HTMLAudioElement | null = null;

/**
 * Finds if the OS/Browser has a native SpeechSynthesis voice installed for Kannada or Hindi.
 */
function findVoiceForLanguage(lang: SupportedLanguage): SpeechSynthesisVoice | null {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return null;
  const voices = window.speechSynthesis.getVoices();
  if (!voices || voices.length === 0) return null;

  const targetPrefix = lang === 'kn' ? 'kn' : lang === 'hi' ? 'hi' : 'en';

  // Match voice with language prefix
  const matched = voices.find(
    (v) =>
      v.lang.toLowerCase().startsWith(targetPrefix) ||
      v.name.toLowerCase().includes(lang === 'kn' ? 'kannada' : lang === 'hi' ? 'hindi' : 'english')
  );

  return matched || null;
}

/**
 * Streams audio using high-definition voice API fallback (Google Voice Pack stream)
 * for seamless Kannada and Hindi voice playback without requiring local OS voice packs.
 */
function playOnlineVoiceStream(text: string, lang: SupportedLanguage, onEnd?: () => void): void {
  stopSpeech();

  // Clean text and limit chunk size for URL streaming
  const cleanText = text.replace(/[\n\r]+/g, ' ').trim();
  if (!cleanText) {
    if (onEnd) onEnd();
    return;
  }

  // Slice into 180 character chunks for smooth audio buffering
  const chunks = cleanText.match(/.{1,180}(?:\s+|$)/g) || [cleanText];
  let currentChunkIndex = 0;

  const playChunk = (index: number) => {
    if (index >= chunks.length) {
      currentAudio = null;
      if (onEnd) onEnd();
      return;
    }

    const chunkText = chunks[index].trim();
    if (!chunkText) {
      playChunk(index + 1);
      return;
    }

    const ttsLang = lang === 'kn' ? 'kn' : lang === 'hi' ? 'hi' : 'en';
    const streamUrl = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(
      chunkText
    )}&tl=${ttsLang}&client=tw-ob`;

    const audio = new Audio(streamUrl);
    currentAudio = audio;

    audio.onended = () => {
      currentChunkIndex++;
      playChunk(currentChunkIndex);
    };

    audio.onerror = (e) => {
      console.warn('Voice pack stream error, trying next chunk or fallback:', e);
      currentChunkIndex++;
      playChunk(currentChunkIndex);
    };

    audio.play().catch((err) => {
      console.warn('Autoplay audio failed:', err);
      if (onEnd) onEnd();
    });
  };

  playChunk(0);
}

/**
 * Universal Speak Function for English, Kannada, and Hindi.
 * Prefers local Web Speech API if native voice pack is present, otherwise
 * seamlessly streams high-definition online Kannada & Hindi voice packs!
 */
export function speakText(
  text: string,
  lang: SupportedLanguage = 'en',
  onEnd?: () => void
): void {
  stopSpeech();

  if (!text || text.trim() === '') {
    if (onEnd) onEnd();
    return;
  }

  // Check if browser has local SpeechSynthesis with native voice for Kannada/Hindi
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    const nativeVoice = findVoiceForLanguage(lang);

    // If English or native voice is installed locally, use WebSpeechUtterance
    if (lang === 'en' || nativeVoice) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = LANGUAGE_CODE_MAP[lang] || 'en-US';
      utterance.rate = 0.92;
      utterance.pitch = 1.0;

      if (nativeVoice) {
        utterance.voice = nativeVoice;
      }

      utterance.onend = () => {
        if (onEnd) onEnd();
      };

      utterance.onerror = () => {
        // Fallback to online voice pack stream if WebSpeech fails
        playOnlineVoiceStream(text, lang, onEnd);
      };

      window.speechSynthesis.speak(utterance);
      return;
    }
  }

  // Fallback to high-quality streaming voice pack for Kannada & Hindi
  playOnlineVoiceStream(text, lang, onEnd);
}

export function stopSpeech(): void {
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
    currentAudio = null;
  }
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
}
