
import React from 'react';
import { motion } from 'framer-motion';
import { useParams, Link } from 'react-router-dom';
import { MOCK_ACHIEVEMENTS } from '../constants';

const PublicProfilePage: React.FC = () => {
  const { id } = useParams();

  return (
    <div className="max-w-[1000px] mx-auto px-6 py-12 space-y-12">
      <header className="flex flex-col md:flex-row items-center gap-10 bg-white dark:bg-card-dark p-12 rounded-[3.5rem] border border-border-light dark:border-border-dark shadow-sm">
        <div className="relative">
          <img src={`https://picsum.photos/seed/${id}/400/400`} className="size-48 rounded-[3rem] object-cover border-4 border-primary shadow-2xl" alt="P" />
          <div className="absolute -bottom-4 -right-4 size-14 bg-slate-900 text-primary rounded-2xl flex items-center justify-center font-black text-xl shadow-xl">15</div>
        </div>
        
        <div className="flex-1 text-center md:text-left space-y-4">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <h1 className="text-4xl font-black tracking-tight">Alex Rivera</h1>
            <span className="px-4 py-1.5 bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest rounded-full border border-primary/20 max-w-fit mx-auto md:mx-0">Elite Master</span>
          </div>
          <p className="text-slate-500 font-medium text-lg max-w-lg">
            Senior Product Designer passionate about reforestation and accessible tech. Member since June 2022.
          </p>
          <div className="flex flex-wrap justify-center md:justify-start gap-4 pt-2">
            <div className="flex items-center gap-2 text-sm font-bold bg-slate-50 dark:bg-white/5 px-4 py-2 rounded-xl">
              <span className="material-symbols-outlined text-primary text-xl fill-1">verified</span>
              12 Verified Projects
            </div>
            <div className="flex items-center gap-2 text-sm font-bold bg-slate-50 dark:bg-white/5 px-4 py-2 rounded-xl">
              <span className="material-symbols-outlined text-orange-500 text-xl fill-1">local_fire_department</span>
              156 Impact Hours
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 w-full md:w-auto">
          <button className="h-14 px-8 bg-primary text-slate-900 rounded-2xl font-black shadow-lg shadow-primary/20 hover:scale-105 transition-all flex items-center justify-center gap-2">
            <span className="material-symbols-outlined">person_add</span>
            Follow
          </button>
          <button className="h-14 px-8 bg-slate-100 dark:bg-white/5 rounded-2xl font-black hover:bg-slate-200 transition-all flex items-center justify-center gap-2">
            <span className="material-symbols-outlined">chat_bubble</span>
            Message
          </button>
        </div>
      </header>

      <div className="grid md:grid-cols-12 gap-10">
        <div className="md:col-span-8 space-y-10">
          <section className="space-y-6">
            <h3 className="text-2xl font-black">Recent Contributions</h3>
            <div className="space-y-4">
              {[
                { t: 'Annual Gala Branding', o: 'Malete Tech Forum', h: '8h', date: 'Oct 15' },
                { t: 'UX Audit', o: 'EcoWatch Global', h: '12h', date: 'Sept 28' },
                { t: 'Identity Design', o: 'Urban Sprouts', h: '24h', date: 'Aug 12' }
              ].map((p, i) => (
                <div key={i} className="p-6 bg-white dark:bg-card-dark rounded-3xl border border-border-light dark:border-border-dark flex items-center justify-between group hover:border-primary transition-all">
                  <div>
                    <h4 className="font-black text-xl group-hover:text-primary transition-colors">{p.t}</h4>
                    <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">{p.o}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-black">{p.h}</p>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{p.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="md:col-span-4 space-y-10">
          <section className="space-y-6">
            <h3 className="text-2xl font-black">Skill Badges</h3>
            <div className="grid grid-cols-2 gap-4">
              {MOCK_ACHIEVEMENTS.slice(0, 4).map(a => (
                <div key={a.id} className="bg-slate-50 dark:bg-white/5 p-6 rounded-[2.5rem] flex flex-col items-center text-center gap-2 border border-slate-100 dark:border-white/5">
                  <div className="size-16 bg-white dark:bg-card-dark rounded-2xl flex items-center justify-center text-primary shadow-sm">
                    <span className="material-symbols-outlined text-3xl fill-1">{a.icon}</span>
                  </div>
                  <span className="text-xs font-black">{a.title}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-slate-900 text-white rounded-[3rem] p-8 space-y-6 relative overflow-hidden">
             <div className="absolute top-0 right-0 size-32 bg-primary/20 blur-[80px]"></div>
             <h3 className="text-xl font-black">Impact Stats</h3>
             <div className="space-y-4">
               <div className="flex justify-between items-center py-2 border-b border-white/10">
                 <span className="text-slate-400 font-bold">Global Rank</span>
                 <span className="font-black text-primary">#142</span>
               </div>
               <div className="flex justify-between items-center py-2 border-b border-white/10">
                 <span className="text-slate-400 font-bold">Endorsements</span>
                 <span className="font-black">28</span>
               </div>
               <div className="flex justify-between items-center py-2 border-b border-white/10">
                 <span className="text-slate-400 font-bold">Streak</span>
                 <span className="font-black">12 Days</span>
               </div>
             </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PublicProfilePage;
