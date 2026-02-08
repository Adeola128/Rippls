import React from 'react';
import { motion } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell, PieChart, Pie } from 'recharts';

const data = [
  { name: 'Week 1', impact: 400, volunteers: 240 },
  { name: 'Week 2', impact: 300, volunteers: 139 },
  { name: 'Week 3', impact: 980, volunteers: 300 },
  { name: 'Week 4', impact: 390, volunteers: 200 },
  { name: 'Week 5', impact: 480, volunteers: 250 },
  { name: 'Week 6', impact: 380, volunteers: 180 },
  { name: 'Week 7', impact: 1200, volunteers: 480 },
];

const demographicData = [
  { name: 'Design', value: 45, color: '#13ec6d' },
  { name: 'Eng', value: 30, color: '#4c9a6c' },
  { name: 'Marketing', value: 15, color: '#0d9488' },
  { name: 'Other', value: 10, color: '#0f172a' },
];

const AnalyticsDashboard: React.FC = () => {
  return (
    <div className="max-w-[1400px] mx-auto px-6 py-12 space-y-12 pb-32">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-8">
        <div>
          <h1 className="text-5xl font-black tracking-tight text-slate-900 dark:text-white">Impact <span className="text-primary italic">Intelligence.</span></h1>
          <p className="text-lg text-slate-500 font-medium">Real-time telemetry for your social mission squad.</p>
        </div>
        <div className="flex gap-3">
          <button className="h-14 px-8 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl font-black text-sm flex items-center gap-2 shadow-xl hover:scale-105 transition-all">
            <span className="material-symbols-outlined">ios_share</span>
            Export Audit
          </button>
        </div>
      </header>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { l: 'Total Reach', v: '12.4k', d: '+15%', i: 'groups', c: 'text-primary' },
          { l: 'Retention', v: '88%', d: '+4.2%', i: 'favorite', c: 'text-blue-500' },
          { l: 'Avg Rating', v: '4.9', d: 'Stable', i: 'star', c: 'text-orange-500' },
          { l: 'XP Payouts', v: '1.2M', d: '+250k', i: 'bolt', c: 'text-purple-500' },
        ].map((s, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white dark:bg-card-dark p-8 rounded-[2.5rem] border border-border-light dark:border-border-dark shadow-sm group hover:border-primary transition-all"
          >
            <div className={`size-12 rounded-xl bg-slate-50 dark:bg-white/5 flex items-center justify-center ${s.c} mb-6`}>
              <span className="material-symbols-outlined fill-1 font-black">{s.i}</span>
            </div>
            <p className="text-4xl font-black tracking-tighter mb-1 text-slate-900 dark:text-white">{s.v}</p>
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">{s.l}</span>
              <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${s.d.startsWith('+') ? 'bg-primary/10 text-primary' : 'bg-slate-100 dark:bg-white/5 text-slate-500'}`}>{s.d}</span>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-12 gap-10">
        <div className="lg:col-span-8 bg-white dark:bg-card-dark rounded-[3.5rem] p-10 border border-border-light dark:border-border-dark shadow-sm">
          <div className="flex items-center justify-between mb-10 px-4">
            <h3 className="text-2xl font-black text-slate-900 dark:text-white">Impact Velocity</h3>
            <div className="flex gap-4">
              <span className="text-xs font-black uppercase text-primary border-b-2 border-primary pb-1">Impact XP</span>
              <span className="text-xs font-black uppercase text-slate-400 hover:text-slate-900 dark:hover:text-white pb-1 cursor-pointer">Hours Logged</span>
            </div>
          </div>
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorImpact" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#13ec6d" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#13ec6d" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.1} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 800 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 800 }} />
                <Tooltip 
                  contentStyle={{ borderRadius: '20px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)', fontWeight: 800, backgroundColor: '#1a2e23', color: '#fff' }} 
                />
                <Area type="monotone" dataKey="impact" stroke="#13ec6d" strokeWidth={4} fillOpacity={1} fill="url(#colorImpact)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="lg:col-span-4 flex flex-col gap-8">
          <div className="bg-slate-900 text-white rounded-[3.5rem] p-10 relative overflow-hidden shadow-2xl flex-1">
            <div className="absolute top-0 right-0 size-60 bg-primary/10 blur-[100px] rounded-full"></div>
            <h3 className="text-2xl font-black mb-10">Skill Vectors</h3>
            <div className="h-[240px] w-full mb-8">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie 
                    data={demographicData} 
                    innerRadius={60} outerRadius={80} 
                    paddingAngle={5} dataKey="value"
                  >
                    {demographicData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-4">
              {demographicData.map((d, i) => (
                <div key={d.name} className="flex justify-between items-center text-xs font-black uppercase tracking-widest">
                  <span className="text-slate-400 flex items-center gap-2">
                    <div className="size-2 rounded-full" style={{ backgroundColor: d.color }}></div>
                    {d.name}
                  </span>
                  <span className="text-white">{d.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white dark:bg-card-dark rounded-[3.5rem] p-12 border border-border-light dark:border-border-dark shadow-sm">
        <h3 className="text-2xl font-black mb-8 text-slate-900 dark:text-white">Top Community Contributors</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           {[1, 2, 3].map(i => (
             <div key={i} className="p-6 bg-slate-50 dark:bg-white/5 rounded-3xl flex items-center gap-6 border border-slate-100 dark:border-white/5">
                <img src={`https://picsum.photos/seed/user${i}/100/100`} className="size-16 rounded-2xl object-cover" alt="U" />
                <div className="min-w-0">
                  <p className="font-black truncate text-slate-900 dark:text-white">Volunteer_{i}</p>
                  <p className="text-[10px] font-black uppercase text-primary tracking-widest">{245 + i*12} XP Contributed</p>
                </div>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;