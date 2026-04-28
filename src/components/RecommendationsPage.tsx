import React from "react";
import { motion } from "motion/react";
import { 
  ArrowLeft, 
  ShieldCheck, 
  Wrench, 
  Zap, 
  Layers, 
  Users, 
  Scale, 
  UserCheck, 
  ChevronRight,
  TrendingUp,
  BarChart3,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const RecommendationCard = ({ icon: Icon, title, description, impact, difficulty, improvement, delay }: any) => {
  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-emerald-400";
    if (score >= 50) return "text-amber-400";
    return "text-brand-blue";
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.5 }}
      className="glass-card p-8 rounded-[2.5rem] relative overflow-hidden group border border-white/5 hover:border-brand-blue/30 transition-all duration-300"
    >
      <div className="flex justify-between items-start mb-8">
        <div className="p-4 bg-brand-blue/10 rounded-2xl text-brand-blue group-hover:scale-110 transition-transform duration-300">
          <Icon className="w-8 h-8" />
        </div>
        <div className="flex flex-col items-end">
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">Improvement</span>
          <div className="flex items-center gap-1 text-emerald-400 font-bold text-lg">
            <TrendingUp className="w-4 h-4" />
            {improvement}%
          </div>
        </div>
      </div>

      <h3 className="text-2xl font-display font-bold text-white mb-3 tracking-tight">{title}</h3>
      <p className="text-slate-400 text-sm leading-relaxed mb-10">{description}</p>

      <div className="grid grid-cols-2 gap-6 pt-6 border-t border-white/5">
        <div>
          <div className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">Impact Score</div>
          <div className={`text-xl font-display font-black ${getScoreColor(impact)}`}>{impact}/100</div>
        </div>
        <div>
          <div className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">Difficulty</div>
          <div className="text-xl font-display font-black text-slate-300">{difficulty}/10</div>
        </div>
      </div>
      
      <button className="mt-8 w-full py-4 bg-white/5 hover:bg-white/10 rounded-2xl text-sm font-bold text-white transition-all border border-white/5 flex items-center justify-center gap-2 group/btn">
        Implement Strategy
        <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
      </button>
    </motion.div>
  );
};

export default function RecommendationsPage() {
  const navigate = useNavigate();

  const recommendations = [
    {
      icon: Layers,
      title: "Remove Sensitive Attributes",
      description: "Blind the model to protected classes (gender, race) and latent proxy variables discovered during our analysis.",
      impact: 85,
      difficulty: 2,
      improvement: 15,
      delay: 0.1
    },
    {
      icon: Users,
      title: "Rebalance Training Data",
      description: "Synthetically balance the dataset to ensure equal representation across all demographic segments in the training phase.",
      impact: 92,
      difficulty: 6,
      improvement: 32,
      delay: 0.2
    },
    {
      icon: BarChart3,
      title: "Oversample Underrepresented",
      description: "Increase the weight of specific 'hard cases' from minority groups to force the model to learn nuanced merit patterns.",
      impact: 78,
      difficulty: 4,
      improvement: 24,
      delay: 0.3
    },
    {
      icon: Scale,
      title: "Fairness Constraints",
      description: "Add mathematical regularization to the loss function that penalizes disparate impact directly during model optimization.",
      impact: 95,
      difficulty: 8,
      improvement: 40,
      delay: 0.4
    },
    {
      icon: UserCheck,
      title: "Human Review Layer",
      description: "Introduce a supervised decision override for low-confidence samples within protected groups to prevent edge-case bias.",
      impact: 70,
      difficulty: 5,
      improvement: 18,
      delay: 0.5
    }
  ];

  return (
    <div className="min-h-screen bg-brand-dark text-slate-200 pb-20">
      <nav className="h-20 border-b border-white/5 bg-brand-dark/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
          <div className="flex items-center gap-6">
            <button 
              onClick={() => navigate("/results")}
              className="p-2.5 bg-white/5 hover:bg-white/10 rounded-xl transition-all text-slate-400 hover:text-white"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="h-6 w-px bg-white/10" />
            <h1 className="text-xl font-display font-bold text-white tracking-tight">Mitigation Strategies</h1>
          </div>
          <div className="flex items-center gap-3">
            <div className="px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span className="text-xs font-bold text-emerald-500 uppercase tracking-widest">Model Certified</span>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-12 md:py-20">
        <div className="mb-16 max-w-3xl">
          <div className="flex items-center gap-2 text-brand-blue font-bold tracking-widest text-xs uppercase mb-4">
            <Wrench className="w-4 h-4" />
            Correction Protocol
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6 leading-tight">
            Select your <span className="text-brand-blue">Bias Mitigation</span> strategy.
          </h2>
          <p className="text-slate-400 text-lg leading-relaxed">
            Our recommendation engine has calculated the most efficient paths to achieve neutrality based on your specific dataset characteristics.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {recommendations.map((rec, i) => (
            <RecommendationCard key={i} {...rec} />
          ))}

          {/* AI Simulation Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="flex flex-col justify-between p-10 bg-brand-blue rounded-[2.5rem] shadow-2xl shadow-brand-blue/20 relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <Zap className="w-40 h-40" />
            </div>
            <div className="relative z-10">
              <h3 className="text-3xl font-display font-black text-white mb-4">Simulation Sandbox</h3>
              <p className="text-white/80 font-medium mb-8">
                Run an automated simulation to predict the outcome of combined strategies before deployment.
              </p>
            </div>
            <button className="relative z-10 w-full py-5 bg-white text-brand-blue rounded-3xl font-black text-xl hover:scale-105 transition-transform flex items-center justify-center gap-3">
              Start Simulation
              <Zap className="w-6 h-6 fill-current" />
            </button>
          </motion.div>
        </div>

        {/* Impact Warning */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-20 p-8 bg-amber-500/10 border border-amber-500/20 rounded-[2.5rem] flex flex-col md:flex-row items-center gap-8"
        >
          <div className="w-16 h-16 bg-amber-500/20 rounded-2xl flex items-center justify-center text-amber-400 shrink-0">
            <AlertCircle className="w-8 h-8" />
          </div>
          <div className="flex-1 text-center md:text-left">
            <h4 className="text-xl font-bold text-amber-100 mb-1">Precision-Fairness Tradeoff</h4>
            <p className="text-amber-400/80 text-sm leading-relaxed max-w-4xl">
              Applying heavy fairness constraints may slightly reduce overall model AUC-ROC. We recommend parallel testing to find the optimal equilibrium for your business requirements.
            </p>
          </div>
          <button className="px-8 py-4 bg-amber-500 text-brand-dark rounded-2xl font-bold text-sm hover:bg-amber-400 transition-colors whitespace-nowrap">
            View Tradeoff Matrix
          </button>
        </motion.div>
      </main>

      <footer className="max-w-7xl mx-auto px-6 py-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 opacity-50">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-6 h-6 text-brand-blue" />
          <span className="text-sm font-bold text-white tracking-widest uppercase">TruthLayer Recommendation Engine</span>
        </div>
        <div className="text-[10px] font-black uppercase tracking-widest text-slate-500">Compliance Standard ISO/IEC 42001:2023 Ready</div>
      </footer>
    </div>
  );
}
