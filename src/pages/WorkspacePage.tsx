import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, CheckCircle, AlertTriangle, FileText, Clock, BarChart3, ArrowRight, ShieldCheck, HelpCircle } from 'lucide-react';
import { analyzeDocumentOrInput } from '@/lib/ai';
import { DocumentAnalysisResult } from '@/types/accessai';
import { useBackgroundState } from '@/context/BackgroundStateContext';
import { useAccessibility } from '@/context/AccessibilityContext';

export const WorkspacePage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { setAIState } = useBackgroundState();
  const { speak, language, t } = useAccessibility();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<DocumentAnalysisResult | null>(null);

  const queryParam = location.state?.query || 'State Scholarship Portal (SSP) Application 2026';

  useEffect(() => {
    let isMounted = true;
    setAIState('processing');
    setLoading(true);

    analyzeDocumentOrInput(queryParam).then((res) => {
      if (isMounted) {
        setData(res);
        setLoading(false);
        setAIState('idle');
      }
    });

    return () => {
      isMounted = false;
    };
  }, [queryParam, setAIState]);

  if (loading) {
    return (
      <div className="relative z-10 max-w-4xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center mx-auto text-cyan-400 animate-bounce">
          <Sparkles className="w-8 h-8 animate-spin" style={{ animationDuration: '3s' }} />
        </div>
        <h2 className="text-xl font-bold text-slate-100">{t('aiProcessing')}</h2>
        <p className="text-xs text-slate-400">Parsing document schemas, missing field requirements, and issuing authority verification.</p>
        
        <div className="max-w-md mx-auto h-2 bg-slate-800 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-cyan-500 to-emerald-500 animate-pulse w-3/4" />
        </div>
      </div>
    );
  }

  if (!data) return null;

  const currentSummary = data.plainLanguageExplanation[language] || data.summary;

  return (
    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Workspace Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 glass-panel p-6 rounded-3xl border border-slate-800/80">
        <div>
          <div className="flex items-center gap-2 text-xs text-cyan-400 font-semibold mb-1">
            <Sparkles className="w-4 h-4" /> {t('workspaceTitle')}
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">{data.documentType}</h1>
          <p className="text-xs text-slate-400 mt-1">Issued by: <span className="text-slate-200 font-medium">{data.issuingAuthority}</span></p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <span className="px-3 py-1.5 rounded-full bg-slate-800 border border-slate-700 text-xs font-semibold text-slate-300 flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-cyan-400" /> ~{data.estimatedMinutes} Mins
          </span>
          <span className="px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-xs font-semibold text-emerald-400 flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5" /> {(data.confidenceScore * 100).toFixed(0)}% AI Confidence
          </span>
          <button
            onClick={() => {
              speak(currentSummary, language);
            }}
            className="px-3.5 py-1.5 rounded-full bg-gradient-to-r from-cyan-500 to-emerald-500 text-white text-xs font-semibold hover:opacity-90 transition shadow-md shadow-cyan-500/20"
          >
            🔊 {t('btnRead')} ({language.toUpperCase()})
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left 2 Columns: AI Summary & Field Verification Matrix */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* AI Plain Language Summary Box */}
          <div className="glass-panel p-6 rounded-3xl border border-cyan-500/30 space-y-3 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-cyan-300">{t('plainExplanation')} ({language.toUpperCase()})</h3>
            <p className="text-sm text-slate-200 leading-relaxed font-medium">
              {currentSummary}
            </p>
          </div>

          {/* Extracted Fields Table/Cards */}
          <div className="glass-panel p-6 rounded-3xl border border-slate-800/80 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                <FileText className="w-4 h-4 text-cyan-400" /> {t('fieldBreakdown')}
              </h3>
              <span className="text-xs text-slate-400">{data.extractedFields.length} Fields</span>
            </div>

            <div className="space-y-2.5">
              {data.extractedFields.map((field, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-slate-700 transition text-xs"
                >
                  <div>
                    <p className="text-slate-400 font-medium">{field.label}</p>
                    <p className="text-slate-100 font-semibold text-sm mt-0.5">{field.value}</p>
                  </div>
                  <div>
                    {field.status === 'verified' && (
                      <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[11px] font-semibold flex items-center gap-1">
                        <CheckCircle className="w-3 h-3" /> Verified
                      </span>
                    )}
                    {field.status === 'flagged' && (
                      <span className="px-2.5 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 text-[11px] font-semibold flex items-center gap-1">
                        <AlertTriangle className="w-3 h-3" /> Action Needed
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action Trigger Banner */}
          <div className="p-6 rounded-3xl bg-gradient-to-r from-cyan-900/40 via-emerald-900/40 to-slate-900 border border-cyan-500/40 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="text-sm font-bold text-white">Ready to complete this application?</h4>
              <p className="text-xs text-slate-300 mt-1">AI has prepared an adaptive form pre-filled with verified fields.</p>
            </div>
            <button
              onClick={() => navigate('/recommendations', { state: { autoOpenFirst: true } })}
              className="px-5 py-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-emerald-500 text-white font-bold text-xs shadow-lg shadow-cyan-500/25 hover:scale-105 transition flex items-center gap-2 whitespace-nowrap"
            >
              {t('btnFillForm')} <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>

        {/* Right Column: Required Documents & Missing Fields Panel */}
        <div className="space-y-6">
          
          {/* Missing Fields Alert Card */}
          {data.missingFields.length > 0 && (
            <div className="glass-panel p-6 rounded-3xl border border-yellow-500/40 bg-yellow-500/5 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-yellow-400 uppercase tracking-wider">
                <AlertTriangle className="w-4 h-4" /> Missing Required Fields
              </div>
              <p className="text-xs text-slate-300">The following information was not detected in the uploaded form:</p>
              <ul className="space-y-2">
                {data.missingFields.map((field, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-xs font-semibold text-slate-200 bg-slate-900/80 p-2.5 rounded-xl border border-slate-800">
                    <span className="w-1.5 h-1.5 rounded-full bg-yellow-400" /> {field}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Required Supporting Documents Checklist */}
          <div className="glass-panel p-6 rounded-3xl border border-slate-800/80 space-y-4">
            <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-400" /> {t('requiredDocs')}
            </h3>
            <div className="space-y-2.5 text-xs">
              {data.requiredDocuments.map((doc, i) => (
                <div key={i} className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between text-slate-300">
                  <span className="font-medium">{doc}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">Required</span>
                </div>
              ))}
            </div>
          </div>

          {/* Important Deadlines Card */}
          <div className="glass-panel p-6 rounded-3xl border border-slate-800/80 space-y-4">
            <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
              <Clock className="w-4 h-4 text-cyan-400" /> Key Deadlines
            </h3>
            <div className="space-y-2.5">
              {data.importantDates.map((item, i) => (
                <div key={i} className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between text-xs">
                  <div>
                    <p className="font-bold text-slate-200">{item.event}</p>
                    <p className="text-[11px] text-slate-400">{item.date}</p>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                    item.urgency === 'high' ? 'bg-red-500/20 text-red-300 border-red-500/30' : 'bg-blue-500/20 text-blue-300 border-blue-500/30'
                  }`}>
                    {item.urgency.toUpperCase()} URGENCY
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
