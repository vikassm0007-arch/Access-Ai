import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Play, X, ArrowRight, ShieldCheck, Compass, Eye, Zap, LayoutDashboard } from 'lucide-react';

interface CinematicIntroProps {
  onComplete?: () => void;
}

export const CinematicIntro: React.FC<CinematicIntroProps> = ({ onComplete }) => {
  const [phase, setPhase] = useState<'macro' | 'lightBurst' | 'morph' | 'isometric' | 'complete'>('macro');
  const [isPlaying, setIsPlaying] = useState<boolean>(true);

  useEffect(() => {
    if (!isPlaying) return;

    // Timeline Sequence
    const timer1 = setTimeout(() => setPhase('lightBurst'), 1800);
    const timer2 = setTimeout(() => setPhase('morph'), 3200);
    const timer3 = setTimeout(() => setPhase('isometric'), 4800);
    const timer4 = setTimeout(() => {
      setPhase('complete');
      setIsPlaying(false);
      if (onComplete) onComplete();
    }, 6500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, [isPlaying, onComplete]);

  const handleSkip = () => {
    setIsPlaying(false);
    setPhase('complete');
    if (onComplete) onComplete();
  };

  const handleReplay = () => {
    setPhase('macro');
    setIsPlaying(true);
  };

  if (phase === 'complete' && !isPlaying) {
    return (
      <button
        onClick={handleReplay}
        className="fixed bottom-6 right-6 z-50 px-4 py-2.5 rounded-full bg-slate-900/90 border border-cyan-500/40 text-cyan-300 text-xs font-bold shadow-2xl hover:bg-slate-800 hover:border-cyan-400 hover:scale-105 transition-all flex items-center gap-2 backdrop-blur-xl group"
        title="Replay Cinematic 3D Kinetic Intro"
      >
        <Play className="w-3.5 h-3.5 text-cyan-400 group-hover:animate-pulse" />
        <span>🎬 Replay 3D Intro</span>
      </button>
    );
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-0 z-[99999] bg-[#05070D] overflow-hidden flex items-center justify-center select-none"
      >
        {/* Ambient Volumetric Ray Light Background */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Volumetric Cyan Beam */}
          <motion.div
            animate={{
              opacity: phase === 'lightBurst' ? 0.9 : 0.4,
              scale: phase === 'lightBurst' ? 1.6 : 1,
              rotate: [0, 15, -10, 0],
            }}
            transition={{ duration: 3, ease: 'easeInOut' }}
            className="absolute -top-1/4 -left-1/4 w-[800px] h-[800px] rounded-full bg-gradient-to-br from-[#00F0FF]/30 via-cyan-500/10 to-transparent blur-[120px]"
          />
          {/* Volumetric Violet Beam */}
          <motion.div
            animate={{
              opacity: phase === 'lightBurst' ? 0.9 : 0.4,
              scale: phase === 'lightBurst' ? 1.6 : 1,
              rotate: [0, -15, 10, 0],
            }}
            transition={{ duration: 3, ease: 'easeInOut' }}
            className="absolute -bottom-1/4 -right-1/4 w-[800px] h-[800px] rounded-full bg-gradient-to-tl from-[#7B2CBF]/40 via-purple-600/10 to-transparent blur-[130px]"
          />
          {/* Subdued Matte Obsidian Grid Floor */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
        </div>

        {/* Top Controls: Skip Button */}
        <div className="absolute top-6 right-6 z-50 flex items-center gap-3">
          <button
            onClick={handleSkip}
            className="px-4 py-2 rounded-full bg-slate-900/80 border border-slate-700/80 text-slate-300 hover:text-white hover:border-cyan-400 text-xs font-semibold backdrop-blur-md transition flex items-center gap-1.5"
          >
            <span>Skip Intro</span>
            <X className="w-3.5 h-3.5 text-slate-400" />
          </button>
        </div>

        {/* 3D Perspective Scene Canvas Container */}
        <motion.div
          animate={{
            perspective: 1200,
            rotateX: phase === 'isometric' ? 18 : phase === 'morph' ? 8 : 0,
            rotateY: phase === 'isometric' ? -12 : phase === 'morph' ? -4 : 0,
            scale: phase === 'isometric' ? 0.85 : phase === 'morph' ? 0.95 : 1.1,
          }}
          transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-6xl mx-auto px-4 h-[600px] flex items-center justify-center transform-gpu"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Phase 1 & 2: Macro Glass Typography "Welcome to AccessAI" */}
          <AnimatePresence>
            {(phase === 'macro' || phase === 'lightBurst') && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8, z: -100 }}
                animate={{ opacity: 1, scale: 1, z: 0 }}
                exit={{ opacity: 0, scale: 1.3, z: 200 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="text-center space-y-6 transform-gpu"
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Volumetric Frosted Glass Badge */}
                <motion.div
                  animate={{
                    boxShadow:
                      phase === 'lightBurst'
                        ? '0 0 60px rgba(0,240,255,0.6), inset 0 0 30px rgba(123,44,191,0.5)'
                        : '0 0 30px rgba(0,240,255,0.2)',
                  }}
                  className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-slate-900/40 border border-cyan-400/40 backdrop-blur-2xl text-cyan-300 text-xs font-mono uppercase tracking-widest"
                >
                  <Sparkles className="w-4 h-4 text-[#00F0FF] animate-spin" style={{ animationDuration: '3s' }} />
                  <span>Next-Gen Accessibility Engine 2026</span>
                </motion.div>

                {/* 3D Glass Letterforms */}
                <div className="relative flex items-center justify-center gap-2 sm:gap-4 flex-wrap">
                  {/* "Welcome to" */}
                  <span className="text-3xl sm:text-5xl lg:text-6xl font-light text-slate-300 tracking-tight opacity-90 drop-shadow-2xl">
                    Welcome to
                  </span>

                  {/* "AccessAI" Glass Letters with Chromatic Dispersion */}
                  <motion.div
                    animate={{
                      textShadow:
                        phase === 'lightBurst'
                          ? '0 0 40px #00F0FF, 0 0 80px #7B2CBF'
                          : '0 0 20px rgba(0,240,255,0.5)',
                    }}
                    className="relative text-5xl sm:text-7xl lg:text-8xl font-black tracking-tighter bg-gradient-to-r from-[#00F0FF] via-white to-[#7B2CBF] bg-clip-text text-transparent px-4 py-2 rounded-3xl border border-cyan-400/30 backdrop-blur-3xl bg-slate-900/30 shadow-2xl"
                  >
                    Access<span className="text-white">AI</span>

                    {/* Volumetric Ray Sheen Overlay */}
                    <motion.div
                      animate={{
                        x: ['-100%', '200%'],
                      }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12 pointer-events-none"
                    />
                  </motion.div>
                </div>

                <p className="text-sm sm:text-base text-slate-400 max-w-lg mx-auto font-medium">
                  Initializing kinetic layout morphing & neural accessibility synthesis...
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Phase 3 & 4: Kinetic Morph & Unfolding 3D Dashboard Grid */}
          {(phase === 'morph' || phase === 'isometric') && (
            <motion.div
              initial={{ opacity: 0, scale: 0.7, rotateX: 20 }}
              animate={{ opacity: 1, scale: 1, rotateX: 0 }}
              transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
              className="w-full grid grid-cols-12 gap-4 sm:gap-6 transform-gpu"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Left Column ("Access" Morphs into Navigation Sidebar) */}
              <motion.div
                initial={{ x: -200, opacity: 0, scale: 0.8 }}
                animate={{ x: 0, opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="col-span-12 md:col-span-3 glass-panel p-5 rounded-3xl border border-cyan-500/40 bg-slate-900/80 backdrop-blur-2xl shadow-2xl space-y-4"
                style={{ transform: 'translateZ(40px)' }}
              >
                <div className="flex items-center gap-2 pb-3 border-b border-slate-800">
                  <div className="w-8 h-8 rounded-xl bg-cyan-500/20 border border-cyan-400/50 flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-cyan-400" />
                  </div>
                  <div>
                    <span className="font-extrabold text-sm text-white">ACCESS<span className="text-cyan-400">NAV</span></span>
                    <p className="text-[10px] text-cyan-300">Morphed from "Access"</p>
                  </div>
                </div>

                <div className="space-y-2">
                  {[
                    { label: 'Home Canvas', icon: Compass, active: true },
                    { label: 'AI Workspace', icon: Sparkles, active: false },
                    { label: 'Analyzer OCR', icon: Eye, active: false },
                    { label: 'Form Matches', icon: Zap, active: false },
                  ].map((item, idx) => {
                    const Icon = item.icon;
                    return (
                      <div
                        key={idx}
                        className={`flex items-center gap-3 p-2.5 rounded-xl text-xs font-semibold ${
                          item.active
                            ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                            : 'text-slate-400 bg-slate-800/40'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        <span>{item.label}</span>
                      </div>
                    );
                  })}
                </div>
              </motion.div>

              {/* Middle & Right Columns (Fractured Glass UI Cards & Data Nodes) */}
              <div className="col-span-12 md:col-span-9 space-y-4">
                
                {/* Top Banner ("AI" Morphs into Glowing Floating Assistant Widget) */}
                <motion.div
                  initial={{ y: -100, opacity: 0, scale: 0.9 }}
                  animate={{ y: 0, opacity: 1, scale: 1 }}
                  transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  className="p-5 rounded-3xl bg-gradient-to-r from-cyan-950/80 via-purple-950/80 to-slate-900 border border-cyan-400/40 backdrop-blur-2xl flex items-center justify-between shadow-2xl"
                  style={{ transform: 'translateZ(60px)' }}
                >
                  <div className="flex items-center gap-3">
                    {/* Glowing Pulsing AI Widget Orb */}
                    <div className="relative w-12 h-12 rounded-2xl bg-gradient-to-br from-[#00F0FF] to-[#7B2CBF] p-0.5 shadow-lg shadow-cyan-500/50 animate-pulse">
                      <div className="w-full h-full bg-[#05070D] rounded-[14px] flex items-center justify-center">
                        <Sparkles className="w-6 h-6 text-[#00F0FF]" />
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-extrabold text-white">AI Multilingual Assistant Widget</h4>
                      <p className="text-xs text-slate-300">Morphed from "AI" • Trilingual Kannada, Hindi & English Engine Active</p>
                    </div>
                  </div>

                  <span className="px-3 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-semibold hidden sm:inline">
                    60 FPS Dynamic Grid
                  </span>
                </motion.div>

                {/* Bottom 2 Glass Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <motion.div
                    initial={{ y: 150, opacity: 0, scale: 0.8 }}
                    animate={{ y: 0, opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="glass-panel p-5 rounded-3xl border border-slate-800/80 bg-slate-900/70 backdrop-blur-xl space-y-2 shadow-xl"
                    style={{ transform: 'translateZ(30px)' }}
                  >
                    <div className="flex items-center justify-between text-xs font-bold text-slate-400">
                      <span>DOCUMENT ANALYZER NODE</span>
                      <Eye className="w-4 h-4 text-cyan-400" />
                    </div>
                    <p className="text-lg font-black text-white">98.4% Accuracy</p>
                    <p className="text-xs text-slate-400">Instant OCR & legal jargon simplification.</p>
                  </motion.div>

                  <motion.div
                    initial={{ y: 150, opacity: 0, scale: 0.8 }}
                    animate={{ y: 0, opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="glass-panel p-5 rounded-3xl border border-slate-800/80 bg-slate-900/70 backdrop-blur-xl space-y-2 shadow-xl"
                    style={{ transform: 'translateZ(30px)' }}
                  >
                    <div className="flex items-center justify-between text-xs font-bold text-slate-400">
                      <span>SCHOLARSHIP MATCH ENGINE</span>
                      <Zap className="w-4 h-4 text-emerald-400" />
                    </div>
                    <p className="text-lg font-black text-white">3 Eligible Matches</p>
                    <p className="text-xs text-slate-400">Auto-fills state portal applications.</p>
                  </motion.div>
                </div>

              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Bottom Progress Bar */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-64 h-1.5 bg-slate-900 rounded-full overflow-hidden border border-slate-800/80">
          <motion.div
            initial={{ width: '0%' }}
            animate={{
              width:
                phase === 'macro'
                  ? '25%'
                  : phase === 'lightBurst'
                  ? '55%'
                  : phase === 'morph'
                  ? '85%'
                  : '100%',
            }}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
            className="h-full bg-gradient-to-r from-[#00F0FF] via-emerald-400 to-[#7B2CBF]"
          />
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
