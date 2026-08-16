import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sparkles, Sun, Moon, Volume2, Globe, FileText, Compass, LayoutDashboard, Eye, Zap } from 'lucide-react';
import { useAccessibility } from '@/context/AccessibilityContext';
import { useBackgroundState } from '@/context/BackgroundStateContext';
import { SupportedLanguage } from '@/types/accessai';

export const Navbar: React.FC = () => {
  const location = useLocation();
  const { highContrast, setHighContrast, language, setLanguage, isSpeaking, speak, stop } = useAccessibility();
  const { aiState } = useBackgroundState();

  const navLinks = [
    { path: '/', label: 'Home', icon: Compass },
    { path: '/workspace', label: 'AI Workspace', icon: Sparkles },
    { path: '/analyze', label: 'Analyzer', icon: FileText },
    { path: '/recommendations', label: 'Matches & Forms', icon: Zap },
    { path: '/accessibility', label: 'Accessibility', icon: Eye },
    { path: '/insights', label: 'Insights', icon: LayoutDashboard },
  ];

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value as SupportedLanguage);
  };

  const getAIStateBadge = () => {
    switch (aiState) {
      case 'listening':
        return { text: 'AI Listening…', color: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 animate-pulse' };
      case 'processing':
        return { text: 'AI Processing…', color: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40 animate-pulse' };
      case 'documentUpload':
        return { text: 'Analyzing Document', color: 'bg-blue-500/20 text-blue-300 border-blue-500/40 animate-pulse' };
      default:
        return { text: 'AI Ready', color: 'bg-slate-800/80 text-slate-400 border-slate-700/50' };
    }
  };

  const aiBadge = getAIStateBadge();

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#0B0F19]/80 border-b border-slate-800/80 w-full">
      <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* Left: Logo & Brand */}
          <div className="flex-1 flex items-center justify-start min-w-max">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-emerald-500 p-0.5 shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform">
                <div className="w-full h-full bg-[#0B0F19] rounded-[10px] flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-cyan-400" />
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-cyan-400 via-emerald-400 to-blue-500 bg-clip-text text-transparent">
                    ACCESS<span className="text-white">AI</span>
                  </span>
                  <span className={`text-[10px] font-semibold px-2.5 py-0.5 rounded-full border ${aiBadge.color}`}>
                    {aiBadge.text}
                  </span>
                </div>
                <p className="text-[10px] text-slate-400 -mt-0.5 hidden sm:block">Adaptive Accessibility Layer</p>
              </div>
            </Link>
          </div>

          {/* Middle: Main Navigation Links */}
          <div className="flex-1 hidden md:flex items-center justify-center">
            <nav className="flex items-center gap-1.5 bg-slate-900/80 p-2 rounded-full border border-slate-800/80 shadow-inner">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold transition-all whitespace-nowrap ${
                      isActive
                        ? 'bg-gradient-to-r from-cyan-500/20 to-emerald-500/20 text-cyan-300 border border-cyan-500/30 shadow-md'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    {link.label}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Right: Quick Header Accessibility Controls (Read, Language, Theme) */}
          <div className="flex-1 flex items-center justify-end gap-3 min-w-max">
            {/* Read Aloud Quick Button */}
            <button
              onClick={() => {
                if (isSpeaking) {
                  stop();
                } else {
                  speak('Welcome to ACCESS AI. An adaptive accessibility layer for digital services.');
                }
              }}
              className={`px-3 py-2 rounded-lg border transition text-xs flex items-center gap-2 font-medium ${
                isSpeaking
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50 animate-pulse'
                  : 'bg-slate-800/80 text-slate-300 border-slate-700/60 hover:border-cyan-500/40 hover:text-white'
              }`}
              title="Text to Speech (Read Page)"
              aria-label="Text to speech"
            >
              <Volume2 className="w-4 h-4 text-cyan-400" />
              <span className="hidden sm:inline text-xs font-medium">{isSpeaking ? 'Stop Voice' : 'Read'}</span>
            </button>

            {/* Language Switcher */}
            <div className="flex items-center gap-1.5 bg-slate-800/80 border border-slate-700/60 rounded-lg px-2.5 py-1.5">
              <Globe className="w-4 h-4 text-cyan-400 hidden sm:block" />
              <select
                value={language}
                onChange={handleLanguageChange}
                className="bg-transparent text-xs text-slate-200 focus:outline-none cursor-pointer font-medium"
                aria-label="Select Language"
              >
                <option value="en" className="bg-slate-900 text-slate-200">English</option>
                <option value="kn" className="bg-slate-900 text-slate-200">ಕನ್ನಡ (Kannada)</option>
                <option value="hi" className="bg-slate-900 text-slate-200">हिंदी (Hindi)</option>
              </select>
            </div>

            {/* High Contrast Quick Toggle */}
            <button
              onClick={() => setHighContrast(!highContrast)}
              className={`p-2.5 rounded-lg border transition ${
                highContrast
                  ? 'bg-yellow-400 text-black border-yellow-400 font-bold'
                  : 'bg-slate-800/80 text-slate-300 border-slate-700/60 hover:border-cyan-500/40 hover:text-white'
              }`}
              title="Toggle High Contrast Mode"
              aria-label="Toggle high contrast"
            >
              {highContrast ? <Sun className="w-4 h-4 text-black" /> : <Moon className="w-4 h-4 text-cyan-400" />}
            </button>
          </div>

        </div>

        {/* Mobile Navigation bar */}
        <div className="md:hidden flex items-center justify-around py-2 border-t border-slate-800/60 text-xs">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`flex flex-col items-center gap-1 py-1 px-2 rounded ${
                  isActive ? 'text-cyan-400 font-semibold' : 'text-slate-400'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="text-[10px]">{link.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </header>
  );
};
