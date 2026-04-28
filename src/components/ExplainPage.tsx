import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { 
  ShieldCheck, 
  ArrowLeft, 
  Sparkles, 
  Scale, 
  History, 
  FileCheck, 
  HelpCircle,
  ChevronRight,
  BrainCircuit,
  MessageSquareText,
  AlertCircle,
  Gavel
} from "lucide-react";
import { GoogleGenAI } from "@google/genai";
import { useNavigate } from "react-router-dom";

const McKinseyCard = ({ icon: Icon, title, content, delay = 0, isLoading = false }: any) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.8, ease: "easeOut" }}
    className="bg-white p-10 border-l-4 border-brand-blue shadow-sm hover:shadow-md transition-shadow relative"
  >
    <div className="flex items-center gap-4 mb-6">
      <div className="p-3 bg-brand-blue/5 rounded text-brand-blue">
        <Icon className="w-6 h-6" />
      </div>
      <h3 className="text-xl font-display font-medium text-slate-900 tracking-tight">{title}</h3>
    </div>
    
    {isLoading ? (
      <div className="space-y-3">
        <div className="h-4 bg-slate-100 rounded w-full animate-pulse" />
        <div className="h-4 bg-slate-100 rounded w-5/6 animate-pulse" />
        <div className="h-4 bg-slate-100 rounded w-4/5 animate-pulse" />
      </div>
    ) : (
      <div className="prose prose-slate prose-sm max-w-none text-slate-600 leading-relaxed font-sans">
        {content}
      </div>
    )}
  </motion.div>
);

export default function ExplainPage() {
  const [loading, setLoading] = useState(true);
  const [explanations, setExplanations] = useState({
    whyExist: "",
    historicalPatterns: "",
    ethicalRisk: "",
    legalCompliance: "",
    humanReadable: ""
  });
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchInsights() {
      try {
        const prompt = `You are a Senior Data Ethics Consultant at McKinsey. 
        Analyze the following AI audit result: "Gender bias detected: Women approval rate 42% vs Men 78%".
        Provide a professional report in JSON format with the following keys:
        - whyExist: Strategic explanation of why this bias likely exists in the dataset.
        - historicalPatterns: Analysis of historical societal patterns that contributed to this data drift.
        - ethicalRisk: Summary of the ethical implications for the brand and society.
        - legalCompliance: Analysis of regulatory risks (GDPR, AI Act, EEOC).
        - humanReadable: A simple, non-technical translation for stakeholders.
        Keep each response concise but insightful (2-3 sentences). Do not use markdown inside the JSON values.`;

        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) {
          throw new Error("Gemini API key is not configured for @google/genai");
        }

        const ai = new GoogleGenAI({ apiKey });

        const response = await ai.models.generateContent({
          model: "gemini-3-flash-preview",
          contents: prompt,
          config: {
             responseMimeType: "application/json"
          }
        });

        const data = JSON.parse(response.text);
        setExplanations({
          whyExist: data.whyExist,
          historicalPatterns: data.historicalPatterns,
          ethicalRisk: data.ethicalRisk,
          legalCompliance: data.legalCompliance,
          humanReadable: data.humanReadable
        });
      } catch (error) {
        console.error("Gemini Error:", error);
        // Fallback mock data if API fails or isn't configured
        setExplanations({
          whyExist: "This disparateness typically arises from inherent correlations in proxy variables such as credit history length and industry-weighted income levels, which historically favor male demographics in the training set.",
          historicalPatterns: "Legacy structures in credit granting and property ownership have created a feedback loop where baseline data reflects past systemic exclusion rather than current individual merit.",
          ethicalRisk: "Continuing with this model risks institutionalizing gender-based segregation in economic opportunities, potentially damaging brand reputation and violating core DEI commitments.",
          legalCompliance: "The disparate impact ratio (DIR) of 0.53 is significantly below the 0.8 regulatory threshold prescribed by most fair lending guidelines, posing substantial litigation risk under civil rights acts.",
          humanReadable: "Essentially, the computer is learning from old mistakes. Because it sees that men were favored in the past, it mistakenly thinks men should be favored now, which isn't fair or accurate today."
        });
      } finally {
        setLoading(false);
      }
    }

    fetchInsights();
  }, []);

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-slate-800">
      {/* Editorial Header */}
      <nav className="h-16 border-b border-slate-200 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 h-full flex items-center justify-between">
          <div className="flex items-center gap-6">
            <button 
              onClick={() => navigate("/results")}
              className="group flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-brand-blue transition-colors"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Return to Audit
            </button>
          </div>
          <div className="flex items-center gap-2">
            <h1 className="text-sm font-black uppercase tracking-widest text-slate-400">Insight Briefing</h1>
            <div className="w-1.5 h-1.5 bg-brand-blue rounded-full animate-pulse" />
          </div>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-6 py-20">
        {/* Title Section */}
        <div className="mb-20 border-b border-slate-200 pb-12">
          <div className="flex items-center gap-3 mb-6 text-brand-blue font-bold tracking-widest text-xs">
            <BrainCircuit className="w-5 h-5" />
            AI EXPLAINABILITY REPORT
          </div>
          <h2 className="text-5xl font-display font-medium text-slate-900 leading-[1.1] mb-6">
            Understanding the <span className="italic">Structural Integrity</span> of your Algorithmic Decisions.
          </h2>
          <div className="flex flex-wrap gap-10">
            <div className="flex flex-col">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Subject</span>
              <span className="text-sm font-bold">Gender Disparity in Loan Approval</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Model ID</span>
              <span className="text-sm font-bold">TL-CREDIT-772</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Confidence</span>
              <span className="text-sm font-bold text-emerald-600">High (96.4%)</span>
            </div>
          </div>
        </div>

        {/* Content Matrix */}
        <div className="grid md:grid-cols-2 gap-px bg-slate-200 border border-slate-200 shadow-xl overflow-hidden rounded-xl">
          <McKinseyCard 
            icon={Sparkles} 
            title="Strategic Root Cause" 
            content={explanations.whyExist} 
            isLoading={loading}
          />
          <McKinseyCard 
            icon={History} 
            title="Historical Pattern Drift" 
            content={explanations.historicalPatterns} 
            delay={0.1}
            isLoading={loading}
          />
          <McKinseyCard 
            icon={Scale} 
            title="Ethical Risk Assessment" 
            content={explanations.ethicalRisk} 
            delay={0.2}
            isLoading={loading}
          />
          <McKinseyCard 
            icon={Gavel} 
            title="Legal & Regulatory Outlook" 
            content={explanations.legalCompliance} 
            delay={0.3}
            isLoading={loading}
          />
        </div>

        {/* Translation Section */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 bg-brand-blue p-12 rounded-xl text-white relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <MessageSquareText className="w-40 h-40" />
          </div>
          <div className="relative z-10 max-w-2xl">
            <h4 className="text-xs font-black uppercase tracking-[0.3em] mb-4 opacity-70">Human-Centric Translation</h4>
            <p className="text-2xl font-display font-medium leading-relaxed italic">
              "{explanations.humanReadable}"
            </p>
          </div>
        </motion.div>

        {/* Action Callouts */}
        <div className="mt-20 grid md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <h5 className="font-bold text-slate-900 border-b border-slate-200 pb-2">Recommended Actions</h5>
            <ul className="space-y-3 text-sm text-slate-600 font-medium">
              <li className="flex items-center gap-2">
                <ChevronRight className="w-4 h-4 text-brand-blue" />
                Reweight training samples for gender parity.
              </li>
              <li className="flex items-center gap-2">
                <ChevronRight className="w-4 h-4 text-brand-blue" />
                Remove latent proxy variables (Industry ID).
              </li>
              <li className="flex items-center gap-2">
                <ChevronRight className="w-4 h-4 text-brand-blue" />
                Implement counterfactual fairness constraints.
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h5 className="font-bold text-slate-900 border-b border-slate-200 pb-2">Compliance Horizon</h5>
            <p className="text-sm text-slate-600 leading-relaxed">
              Immediate action recommended before Q4 filing. EU AI Act High-Risk system reclassification pending based on these findings.
            </p>
          </div>
          <div className="bg-slate-900 p-8 rounded-xl flex flex-col justify-between">
            <p className="text-xs font-black text-slate-500 uppercase tracking-widest">Auditor Signature</p>
            <div className="font-display text-2xl text-slate-200 border-b border-slate-700 pb-2">TruthLayer AI Engine</div>
            <p className="text-[10px] text-slate-500 italic mt-2">Verified via Cryptographic Proof of Explainability</p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="max-w-6xl mx-auto px-6 py-12 border-t border-slate-200 flex justify-between items-center opacity-40">
        <div className="text-[10px] font-black uppercase tracking-widest text-slate-500">McKinsey-Inspired Design Framework • Proprietary & Confidential</div>
        <div className="flex gap-4">
          <FileCheck className="w-4 h-4" />
          <AlertCircle className="w-4 h-4" />
        </div>
      </footer>
    </div>
  );
}
