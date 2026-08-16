import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FileText, Upload, CheckCircle2, AlertTriangle, Sparkles, Volume2, Globe, ArrowRight, RefreshCw, Eye } from 'lucide-react';
import { analyzeDocumentOrInput } from '@/lib/ai';
import { DocumentAnalysisResult } from '@/types/accessai';
import { useBackgroundState } from '@/context/BackgroundStateContext';
import { useAccessibility } from '@/context/AccessibilityContext';

export const AnalyzerPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { setAIState } = useBackgroundState();
  const { speak, language, t } = useAccessibility();
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<DocumentAnalysisResult | null>(null);

  const initialQuery = location.state?.query || 'SSP Post-Matric Scholarship Form';

  const runAnalysis = async (queryText: string) => {
    setAnalyzing(true);
    setAIState('documentUpload');
    speak(queryText, language);

    const res = await analyzeDocumentOrInput(queryText);
    setResult(res);
    setAnalyzing(false);
    setAIState('idle');
  };

  React.useEffect(() => {
    runAnalysis(initialQuery);
  }, []);

  return (
    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Page Title & Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400 mb-1">
            <FileText className="w-4 h-4" /> Multimodal Document Intelligence
          </div>
          <h1 className="text-3xl font-extrabold text-white">{t('analyzerTitle')}</h1>
          <p className="text-xs text-slate-400 mt-1">{t('analyzerSubtitle')}</p>
        </div>

        {/* Preset Sample Document Selector */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold text-slate-400 mr-1 hidden sm:inline">{t('btnAnalyzeSample')}:</span>
          <button
            onClick={() => runAnalysis('Income Certificate Tahsil Form 7')}
            className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 hover:border-cyan-400 text-xs font-medium text-slate-200 transition"
          >
            📄 Income Cert
          </button>
          <button
            onClick={() => runAnalysis('SSP Post-Matric Scholarship Application')}
            className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 hover:border-emerald-400 text-xs font-medium text-slate-200 transition"
          >
            📄 SSP Scholarship
          </button>
          <button
            onClick={() => runAnalysis('Category 3A Caste Certificate')}
            className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 hover:border-purple-400 text-xs font-medium text-slate-200 transition"
          >
            📄 Caste Cert
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left 5 Columns: Document Viewer / Upload Dropzone */}
        <div className="lg:col-span-5 space-y-6">
          <div className="glass-panel p-6 rounded-3xl border border-slate-800/80 space-y-4">
            <h3 className="text-sm font-bold text-slate-100 flex items-center justify-between">
              <span>Source Document Scan</span>
              {analyzing && <span className="text-xs text-cyan-400 animate-pulse flex items-center gap-1"><RefreshCw className="w-3 h-3 animate-spin" /> Scanning OCR...</span>}
            </h3>

            {/* Simulated Document Preview Container */}
            <div className="relative rounded-2xl bg-slate-950 border border-slate-800 p-6 min-h-[360px] flex flex-col justify-between overflow-hidden shadow-inner">
              
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-cyan-400" />
                    <div>
                      <p className="text-xs font-bold text-slate-200">{result?.documentType || 'Uploaded Form'}</p>
                      <p className="text-[10px] text-slate-500">FORMAT: PDF/SCANNED IMAGE</p>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-semibold">AUTHENTICATED</span>
                </div>

                <div className="space-y-2 text-[11px] font-mono text-slate-400 opacity-90">
                  <p><span className="text-cyan-400">REF_NO:</span> RD003849204812</p>
                  <p><span className="text-cyan-400">AUTHORITY:</span> {result?.issuingAuthority || 'Govt Revenue Dept'}</p>
                  <p className="line-clamp-4 bg-slate-900/80 p-2.5 rounded-lg border border-slate-800 text-[10px]">
                    "{result?.plainLanguageExplanation[language] || result?.summary || 'Extracting legal provisions...'}"
                  </p>
                </div>
              </div>

              {/* Upload Drop Zone Trigger */}
              <div className="mt-4 pt-4 border-t border-slate-800/80">
                <button
                  onClick={() => runAnalysis('SSP Post-Matric Scholarship Form')}
                  className="w-full py-3 rounded-xl bg-slate-900/80 border border-dashed border-slate-700 hover:border-cyan-400 text-xs text-slate-300 hover:text-white transition flex items-center justify-center gap-2"
                >
                  <Upload className="w-4 h-4 text-cyan-400" /> {t('dropzoneText')}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right 7 Columns: Extracted Fields & Trilingual Plain Language Simplifier */}
        <div className="lg:col-span-7 space-y-6">
          
          {result && (
            <>
              {/* Trilingual Simplifier Card */}
              <div className="glass-panel p-6 rounded-3xl border border-cyan-500/40 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-bold text-cyan-400 uppercase tracking-wider">
                    <Globe className="w-4 h-4" /> {t('plainExplanation')}
                  </div>
                  <button
                    onClick={() => speak(result.plainLanguageExplanation[language] || result.summary, language)}
                    className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-xs font-semibold hover:bg-cyan-500/30 transition flex items-center gap-1.5"
                  >
                    <Volume2 className="w-3.5 h-3.5" /> {t('btnRead')} ({language.toUpperCase()})
                  </button>
                </div>

                <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
                  <p className="text-sm sm:text-base text-slate-100 font-medium leading-relaxed">
                    {result.plainLanguageExplanation[language] || result.summary}
                  </p>
                </div>
              </div>

              {/* Extracted Fields Metadata */}
              <div className="glass-panel p-6 rounded-3xl border border-slate-800/80 space-y-4">
                <h3 className="text-sm font-bold text-slate-100 flex items-center justify-between">
                  <span>{t('fieldBreakdown')}</span>
                  <span className="text-xs font-medium text-emerald-400">{(result.confidenceScore * 100).toFixed(0)}% Accuracy</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {result.extractedFields.map((field, idx) => (
                    <div key={idx} className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-center justify-between text-xs">
                      <div>
                        <p className="text-[11px] text-slate-400 font-medium">{field.label}</p>
                        <p className="text-slate-100 font-bold mt-0.5">{field.value}</p>
                      </div>
                      {field.status === 'verified' && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                      {field.status === 'flagged' && <AlertTriangle className="w-4 h-4 text-yellow-400" />}
                    </div>
                  ))}
                </div>
              </div>

              {/* Workspace / Recommendations Action CTAs */}
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <button
                  onClick={() => navigate('/workspace', { state: { query: result.documentType } })}
                  className="w-full sm:w-auto flex-1 px-5 py-3 rounded-2xl bg-slate-800 border border-slate-700 text-slate-200 font-semibold text-xs hover:bg-slate-700 transition flex items-center justify-center gap-2"
                >
                  <Eye className="w-4 h-4 text-cyan-400" /> {t('navWorkspace')}
                </button>

                <button
                  onClick={() => navigate('/recommendations', { state: { query: result.documentType } })}
                  className="w-full sm:w-auto flex-1 px-5 py-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-emerald-500 text-white font-bold text-xs shadow-lg shadow-cyan-500/25 hover:scale-105 transition flex items-center justify-center gap-2"
                >
                  {t('btnFillForm')} <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </>
          )}

        </div>

        </div>

    </div>
  );
};
