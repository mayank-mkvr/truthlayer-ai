import React from "react";
import { motion } from "motion/react";
import { 
  Users, 
  Database, 
  Building2, 
  TrendingUp, 
  ArrowUpRight, 
  Target, 
  Activity, 
  Globe, 
  BarChart3, 
  PieChart as PieChartIcon,
  ShieldAlert,
  ArrowLeft
} from "lucide-react";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell
} from "recharts";
import { useNavigate } from "react-router-dom";

const growthData = [
  { month: 'Nov', users: 4200, datasets: 12000 },
  { month: 'Dec', users: 5800, datasets: 15000 },
  { month: 'Jan', users: 7400, datasets: 22000 },
  { month: 'Feb', users: 9100, datasets: 31000 },
  { month: 'Mar', users: 11200, datasets: 38000 },
  { month: 'Apr', users: 12482, datasets: 45903 },
];

const industryData = [
  { name: 'Finance', value: 45, fill: '#0ea5e9' },
  { name: 'Health', value: 30, fill: '#6366f1' },
  { name: 'Tech', value: 25, fill: '#a855f7' },
  { name: 'Retail', value: 20, fill: '#ec4899' },
  { name: 'Gov', value: 15, fill: '#f43f5e' },
];

const biasCategories = [
  { category: 'Gender', percentage: 42, color: 'bg-brand-blue' },
  { category: 'Age', percentage: 28, color: 'bg-indigo-500' },
  { category: 'Location', percentage: 18, color: 'bg-purple-500' },
  { category: 'Income', percentage: 12, color: 'bg-emerald-500' },
];

const MetricCard = ({ icon: Icon, label, value, growth, delay }: any) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    className="glass-card p-6 rounded-[2rem] border border-white/5 relative overflow-hidden group"
  >
    <div className="flex justify-between items-start mb-4">
      <div className="p-3 bg-white/5 rounded-2xl text-slate-400 group-hover:text-brand-blue transition-colors">
        <Icon className="w-5 h-5" />
      </div>
      <div className="flex items-center gap-1 text-emerald-400 text-xs font-black">
        <ArrowUpRight className="w-3 h-3" />
        {growth}
      </div>
    </div>
    <div className="text-slate-500 text-xs font-black uppercase tracking-widest mb-1">{label}</div>
    <div className="text-3xl font-display font-bold text-white tracking-tight">{value}</div>
  </motion.div>
);

export default function AdminAnalytics() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-brand-dark text-slate-200 pb-20">
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
            <h1 className="text-xl font-display font-bold text-white tracking-tight">System Core Analytics</h1>
          </div>
          <div className="flex items-center gap-3">
             <div className="flex items-center gap-2 px-4 py-2 bg-brand-blue/10 border border-brand-blue/20 rounded-full">
                <span className="w-2 h-2 bg-brand-blue rounded-full animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-widest text-brand-blue">Live System Feed</span>
             </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-12 lg:py-16">
        {/* Metric Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard icon={Users} label="Total Users" value="12,482" growth="+18.4%" delay={0.1} />
          <MetricCard icon={Database} label="Datasets Analyzed" value="45,903" growth="+24.1%" delay={0.2} />
          <MetricCard icon={Building2} label="Enterprise Clients" value="842" growth="+9.2%" delay={0.3} />
          <MetricCard icon={Target} label="Bias Fixed" value="8,291" growth="+31.5%" delay={0.4} />
        </div>

        <div className="grid lg:grid-cols-12 gap-8">
          {/* Main Growth Chart */}
          <div className="lg:col-span-8 glass-card p-10 rounded-[3rem] border border-white/5">
            <div className="flex justify-between items-center mb-10">
              <div>
                <h3 className="text-xl font-display font-bold text-white">Platform Velocity</h3>
                <p className="text-xs text-slate-500 font-medium uppercase tracking-widest mt-1">Growth trajectory across core segments</p>
              </div>
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-brand-blue" />
                  <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Datasets</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-indigo-500" />
                  <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Users</span>
                </div>
              </div>
            </div>

            <div className="h-[400px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={growthData}>
                  <defs>
                    <linearGradient id="colorDatasets" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                  <XAxis dataKey="month" stroke="#64748b" fontSize={10} axisLine={false} tickLine={false} />
                  <YAxis stroke="#64748b" fontSize={10} axisLine={false} tickLine={false} hide />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '16px' }}
                    itemStyle={{ color: '#fff' }}
                  />
                  <Area type="monotone" dataKey="datasets" stroke="#0ea5e9" strokeWidth={3} fillOpacity={1} fill="url(#colorDatasets)" />
                  <Area type="monotone" dataKey="users" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorUsers)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Industry Distribution */}
          <div className="lg:col-span-4 glass-card p-10 rounded-[3rem] border border-white/5">
            <h3 className="text-xl font-display font-bold text-white mb-2">Industry Adoption</h3>
            <p className="text-xs text-slate-500 font-black uppercase tracking-widest mb-10">Market penetration by sector</p>
            
            <div className="h-[300px] w-full mb-8">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={industryData} layout="vertical">
                  <XAxis type="number" hide />
                  <YAxis dataKey="name" type="category" stroke="#64748b" fontSize={10} axisLine={false} tickLine={false} width={70} />
                  <Tooltip cursor={{fill: 'transparent'}} />
                  <Bar dataKey="value" radius={[0, 8, 8, 0]} barSize={20}>
                    {industryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="space-y-4">
              {industryData.map((ind, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: ind.fill }} />
                    <span className="text-sm font-bold text-slate-300">{ind.name}</span>
                  </div>
                  <span className="text-xs font-black text-slate-500">{ind.value}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Common Bias Categories */}
          <div className="lg:col-span-12 glass-card p-10 rounded-[3rem] border border-white/5">
            <div className="flex items-center justify-between mb-12">
              <div>
                <h3 className="text-xl font-display font-bold text-white">Critical Bias Vectors</h3>
                <p className="text-xs text-slate-500 font-medium uppercase tracking-widest mt-1">Aggregated detection frequency across platform</p>
              </div>
              <ShieldAlert className="text-brand-blue w-6 h-6" />
            </div>

            <div className="grid md:grid-cols-4 gap-8">
              {biasCategories.map((bias, i) => (
                <div key={i} className="space-y-4">
                  <div className="flex items-end justify-between">
                    <span className="text-sm font-bold text-slate-300">{bias.category}</span>
                    <span className="text-2xl font-display font-black text-white">{bias.percentage}%</span>
                  </div>
                  <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${bias.percentage}%` }}
                      transition={{ delay: 0.5 + (i * 0.1), duration: 1 }}
                      className={`h-full ${bias.color} rounded-full shadow-lg`} 
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Global Operations Table */}
        <div className="mt-12 bg-white/5 rounded-[2.5rem] border border-white/5 overflow-hidden">
          <div className="p-8 border-b border-white/5 flex items-center justify-between">
            <h3 className="text-lg font-bold text-white">Recent Compliance Events</h3>
            <button className="text-xs font-black uppercase tracking-widest text-brand-blue hover:text-brand-blue-accent transition-colors">View All Logs</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-white/2 border-b border-white/5">
                  <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-500">Resource</th>
                  <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-500">Action</th>
                  <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-500">Impact Score</th>
                  <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-500">Status</th>
                  <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-500">Timestamp</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {[
                  { r: "US-EAST-PRIMARY-DB", a: "Bias Recalibration", i: "92.4", s: "Success", t: "2m ago" },
                  { r: "HEALTH-NODES-04", a: "Schema Optimization", i: "84.1", s: "Success", t: "14m ago" },
                  { r: "FIN-AUDIT-STREAM", a: "Sensitive Masking", i: "98.9", s: "Neutralized", t: "22m ago" },
                  { r: "EU-WEST-TRAINING", a: "Data Rebalancing", i: "72.0", s: "In Progress", t: "1h ago" },
                ].map((row, i) => (
                  <tr key={i} className="hover:bg-white/5 transition-colors group">
                    <td className="px-8 py-4 font-mono text-xs text-slate-300">{row.r}</td>
                    <td className="px-8 py-4 text-sm font-bold text-slate-200">{row.a}</td>
                    <td className="px-8 py-4">
                      <div className="flex items-center gap-2">
                        <div className="h-1.5 w-16 bg-white/5 rounded-full overflow-hidden">
                          <div className="h-full bg-brand-blue" style={{ width: `${row.i}%` }} />
                        </div>
                        <span className="text-[10px] font-black text-slate-500">{row.i}</span>
                      </div>
                    </td>
                    <td className="px-8 py-4">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${row.s === 'Success' || row.s === 'Neutralized' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-brand-blue/10 text-brand-blue'}`}>
                        {row.s}
                      </span>
                    </td>
                    <td className="px-8 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">{row.t}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
