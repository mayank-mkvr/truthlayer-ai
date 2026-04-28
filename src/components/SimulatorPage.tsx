import React, { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  ArrowLeft, 
  ShieldCheck, 
  Play, 
  Dna, 
  Settings, 
  RefreshCw, 
  Zap, 
  History,
  TrendingUp,
  BarChart3,
  Scale,
  Bot
} from "lucide-react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Cell 
} from "recharts";
import { useNavigate } from "react-router-dom";

const Toggle = ({ label, enabled, onChange, icon: Icon }: any) => (
  <button 
    onClick={() => onChange(!enabled)}
    className={`w-full flex items-center justify-between p-6 rounded-[2rem] border transition-all duration-300 ${enabled ? 'bg-brand-blue border-brand-blue text-white shadow-xl shadow-brand-blue/30' : 'bg-white/5 border-white/10 text-slate-400 hover:border-white/20'}`}
  >
    <div className="flex items-center gap-4">
      <div className={`p-3 rounded-2xl ${enabled ? 'bg-white/20' : 'bg-white/5 text-slate-500'}`}>
        <Icon className="w-5 h-5" />
      </div>
      <span className="font-bold text-sm tracking-tight">{label}</span>
    </div>
    <div className={`w-12 h-6 rounded-full relative transition-colors ${enabled ? 'bg-brand-blue-accent' : 'bg-slate-700'}`}>
      <motion.div 
        animate={{ x: enabled ? 24 : 4 }}
        className="absolute top-1 w-4 h-4 rounded-full bg-white shadow-sm"
      />
    </div>
  </button>
);

export default function SimulatorPage() {
  const navigate = useNavigate();
  const [isSimulating, setIsSimulating] = useState(false);
  const [settings, setSettings] = useState({
    balanceData: false,
    removeGender: false,
    reweightMinority: false
  });

  // Derived simulation logic
  const scores = useMemo(() => {
    let baseScore = 72;
    let accuracy = 94.2;

    if (settings.balanceData) {
      baseScore += 12;
      accuracy -= 1.2;
    }
    if (settings.removeGender) {
      baseScore += 8;
      accuracy -= 0.8;
    }
    if (settings.reweightMinority) {
      baseScore += 6;
      accuracy -= 1.5;
    }

    return { 
      fairness: Math.min(baseScore, 98.8), 
      accuracy: Math.max(accuracy, 88.5) 
    };
  }, [settings]);

  const chartData = useMemo(() => [
    { name: 'Baseline', fairness: 72, accuracy: 94.2, fill: '#64748b' },
    { name: 'Simulated', fairness: scores.fairness, accuracy: scores.accuracy, fill: '#0ea5e9' }
  ], [scores]);

  const handleSimulate = () => {
    setIsSimulating(true);
    setTimeout(() => setIsSimulating(false), 800);
  };

  return (
    <div className="min-h-screen bg-brand-dark text-slate-200 pb-20">
      {/* Top Bar */}
      <nav className="h-20 border-b border-white/5 bg-brand-dark/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
          <div className="flex items-center gap-6">
            <button 
              onClick={() => navigate("/dashboard")}
              className="p-2.5 bg-white/5 hover:bg-white/10 rounded-xl transition-all text-slate-400 hover:text-white"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="h-6 w-px bg-white/10" />
            <h1 className="text-xl font-display font-bold text-white tracking-tight">Fairness Sandbox</h1>
          </div>
          <button className="flex items-center gap-2 px-5 py-2.5 bg-white/5 hover:bg-white/10 rounded-xl text-xs font-black uppercase tracking-widest text-slate-300 transition-all border border-white/5">
            <History className="w-4 h-4" />
            Saved Presets
          </button>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-12 lg:py-20">
        <div className="grid lg:grid-cols-12 gap-12">
          {/* Controls Panel */}
          <div className="lg:col-span-4 space-y-10">
            <div>
              <div className="flex items-center gap-2 text-brand-blue font-black tracking-widest text-[10px] uppercase mb-4">
                <Dna className="w-4 h-4" />
                Intervention Strategy
              </div>
              <h2 className="text-3xl font-display font-bold text-white mb-6">Modify Parameters</h2>
              <p className="text-sm text-slate-500 leading-relaxed mb-8">
                Toggle mitigation filters to predict how they affect your dataset's fairness-to-accuracy equilibrium.
              </p>
            </div>

            <div className="space-y-4">
              <Toggle 
                label="Balance Training Data" 
                enabled={settings.balanceData} 
                onChange={(v: boolean) => setSettings(s => ({...s, balanceData: v}))}
                icon={RefreshCw}
              />
              <Toggle 
                label="Remove Gender Column" 
                enabled={settings.removeGender} 
                onChange={(v: boolean) => setSettings(s => ({...s, removeGender: v}))}
                icon={Zap}
              />
              <Toggle 
                label="Reweight Minority Group" 
                enabled={settings.reweightMinority} 
                onChange={(v: boolean) => setSettings(s => ({...s, reweightMinority: v}))}
                icon={Scale}
              />
            </div>

            <button 
              onClick={handleSimulate}
              disabled={isSimulating}
              className="w-full py-6 bg-brand-blue hover:bg-brand-accent text-white rounded-[2rem] font-black text-lg shadow-2xl shadow-brand-blue/20 transition-all flex items-center justify-center gap-3 relative overflow-hidden active:scale-95 disabled:opacity-70"
            >
              <AnimatePresence mode="wait">
                {isSimulating ? (
                  <motion.div
                    key="loading"
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                  >
                    <RefreshCw className="w-6 h-6" />
                  </motion.div>
                ) : (
                  <motion.div key="ready" className="flex items-center gap-3">
                    Run Simulation
                    <Play className="w-6 h-6 fill-current" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>

          {/* Results Panel */}
          <div className="lg:col-span-8 space-y-8">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Fairness Score Comparison */}
              <motion.div 
                layout
                className="glass-card p-10 rounded-[3rem] relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 p-8 opacity-5">
                  <ShieldCheck className="w-32 h-32" />
                </div>
                <h3 className="text-slate-400 text-xs font-black uppercase tracking-[0.2em] mb-8">Fairness Index</h3>
                <div className="flex items-end gap-6 mb-8">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Before</span>
                    <span className="text-4xl font-display font-bold text-slate-400">72.0</span>
                  </div>
                  <div className="h-10 w-px bg-white/5" />
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black text-brand-blue uppercase tracking-widest mb-1">After</span>
                    <motion.span 
                      key={scores.fairness}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="text-6xl font-display font-black text-white"
                    >
                      {scores.fairness.toFixed(1)}
                    </motion.span>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-emerald-400 font-bold bg-emerald-500/10 border border-emerald-500/20 px-4 py-2 rounded-xl w-fit">
                  <TrendingUp className="w-4 h-4" />
                  +{(scores.fairness - 72).toFixed(1)}% Improvement
                </div>
              </motion.div>

              {/* Accuracy Tradeoff */}
              <motion.div 
                layout
                className="glass-card p-10 rounded-[3rem] relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 p-8 opacity-5">
                  <Bot className="w-32 h-32" />
                </div>
                <h3 className="text-slate-400 text-xs font-black uppercase tracking-[0.2em] mb-8">Model Accuracy</h3>
                <div className="flex items-end gap-6 mb-8">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Default</span>
                    <span className="text-4xl font-display font-bold text-slate-400">94.2</span>
                  </div>
                  <div className="h-10 w-px bg-white/5" />
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black text-amber-500 uppercase tracking-widest mb-1">Simulated</span>
                    <motion.span 
                      key={scores.accuracy}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="text-6xl font-display font-black text-white"
                    >
                      {scores.accuracy.toFixed(1)}
                    </motion.span>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-amber-500 font-bold bg-amber-500/10 border border-amber-500/20 px-4 py-2 rounded-xl w-fit">
                  <Settings className="w-4 h-4" />
                  -{(94.2 - scores.accuracy).toFixed(1)}% Drift
                </div>
              </motion.div>
            </div>

            {/* Comparison Charts */}
            <div className="glass-card p-10 rounded-[4rem] border border-white/5">
              <div className="flex justify-between items-center mb-12">
                <div>
                  <h4 className="text-xl font-display font-bold text-white mb-1">Projected Outcome Distribution</h4>
                  <p className="text-sm text-slate-500">Comparing impact across two critical dimensions</p>
                </div>
                <BarChart3 className="text-slate-700 w-8 h-8" />
              </div>

              <div className="h-[400px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                    <XAxis 
                      dataKey="name" 
                      stroke="#64748b" 
                      fontSize={12} 
                      tickLine={false} 
                      axisLine={false} 
                      dy={10} 
                    />
                    <YAxis 
                      stroke="#64748b" 
                      fontSize={12} 
                      tickLine={false} 
                      axisLine={false} 
                      domain={[60, 100]} 
                    />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '16px' }}
                      itemStyle={{ color: '#fff' }}
                    />
                    <Bar dataKey="fairness" radius={[12, 12, 0, 0]} barSize={60}>
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-f-${index}`} fill={index === 0 ? '#1e293b' : '#0ea5e9'} />
                      ))}
                    </Bar>
                    <Bar dataKey="accuracy" radius={[12, 12, 0, 0]} barSize={60}>
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-a-${index}`} fill={index === 0 ? '#334155' : '#818cf8'} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              
              <div className="mt-8 flex justify-center gap-8">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-brand-blue" />
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Fairness Score</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#818cf8]" />
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Model Accuracy</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
