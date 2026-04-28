/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from "motion/react";
import { Routes, Route, Link } from "react-router-dom";
import AuthPage from "./components/AuthPage";
import Dashboard from "./components/Dashboard";
import UploadPage from "./components/UploadPage";
import ResultsPage from "./components/ResultsPage";
import ExplainPage from "./components/ExplainPage";
import RecommendationsPage from "./components/RecommendationsPage";
import SimulatorPage from "./components/SimulatorPage";
import ReportPage from "./components/ReportPage";
import SettingsPage from "./components/SettingsPage";
import AdminAnalytics from "./components/AdminAnalytics";
import { 
  ShieldCheck, 
  Search, 
  BarChart3, 
  FileText, 
  Settings, 
  ArrowRight, 
  CheckCircle2, 
  AlertTriangle,
  Users,
  Briefcase,
  HeartPulse,
  BrainCircuit,
  ChevronRight,
  Menu,
  X
} from "lucide-react";
import { BiasProvider } from "./contexts/BiasContext";
import { useState, useEffect } from "react";

// --- Components ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-brand-dark/80 backdrop-blur-md border-b border-white/10" : "bg-transparent"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-brand-blue rounded-lg flex items-center justify-center">
              <ShieldCheck className="text-white w-6 h-6" />
            </div>
            <span className="text-2xl font-display font-bold text-white tracking-tight">TruthLayer<span className="text-brand-blue">AI</span></span>
          </div>
          
          <div className="hidden md:flex items-center gap-10">
            {["Problem", "Features", "Method", "Testimonials"].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="text-sm font-medium text-slate-400 hover:text-white transition-colors">
                {item}
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
            <Link to="/auth" className="text-sm font-medium text-slate-400 hover:text-white transition-colors">Log in</Link>
            <Link to="/auth" className="bg-brand-blue hover:bg-brand-accent text-white px-5 py-2.5 rounded-full text-sm font-semibold transition-all shadow-lg shadow-brand-blue/20">
              Try Free Audit
            </Link>
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-slate-200">
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-brand-dark border-b border-white/10 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-4">
              {["Problem", "Features", "Method", "Testimonials"].map((item) => (
                <a 
                  key={item} 
                  href={`#${item.toLowerCase()}`} 
                  className="block text-lg font-medium text-slate-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item}
                </a>
              ))}
              <div className="pt-4 flex flex-col gap-3">
                <Link to="/auth" className="w-full text-left font-medium text-slate-300" onClick={() => setIsMenuOpen(false)}>Log in</Link>
                <Link to="/auth" className="w-full bg-brand-blue text-white py-3 rounded-xl font-bold text-center" onClick={() => setIsMenuOpen(false)}>Try Free Audit</Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = ({ onWatchDemo }: { onWatchDemo: () => void }) => {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      {/* Background Glows */}
      <div className="blue-glow w-[500px] h-[500px] -top-20 -left-20 bg-brand-blue/20" />
      <div className="blue-glow w-[400px] h-[400px] top-40 right-0 bg-indigo-500/10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-brand-blue animate-pulse" />
            <span className="text-xs font-semibold text-brand-blue uppercase tracking-wider">Trusted by Fortune 500 AI Teams</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-5xl md:text-7xl lg:text-8xl font-display font-bold text-white leading-[1.1] tracking-tight mb-8"
          >
            AI Should <br />
            <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-brand-blue via-indigo-400 to-brand-blue">
              Decide Fairly.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="max-w-2xl mx-auto text-lg md:text-xl text-slate-400 mb-10 leading-relaxed"
          >
            Detect discrimination in AI systems before they impact real people. 
            TruthLayer provides real-time fairness auditing for enterprise models.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link to="/auth" className="w-full sm:w-auto px-8 py-4 bg-brand-blue hover:bg-brand-accent text-white rounded-full font-bold text-lg transition-all flex items-center justify-center gap-2 group">
              Try Free Audit
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <button 
              onClick={onWatchDemo}
              className="w-full sm:w-auto px-8 py-4 bg-white/5 border border-white/10 hover:bg-white/10 text-white rounded-full font-bold text-lg transition-all flex items-center justify-center gap-2 group"
            >
              <div className="w-8 h-8 bg-brand-blue/20 rounded-full flex items-center justify-center group-hover:bg-brand-blue/30 transition-colors">
                <div className="w-0 h-0 border-t-[6px] border-t-transparent border-l-[10px] border-l-brand-blue border-b-[6px] border-b-transparent ml-1" />
              </div>
              Watch Demo
            </button>
          </motion.div>
        </div>

        {/* Dashboard Preview Overlay */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-20 relative"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-transparent opacity-90 z-10" />
          <div className="glass-card rounded-2xl p-4 md:p-8 aspect-video md:aspect-[16/7] overflow-hidden">
            <div className="flex gap-4 h-full">
              <div className="hidden md:flex flex-col gap-4 w-60">
                <div className="h-8 w-full bg-white/10 rounded-md" />
                <div className="h-8 w-full bg-white/10 rounded-md" />
                <div className="h-8 w-full bg-white/5 rounded-md" />
                <div className="h-8 w-full bg-white/5 rounded-md" />
              </div>
              <div className="flex-1 flex flex-col gap-6">
                <div className="flex justify-between items-center">
                  <div className="h-10 w-32 bg-white/10 rounded-full" />
                  <div className="flex gap-2">
                    <div className="h-4 w-4 bg-red-400 rounded-full animate-pulse" />
                    <div className="h-4 w-32 bg-white/10 rounded-md" />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-6 flex-1">
                  <div className="bg-brand-blue/10 border border-brand-blue/20 rounded-xl p-6 flex flex-col justify-end gap-2">
                    <div className="text-xs text-brand-blue uppercase font-bold tracking-widest leading-none">Fairness</div>
                    <div className="text-4xl font-display font-bold text-white">98.2%</div>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-xl p-6 flex flex-col justify-end gap-2">
                    <div className="text-xs text-white/40 uppercase font-bold tracking-widest leading-none">Bias detected</div>
                    <div className="text-4xl font-display font-bold text-red-400 leading-none">03</div>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-xl p-6 flex flex-col justify-end gap-2">
                    <div className="text-xs text-white/40 uppercase font-bold tracking-widest leading-none">Compliance</div>
                    <div className="text-4xl font-display font-bold text-white">SOC-2</div>
                  </div>
                </div>
                <div className="h-20 w-full bg-white/5 border border-white/10 rounded-xl" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const ProblemSection = () => {
  const problems = [
    {
      icon: Briefcase,
      title: "Hiring Bias",
      desc: "AI-driven recruiting systems often penalize candidates based on gender or ethnicity without explicit programming.",
      color: "text-blue-400"
    },
    {
      icon: Users,
      title: "Loan Redlining",
      desc: "Digital lenders can unintentionally create high-interest loops for zip codes, reinforcing historical inequality.",
      color: "text-indigo-400"
    },
    {
      icon: HeartPulse,
      title: "Healthcare Inequity",
      desc: "Diagnostic algorithms have shown lower accuracy for minority groups, leading to life-critical diagnostic gaps.",
      color: "text-brand-blue"
    }
  ];

  return (
    <section id="problem" className="py-24 bg-brand-dark relative lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-sm font-bold text-brand-blue uppercase tracking-[0.2em] mb-4">The Invisible Crisis</h2>
            <h3 className="text-4xl md:text-5xl font-display font-bold text-white leading-tight mb-6">
              When AI scales, it scales <span className="text-slate-400">bias.</span>
            </h3>
            <p className="text-lg text-slate-400 mb-8">
              Legacy systems weren't built for automated accountability. TruthLayer bridges the gap between complex neural networks and ethical compliance.
            </p>
            <div className="flex flex-col gap-6">
              {problems.map((p, i) => (
                <button 
                  key={i} 
                  onClick={() => alert(`Case Study: ${p.title}\nLearn how TruthLayer detected and mitigated these specific risks in our upcoming technical whitepaper.`)}
                  className="flex text-left gap-4 p-4 rounded-2xl hover:bg-white/5 transition-colors group cursor-pointer"
                >
                  <div className={`mt-1 p-2 rounded-lg bg-slate-800/50 ${p.color} transition-colors group-hover:bg-slate-700`}>
                    <p.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white mb-1 group-hover:text-brand-blue transition-colors">{p.title}</h4>
                    <p className="text-slate-400">{p.desc}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="aspect-square bg-gradient-to-tr from-brand-blue/20 to-indigo-500/20 rounded-[4rem] flex items-center justify-center p-8 border border-white/5">
              <AlertTriangle className="w-full h-full text-brand-blue p-24 opacity-20" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="glass-card p-6 rounded-2xl max-w-sm rotate-3 shadow-2xl">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 rounded-full bg-red-400 flex items-center justify-center">
                      <AlertTriangle className="text-white w-4 h-4" />
                    </div>
                    <div className="font-bold text-white">Bias Detected</div>
                  </div>
                  <p className="text-sm text-slate-300 italic">"Correlation found between zip code and approval rating without underlying risk foundation."</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const FeaturesSection = () => {
  const features = [
    {
      icon: Search,
      title: "Bias Detection",
      desc: "Deep analysis across 40+ demographic variables to uncover hidden proxy variables."
    },
    {
      icon: BarChart3,
      title: "Fairness Score",
      desc: "Instant metrics (80/20 rule, disparate impact) mapped to industry benchmarks."
    },
    {
      icon: BrainCircuit,
      title: "Explainability Reports",
      desc: "SHAP and LIME integration to show exactly why a model reached its decision."
    },
    {
      icon: Settings,
      title: "Bias Fix Suggestions",
      desc: "Automated weight adjustments and re-weighting strategies to neutralize bias."
    },
    {
      icon: FileText,
      title: "Compliance Reports",
      desc: "Ready-to-file regulatory documentation for GDPR, EU AI Act, and SOC-3."
    }
  ];

  return (
    <section id="features" className="py-24 bg-slate-900/50 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
        <h2 className="text-sm font-bold text-brand-blue uppercase tracking-[0.2em] mb-4">Core Technology</h2>
        <h3 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">Designed for Accountability.</h3>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((f, i) => (
          <div key={i} className="glass-card p-8 rounded-[2rem] group cursor-pointer hover:-translate-y-2">
            <div className="w-14 h-14 bg-brand-blue/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-brand-blue transition-colors">
              <f.icon className="text-brand-blue w-7 h-7 group-hover:text-white transition-colors" />
            </div>
            <h4 className="text-2xl font-bold text-white mb-4">{f.title}</h4>
            <p className="text-slate-400 leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

const HowItWorks = () => {
  const steps = [
    { number: "01", title: "Upload Data", desc: "Securely connect your training datasets or model endpoints via API." },
    { number: "02", title: "Analyze Bias", desc: "Our engine runs 1,000+ adversarial simulations across segments." },
    { number: "03", title: "Fix Issues", desc: "Receive automated code snippets to rebalance your model architecture." },
    { number: "04", title: "Export Report", desc: "Download iron-clad compliance docs for your legal and ethics teams." }
  ];

  return (
    <section id="method" className="py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-display font-bold text-white mb-4">Four steps to absolute truth.</h2>
          <p className="text-slate-400">The most rigorous AI auditing process in the industry.</p>
        </div>
        
        <div className="relative">
          <div className="hidden lg:block absolute top-[70px] left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-brand-blue/30 to-transparent" />
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 relative">
            {steps.map((s, i) => (
              <div key={i} className="text-center relative">
                <div className="w-16 h-16 bg-brand-dark border-2 border-brand-blue rounded-full mx-auto flex items-center justify-center mb-6 z-10 relative">
                  <span className="text-lg font-bold text-brand-blue">{s.number}</span>
                </div>
                <h4 className="text-xl font-bold text-white mb-2">{s.title}</h4>
                <p className="text-slate-400 text-sm">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const Testimonials = () => {
  const testimonials = [
    {
      quote: "TruthLayer revealed bias in our hiring algorithm that we didn't even know was possible. It saved us from massive legal risk.",
      author: "Sarah Jenkins",
      role: "Head of AI, FinCore",
      avatar: "SJ"
    },
    {
      quote: "The compliance reports are so detailed that our external auditors cleared us in record time. A must-have for GenAI teams.",
      author: "Marcus Chen",
      role: "CTO, HealthVision",
      avatar: "MC"
    },
    {
      quote: "Finally, a tool that speaks both 'data scientist' and 'legal counsel' fluently.",
      author: "Elena Rodriguez",
      role: "Chief Ethicist, Nexus AI",
      avatar: "ER"
    }
  ];

  return (
    <section id="testimonials" className="py-24 bg-brand-dark/50 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <div key={i} className="glass-card p-10 rounded-[3rem] relative">
              <div className="text-white/20 absolute top-10 right-10">
                <FileText className="w-12 h-12" />
              </div>
              <p className="text-xl text-slate-200 italic mb-10 leading-relaxed">"{t.quote}"</p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-indigo-500 rounded-full flex items-center justify-center font-bold text-white">{t.avatar}</div>
                <div>
                  <div className="font-bold text-white">{t.author}</div>
                  <div className="text-sm text-slate-500">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-brand-dark pt-20 pb-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 mb-16">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-brand-blue rounded flex items-center justify-center">
                <ShieldCheck className="text-white w-5 h-5" />
              </div>
              <span className="text-xl font-display font-bold text-white tracking-tight">TruthLayer<span className="text-brand-blue">AI</span></span>
            </div>
            <p className="text-slate-400 max-w-xs mb-6">
              Building a world where AI decisions are as fair as they are intelligent. 
              SOC-2 Type II Certified.
            </p>
            <div className="flex gap-4">
              {/* Social Icons Placeholder */}
              <div className="w-10 h-10 bg-white/5 rounded-full hover:bg-brand-blue/20 transition-colors" />
              <div className="w-10 h-10 bg-white/5 rounded-full hover:bg-brand-blue/20 transition-colors" />
              <div className="w-10 h-10 bg-white/5 rounded-full hover:bg-brand-blue/20 transition-colors" />
            </div>
          </div>
          <div>
            <h5 className="text-white font-bold mb-6">Product</h5>
            <ul className="space-y-4 text-slate-400 text-sm">
              <li><a href="#" className="hover:text-brand-blue transition-colors">Auditor Pro</a></li>
              <li><a href="#" className="hover:text-brand-blue transition-colors">Enterprise API</a></li>
              <li><a href="#" className="hover:text-brand-blue transition-colors">BiasFix Engine</a></li>
              <li><a href="#" className="hover:text-brand-blue transition-colors">Compliance Hub</a></li>
            </ul>
          </div>
          <div>
            <h5 className="text-white font-bold mb-6">Company</h5>
            <ul className="space-y-4 text-slate-400 text-sm">
              <li><a href="#" className="hover:text-brand-blue transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-brand-blue transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-brand-blue transition-colors">Ethics Panel</a></li>
              <li><a href="#" className="hover:text-brand-blue transition-colors">Press Kit</a></li>
            </ul>
          </div>
          <div>
            <h5 className="text-white font-bold mb-6">Legal</h5>
            <ul className="space-y-4 text-slate-400 text-sm">
              <li><a href="#" className="hover:text-brand-blue transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-brand-blue transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-brand-blue transition-colors">Contact Support</a></li>
            </ul>
          </div>
        </div>
        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-slate-500 text-sm text-center md:text-left">© 2026 TruthLayer AI Inc. All rights reserved.</p>
          <div className="flex gap-8 text-sm text-slate-500">
            <span>Built with precision.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

const VideoModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[100] bg-brand-dark/90 backdrop-blur-xl flex items-center justify-center p-4 md:p-8"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-5xl aspect-video bg-black rounded-[2rem] overflow-hidden shadow-2xl border border-white/10"
          >
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 z-10 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-all backdrop-blur-md"
            >
              <X className="w-6 h-6" />
            </button>
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
              title="TruthLayer AI Demo"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

function LandingPage() {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-brand-dark selection:bg-brand-blue/40">
      <Navbar />
      <VideoModal isOpen={isVideoModalOpen} onClose={() => setIsVideoModalOpen(false)} />
      <main>
        <Hero onWatchDemo={() => setIsVideoModalOpen(true)} />
        <section className="max-w-7xl mx-auto px-4 py-24">
          <div className="relative glass-card rounded-[3rem] p-12 overflow-hidden bg-white/[0.02] border border-white/5">
            <div className="relative z-10 text-center mb-12">
              <span className="inline-block px-4 py-1.5 rounded-full bg-brand-blue/10 text-brand-blue text-[10px] font-black uppercase tracking-[0.2em] mb-4 border border-brand-blue/20">
                Industry Standard
              </span>
              <h2 className="text-slate-400 font-medium text-lg">Trusted by industry leaders in AI safety & compliance</h2>
            </div>
            
            <div className="flex flex-wrap justify-center gap-x-16 gap-y-10 opacity-60">
              {[
                { name: 'TECHCORP', icon: 'T', shape: 'rounded-lg', color: 'bg-white' },
                { name: 'FIN-OS', icon: 'F', shape: 'rounded-full', color: 'bg-white' },
                { name: 'SECURE.LY', icon: 'S', shape: 'rotate-45', color: 'bg-white' },
                { name: 'OPEN_BANK', icon: 'OB', shape: 'rounded-md', color: 'bg-white' },
                { name: 'HEALTH.AI', icon: 'H', shape: 'border-2', color: 'bg-white' }
              ].map((partner) => (
                <motion.button
                  key={partner.name}
                  whileHover={{ scale: 1.05, opacity: 1, filter: 'grayscale(0%) invert(0)' }}
                  onClick={() => alert(`${partner.name} Integration: Coming Soon\nThis partner uses TruthLayer to automate their bias detection protocols.`)}
                  className="flex items-center gap-2 grayscale invert opacity-50 hover:opacity-100 transition-all group cursor-pointer"
                >
                  <div className={`w-8 h-8 ${partner.color} ${partner.shape} flex items-center justify-center font-black text-black text-xs`}>
                    {partner.icon}
                  </div>
                  <span className="text-2xl font-black tracking-tighter text-white">{partner.name}</span>
                </motion.button>
              ))}
            </div>
            
            {/* Ambient background decoration for the section */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-full bg-brand-blue/5 blur-[100px] pointer-events-none" />
          </div>
        </section>
        <ProblemSection />
        <FeaturesSection />
        <HowItWorks />
        
        {/* CTA Banner */}
        <section className="max-w-7xl mx-auto px-4 mb-20">
          <div className="bg-gradient-to-r from-brand-blue to-indigo-600 rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden group">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute -top-24 -right-24 w-64 h-64 bg-white/10 rounded-full blur-3xl"
            />
            <div className="relative z-10">
              <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-6">Ready to audit?</h2>
              <p className="text-white/80 text-xl mb-10 max-w-2xl mx-auto font-medium">
                Join 500+ enterprises using TruthLayer to build trust in their automated systems.
              </p>
              <Link to="/auth" className="inline-block bg-white text-brand-blue px-10 py-5 rounded-full font-black text-xl hover:scale-105 transition-transform shadow-2xl">
                Get Started Now — It's Free
              </Link>
            </div>
          </div>
        </section>

        <Testimonials />
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <BiasProvider>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/upload" element={<UploadPage />} />
        <Route path="/results" element={<ResultsPage />} />
        <Route path="/explain" element={<ExplainPage />} />
        <Route path="/recommendations" element={<RecommendationsPage />} />
        <Route path="/simulator" element={<SimulatorPage />} />
        <Route path="/report" element={<ReportPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/admin" element={<AdminAnalytics />} />
      </Routes>
    </BiasProvider>
  );
}
