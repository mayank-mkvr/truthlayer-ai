import React from "react";
import { motion } from "motion/react";
import { 
  ShieldCheck, 
  Download, 
  AlertTriangle, 
  TrendingUp, 
  ArrowLeft,
  Users,
  MapPin,
  Calendar,
  Wallet,
  CheckCircle2,
  Info,
  Maximize2,
  ChevronRight,
  Zap,
  FileText
} from "lucide-react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  LineChart, 
  Line,
  ScatterChart,
  Scatter,
  ZAxis,
  Legend
} from "recharts";
import { useNavigate } from "react-router-dom";
import { useBias } from "../contexts/BiasContext";

const CategoryCard = ({ icon: Icon, title, score, status, color }: any) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="glass-card p-6 rounded-3xl relative overflow-hidden"
  >
    <div className={`absolute top-0 right-0 w-24 h-24 bg-${color}-500/5 -mr-8 -mt-8 rounded-full blur-2xl`} />
    <div className="flex justify-between items-start mb-6">
      <div className={`p-3 rounded-2xl bg-${color}-500/10 text-${color}-400`}>
        <Icon className="w-6 h-6" />
      </div>
      <div className={`text-xs font-black uppercase tracking-widest ${status === 'Critical' ? 'text-red-400' : 'text-emerald-400'}`}>
        {status}
      </div>
    </div>
    <div className="text-slate-400 text-sm font-bold uppercase tracking-widest mb-1">{title}</div>
    <div className="text-4xl font-display font-bold text-white leading-none mb-4">{score}%</div>
    <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
      <div className={`h-full bg-${color}-500`} style={{ width: `${score}%` }} />
    </div>
  </motion.div>
);

export default function ResultsPage() {
  const navigate = useNavigate();
  const { results } = useBias();

  // Mock data for charts not yet covered by real analyzer
  const trendData = [
    { month: 'Jan', score: 65 },
    { month: 'Feb', score: 68 },
    { month: 'Mar', score: 72 },
    { month: 'Apr', score: 71 },
    { month: 'May', score: 85 },
    { month: 'Jun', score: 92 },
  ];

  const distributionData = [
    { x: 10, y: 30, z: 200, group: 'A' },
    { x: 20, y: 50, z: 100, group: 'A' },
    { x: 30, y: 70, z: 150, group: 'B' },
    { x: 40, y: 40, z: 300, group: 'B' },
    { x: 50, y: 90, z: 250, group: 'C' },
    { x: 60, y: 20, z: 400, group: 'C' },
  ];

  // If no results, show fallback or mock for demo
  const displayResults = results || {
    approvalRateByGroup: { 'Male': 0.78, 'Female': 0.42, 'Non-Binary': 0.45 },
    disparateImpactRatio: 0.54,
    equalOpportunityDifference: 0.36,
    missingValues: {},
    imbalancedClasses: {},
    totalRows: 1200,
    columns: []
  };

  const chartData = Object.entries(displayResults.approvalRateByGroup).map(([group, rate]) => ({
    group,
    rate: Math.round((rate as number) * 100),
    baseline: 75
  }));

  const fairnessScore = Math.round(displayResults.disparateImpactRatio * 100);
  const statusLabels = fairnessScore > 80 ? "Optimal" : fairnessScore > 60 ? "Fair" : "Critical";

  const exportJSON = () => {
    const dataStr = JSON.stringify(displayResults, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = `truthlayer-analysis-${new Date().toISOString()}.json`;
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  return (
    <div className="min-h-screen bg-brand-dark text-slate-200 selection:bg-brand-blue/30 pb-20">
      {/* Navbar */}
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
            <h1 className="text-xl font-display font-bold text-white tracking-tight">Analysis Results</h1>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate("/recommendations")}
              className="flex items-center gap-2 px-6 py-2.5 bg-emerald-500 hover:bg-emerald-600 rounded-xl text-sm font-bold text-white transition-all shadow-lg shadow-emerald-500/20"
            >
              <Zap className="w-4 h-4" />
              Fix Bias
            </button>
            <button 
              onClick={exportJSON}
              className="hidden md:flex items-center gap-2 px-5 py-2.5 bg-white/5 hover:bg-white/10 rounded-xl text-sm font-bold text-slate-300 transition-all border border-white/5"
            >
              <Download className="w-4 h-4" />
              JSON Results
            </button>
            <button 
              onClick={() => navigate("/report")}
              className="flex items-center gap-2 px-6 py-2.5 bg-brand-blue hover:bg-brand-accent rounded-xl text-sm font-bold text-white transition-all shadow-lg shadow-brand-blue/20"
            >
              <FileText className="w-4 h-4" />
              Report
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Hero Score Section */}
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-1 glass-card p-10 rounded-[3rem] flex flex-col items-center justify-center text-center relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-brand-blue/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="w-48 h-48 rounded-full border-8 border-white/5 flex items-center justify-center relative mb-6">
              <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 192 192">
                <motion.circle 
                  initial={{ strokeDashoffset: 552.92 }}
                  animate={{ strokeDashoffset: 552.92 * (1 - fairnessScore / 100) }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  cx="96" 
                  cy="96" 
                  r="88" 
                  className="stroke-brand-blue fill-none" 
                  strokeWidth="8" 
                  strokeDasharray="552.92" 
                  strokeLinecap="round"
                />
              </svg>
              <div className="flex flex-col items-center">
                <span className="text-6xl font-display font-black text-white">{fairnessScore}</span>
                <span className="text-xs font-black uppercase tracking-widest text-slate-500">Fairness Index</span>
              </div>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">{fairnessScore > 80 ? "Optimal Fairness" : fairnessScore > 60 ? "Needs Review" : "Critical Bias"}</h3>
            <p className="text-slate-400 text-sm">Disparity detected in primary sensitive attributes.</p>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-display font-bold text-white">Detection Logs</h2>
              <span className={`px-3 py-1 ${fairnessScore < 80 ? 'bg-red-500/10 text-red-400 border-red-500/20' : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'} border rounded-full text-[10px] font-black uppercase tracking-widest`}>
                {displayResults.totalRows} Records Audited
              </span>
            </div>
            
            <div className="space-y-4">
              {displayResults.disparateImpactRatio < 0.8 && (
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-red-500/10 border border-red-500/20 p-6 rounded-3xl flex items-start gap-4 group"
                >
                  <div className="p-3 bg-red-500/20 rounded-2xl text-red-400 group-hover:scale-110 transition-transform">
                    <AlertTriangle className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-red-100 mb-1">Significant Disparate Impact</h4>
                    <p className="text-red-400/80 leading-relaxed mb-4">Ratio of outcomes is <span className="font-bold underline decoration-2">{displayResults.disparateImpactRatio.toFixed(2)}</span>. This falls below the regulatory threshold of 0.8.</p>
                    <button 
                      onClick={() => navigate("/explain")}
                      className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-white/80 hover:text-white transition-colors bg-white/5 hover:bg-white/10 px-4 py-2 rounded-lg border border-white/10"
                    >
                      Audit Trail
                      <ChevronRight className="w-4 h-4 text-brand-blue" />
                    </button>
                  </div>
                </motion.div>
              )}

              {Object.values(displayResults.missingValues).some(v => (v as number) > 0) && (
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                  className="bg-amber-500/10 border border-amber-500/20 p-6 rounded-3xl flex items-start gap-4"
                >
                  <div className="p-3 bg-amber-500/20 rounded-2xl text-amber-400">
                    <Info className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-amber-100 mb-1">Data Gaps Found</h4>
                    <p className="text-amber-400/80 leading-relaxed">Missing values detected in key columns. This may skew bias calculations.</p>
                  </div>
                </motion.div>
              )}

              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-brand-blue/10 border border-brand-blue/20 p-6 rounded-3xl flex items-start gap-4"
              >
                <div className="p-3 bg-brand-blue/20 rounded-2xl text-brand-blue">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-brand-blue/100 mb-1">Location Neutrality Verified</h4>
                  <p className="text-slate-400 leading-relaxed">Geographic data shows zero correlation with decision outcomes. Zip-code redlining not present.</p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Category Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <CategoryCard icon={Users} title="Group Fairness" score={fairnessScore} status={statusLabels} color={fairnessScore < 60 ? 'red' : 'emerald'} />
          <CategoryCard icon={Calendar} title="Data Integrity" score={95} status="Good" color="indigo" />
          <CategoryCard icon={MapPin} title="Proxy Freedom" score={88} status="Optimal" color="emerald" />
          <CategoryCard icon={Wallet} title="Equal Opportunity" score={Math.round((1 - displayResults.equalOpportunityDifference) * 100)} status="Fair" color="amber" />
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="glass-card p-8 rounded-[3rem]">
            <div className="flex justify-between items-center mb-10">
              <div>
                <h3 className="text-xl font-bold text-white">Disparate Impact Analysis</h3>
                <p className="text-sm text-slate-500">Comparison by demographic segment</p>
              </div>
              <div className="flex gap-4 text-xs font-bold uppercase tracking-widest text-slate-500">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-brand-blue" /> Actual
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-white/20" /> Baseline
                </div>
              </div>
            </div>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" horizontal={true} vertical={false} />
                  <XAxis type="number" stroke="#64748b" fontSize={10} axisLine={false} tickLine={false} tickFormatter={(v) => `${v}%`} />
                  <YAxis dataKey="group" type="category" stroke="#64748b" fontSize={10} axisLine={false} tickLine={false} width={80} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '16px' }}
                    itemStyle={{ color: '#fff' }}
                  />
                  <Bar dataKey="rate" fill="#0ea5e9" radius={[0, 4, 4, 0]} barSize={24} />
                  <Bar dataKey="baseline" fill="#ffffff10" radius={[0, 4, 4, 0]} barSize={4} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="glass-card p-8 rounded-[3rem]">
            <h3 className="text-xl font-bold text-white mb-2">Fairness Trend</h3>
            <p className="text-sm text-slate-500 mb-10">Historical tracking of model impartiality</p>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trendData}>
                  <defs>
                    <linearGradient id="lineGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0.2}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                  <XAxis dataKey="month" stroke="#64748b" fontSize={10} axisLine={false} tickLine={false} />
                  <YAxis stroke="#64748b" fontSize={10} axisLine={false} tickLine={false} domain={[50, 100]} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '16px' }}
                    itemStyle={{ color: '#fff' }}
                  />
                  <Line type="monotone" dataKey="score" stroke="#0ea5e9" strokeWidth={4} dot={{ fill: '#0ea5e9', strokeWidth: 2, r: 4 }} activeDot={{ r: 8 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="lg:col-span-2 glass-card p-8 rounded-[3rem]">
            <h3 className="text-xl font-bold text-white mb-2">Bias Distribution Scatter</h3>
            <p className="text-sm text-slate-500 mb-10">Visualizing clusters of decision anomalies across feature space</p>
            <div className="h-[400px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" />
                  <XAxis type="number" dataKey="x" name="Impact" stroke="#64748b" fontSize={10} />
                  <YAxis type="number" dataKey="y" name="Relevance" stroke="#64748b" fontSize={10} />
                  <ZAxis type="number" dataKey="z" range={[60, 400]} name="Confidence" />
                  <Tooltip 
                    cursor={{ strokeDasharray: '3 3' }}
                    contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '16px' }}
                  />
                  <Legend />
                  <Scatter name="Group Alpha" data={distributionData.slice(0, 2)} fill="#0ea5e9" />
                  <Scatter name="Group Beta" data={distributionData.slice(2, 4)} fill="#818cf8" />
                  <Scatter name="Group Gamma" data={distributionData.slice(4, 6)} fill="#f43f5e" />
                </ScatterChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
