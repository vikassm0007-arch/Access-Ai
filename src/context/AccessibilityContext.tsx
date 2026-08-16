import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { SupportedLanguage, FontSizeScale } from '@/types/accessai';
import { useBackgroundState } from './BackgroundStateContext';
import { speakText, stopSpeech, isTTSSupported } from '@/lib/tts';

interface AccessibilityContextValue {
  highContrast: boolean;
  setHighContrast: (value: boolean) => void;
  fontSize: FontSizeScale;
  setFontSize: (scale: FontSizeScale) => void;
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  simplifiedLanguage: boolean;
  setSimplifiedLanguage: (value: boolean) => void;
  isSpeaking: boolean;
  speak: (text: string, overrideLang?: SupportedLanguage) => void;
  stop: () => void;
  ttsSupported: boolean;
}

const AccessibilityContext = createContext<AccessibilityContextValue | undefined>(undefined);

export const AccessibilityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { highContrast, setHighContrast } = useBackgroundState();
  const [fontSize, setFontSize] = useState<FontSizeScale>('normal');
  const [language, setLanguage] = useState<SupportedLanguage>('en');
  const [simplifiedLanguage, setSimplifiedLanguage] = useState<boolean>(true);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [ttsSupported, setTtsSupported] = useState<boolean>(false);

  useEffect(() => {
    setTtsSupported(isTTSSupported());
  }, []);

  const handleSpeak = useCallback((text: string, overrideLang?: SupportedLanguage) => {
    const langToUse = overrideLang || language;
    setIsSpeaking(true);
    speakText(text, langToUse, () => {
      setIsSpeaking(false);
    });
  }, [language]);

  const handleStop = useCallback(() => {
    stopSpeech();
    setIsSpeaking(false);
  }, []);

  // Update HTML class for font scale & contrast
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('font-scale-normal', 'font-scale-large', 'font-scale-xlarge');
    root.classList.add(`font-scale-${fontSize}`);

    if (fontSize === 'large') {
      root.style.fontSize = '18px';
    } else if (fontSize === 'xlarge') {
      root.style.fontSize = '20px';
    } else {
      root.style.fontSize = '16px';
    }
  }, [fontSize]);

  return (
    <AccessibilityContext.Provider
      value={{
        highContrast,
        setHighContrast,
        fontSize,
        setFontSize,
        language,
        setLanguage,
        simplifiedLanguage,
        setSimplifiedLanguage,
        isSpeaking,
        speak: handleSpeak,
        stop: handleStop,
        ttsSupported,
      }}
    >
      {children}
    </AccessibilityContext.Provider>
  );
};

export function useAccessibility(): AccessibilityContextValue {
  const ctx = useContext(AccessibilityContext);
  if (!ctx) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider');
  }
  return ctx;
}
