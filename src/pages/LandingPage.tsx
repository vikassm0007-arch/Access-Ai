import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, Upload, FileText, Target, Grid, ArrowRight, CheckCircle2, ShieldCheck, Zap, Volume2, Globe } from 'lucide-react';
import { useBackgroundState } from '@/context/BackgroundStateContext';
import { useAccessibility } from '@/context/AccessibilityContext';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const { setAIState } = useBackgroundState();
  const { speak, language } = useAccessibility();
  const [activeTab, setActiveTab] = useState<'upload' | 'paste' | 'goal' | 'category'>('upload');
  const [inputText, setInputText] = useState('');
  const [dragActive, setDragActive] = useState(false);

  const handleDemoPreset = (presetText: string, targetPath: string) => {
    setAIState('processing');
    speak(`Analyzing request: ${presetText}`, language);
    setTimeout(() => {
      setAIState('idle');
      navigate(targetPath, { state: { query: presetText } });
    }, 600);
  };

  const handleStartAnalysis = (queryText?: string) => {
    const textToSubmit = queryText || inputText || 'Post-Matric Scholarship Application for Engineering Students';
    setAIState('processing');
    speak('Analyzing document and adapting interface', language);
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
          <span>ACCESSAI — Frontend Development using AI 2026</span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight"
        >
          Stop filling complex forms.{' '}
          <span className="bg-gradient-to-r from-cyan-400 via-emerald-400 to-blue-500 bg-clip-text text-transparent">
            Let AI adapt the interface to you.
          </span>
        </motion.h1>

        {/* 10-Second Judge Pitch Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto"
        >
          Upload any confusing government form, paste dense legal text, or state your goal. ACCESSAI parses intent, simplifies legal jargon, and dynamically generates step-by-step forms in your language.
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
            <Upload className="w-4 h-4" /> Upload Document
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
            <Target className="w-4 h-4" /> Type a Goal
          </button>

          <button
            onClick={() => setActiveTab('category')}
            className={`flex items-center justify-center gap-2 p-3 rounded-2xl text-xs font-semibold transition ${
              activeTab === 'category'
                ? 'bg-gradient-to-r from-cyan-500 to-emerald-500 text-white shadow-lg shadow-cyan-500/25'
                : 'bg-slate-800/50 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            <Grid className="w-4 h-4" /> Browse Categories
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
            <h3 className="text-base font-bold text-white mb-1">Drag & drop your PDF or image form here</h3>
            <p className="text-xs text-slate-400 mb-4">Supports PDF, PNG, JPG scans up to 15MB</p>
            <button
              onClick={(e) => { e.stopPropagation(); handleStartAnalysis('SSP Post-Matric Scholarship Form'); }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 text-white font-semibold text-xs shadow-lg shadow-cyan-500/20 hover:scale-105 transition"
            >
              Select File to Analyze <ArrowRight className="w-4 h-4" />
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
              placeholder="Paste dense legal guidelines, eligibility terms, or form instructions here..."
              className="w-full rounded-2xl bg-slate-900/60 border border-slate-700/80 p-4 text-sm text-slate-100 focus:outline-none focus:border-cyan-400 placeholder:text-slate-500"
            />
            <div className="flex justify-end">
              <button
                onClick={() => handleStartAnalysis()}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 text-white font-semibold text-xs shadow-lg shadow-cyan-500/20 hover:scale-105 transition"
              >
                Analyze & Simplify Text <ArrowRight className="w-4 h-4" />
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
              placeholder="e.g. 'I want to apply for engineering scholarship for Category 3A'"
              className="w-full rounded-2xl bg-slate-900/60 border border-slate-700/80 p-4 text-sm text-slate-100 focus:outline-none focus:border-cyan-400 placeholder:text-slate-500"
            />
            <div className="flex justify-end">
              <button
                onClick={() => handleStartAnalysis(inputText || 'Engineering Scholarship Category 3A')}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 text-white font-semibold text-xs shadow-lg shadow-cyan-500/20 hover:scale-105 transition"
              >
                Find & Build Adaptive Form <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Tab Content 4: Browse Categories */}
        {activeTab === 'category' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { title: 'Post-Matric Scholarships', desc: '100% tuition reimbursement for higher education', query: 'Post-Matric Scholarship' },
              { title: 'Income & Revenue Certificates', desc: 'Tahsil Revenue Form 7 & RD verification', query: 'Income Certificate' },
              { title: 'Hostel & Housing Grants', desc: 'Vidyasiri rent allowance & free residence', query: 'Hostel Grant' },
              { title: 'Disability Support Schemes', desc: 'Assistive tech & pension allowance', query: 'Disability Support' },
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

      {/* 1-Click Judge Demo Preset Buttons */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mt-8 text-center max-w-2xl mx-auto"
      >
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Quick Judging Demo Triggers</p>
        <div className="flex flex-wrap items-center justify-center gap-2">
          <button
            onClick={() => handleDemoPreset('Karnataka SSP Post-Matric Scholarship Application', '/analyze')}
            className="px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-cyan-500/30 text-cyan-300 text-xs font-medium hover:border-cyan-400 hover:bg-slate-800 transition shadow-sm"
          >
            ⚡ Test Document Analyzer (SSP Form)
          </button>

          <button
            onClick={() => handleDemoPreset('Engineering Student Higher Education Scholarship', '/recommendations')}
            className="px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-emerald-500/30 text-emerald-300 text-xs font-medium hover:border-emerald-400 hover:bg-slate-800 transition shadow-sm"
          >
            ⚡ Test Adaptive Recommendation Engine
          </button>

          <button
            onClick={() => navigate('/accessibility')}
            className="px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-purple-500/30 text-purple-300 text-xs font-medium hover:border-purple-400 hover:bg-slate-800 transition shadow-sm"
          >
            ⚡ Test Accessibility & Voice Controls
          </button>
        </div>
      </motion.div>

      {/* Feature Highlights Grid */}
      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <div className="glass-panel p-6 rounded-2xl border border-slate-800/80 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
            <Zap className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-slate-100">Dynamic UI Generation</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Instead of standard text chat, AI synthesizes tailored step-by-step form UIs with field validations directly from raw documents.
          </p>
        </div>

        <div className="glass-panel p-6 rounded-2xl border border-slate-800/80 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <Globe className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-slate-100">Trilingual Legal Simplifier</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Transforms dense jargon into plain language across English, Kannada (ಕನ್ನಡ), and Hindi (हिंदी) with browser Web Speech voice output.
          </p>
        </div>

        <div className="glass-panel p-6 rounded-2xl border border-slate-800/80 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-slate-100">WCAG AAA Accessibility</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Instant high-contrast theme, responsive font scale, reduced-motion controls, and zero decorative distraction when needed.
          </p>
        </div>

      </div>

    </div>
  );
};
