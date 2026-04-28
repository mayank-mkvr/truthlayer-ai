import React, { useState } from "react";
import { motion } from "motion/react";
import { 
  ArrowLeft, 
  Settings as SettingsIcon, 
  Moon, 
  Sun, 
  Bell, 
  Globe, 
  Building2, 
  Users, 
  Key, 
  Plus, 
  Trash2, 
  Copy,
  CheckCircle2,
  Lock,
  Mail,
  ShieldCheck,
  ChevronRight
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const SettingsSection = ({ title, children, description }: any) => (
  <div className="mb-12 border-b border-white/5 pb-12">
    <div className="mb-8">
      <h3 className="text-xl font-display font-bold text-white mb-2">{title}</h3>
      <p className="text-sm text-slate-500 font-medium">{description}</p>
    </div>
    <div className="space-y-6">
      {children}
    </div>
  </div>
);

const SettingRow = ({ label, description, children }: any) => (
  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl bg-white/5 border border-white/5">
    <div className="max-w-md">
      <div className="font-bold text-slate-200 mb-1">{label}</div>
      <div className="text-xs text-slate-500 font-medium">{description}</div>
    </div>
    <div className="shrink-0">
      {children}
    </div>
  </div>
);

export default function SettingsPage() {
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [orgName, setOrgName] = useState("Global Finance Corp");
  const [copiedKey, setCopiedKey] = useState(false);

  const teamMembers = [
    { name: "Sarah Johnson", email: "sarah@gfc.com", role: "Admin", avatar: "SJ" },
    { name: "Michael Chen", email: "m.chen@gfc.com", role: "Auditor", avatar: "MC" },
    { name: "Elena Rodriguez", email: "elena@gfc.com", role: "Viewer", avatar: "ER" },
  ];

  const handleCopyKey = () => {
    setCopiedKey(true);
    setTimeout(() => setCopiedKey(false), 2000);
  };

  return (
    <div className="min-h-screen bg-brand-dark text-slate-200 selection:bg-brand-blue/30 pb-20">
      {/* Header */}
      <nav className="h-20 border-b border-white/5 bg-brand-dark/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-6 h-full flex items-center justify-between">
          <div className="flex items-center gap-6">
            <button 
              onClick={() => navigate("/dashboard")}
              className="p-2.5 bg-white/5 hover:bg-white/10 rounded-xl transition-all text-slate-400 hover:text-white"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="h-6 w-px bg-white/10" />
            <h1 className="text-xl font-display font-bold text-white tracking-tight">System Settings</h1>
          </div>
          <button className="px-6 py-2.5 bg-brand-blue hover:bg-brand-accent rounded-xl text-sm font-bold text-white transition-all shadow-lg shadow-brand-blue/20">
            Save Changes
          </button>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-6 py-12 lg:py-16">
        <div className="flex items-center gap-3 mb-12">
          <div className="p-4 bg-brand-blue/10 rounded-2xl text-brand-blue border border-brand-blue/20">
            <SettingsIcon className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-3xl font-display font-bold text-white">Platform Configuration</h2>
            <p className="text-slate-500 font-medium tracking-tight">Manage your organization transparency and team access.</p>
          </div>
        </div>

        {/* Appearance Section */}
        <SettingsSection 
          title="Interface & Theme" 
          description="Personalize how TruthLayer looks and feels."
        >
          <SettingRow 
            label="Visual Environment" 
            description="Switch between high-contrast dark mode and editorial light mode."
          >
            <div className="flex bg-white/5 p-1 rounded-xl border border-white/5">
              <button 
                onClick={() => setIsDarkMode(false)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all ${!isDarkMode ? 'bg-white text-slate-900 shadow-xl' : 'text-slate-500 hover:text-white'}`}
              >
                <Sun className="w-4 h-4" />
                Light
              </button>
              <button 
                onClick={() => setIsDarkMode(true)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all ${isDarkMode ? 'bg-white/10 text-white shadow-xl' : 'text-slate-500 hover:text-white'}`}
              >
                <Moon className="w-4 h-4" />
                Dark
              </button>
            </div>
          </SettingRow>

          <SettingRow 
            label="Language & Locale" 
            description="Select your preferred language for automated compliance reports."
          >
            <select className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm font-bold text-white focus:outline-none focus:ring-2 focus:ring-brand-blue/50">
              <option value="en">English (US)</option>
              <option value="de">German</option>
              <option value="fr">French</option>
              <option value="es">Spanish</option>
            </select>
          </SettingRow>
        </SettingsSection>

        {/* Organization Section */}
        <SettingsSection 
          title="Organization Profile" 
          description="Manage your enterprise identity and legal entities."
        >
          <div className="space-y-4">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2 block">Organization Name</label>
            <div className="relative group">
              <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-brand-blue transition-colors" />
              <input 
                type="text" 
                value={orgName}
                onChange={(e) => setOrgName(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-6 text-white font-bold focus:outline-none focus:ring-2 focus:ring-brand-blue/50 transition-all"
              />
            </div>
          </div>

          <SettingRow 
            label="Real-time Alerts" 
            description="Receive desktop notifications when bias reports are generated."
          >
             <button 
              onClick={() => setNotifications(!notifications)}
              className={`w-12 h-6 rounded-full relative transition-colors ${notifications ? 'bg-brand-blue' : 'bg-slate-700'}`}
            >
              <motion.div 
                animate={{ x: notifications ? 26 : 4 }}
                className="absolute top-1 w-4 h-4 rounded-full bg-white shadow-sm"
              />
            </button>
          </SettingRow>
        </SettingsSection>

        {/* Team Section */}
        <SettingsSection 
          title="Team Management" 
          description="Invite auditors and data scientists to collaborate on fairness analysis."
        >
          <div className="grid gap-4">
            {teamMembers.map((member, i) => (
              <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5 group hover:border-white/10 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-brand-blue/20 flex items-center justify-center text-xs font-black text-brand-blue border border-brand-blue/30">
                    {member.avatar}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white">{member.name}</div>
                    <div className="text-[10px] text-slate-500 font-medium uppercase tracking-widest">{member.email}</div>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1 bg-white/5 rounded-full text-slate-400">
                    {member.role}
                  </span>
                  <button className="p-2 text-slate-600 hover:text-red-400 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
            <button className="w-full py-4 border-2 border-dashed border-white/5 rounded-2xl text-sm font-bold text-slate-500 hover:border-brand-blue hover:text-brand-blue transition-all flex items-center justify-center gap-2">
              <Plus className="w-4 h-4" />
              Invite Team Member
            </button>
          </div>
        </SettingsSection>

        {/* Security Section */}
        <SettingsSection 
          title="Security & API" 
          description="Access keys for automated auditing and CI/CD integration."
        >
          <div className="p-8 rounded-3xl bg-slate-900 border border-white/5 relative overflow-hidden">
             <div className="absolute top-0 right-0 p-6 opacity-10">
               <ShieldCheck className="w-24 h-24 text-brand-blue" />
             </div>
             <div className="relative z-10">
               <div className="flex items-center gap-2 mb-6">
                 <Key className="w-5 h-5 text-brand-blue" />
                 <span className="text-sm font-bold text-white uppercase tracking-widest">Master API Key</span>
               </div>
               <div className="flex flex-col md:flex-row gap-4">
                 <div className="flex-1 flex items-center gap-3 bg-brand-dark/50 border border-white/10 rounded-xl px-4 py-3 font-mono text-xs text-slate-400 overflow-hidden">
                   <Lock className="w-3 h-3 shrink-0" />
                   <span className="truncate">tr_live_88a32k99z1xx42mmo992L00192X</span>
                 </div>
                 <button 
                  onClick={handleCopyKey}
                  className="flex items-center justify-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 rounded-xl text-xs font-bold text-white transition-all shrink-0"
                 >
                   {copiedKey ? (
                     <><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Copied!</>
                   ) : (
                     <><Copy className="w-4 h-4" /> Copy Key</>
                   )}
                 </button>
               </div>
               <p className="mt-4 text-[10px] text-slate-500 leading-relaxed font-medium">
                 Treat your API key like a password. Do not share it or include it in client-side code. Use it only for server-side audit integrations.
               </p>
             </div>
          </div>
        </SettingsSection>

        {/* Footer actions */}
        <div className="flex flex-col md:flex-row gap-4 pt-12">
          <button className="flex-1 py-4 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 rounded-2xl font-bold text-sm transition-all flex items-center justify-center gap-2">
            Deactivate Subscription
          </button>
          <button className="flex-1 py-4 bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white rounded-2xl font-bold text-sm transition-all border border-white/5">
            Reset Data History
          </button>
        </div>
      </main>

      <footer className="max-w-4xl mx-auto px-6 py-12 border-t border-white/5 flex flex-col items-center gap-4 opacity-40">
        <div className="flex items-center gap-2 text-xs font-bold text-white tracking-[0.2em] uppercase">
          TruthLayer <span className="text-brand-blue">Core</span> v1.4.2
        </div>
        <p className="text-[10px] text-slate-500 font-medium text-center">
          © 2026 TruthLayer AI. All rights reserved. <br/> Integrated with Enterprise Compliance Grid.
        </p>
      </footer>
    </div>
  );
}
