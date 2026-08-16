import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, Upload, FileText, Target, Grid, ArrowRight, CheckCircle2, ShieldCheck, Zap, Volume2, Globe } from 'lucide-react';
import { useBackgroundState } from '@/context/BackgroundStateContext';
import { useAccessibility } from '@/context/AccessibilityContext';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const { setAIState } = useBackgroundState();
  const { speak, language, t } = useAccessibility();
  const [activeTab, setActiveTab] = useState<'upload' | 'paste' | 'goal' | 'category'>('upload');
  const [inputText, setInputText] = useState('');
  const [dragActive, setDragActive] = useState(false);

  const handleDemoPreset = (presetText: string, targetPath: string) => {
    setAIState('processing');
    speak(presetText, language);
    setTimeout(() => {
      setAIState('idle');
      navigate(targetPath, { state: { query: presetText } });
    }, 600);
  };

  const handleStartAnalysis = (queryText?: string) => {
    const textToSubmit = queryText || inputText || 'Post-Matric Scholarship Application for Engineering Students';
    setAIState('processing');
    speak(textToSubmit, language);
    setTimeout(() => {
      setAIState('idle');
      if (activeTab === 'upload' || activeTab === 'paste') {
        navigate('/analyze', { state: { query: textToSubmit } });
      } else {
        navigate('/recommendations', { state: { query: textToSubmit } });
      }
    }, 700);
  };

  return (
    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
      
      {/* Hero Header Section */}
      <div className="text-center max-w-3xl mx-auto space-y-6">
        
        {/* Hackathon Badge Pill */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-cyan-500/10 via-emerald-500/10 to-blue-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold shadow-lg shadow-cyan-500/10"
        >
          <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-spin" style={{ animationDuration: '4s' }} />
          <span>{t('heroBadge')}</span>
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight"
        >
          {t('heroTitle1')}{' '}
          <span className="bg-gradient-to-r from-cyan-400 via-emerald-400 to-blue-500 bg-clip-text text-transparent">
            {t('heroTitle2')}
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto"
        >
          {t('heroSubtitle')}
        </motion.p>

        {/* Core Story Flow Pipeline Indicator */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.25 }}
          className="flex items-center justify-center gap-2 sm:gap-4 text-xs font-medium text-slate-300 py-3 px-4 bg-slate-900/60 rounded-2xl border border-slate-800/80 max-w-xl mx-auto backdrop-blur-md"
        >
          <span className="text-cyan-400 font-bold">1. Input</span>
          <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
          <span className="text-emerald-400 font-bold">2. AI Parses</span>
          <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
          <span className="text-blue-400 font-bold">3. UI Adapts</span>
          <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
          <span className="text-purple-400 font-bold">4. Task Done</span>
        </motion.div>
      </div>

      {/* Interactive 4-Mode Input Center */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-10 max-w-4xl mx-auto glass-panel rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-700/60"
      >
        {/* Tab Selection Headers */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-6">
          <button
            onClick={() => setActiveTab('upload')}
            className={`flex items-center justify-center gap-2 p-3 rounded-2xl text-xs font-semibold transition ${
              activeTab === 'upload'
                ? 'bg-gradient-to-r from-cyan-500 to-emerald-500 text-white shadow-lg shadow-cyan-500/25'
                : 'bg-slate-800/50 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            <Upload className="w-4 h-4" /> {t('btnInspectDoc')}
          </button>

          <button
            onClick={() => setActiveTab('paste')}
            className={`flex items-center justify-center gap-2 p-3 rounded-2xl text-xs font-semibold transition ${
              activeTab === 'paste'
                ? 'bg-gradient-to-r from-cyan-500 to-emerald-500 text-white shadow-lg shadow-cyan-500/25'
                : 'bg-slate-800/50 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            <FileText className="w-4 h-4" /> Paste Text
          </button>

          <button
            onClick={() => setActiveTab('goal')}
            className={`flex items-center justify-center gap-2 p-3 rounded-2xl text-xs font-semibold transition ${
              activeTab === 'goal'
                ? 'bg-gradient-to-r from-cyan-500 to-emerald-500 text-white shadow-lg shadow-cyan-500/25'
                : 'bg-slate-800/50 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            <Target className="w-4 h-4" /> {t('btnFindScholarships')}
          </button>

          <button
            onClick={() => setActiveTab('category')}
            className={`flex items-center justify-center gap-2 p-3 rounded-2xl text-xs font-semibold transition ${
              activeTab === 'category'
                ? 'bg-gradient-to-r from-cyan-500 to-emerald-500 text-white shadow-lg shadow-cyan-500/25'
                : 'bg-slate-800/50 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            <Grid className="w-4 h-4" /> {t('navRecommendations')}
          </button>
        </div>

        {/* Tab Content 1: Upload Document */}
        {activeTab === 'upload' && (
          <div
            onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
            onDragLeave={() => setDragActive(false)}
            onDrop={(e) => { e.preventDefault(); setDragActive(false); handleStartAnalysis('Uploaded Government Form'); }}
            className={`border-2 border-dashed rounded-2xl p-8 sm:p-12 text-center transition cursor-pointer ${
              dragActive ? 'border-cyan-400 bg-cyan-500/10' : 'border-slate-700/80 hover:border-cyan-500/50 bg-slate-900/40'
            }`}
            onClick={() => handleStartAnalysis('SSP Post-Matric Scholarship Form')}
          >
            <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center mx-auto mb-4 text-cyan-400">
              <Upload className="w-8 h-8" />
            </div>
            <h3 className="text-base font-bold text-white mb-1">{t('dropzoneText')}</h3>
            <p className="text-xs text-slate-400 mb-4">Supports PDF, PNG, JPG scans up to 15MB</p>
            <button
              onClick={(e) => { e.stopPropagation(); handleStartAnalysis('SSP Post-Matric Scholarship Form'); }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 text-white font-semibold text-xs shadow-lg shadow-cyan-500/20 hover:scale-105 transition"
            >
              {t('btnInspectDoc')} <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Tab Content 2: Paste Text */}
        {activeTab === 'paste' && (
          <div className="space-y-4">
            <textarea
              rows={4}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={t('inputPlaceholder')}
              className="w-full rounded-2xl bg-slate-900/60 border border-slate-700/80 p-4 text-sm text-slate-100 focus:outline-none focus:border-cyan-400 placeholder:text-slate-500"
            />
            <div className="flex justify-end">
              <button
                onClick={() => handleStartAnalysis()}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 text-white font-semibold text-xs shadow-lg shadow-cyan-500/20 hover:scale-105 transition"
              >
                {t('btnSend')} <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Tab Content 3: Type a Goal */}
        {activeTab === 'goal' && (
          <div className="space-y-4">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={t('inputPlaceholder')}
              className="w-full rounded-2xl bg-slate-900/60 border border-slate-700/80 p-4 text-sm text-slate-100 focus:outline-none focus:border-cyan-400 placeholder:text-slate-500"
            />
            <div className="flex justify-end">
              <button
                onClick={() => handleStartAnalysis(inputText || 'Engineering Scholarship Category 3A')}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 text-white font-semibold text-xs shadow-lg shadow-cyan-500/20 hover:scale-105 transition"
              >
                {t('btnFindScholarships')} <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Tab Content 4: Browse Categories */}
        {activeTab === 'category' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { title: language === 'kn' ? 'ಪೋಸ್ಟ್-ಮೆಟ್ರಿಕ್ ವಿದ್ಯಾರ್ಥಿವೇತನಗಳು' : language === 'hi' ? 'पोस्ट-मैट्रिक छात्रवृत्ति' : 'Post-Matric Scholarships', desc: language === 'kn' ? '100% ಕಾಲೇಜು ಶುಲ್ಕ ಮರುಪಾವತಿ' : language === 'hi' ? '100% शुल्क वापसी' : '100% tuition reimbursement for higher education', query: 'Post-Matric Scholarship' },
              { title: language === 'kn' ? 'ಆದಾಯ ಪ್ರಮಾಣಪತ್ರಗಳು' : language === 'hi' ? 'आय प्रमाण पत्र' : 'Income & Revenue Certificates', desc: language === 'kn' ? 'ತಹಶೀಲ್ದಾರ್ ಕಂದಾಯ ಫಾರ್ಮ್ 7 ಸತ್ಯಾಪನೆ' : language === 'hi' ? 'तहसीलदार राजस्व फॉर्म सत्यापन' : 'Tahsil Revenue Form 7 & RD verification', query: 'Income Certificate' },
              { title: language === 'kn' ? 'ಹಾಸ್ಟೆಲ್ ಮತ್ತು ವಸತಿ ಅನುದಾನ' : language === 'hi' ? 'छात्रावास और आवास अनुदान' : 'Hostel & Housing Grants', desc: language === 'kn' ? 'ವಿದ್ಯಾಸಿರಿ ಬಾಡಿಗೆ ಭತ್ಯೆ' : language === 'hi' ? 'विद्यासिरी किराया भत्ता' : 'Vidyasiri rent allowance & free residence', query: 'Hostel Grant' },
              { title: language === 'kn' ? 'ವಿಕಲಚೇತನರ ನೆರವು ಯೋಜನೆಗಳು' : language === 'hi' ? 'दिव्यांग सहायता योजनाएं' : 'Disability Support Schemes', desc: language === 'kn' ? 'ಸಹಾಯಕರ ತಂತ್ರಜ್ಞಾನ ಮತ್ತು ಪಿಂಚಣಿ' : language === 'hi' ? 'सहायक तकनीक और पेंशन' : 'Assistive tech & pension allowance', query: 'Disability Support' },
            ].map((cat, idx) => (
              <div
                key={idx}
                onClick={() => handleDemoPreset(cat.query, '/recommendations')}
                className="p-4 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-cyan-500/50 hover:bg-slate-800/60 cursor-pointer transition flex items-center justify-between group"
              >
                <div>
                  <h4 className="text-xs font-bold text-slate-200 group-hover:text-cyan-300">{cat.title}</h4>
                  <p className="text-[11px] text-slate-400">{cat.desc}</p>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-1 transition" />
              </div>
            ))}
          </div>
        )}

      </motion.div>

      {/* Feature Highlights Grid */}
      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <div className="glass-panel p-6 rounded-2xl border border-slate-800/80 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
            <Zap className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-slate-100">{t('feat1Title')}</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            {t('feat1Desc')}
          </p>
        </div>

        <div className="glass-panel p-6 rounded-2xl border border-slate-800/80 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <Globe className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-slate-100">{t('feat2Title')}</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            {t('feat2Desc')}
          </p>
        </div>

        <div className="glass-panel p-6 rounded-2xl border border-slate-800/80 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-slate-100">{t('feat3Title')}</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            {t('feat3Desc')}
          </p>
        </div>

      </div>

      {/* Footer Quote Banner */}
      <p className="text-[11px] text-center text-slate-400/90 font-medium tracking-wide pt-8">
        {t('bridgingQuote')}
      </p>

    </div>
  );
};
