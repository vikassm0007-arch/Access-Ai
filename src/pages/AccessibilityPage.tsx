import React from 'react';
import { motion } from 'framer-motion';
import { Eye, Sun, Moon, Volume2, Globe, Type, ShieldCheck, Check, Sparkles, Sliders } from 'lucide-react';
import { useAccessibility } from '@/context/AccessibilityContext';
import { SupportedLanguage, FontSizeScale } from '@/types/accessai';

export const AccessibilityPage: React.FC = () => {
  const {
    highContrast,
    setHighContrast,
    fontSize,
    setFontSize,
    language,
    setLanguage,
    simplifiedLanguage,
    setSimplifiedLanguage,
    isSpeaking,
    speak,
    stop,
    ttsSupported,
  } = useAccessibility();

  const handleTestTTS = () => {
    if (isSpeaking) {
      stop();
    } else {
      const sampleText =
        language === 'kn'
          ? 'ಆಕ್ಸೆಸ್ ಎಐ ಗೆ ಸುಸ್ವಾಗತ. ಇದು ನಿಮ್ಮ ವೈಯಕ್ತಿಕ ಎಐ ಸಹಾಯಕ.'
          : language === 'hi'
          ? 'एक्सेस एआई में आपका स्वागत है। यह आपका व्यक्तिगत एआई सहायक है।'
          : 'Welcome to ACCESS AI. Your adaptive accessibility layer for digital services.';
      speak(sampleText, language);
    }
  };

  return (
    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-purple-400 mb-1">
            <Eye className="w-4 h-4" /> Universal Access & Customization Engine
          </div>
          <h1 className="text-3xl font-extrabold text-white">Accessibility Center</h1>
          <p className="text-xs text-slate-400 mt-1">Customize global visual themes, typography scales, trilingual voice output, and plain language settings.</p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-semibold flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4" /> WCAG 2.1 AAA Compliant
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Left Column: Visual Accessibility Controls */}
        <div className="space-y-6">
          
          {/* High Contrast Mode Box */}
          <div className={`glass-panel p-6 rounded-3xl border transition ${
            highContrast ? 'border-yellow-400 bg-yellow-400/10' : 'border-slate-800/80'
          }`}>
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  {highContrast ? <Sun className="w-4 h-4 text-yellow-400" /> : <Moon className="w-4 h-4 text-cyan-400" />}
                  High-Contrast Contrast Mode
                </h3>
                <p className="text-xs text-slate-400">Fades decorative dynamic mesh/orbs to 0 opacity over a clean #000000 pitch-black base.</p>
              </div>

              <button
                onClick={() => setHighContrast(!highContrast)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition border ${
                  highContrast
                    ? 'bg-yellow-400 text-black border-yellow-400 shadow-lg shadow-yellow-400/20'
                    : 'bg-slate-800 text-slate-300 border-slate-700 hover:border-slate-600'
                }`}
              >
                {highContrast ? 'ON' : 'OFF'}
              </button>
            </div>
          </div>

          {/* Typography & Font Scaling Box */}
          <div className="glass-panel p-6 rounded-3xl border border-slate-800/80 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Type className="w-4 h-4 text-cyan-400" /> Typography Scale & Legibility
            </h3>
            <p className="text-xs text-slate-400">Scale interface text sizes globally across all pages without layout shift.</p>

            <div className="grid grid-cols-3 gap-3">
              {[
                { scale: 'normal', label: '100% Standard', desc: 'Default 16px' },
                { scale: 'large', label: '112% Large', desc: '18px Enhanced' },
                { scale: 'xlarge', label: '125% X-Large', desc: '20px Maximum' },
              ].map((item) => (
                <button
                  key={item.scale}
                  onClick={() => setFontSize(item.scale as FontSizeScale)}
                  className={`p-3.5 rounded-2xl border text-center transition ${
                    fontSize === item.scale
                      ? 'bg-gradient-to-r from-cyan-500/20 to-emerald-500/20 text-cyan-300 border-cyan-500/50 shadow-md'
                      : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <p className="text-xs font-bold">{item.label}</p>
                  <p className="text-[10px] opacity-75 mt-0.5">{item.desc}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Plain Language Simplifier Toggle */}
          <div className="glass-panel p-6 rounded-3xl border border-slate-800/80 flex items-center justify-between">
            <div className="space-y-1">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Sliders className="w-4 h-4 text-emerald-400" /> Simplified Plain Language Mode
              </h3>
              <p className="text-xs text-slate-400">Automatically translates complex legal terms into plain conversational language.</p>
            </div>

            <button
              onClick={() => setSimplifiedLanguage(!simplifiedLanguage)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition border ${
                simplifiedLanguage
                  ? 'bg-emerald-500 text-white border-emerald-500 shadow-lg shadow-emerald-500/20'
                  : 'bg-slate-800 text-slate-400 border-slate-700'
              }`}
            >
              {simplifiedLanguage ? 'ENABLED' : 'DISABLED'}
            </button>
          </div>

        </div>

        {/* Right Column: Trilingual Engine & Voice Output */}
        <div className="space-y-6">
          
          {/* Trilingual Language Selector */}
          <div className="glass-panel p-6 rounded-3xl border border-slate-800/80 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Globe className="w-4 h-4 text-cyan-400" /> Primary Regional Language
            </h3>
            <p className="text-xs text-slate-400">Select your preferred language for instant AI interface synthesis and voice synthesis.</p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { code: 'en', label: 'English', native: 'English' },
                { code: 'kn', label: 'Kannada', native: 'ಕನ್ನಡ' },
                { code: 'hi', label: 'Hindi', native: 'हिंदी' },
              ].map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => setLanguage(lang.code as SupportedLanguage)}
                  className={`p-4 rounded-2xl border text-center transition ${
                    language === lang.code
                      ? 'bg-gradient-to-r from-cyan-500/20 to-emerald-500/20 text-cyan-300 border-cyan-500/50 shadow-md'
                      : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <p className="text-sm font-extrabold">{lang.native}</p>
                  <p className="text-[11px] opacity-75">{lang.label}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Web Speech Voice Output Control */}
          <div className="glass-panel p-6 rounded-3xl border border-slate-800/80 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Volume2 className="w-4 h-4 text-emerald-400" /> Browser Text-to-Speech (TTS) Voice Engine
              </h3>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
                ttsSupported ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' : 'bg-red-500/20 text-red-300'
              }`}>
                {ttsSupported ? 'WEB SPEECH ACTIVE' : 'UNSUPPORTED'}
              </span>
            </div>

            <p className="text-xs text-slate-400">
              Reads out form field labels, legal breakdowns, and step-by-step guidance aloud with regional speech synthesis.
            </p>

            <button
              onClick={handleTestTTS}
              className={`w-full py-3 rounded-2xl text-xs font-bold transition flex items-center justify-center gap-2 shadow-lg ${
                isSpeaking
                  ? 'bg-emerald-500 text-white shadow-emerald-500/30 animate-pulse'
                  : 'bg-gradient-to-r from-cyan-500 to-emerald-500 text-white shadow-cyan-500/20 hover:scale-[1.02]'
              }`}
            >
              <Volume2 className="w-4 h-4" /> {isSpeaking ? 'Stop Active Voice Playback' : `Test Read Aloud Voice (${language.toUpperCase()})`}
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
