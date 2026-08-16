import React from 'react';
import { Sparkles, Shield, Heart, Cpu } from 'lucide-react';
import { useAccessibility } from '@/context/AccessibilityContext';

export const Footer: React.FC = () => {
  const { t } = useAccessibility();

  return (
    <footer className="relative z-10 border-t border-slate-800/80 bg-[#0B0F19]/90 backdrop-blur-md py-8 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-cyan-400" />
            </div>
            <div>
              <p className="font-semibold text-slate-200">{t('footerTitle')}</p>
              <p className="text-[11px] text-slate-400">{t('footerTagline')}</p>
              <p className="text-[10px] text-cyan-400/90 font-medium tracking-wide mt-1">
                {t('bridgingQuote')}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-slate-400">
            <span className="flex items-center gap-1.5 hover:text-cyan-400 transition cursor-pointer">
              <Cpu className="w-3.5 h-3.5 text-cyan-400" /> Gemini AI Engine
            </span>
            <span className="flex items-center gap-1.5 hover:text-emerald-400 transition cursor-pointer">
              <Shield className="w-3.5 h-3.5 text-emerald-400" /> Privacy First
            </span>
            <span className="flex items-center gap-1.5 hover:text-purple-400 transition cursor-pointer">
              <Heart className="w-3.5 h-3.5 text-purple-400" /> WCAG AAA Accessible
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
