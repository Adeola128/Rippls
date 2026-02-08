
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export const ORGS = [
  { id: 'org1', n: 'Malete Tech Forum', i: 'https://picsum.photos/seed/org1/200/200', c: 'Tech Education', m: 12, h: 450, v: true },
  { id: 'org2', n: 'Oratora', i: 'https://picsum.photos/seed/org2/200/200', c: 'Voice Accessibility', m: 8, h: 220, v: true },
  { id: 'org3', n: 'EcoWatch Global', i: 'https://picsum.photos/seed/org3/200/200', c: 'Environment', m: 24, h: 1200, v: true },
  { id: 'org4', n: 'Nexus Stack', i: 'https://picsum.photos/seed/org4/200/200', c: 'Open Source', m: 15, h: 890, v: true },
  { id: 'org5', n: 'Global Aid', i: 'https://picsum.photos/seed/org5/200/200', c: 'Emergency Relief', m: 32, h: 2500, v: true },
  { id: 'org6', n: 'Urban Sprouts', i: 'https://picsum.photos/seed/org6/200/200', c: 'Community Food', m: 6, h: 180, v: false }
];

const OrganizationsPage: React.FC = () => {
  return (
    <div className="max-w-[1400px] mx-auto px-6 py-12 space-y-12">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-8">
        <div>
          <h1 className="text-5xl font-black tracking-tight">Verified <span className="text-primary">Partners</span></h1>
          <p className="text-lg text-slate-500 font-medium">Connect with the organizations driving global change.</p>
        </div>
        <div className="flex gap-4">
          <input 
            className="h-14 bg-white dark:bg-card-dark border border-border-light dark:border-border-dark rounded-xl px-6 font-bold w-64 focus:ring-2 focus:ring-primary transition-all"
            placeholder="Search partners..."
          />
        </div>
      </header>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {ORGS.map((org, i) => (
          <motion.div 
            key={org.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="group bg-white dark:bg-card-dark rounded-[3rem] p-10 border border-border-light dark:border-border-dark shadow-sm hover:border-primary/40 transition-all flex flex-col"
          >
            <div className="flex items-center justify-between mb-8">
              <div className="size-20 rounded-[1.5rem] bg-slate-50 dark:bg-slate-900/50 p-3 border border-slate-100 dark:border-white/5 shadow-inner">
                <img src={org.i} className="w-full h-full object-contain" alt="Org" />
              </div>
              {org.v && (
                <div className="bg-primary/10 px-4 py-1.5 rounded-full border border-primary/20 flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-primary text-lg fill-1">verified</span>
                  <span className="text-[10px] font-black text-primary uppercase">Verified</span>
                </div>
              )}
            </div>

            <div className="flex-1 space-y-2">
              <h3 className="text-2xl font-black group-hover:text-primary transition-colors">{org.n}</h3>
              <p className="text-xs font-black uppercase text-slate-400 tracking-widest">{org.c}</p>
              <p className="text-sm text-slate-500 font-medium line-clamp-2 pt-2">
                Empowering communities through innovative solutions and dedicated volunteer support across the globe.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 my-8 pt-8 border-t border-slate-50 dark:border-white/5">
              <div>
                <p className="text-xl font-black">{org.m}</p>
                <p className="text-[10px] font-black uppercase text-slate-400">Missions</p>
              </div>
              <div>
                <p className="text-xl font-black">{org.h}h</p>
                <p className="text-[10px] font-black uppercase text-slate-400">Total Impact</p>
              </div>
            </div>

            <div className="flex gap-2">
              <Link to={`/partner/${org.id}`} className="flex-1 h-12 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl font-black text-xs hover:scale-[1.02] transition-all flex items-center justify-center">View Profile</Link>
              <button className="size-12 bg-slate-50 dark:bg-white/5 rounded-xl flex items-center justify-center text-slate-400 hover:text-primary transition-colors border border-slate-100 dark:border-white/5">
                <span className="material-symbols-outlined text-xl">favorite</span>
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default OrganizationsPage;
