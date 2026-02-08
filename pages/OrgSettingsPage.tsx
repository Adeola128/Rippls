import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const OrgSettingsPage: React.FC = () => {
  const [orgName, setOrgName] = useState('Malete Tech Forum');
  const [mission, setMission] = useState('Scaling local innovation through community talent.');

  return (
    <div className="max-w-[1200px] mx-auto px-6 py-12 space-y-12">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-8">
        <div className="space-y-2">
          <h1 className="text-5xl font-black tracking-tight leading-none">Partner <span className="text-blue-500 italic">Branding.</span></h1>
          <p className="text-lg text-secondary font-medium">Control how your organization appears to the global community.</p>
        </div>
        <div className="flex gap-4">
           <button className="h-16 px-10 bg-blue-600 text-white rounded-2xl font-black text-lg shadow-xl hover:scale-[1.02] transition-all">Save Changes</button>
        </div>
      </header>

      <div className="grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 space-y-10">
          <section className="bg-white dark:bg-card-dark rounded-[3.5rem] p-12 border border-border-light dark:border-border-dark shadow-sm space-y-10">
            <div className="flex flex-col md:flex-row items-center gap-10">
              <div className="relative group cursor-pointer">
                <div className="size-32 rounded-[2rem] bg-slate-50 dark:bg-slate-900 flex items-center justify-center p-6 border-4 border-slate-100 dark:border-white/5 shadow-xl">
                  <img src="https://picsum.photos/id/100/100" className="w-full h-full object-contain" alt="Logo" />
                </div>
                <button className="absolute -bottom-2 -right-2 size-10 bg-blue-600 text-white rounded-xl shadow-lg flex items-center justify-center hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-sm">edit</span>
                </button>
              </div>
              <div className="flex-1 space-y-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Display Name</label>
                  <input value={orgName} onChange={(e) => setOrgName(e.target.value)} className="w-full bg-slate-50 dark:bg-slate-900 h-14 rounded-2xl px-6 font-black text-2xl border-none focus:ring-4 focus:ring-blue-500/20 outline-none transition-all" />
                </div>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-sm fill-1">verified</span>
                  <span className="text-xs font-black uppercase tracking-widest text-primary">Verified Social Partner</span>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Public Mission Statement</label>
                <textarea 
                  value={mission} 
                  onChange={(e) => setMission(e.target.value)}
                  className="w-full min-h-[120px] bg-slate-50 dark:bg-slate-900 border-none rounded-2xl p-6 text-lg font-medium focus:ring-4 focus:ring-blue-500/20 outline-none resize-none transition-all"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Sector</label>
                  <select className="w-full h-14 bg-slate-50 dark:bg-slate-900 border-none rounded-xl px-6 font-bold outline-none">
                    <option>Technology</option>
                    <option>Environment</option>
                    <option>Education</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Headquarters</label>
                  <input className="w-full h-14 bg-slate-50 dark:bg-slate-900 border-none rounded-xl px-6 font-bold outline-none" placeholder="e.g. Lagos, Nigeria" />
                </div>
              </div>
            </div>
          </section>

          <section className="bg-slate-900 text-white rounded-[3.5rem] p-12 border border-white/5 shadow-2xl space-y-8">
            <h3 className="text-2xl font-black">Security & Verification</h3>
            <div className="flex items-center justify-between p-6 bg-white/5 rounded-3xl border border-white/5">
              <div className="flex items-center gap-6">
                <div className="size-14 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg">
                  <span className="material-symbols-outlined text-3xl font-black">verified</span>
                </div>
                <div>
                  <h4 className="font-black text-xl leading-tight">Identity Verified</h4>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Audit Log ID: #MTF-9821</p>
                </div>
              </div>
              <button className="h-12 px-8 bg-white/10 text-white rounded-xl font-black text-xs hover:bg-white/20 transition-all">Download Cert</button>
            </div>
          </section>
        </div>

        <aside className="lg:col-span-4 space-y-8">
           <div className="bg-white dark:bg-card-dark rounded-[3.5rem] p-10 border border-border-light dark:border-border-dark shadow-sm">
             <h3 className="text-2xl font-black mb-8">Quick Links</h3>
             <div className="flex flex-col gap-4">
               {[
                 { n: 'Public Profile', i: 'visibility', to: '/partner/org1' },
                 { n: 'Audit Logs', i: 'list_alt', to: '/analytics' },
                 { n: 'Support', i: 'help', to: '/faq' },
               ].map(l => (
                 <Link key={l.n} to={l.to} className="flex items-center gap-4 p-5 bg-slate-50 dark:bg-white/5 rounded-2xl border border-slate-100 dark:border-white/5 hover:border-blue-500 transition-all group">
                   <span className="material-symbols-outlined text-slate-400 group-hover:text-blue-500 transition-colors">{l.i}</span>
                   <span className="text-sm font-black">{l.n}</span>
                 </Link>
               ))}
             </div>
           </div>

           <button className="w-full h-20 border-2 border-red-500/20 text-red-500 rounded-[2.5rem] font-black text-lg flex items-center justify-center gap-3 hover:bg-red-500/5 transition-all">
             <span className="material-symbols-outlined">logout</span>
             Log Out of Console
           </button>
        </aside>
      </div>
    </div>
  );
};

export default OrgSettingsPage;