import { motion } from "motion/react";
import React, { useState } from "react";
import { ShieldCheck, Mail, Lock, Chrome, ArrowLeft, Github, ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { auth, googleProvider, githubProvider } from "../lib/firebase";
import { 
  signInWithPopup, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  sendPasswordResetEmail
} from "firebase/auth";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    setError(null);
  };

  const handleSocialSignIn = async (provider: any) => {
    setIsLoading(true);
    setError(null);
    try {
      await signInWithPopup(auth, provider);
      navigate("/dashboard");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
      navigate("/dashboard");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      setError("Please enter your email address first.");
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      alert("Password reset email sent!");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-brand-dark flex flex-col md:flex-row overflow-hidden font-sans">
      {/* Left Side: Branding/Visual */}
      <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-slate-900 to-brand-dark relative items-center justify-center p-12 overflow-hidden border-r border-white/5">
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
        
        {/* Animated Background Elements */}
        <div className="blue-glow w-[600px] h-[600px] -top-40 -left-40 bg-brand-blue/10 animate-pulse" />
        <div className="blue-glow w-[400px] h-[400px] bottom-0 right-0 bg-indigo-500/5" />

        <div className="relative z-10 max-w-md">
          <Link to="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-12 group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-medium">Back to Home</span>
          </Link>
          
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-brand-blue rounded-xl flex items-center justify-center shadow-lg shadow-brand-blue/20">
              <ShieldCheck className="text-white w-7 h-7" />
            </div>
            <span className="text-3xl font-display font-bold text-white tracking-tight">
              TruthLayer<span className="text-brand-blue">AI</span>
            </span>
          </div>

          <h2 className="text-4xl lg:text-5xl font-display font-bold text-white leading-tight mb-6">
            Building trust in every <span className="text-brand-blue">decision.</span>
          </h2>
          <p className="text-slate-400 text-lg leading-relaxed mb-8">
            Access our enterprise-grade fairness auditing suite. Secure, explainable, and compliant.
          </p>

          <div className="space-y-6">
            {[
              "SOC-2 Type II Certified Pipeline",
              "Real-time Bias Detection Engine",
              "Automated Regulatory Compliance",
            ].map((text, i) => (
              <div key={i} className="flex items-center gap-4 text-slate-300">
                <div className="w-5 h-5 rounded-full bg-brand-blue/20 flex items-center justify-center border border-brand-blue/30">
                  <div className="w-2 h-2 rounded-full bg-brand-blue" />
                </div>
                <span className="text-sm font-medium">{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Side: Auth Form */}
      <div className="flex-1 flex items-center justify-center p-6 md:p-12 relative">
        <div className="md:hidden absolute top-6 left-6">
          <Link to="/" className="flex items-center gap-2 text-slate-400">
            <ShieldCheck className="w-6 h-6 text-brand-blue" />
            <span className="font-bold text-white text-lg">TruthLayer</span>
          </Link>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <div className="text-center md:text-left mb-10">
            <h1 className="text-3xl font-display font-bold text-white mb-3">
              {isLogin ? "Welcome back" : "Create account"}
            </h1>
            <p className="text-slate-400">
              {isLogin ? "Enter your credentials to access your dashboard" : "Join TruthLayer and start auditing your AI systems."}
            </p>
          </div>

          {/* Social Auth */}
          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm font-medium">
              {error}
            </div>
          )}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <button 
              onClick={() => handleSocialSignIn(googleProvider)}
              disabled={isLoading}
              className="flex items-center justify-center gap-3 py-3 px-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all group font-medium text-white disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Chrome className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span>Google</span>
            </button>
            <button 
              onClick={() => handleSocialSignIn(githubProvider)}
              disabled={isLoading}
              className="flex items-center justify-center gap-3 py-3 px-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all group font-medium text-white disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Github className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span>GitHub</span>
            </button>
          </div>

          <div className="relative mb-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-brand-dark px-4 text-slate-500 font-bold tracking-widest">Or continue with</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-slate-400 mb-2">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500">
                  <Mail className="w-5 h-5" />
                </div>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-brand-blue/50 focus:border-brand-blue/50 transition-all"
                  placeholder="name@company.com"
                  required
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <label className="block text-sm font-semibold text-slate-400">Password</label>
                {isLogin && (
                  <button 
                    type="button" 
                    onClick={handleForgotPassword}
                    className="text-xs font-bold text-brand-blue hover:text-brand-accent transition-colors"
                  >
                    Forgot password?
                  </button>
                )}
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500">
                  <Lock className="w-5 h-5" />
                </div>
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-brand-blue/50 focus:border-brand-blue/50 transition-all"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full py-4 bg-brand-blue hover:bg-brand-accent text-white rounded-xl font-bold text-lg shadow-lg shadow-brand-blue/20 transition-all flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  {isLogin ? "Sign In" : "Create Account"}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-slate-500">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <button 
              onClick={toggleAuthMode}
              className="text-brand-blue font-bold hover:text-brand-accent transition-colors"
            >
              {isLogin ? "Create account" : "Sign in here"}
            </button>
          </p>

          <div className="mt-12 text-center">
            <p className="text-[10px] text-slate-600 uppercase tracking-widest font-bold">
              Protected by Enterprise-Grade Encryption
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
