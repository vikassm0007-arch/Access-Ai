import { SupportedLanguage } from '@/types/accessai';

export function isTTSSupported(): boolean {
  return typeof window !== 'undefined';
}

const LOCAL_VOICE_PACKS: Record<SupportedLanguage, string> = {
  en: '/voices/english.mp3',
  kn: '/voices/kannada.mp3',
  hi: '/voices/hindi.mp3',
};

const LANGUAGE_CODE_MAP: Record<SupportedLanguage, string> = {
  en: 'en-US',
  kn: 'kn-IN',
  hi: 'hi-IN',
};

let currentAudio: HTMLAudioElement | null = null;

/**
 * Stop any active audio voice playback (custom audio MP3 or WebSpeech API)
 */
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

/**
 * Plays custom pre-recorded audio voice pack for the selected language
 * (/voices/english.mp3, /voices/kannada.mp3, /voices/hindi.mp3)
 */
export function playCustomVoicePack(lang: SupportedLanguage, onEnd?: () => void): boolean {
  stopSpeech();
  const audioPath = LOCAL_VOICE_PACKS[lang];
  if (!audioPath) return false;

  try {
    const audio = new Audio(audioPath);
    currentAudio = audio;

    audio.onended = () => {
      currentAudio = null;
      if (onEnd) onEnd();
    };

    audio.onerror = (e) => {
      console.warn(`Could not load local voice pack at ${audioPath}:`, e);
      currentAudio = null;
      if (onEnd) onEnd();
    };

    audio.play().catch((err) => {
      console.warn('Voice pack autoplay failed:', err);
      if (onEnd) onEnd();
    });

    return true;
  } catch (err) {
    console.warn('Failed playing custom audio pack:', err);
    return false;
  }
}

/**
 * Finds if the OS/Browser has a native SpeechSynthesis voice installed for Kannada or Hindi.
 */
function findVoiceForLanguage(lang: SupportedLanguage): SpeechSynthesisVoice | null {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return null;
  const voices = window.speechSynthesis.getVoices();
  if (!voices || voices.length === 0) return null;

  const targetPrefix = lang === 'kn' ? 'kn' : lang === 'hi' ? 'hi' : 'en';

  const matched = voices.find(
    (v) =>
      v.lang.toLowerCase().startsWith(targetPrefix) ||
      v.name.toLowerCase().includes(lang === 'kn' ? 'kannada' : lang === 'hi' ? 'hindi' : 'english')
  );

  return matched || null;
}

/**
 * Streams audio using high-definition voice API fallback (Google Voice Pack stream)
 */
function playOnlineVoiceStream(text: string, lang: SupportedLanguage, onEnd?: () => void): void {
  stopSpeech();

  const cleanText = text.replace(/[\n\r]+/g, ' ').trim();
  if (!cleanText) {
    if (onEnd) onEnd();
    return;
  }

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

    audio.onerror = () => {
      currentChunkIndex++;
      playChunk(currentChunkIndex);
    };

    audio.play().catch((err) => {
      console.warn('Voice stream autoplay failed:', err);
      if (onEnd) onEnd();
    });
  };

  playChunk(0);
}

/**
 * Universal Speak Function for English, Kannada, and Hindi.
 * Plays the custom pre-recorded voice packs (/voices/kannada.mp3, /voices/hindi.mp3, /voices/english.mp3),
 * with fallback to Web Speech API / online stream for dynamic text.
 */
export function speakText(
  text: string,
  lang: SupportedLanguage = 'en',
  onEnd?: () => void
): void {
  // Always try playing the custom voice pack for English, Kannada, and Hindi first
  const success = playCustomVoicePack(lang, onEnd);
  if (success) {
    return;
  }

  // Fallback for dynamic speech text
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    const nativeVoice = findVoiceForLanguage(lang);

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
        playOnlineVoiceStream(text, lang, onEnd);
      };

      window.speechSynthesis.speak(utterance);
      return;
    }
  }

  playOnlineVoiceStream(text, lang, onEnd);
}
