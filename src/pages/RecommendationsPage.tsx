import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, CheckCircle2, ChevronDown, ChevronUp, Sparkles, Clock, ShieldCheck, ArrowRight, Check, AlertCircle } from 'lucide-react';
import { getRecommendations } from '@/lib/ai';
import { RecommendationMatch } from '@/types/accessai';
import { useBackgroundState } from '@/context/BackgroundStateContext';
import { useAccessibility } from '@/context/AccessibilityContext';

export const RecommendationsPage: React.FC = () => {
  const location = useLocation();
  const { setAIState } = useBackgroundState();
  const { speak, language, t } = useAccessibility();
  const [loading, setLoading] = useState(true);
  const [matches, setMatches] = useState<RecommendationMatch[]>([]);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [activeStep, setActiveStep] = useState<number>(1);
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const [formData, setFormData] = useState<Record<string, any>>({
    full_name: 'Vikas S. Mirji',
    usn_number: '1VA22CS092',
    income_rd: 'RD003849204812',
    aadhaar_linked_bank: 'State Bank of India',
    account_number: '39482710492',
  });

  const queryText = location.state?.query || 'Post-Matric Engineering Scholarship';
  const autoOpen = location.state?.autoOpenFirst || false;

  useEffect(() => {
    let isMounted = true;
    setAIState('processing');
    setLoading(true);

    getRecommendations(queryText).then((res) => {
      if (isMounted) {
        setMatches(res);
        setLoading(false);
        setAIState('idle');
        if (res.length > 0 && (autoOpen || res[0].matchPercentage > 90)) {
          setExpandedId(res[0].id);
        }
      }
    });

    return () => {
      isMounted = false;
    };
  }, [queryText, setAIState, autoOpen]);

  const handleFieldChange = (fieldId: string, val: any) => {
    setFormData((prev) => ({ ...prev, [fieldId]: val }));
  };

  const handleNextStep = (maxSteps: number) => {
    if (activeStep < maxSteps) {
      const nextNum = activeStep + 1;
      setActiveStep(nextNum);
      const stepText = language === 'kn' ? `ಹಂತ ${nextNum}` : language === 'hi' ? `चरण ${nextNum}` : `Step ${nextNum} of ${maxSteps}`;
      speak(stepText, language);
    } else {
      setAIState('processing');
      const submitText = language === 'kn' ? 'ಅರ್ಜಿಯನ್ನು ರಾಜ್ಯ ಪೋರ್ಟಲ್‌ಗೆ ಯಶಸ್ವಿಯಾಗಿ ಸಲ್ಲಿಸಲಾಗಿದೆ' : language === 'hi' ? 'आवेदन राज्य पोर्टल पर सफलतापूर्वक प्रस्तुत किया गया' : 'Application submitted successfully to state portal';
      speak(submitText, language);
      setTimeout(() => {
        setFormSubmitted(true);
        setAIState('idle');
      }, 1000);
    }
  };

  return (
    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400 mb-1">
            <Zap className="w-4 h-4" /> AI Dynamic Match Engine & Form Synthesizer
          </div>
          <h1 className="text-3xl font-extrabold text-white">{t('recommendationsTitle')}</h1>
          <p className="text-xs text-slate-400 mt-1">{t('recommendationsSubtitle')}</p>
        </div>

        <span className="px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold self-start sm:self-auto">
          3 Ranked Matches Found
        </span>
      </div>

      {loading ? (
        <div className="glass-panel p-12 rounded-3xl text-center space-y-4 max-w-xl mx-auto">
          <Sparkles className="w-10 h-10 text-cyan-400 animate-spin mx-auto" />
          <h3 className="text-base font-bold text-white">{t('aiProcessing')}</h3>
          <p className="text-xs text-slate-400">Synthesizing field validation rules from state database schemas.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {matches.map((match) => {
            const isExpanded = expandedId === match.id;
            return (
              <motion.div
                key={match.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className={`glass-panel rounded-3xl border transition overflow-hidden ${
                  isExpanded ? 'border-cyan-500/50 shadow-2xl shadow-cyan-500/10' : 'border-slate-800/80 hover:border-slate-700'
                }`}
              >
                {/* Match Header Bar */}
                <div
                  onClick={() => setExpandedId(isExpanded ? null : match.id)}
                  className="p-6 cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-4 select-none hover:bg-slate-800/30 transition"
                >
                  <div className="space-y-2 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                        {match.category}
                      </span>
                      <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
                        Difficulty: {match.difficulty}
                      </span>
                      <span className="text-[11px] font-semibold text-slate-400 flex items-center gap-1">
                        <Clock className="w-3 h-3 text-cyan-400" /> {match.estimatedTime}
                      </span>
                    </div>

                    <h3 className="text-lg sm:text-xl font-extrabold text-white">{match.title}</h3>
                    <p className="text-xs text-slate-300 leading-relaxed max-w-3xl">{match.description}</p>
                  </div>

                  {/* Animated Match Percentage Badge */}
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="flex items-center gap-1.5 justify-end">
                        <span className="text-2xl font-black bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
                          {match.matchPercentage}%
                        </span>
                        <span className="text-xs font-bold text-cyan-400">{t('matchScore')}</span>
                      </div>

                      {/* Animated Progress Bar */}
                      <div className="w-32 h-2 bg-slate-900 rounded-full overflow-hidden mt-1 border border-slate-800">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${match.matchPercentage}%` }}
                          transition={{ duration: 1, ease: 'easeOut' }}
                          className="h-full bg-gradient-to-r from-cyan-500 to-emerald-500 rounded-full"
                        />
                      </div>
                    </div>

                    <button className="p-2 rounded-xl bg-slate-800/80 border border-slate-700 text-slate-300 hover:text-white">
                      {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {/* Expandable Form & Scheme Details Section */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="border-t border-slate-800/80 bg-slate-950/60 p-6 sm:p-8 space-y-6"
                    >
                      {/* Benefit Banner */}
                      <div className="p-4 rounded-2xl bg-gradient-to-r from-cyan-950/60 via-slate-900 to-slate-900 border border-cyan-500/30 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                        <div>
                          <p className="text-[11px] text-cyan-400 font-bold uppercase tracking-wider">Financial Benefit</p>
                          <p className="text-sm font-extrabold text-white mt-0.5">{match.benefitAmount}</p>
                        </div>
                        <div>
                          <p className="text-[11px] text-slate-400 font-medium">Application Deadline</p>
                          <p className="text-xs font-bold text-slate-200">{match.deadline}</p>
                        </div>
                      </div>

                      {/* AI Generated Step-by-Step Form Container */}
                      <div className="glass-panel rounded-3xl p-6 border border-slate-800/80 space-y-6">
                        
                        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                          <h4 className="text-sm font-bold text-white flex items-center gap-2">
                            <Sparkles className="w-4 h-4 text-cyan-400" /> AI Generated Step Form
                          </h4>
                          
                          {/* Step Progress Pill */}
                          <div className="flex items-center gap-2">
                            {match.formSchema.steps.map((step) => (
                              <div
                                key={step.stepNumber}
                                className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold transition ${
                                  activeStep === step.stepNumber
                                    ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/30'
                                    : activeStep > step.stepNumber
                                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                                    : 'bg-slate-800 text-slate-500'
                                }`}
                              >
                                {activeStep > step.stepNumber ? <Check className="w-4 h-4" /> : step.stepNumber}
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Form Submission Success State */}
                        {formSubmitted ? (
                          <div className="p-8 text-center space-y-4 max-w-md mx-auto">
                            <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center mx-auto text-emerald-400">
                              <CheckCircle2 className="w-8 h-8" />
                            </div>
                            <h4 className="text-lg font-bold text-white">Application Submitted to State Portal!</h4>
                            <p className="text-xs text-slate-300">
                              Reference ID: <span className="font-mono text-cyan-400 font-bold">SSP-2026-948201</span>. Confirmation SMS sent to Aadhaar registered mobile.
                            </p>
                            <button
                              onClick={() => setFormSubmitted(false)}
                              className="px-4 py-2 rounded-xl bg-slate-800 text-xs font-semibold text-slate-300 hover:bg-slate-700"
                            >
                              Edit / Resubmit
                            </button>
                          </div>
                        ) : (
                          /* Active Step Input Fields */
                          <div className="space-y-4">
                            {match.formSchema.steps
                              .filter((s) => s.stepNumber === activeStep)
                              .map((step) => (
                                <div key={step.stepNumber} className="space-y-4">
                                  <h5 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                                    Step {step.stepNumber}: {step.stepTitle}
                                  </h5>

                                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {step.fields.map((f) => (
                                      <div key={f.id} className="space-y-1.5">
                                        <label className="text-xs font-semibold text-slate-300 flex items-center justify-between">
                                          <span>{f.label} {f.required && <span className="text-red-400">*</span>}</span>
                                          {formData[f.id] && <span className="text-[10px] text-emerald-400 font-mono">Pre-filled</span>}
                                        </label>

                                        <input
                                          type={f.type === 'number' ? 'number' : 'text'}
                                          value={formData[f.id] || ''}
                                          onChange={(e) => handleFieldChange(f.id, e.target.value)}
                                          placeholder={f.placeholder}
                                          className="w-full rounded-xl bg-slate-900 border border-slate-800 p-3 text-xs text-slate-100 focus:outline-none focus:border-cyan-400 placeholder:text-slate-600"
                                        />

                                        {f.helpText && <p className="text-[10px] text-slate-400">{f.helpText}</p>}
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              ))}

                            {/* Form Navigation Buttons */}
                            <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                              <button
                                disabled={activeStep === 1}
                                onClick={() => setActiveStep((prev) => Math.max(1, prev - 1))}
                                className="px-4 py-2 rounded-xl bg-slate-800 text-xs font-semibold text-slate-300 disabled:opacity-40 hover:bg-slate-700 transition"
                              >
                                Previous Step
                              </button>

                              <button
                                onClick={() => handleNextStep(match.formSchema.steps.length)}
                                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 text-white font-bold text-xs shadow-md shadow-cyan-500/20 hover:scale-105 transition flex items-center gap-1.5"
                              >
                                {activeStep === match.formSchema.steps.length ? 'Submit Application' : 'Next Step'} <ArrowRight className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        )}

                      </div>

                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      )}

    </div>
  );
};
