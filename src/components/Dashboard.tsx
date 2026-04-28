import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  LayoutDashboard, 
  Upload, 
  FilePieChart, 
  Dna, 
  Settings, 
  LogOut, 
  Search, 
  Bell, 
  SearchIcon,
  ChevronDown,
  TrendingUp,
  AlertCircle,
  Database,
  FileText,
  Activity,
  MoreVertical,
  Plus
} from "lucide-react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  AreaChart, 
  Area,
  PieChart,
  Pie,
  Cell
} from "recharts";
import { auth } from "../lib/firebase";
import { useNavigate, Link } from "react-router-dom";
import { signOut } from "firebase/auth";

// --- Mock Data ---

const genderData = [
  { name: 'Male', approval: 88, bias: 2 },
  { name: 'Female', approval: 72, bias: 18 },
  { name: 'Non-Binary', approval: 65, bias: 25 },
  { name: 'Prefer not to say', approval: 78, bias: 12 },
];

const trendData = [
  { time: 'Jan', score: 82 },
  { time: 'Feb', score: 85 },
  { time: 'Mar', score: 81 },
  { time: 'Apr', score: 89 },
  { time: 'May', score: 94 },
  { time: 'Jun', score: 98 },
];

const riskData = [
  { name: 'Low', value: 65, color: '#10b981' },
  { name: 'Medium', value: 25, color: '#f59e0b' },
  { name: 'High', value: 10, color: '#ef4444' },
];

// --- Sub-components ---

const SidebarItem = ({ icon: Icon, label, active, onClick }: any) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${active ? 'bg-brand-blue text-white shadow-lg shadow-brand-blue/20' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}
  >
    <Icon className={`w-5 h-5 ${active ? 'text-white' : 'text-slate-500 group-hover:text-brand-blue'}`} />
    <span className="font-semibold text-sm">{label}</span>
  </button>
);

const StatWidget = ({ icon: Icon, label, value, trend, color }: any) => (
  <div className="glass-card p-6 rounded-3xl">
    <div className="flex justify-between items-start mb-4">
      <div className={`p-3 rounded-2xl ${color} bg-opacity-10 text-${color.split('-')[1]}-400`}>
        <Icon className="w-6 h-6" />
      </div>
      <div className="flex items-center gap-1 text-emerald-400 text-xs font-bold">
        <TrendingUp className="w-3 h-3" />
        {trend}
      </div>
    </div>
    <div className="text-slate-400 text-sm font-medium mb-1">{label}</div>
    <div className="text-3xl font-display font-bold text-white tracking-tight">{value}</div>
  </div>
);

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("Dashboard");
  const navigate = useNavigate();
  const user = auth.currentUser;

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };

  return (
    <div className="flex min-h-screen bg-brand-dark text-slate-200">
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/5 p-6 flex flex-col gap-8 hidden lg:flex">
        <div className="flex items-center gap-2 px-2">
          <div className="w-8 h-8 bg-brand-blue rounded-lg flex items-center justify-center">
            <Dna className="text-white w-5 h-5" />
          </div>
          <span className="text-xl font-display font-bold text-white tracking-tight">TruthLayer<span className="text-brand-blue">AI</span></span>
        </div>

        <nav className="flex flex-col gap-2 flex-1">
          <SidebarItem icon={LayoutDashboard} label="Dashboard" active={activeTab === "Dashboard"} onClick={() => { setActiveTab("Dashboard"); navigate("/dashboard"); }} />
          <SidebarItem icon={Upload} label="Upload Dataset" active={activeTab === "Upload"} onClick={() => { setActiveTab("Upload"); navigate("/upload"); }} />
          <SidebarItem icon={FilePieChart} label="Reports" active={activeTab === "Reports"} onClick={() => { setActiveTab("Reports"); navigate("/results"); }} />
          <SidebarItem icon={Dna} label="Simulator" active={activeTab === "Simulator"} onClick={() => { setActiveTab("Simulator"); navigate("/simulator"); }} />
          <SidebarItem icon={Activity} label="System Admin" active={activeTab === "Admin"} onClick={() => { setActiveTab("Admin"); navigate("/admin"); }} />
          <div className="h-px bg-white/5 my-4" />
          <SidebarItem icon={Settings} label="Settings" active={activeTab === "Settings"} onClick={() => { setActiveTab("Settings"); navigate("/settings"); }} />
        </nav>

        <button 
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-500 hover:bg-red-500/10 hover:text-red-400 transition-all duration-200 group mt-auto"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-semibold text-sm">Logout</span>
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 transition-all duration-300">
        {/* Top Navbar */}
        <header className="h-20 border-b border-white/5 px-6 md:px-10 flex items-center justify-between sticky top-0 bg-brand-dark/80 backdrop-blur-md z-30">
          <div className="relative w-full max-w-md hidden md:block">
            <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input 
              type="text" 
              placeholder="Search datasets, audits, reports..." 
              className="w-full bg-white/5 border border-white/10 rounded-full py-2.5 pl-11 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/50 transition-all"
            />
          </div>

          <div className="flex items-center gap-6">
            <button className="relative w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-all">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-brand-blue rounded-full border-2 border-brand-dark" />
            </button>
            <div className="flex items-center gap-3 pl-4 border-l border-white/10">
              <div className="text-right hidden sm:block">
                <div className="text-sm font-bold text-white leading-tight">{user?.displayName || "Admin User"}</div>
                <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{user?.email || "verified_org"}</div>
              </div>
              <div className="w-10 h-10 rounded-full bg-brand-blue/20 border border-brand-blue/30 flex items-center justify-center text-brand-blue font-bold">
                {user?.displayName?.charAt(0) || "A"}
              </div>
              <ChevronDown className="w-4 h-4 text-slate-500" />
            </div>
          </div>
        </header>

        {/* Dashboard Area */}
        <div className="p-6 md:p-10 space-y-8 overflow-y-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-display font-bold text-white mb-1">Corporate Audit Dashboard</h1>
              <p className="text-slate-400">Monitoring real-time fairness across your AI enterprise.</p>
            </div>
            <Link to="/upload" className="bg-brand-blue hover:bg-brand-accent text-white px-6 py-3 rounded-2xl font-bold transition-all shadow-lg shadow-brand-blue/20 flex items-center justify-center gap-2">
              <Plus className="w-5 h-5" />
              New Audit
            </Link>
          </div>

          {/* Stats Widgets */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatWidget icon={TrendingUp} label="Fairness Score" value="98.2%" trend="+2.4%" color="bg-brand-blue" />
            <StatWidget icon={AlertCircle} label="Active Bias Alerts" value="03" trend="-12%" color="bg-red-400" />
            <StatWidget icon={FileText} label="Reports Generated" value="142" trend="+8%" color="bg-amber-400" />
            <StatWidget icon={Database} label="Datasets Audited" value="28" trend="+1" color="bg-indigo-400" />
          </div>

          {/* Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Approval rates chart */}
            <div className="lg:col-span-2 glass-card p-8 rounded-[2.5rem]">
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h3 className="text-xl font-bold text-white">Approval Disparity</h3>
                  <p className="text-sm text-slate-500">Comparing outcomes across gender demographics</p>
                </div>
                <button className="p-2 hover:bg-white/5 rounded-lg transition-colors">
                  <MoreVertical className="w-5 h-5 text-slate-500" />
                </button>
              </div>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={genderData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                    <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v) => `${v}%`} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px' }}
                      itemStyle={{ color: '#fff' }}
                    />
                    <Bar dataKey="approval" fill="#0ea5e9" radius={[6, 6, 0, 0]} barSize={40} />
                    <Bar dataKey="bias" fill="#f43f5e" radius={[6, 6, 0, 0]} barSize={40} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Risk Distribution Pie Chart */}
            <div className="glass-card p-8 rounded-[2.5rem] flex flex-col">
              <h3 className="text-xl font-bold text-white mb-1">Risk Profile</h3>
              <p className="text-sm text-slate-500 mb-8">Overall dataset vulnerability index</p>
              <div className="flex-1 flex flex-col items-center justify-center">
                <div className="h-[200px] w-[200px] relative">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={riskData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={10}
                        dataKey="value"
                      >
                        {riskData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-3xl font-display font-bold text-white leading-none">Medium</span>
                    <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">Status</span>
                  </div>
                </div>
                <div className="w-full mt-8 space-y-3">
                  {riskData.map((r, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: r.color }} />
                        <span className="text-sm text-slate-300">{r.name} Risk</span>
                      </div>
                      <span className="text-sm font-bold text-white">{r.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Trend chart */}
            <div className="lg:col-span-3 glass-card p-8 rounded-[2.5rem]">
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h3 className="text-xl font-bold text-white">Trust Evolution</h3>
                  <p className="text-sm text-slate-500">Fairness score improvement over the last 6 months</p>
                </div>
                <div className="flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">Global Optima Met</span>
                </div>
              </div>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={trendData}>
                    <defs>
                      <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                    <XAxis dataKey="time" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} domain={[70, 100]} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px' }}
                      itemStyle={{ color: '#fff' }}
                    />
                    <Area type="monotone" dataKey="score" stroke="#0ea5e9" strokeWidth={3} fillOpacity={1} fill="url(#colorScore)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
