import React from 'react';
import { motion } from 'framer-motion';
import { LayoutDashboard, CheckCircle2, Clock, Sparkles, TrendingUp, ShieldCheck, FileCheck, Users } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell } from 'recharts';

export const InsightsPage: React.FC = () => {
  const barData = [
    { month: 'May', tasks: 24, hoursSaved: 68 },
    { month: 'Jun', tasks: 42, hoursSaved: 110 },
    { month: 'Jul', tasks: 68, hoursSaved: 195 },
    { month: 'Aug', tasks: 94, hoursSaved: 280 },
  ];

  const pieData = [
    { name: '100% High Match', value: 65, color: '#06B6D4' },
    { name: 'Medium Match', value: 25, color: '#10B981' },
    { name: 'Action Needed', value: 10, color: '#F59E0B' },
  ];

  return (
    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400 mb-1">
            <LayoutDashboard className="w-4 h-4" /> System Analytics & Impact Telemetry
          </div>
          <h1 className="text-3xl font-extrabold text-white">Insights & Demo Results</h1>
          <p className="text-xs text-slate-400 mt-1">Live metrics on documents parsed, applications generated, and time saved for citizens.</p>
        </div>

        <span className="px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold flex items-center gap-1.5">
          <TrendingUp className="w-4 h-4" /> 98.4% Task Success Rate
        </span>
      </div>

      {/* 4 Overview Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        <div className="glass-panel p-6 rounded-3xl border border-slate-800/80 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Tasks Completed</span>
            <div className="w-8 h-8 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-black text-white">142</p>
          <p className="text-[11px] text-emerald-400 font-semibold">+28% from last week</p>
        </div>

        <div className="glass-panel p-6 rounded-3xl border border-slate-800/80 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Docs Analyzed</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <FileCheck className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-black text-white">98</p>
          <p className="text-[11px] text-cyan-400 font-semibold">100% OCR Accuracy</p>
        </div>

        <div className="glass-panel p-6 rounded-3xl border border-slate-800/80 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Hours Saved</span>
            <div className="w-8 h-8 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-black text-white">420 hrs</p>
          <p className="text-[11px] text-blue-400 font-semibold">Avg 3 hrs per citizen</p>
        </div>

        <div className="glass-panel p-6 rounded-3xl border border-slate-800/80 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">AI Confidence</span>
            <div className="w-8 h-8 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-black text-white">96.4%</p>
          <p className="text-[11px] text-purple-400 font-semibold">Zero hallucinations</p>
        </div>

      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Bar Chart: Monthly Growth */}
        <div className="lg:col-span-7 glass-panel p-6 rounded-3xl border border-slate-800/80 space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center justify-between">
            <span>Completed Applications & Saved Time</span>
            <span className="text-xs text-slate-400">2026 Metrics</span>
          </h3>

          <div className="h-64 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData}>
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} />
                <YAxis stroke="#94a3b8" fontSize={11} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }}
                />
                <Bar dataKey="tasks" fill="#06B6D4" radius={[6, 6, 0, 0]} name="Tasks Completed" />
                <Bar dataKey="hoursSaved" fill="#10B981" radius={[6, 6, 0, 0]} name="Hours Saved" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie Chart: Match Distribution */}
        <div className="lg:col-span-5 glass-panel p-6 rounded-3xl border border-slate-800/80 space-y-4">
          <h3 className="text-sm font-bold text-white">AI Recommendation Match Breakdown</h3>
          
          <div className="h-64 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={85}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="flex items-center justify-around text-xs pt-2 border-t border-slate-800">
            {pieData.map((d, i) => (
              <div key={i} className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: d.color }} />
                <span className="text-slate-300 font-medium">{d.name}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
