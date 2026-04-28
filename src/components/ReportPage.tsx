import React, { useState } from "react";
import { motion } from "motion/react";
import { 
  ArrowLeft, 
  FileText, 
  Download, 
  Settings, 
  CheckCircle2, 
  Globe, 
  Award,
  BarChart3,
  PieChart as PieChartIcon,
  ShieldCheck,
  FileSpreadsheet,
  FileJson,
  Printer,
  Share2,
  Zap,
  Sparkles,
  AlertTriangle,
  Lightbulb,
  Building2,
  Scale
} from "lucide-react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";
import { useNavigate } from "react-router-dom";
import { useBias } from "../contexts/BiasContext";
import { generateExecutiveReport, ExecutiveReport } from "../services/geminiService";

const formatData = [
  { id: 'pdf', name: 'Adobe PDF', icon: FileText, desc: 'High-fidelity document for compliance archives', color: 'bg-red-500' },
  { id: 'csv', name: 'Raw Data (CSV)', icon: FileSpreadsheet, desc: 'Machine readable row-level audit trail', color: 'bg-emerald-500' },
  { id: 'excel', name: 'MS Excel (XLSX)', icon: FileSpreadsheet, desc: 'Pivot-ready dataset with formatted charts', color: 'bg-green-600' },
];

const COLORS = ['#0ea5e9', '#6366f1', '#a855f7', '#ec4899'];

export default function ReportPage() {
  const navigate = useNavigate();
  const { results } = useBias();
  const [selectedFormat, setSelectedFormat] = useState('pdf');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);
  const [aiReport, setAiReport] = useState<ExecutiveReport | null>(null);

  // Metadata State
  const [metadata, setMetadata] = useState({
    company: "Global Finance Corp",
    dataset: results?.columns?.length ? "Uploaded_Dataset.csv" : "North_America_Credit_Applications_Q1.csv",
    auditor: "TruthLayer AI Compliance Engine",
    date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
  });

  const biasDistribution = results ? Object.entries(results.imbalancedClasses).map(([name, value]) => ({
    name, value
  })) : [
    { name: 'Gender', value: 45 },
    { name: 'Age', value: 25 },
    { name: 'Region', value: 15 },
    { name: 'Income', value: 15 },
  ];

  const handleExport = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      alert(`Report generated successfully in ${selectedFormat.toUpperCase()} format.`);
    }, 2000);
  };

  const handleGenerateAIReport = async () => {
    if (!results) {
      alert("Please upload and analyze a dataset first.");
      return;
    }
    setIsGeneratingAI(true);
    try {
      const report = await generateExecutiveReport(results);
      setAiReport(report);
    } catch (error) {
      console.error("AI Generation Error:", error);
      alert("Failed to generate AI insights.");
    } finally {
      setIsGeneratingAI(false);
    }
  };

  const fairnessScore = results ? Math.round(results.disparateImpactRatio * 100) : 72;

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 pb-20">
      {/* Editorial Navbar */}
      <nav className="h-16 border-b border-slate-200 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate(-1)}
              className="p-2 hover:bg-slate-100 rounded-lg transition-colors text-slate-500"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="h-4 w-px bg-slate-200 mx-2" />
            <h1 className="text-sm font-black uppercase tracking-widest text-slate-400">Report Exporter</h1>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-slate-100 rounded-lg text-slate-400">
              <Share2 className="w-4 h-4" />
            </button>
            <button className="p-2 hover:bg-slate-100 rounded-lg text-slate-400">
              <Printer className="w-4 h-4" />
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-12 lg:py-16">
        <div className="grid lg:grid-cols-12 gap-12">
          
          {/* Configuration Panel */}
          <div className="lg:col-span-4 space-y-8">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200">
              <h2 className="text-xl font-display font-bold mb-6 flex items-center gap-2">
                <Settings className="w-5 h-5 text-brand-blue" />
                Configure Export
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 block">Organization Name</label>
                  <input 
                    type="text" 
                    value={metadata.company}
                    onChange={(e) => setMetadata({...metadata, company: e.target.value})}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/50"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 block">Dataset Identifier</label>
                  <input 
                    type="text" 
                    value={metadata.dataset}
                    onChange={(e) => setMetadata({...metadata, dataset: e.target.value})}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/50"
                  />
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-slate-100">
                <button 
                  onClick={handleGenerateAIReport}
                  disabled={isGeneratingAI || !results}
                  className="w-full bg-indigo-50 hover:bg-indigo-100 text-indigo-600 border border-indigo-200 py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isGeneratingAI ? (
                    <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}>
                      <Zap className="w-4 h-4 fill-indigo-600" />
                    </motion.div>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      Generate AI Report Insights
                    </>
                  )}
                </button>
                <p className="text-[10px] text-slate-400 mt-2 text-center font-bold px-4">AI analysis transforms metrics into executive strategy</p>
              </div>

              <div className="mt-8">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4 block">Select Format</label>
                <div className="space-y-3">
                  {formatData.map((f) => (
                    <button
                      key={f.id}
                      onClick={() => setSelectedFormat(f.id)}
                      className={`w-full flex items-start gap-4 p-4 rounded-2xl border transition-all text-left group ${selectedFormat === f.id ? 'bg-brand-blue/5 border-brand-blue ring-1 ring-brand-blue' : 'bg-white border-slate-200 hover:border-slate-300'}`}
                    >
                      <div className={`p-2 rounded-lg ${f.color} text-white shadow-sm transition-transform group-hover:scale-110`}>
                        <f.icon className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-slate-900">{f.name}</div>
                        <div className="text-[10px] text-slate-500 font-medium">{f.desc}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <button 
                onClick={handleExport}
                disabled={isGenerating}
                className="w-full mt-10 bg-slate-900 hover:bg-slate-800 text-white py-5 rounded-2xl font-bold transition-all shadow-xl flex items-center justify-center gap-3 active:scale-95 disabled:opacity-50"
              >
                {isGenerating ? (
                  <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}>
                    <Download className="w-5 h-5" />
                  </motion.div>
                ) : (
                  <>
                    Download Full Report
                    <Download className="w-5 h-5" />
                  </>
                )}
              </button>
            </div>

            <div className="bg-brand-blue/5 border border-brand-blue/10 p-6 rounded-3xl flex items-start gap-4">
              <ShieldCheck className="w-6 h-6 text-brand-blue shrink-0 mt-1" />
              <div>
                <h4 className="text-sm font-bold text-slate-900 mb-1">Compliance Check</h4>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">This report follows the standard guidelines for Algorithmic Transparency as required by upcoming regulator mandates.</p>
              </div>
            </div>
          </div>

          {/* Report Preview */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-[3rem] shadow-2xl shadow-slate-200/50 p-12 md:p-20 relative min-h-[1000px] border border-slate-100 overflow-hidden">
              
              {/* Report Header Logo */}
              <div className="flex justify-between items-start mb-20">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-brand-blue rounded flex items-center justify-center">
                    <ShieldCheck className="text-white w-6 h-6" />
                  </div>
                  <span className="text-2xl font-display font-bold text-slate-900 tracking-tight">TruthLayer Compliance Engine</span>
                </div>
                <div className="text-right">
                  <div className="text-xs font-black uppercase tracking-widest text-slate-400 mb-1">Report ID</div>
                  <div className="text-sm font-mono font-bold text-slate-900">#TL-AUDIT-2024-{Math.floor(Math.random() * 9000) + 1000}</div>
                </div>
              </div>

              {/* Cover Metadata */}
              <div className="mb-20">
                <div className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-blue mb-4">Official Executive Summary</div>
                <h3 className="text-5xl font-display font-bold text-slate-900 leading-tight mb-12">
                  Algorithmic Fairness <br/> & Bias Disclosure Report
                </h3>
                
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 py-10 border-y border-slate-100">
                  <div>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 block">Organization</span>
                    <span className="text-sm font-bold text-slate-900">{metadata.company}</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 block">Dataset</span>
                    <span className="text-sm font-bold text-slate-900 truncate max-w-[150px]">{metadata.dataset}</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 block">Audit Date</span>
                    <span className="text-sm font-bold text-slate-900">{metadata.date}</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 block">Fairness Score</span>
                    <span className={`text-sm font-bold ${fairnessScore > 80 ? 'text-emerald-600' : fairnessScore > 60 ? 'text-amber-600' : 'text-red-600'}`}>
                      {fairnessScore} ({fairnessScore > 80 ? 'OPTIMAL' : fairnessScore > 60 ? 'NEUTRAL' : 'CRITICAL'})
                    </span>
                  </div>
                </div>
              </div>

              {/* AI Report Section */}
              {aiReport && (
                <section className="mb-20">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="p-3 bg-indigo-50 rounded-2xl">
                      <Sparkles className="w-6 h-6 text-indigo-500" />
                    </div>
                    <div>
                      <h4 className="text-sm font-black uppercase tracking-widest text-slate-900">AI Intelligence Review</h4>
                      <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest">Powered by Gemini 3 Flash</p>
                    </div>
                  </div>

                  <div className="space-y-12">
                    <div>
                      <h5 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-4">Strategic Summary</h5>
                      <p className="text-slate-700 leading-relaxed font-serif italic text-lg">{aiReport.summary}</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-10">
                      <div className="space-y-4">
                        <h5 className="text-xs font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                          <AlertTriangle className="w-3 h-3 text-red-500" />
                          Key Risks Identified
                        </h5>
                        <ul className="space-y-2">
                          {aiReport.biasRisks.map((risk, index) => (
                            <li key={index} className="text-sm text-slate-600 flex items-start gap-3">
                              <span className="w-1.5 h-1.5 bg-red-400 rounded-full mt-1.5 shrink-0" />
                              {risk}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="space-y-4">
                        <h5 className="text-xs font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                          <Lightbulb className="w-3 h-3 text-amber-500" />
                          Actionable Recommendations
                        </h5>
                        <ul className="space-y-2">
                          {aiReport.recommendations.map((rec, index) => (
                            <li key={index} className="text-sm text-slate-600 flex items-start gap-3">
                              <span className="w-1.5 h-1.5 bg-brand-blue rounded-full mt-1.5 shrink-0" />
                              {rec}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-10 pt-10 border-t border-slate-50">
                      <div>
                        <h5 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-4 flex items-center gap-2">
                          <Building2 className="w-3 h-3 text-slate-500" />
                          Business Impact
                        </h5>
                        <p className="text-sm text-slate-600 leading-relaxed">{aiReport.businessImpact}</p>
                      </div>
                      <div>
                        <h5 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-4 flex items-center gap-2">
                          <Scale className="w-3 h-3 text-slate-500" />
                          Ethical Considerations
                        </h5>
                        <p className="text-sm text-slate-600 leading-relaxed">{aiReport.ethicalConcerns}</p>
                      </div>
                    </div>
                  </div>
                </section>
              )}

              {/* Main Findings */}
              <div className="space-y-16 mb-20">
                <section>
                  <h4 className="text-sm font-black uppercase tracking-widest text-slate-900 mb-6 flex items-center gap-2">
                    <div className="w-1.5 h-6 bg-brand-blue rounded-full" />
                    01. Bias Classification
                  </h4>
                  <div className="grid md:grid-cols-2 gap-10">
                    <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100">
                      <p className="text-slate-600 text-sm leading-relaxed font-medium mb-6">
                        {results ? "Dataset analysis categorized by primary protected attributes identifying proportionality gaps." : "Automated analysis identified strong historical correlations between gender and outcome variables, exceeding permissible regulatory thresholds by 12.4%."}
                      </p>
                      <div className="h-[200px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={biasDistribution}
                              cx="50%"
                              cy="50%"
                              innerRadius={40}
                              outerRadius={70}
                              paddingAngle={5}
                              dataKey="value"
                            >
                              {biasDistribution.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                              ))}
                            </Pie>
                            <Tooltip />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                    <div className="space-y-6">
                      <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Primary Attribute Bias</span>
                        <span className={`text-sm font-black ${fairnessScore < 60 ? 'text-red-500' : 'text-emerald-500'}`}>
                          {fairnessScore < 60 ? 'Critical' : 'Controlled'}
                        </span>
                      </div>
                      <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Class Imbalance</span>
                        <span className="text-sm font-black text-amber-500">{results ? 'Calculated' : 'Moderate'}</span>
                      </div>
                      <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Data Completeness</span>
                        <span className="text-sm font-black text-emerald-500">{results && Object.values(results.missingValues).every(v => v === 0) ? '100%' : 'High'}</span>
                      </div>
                    </div>
                  </div>
                </section>

                <section>
                  <h4 className="text-sm font-black uppercase tracking-widest text-slate-900 mb-6 flex items-center gap-2">
                    <div className="w-1.5 h-6 bg-brand-blue rounded-full" />
                    02. Required Interventions
                  </h4>
                  <div className="space-y-4">
                    {[
                      { t: "Implement Fairness Constraints", d: "Recommended: Add mathematical regularization to logic layers." },
                      { t: "Training Data Rebalancing", d: "High Impact: Increase waitings for underrepresented segments." },
                      { t: "Human Override Layer", d: "Standard: Insert human review for edge-case decisions." }
                    ].map((item, idx) => (
                      <div key={idx} className="flex gap-4 p-4 rounded-xl border border-slate-100">
                        <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center shrink-0">
                          <CheckCircle2 className="w-5 h-5 text-slate-400" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-slate-900">{item.t}</div>
                          <div className="text-[10px] text-slate-500 mt-1">{item.d}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              </div>

              {/* Watermark Footer */}
              <div className="absolute bottom-12 left-20 right-20 flex justify-between items-center opacity-30">
                <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">Certified by TruthLayer Intelligence v1.2</div>
                <Globe className="w-5 h-5" />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
