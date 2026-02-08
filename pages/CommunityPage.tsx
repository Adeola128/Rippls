
import React from 'react';
import { motion } from 'framer-motion';

const RIPPLES = [
  { id: 1, user: 'Elena Grace', action: 'completed', task: 'Annual Gala Branding', xp: 200, time: '2 mins ago', avatar: 'https://picsum.photos/seed/elena/100/100' },
  { id: 2, user: 'Marcus Thorne', action: 'joined', task: 'Ocean Guard Foundation', xp: 50, time: '15 mins ago', avatar: 'https://picsum.photos/seed/marcus/100/100' },
  { id: 3, user: 'Sara Smith', action: 'earned', badge: 'Community Hero', time: '1 hour ago', avatar: 'https://picsum.photos/seed/sara/100/100', isBadge: true },
  { id: 4, user: 'Jason Lee', action: 'donated', hours: 5, task: 'Food Drive Logistics', time: '3 hours ago', avatar: 'https://picsum.photos/seed/jason/100/100' },
];

const CommunityPage: React.FC = () => {
  return (
    <div className="max-w-[1200px] mx-auto px-6 py-10">
      <div className="grid lg:grid-cols-12 gap-10">
        <div className="lg:col-span-8 space-y-8">
          <div className="flex flex-col gap-2">
            <h1 className="text-4xl font-black tracking-tight">Community Ripples</h1>
            <p className="text-secondary">See how the movement is growing in real-time.</p>
          </div>

          <div className="bg-white dark:bg-card-dark rounded-3xl border border-border-light dark:border-border-dark p-2 overflow-hidden shadow-sm">
            <div className="flex p-2 gap-2 overflow-x-auto no-scrollbar">
              {['Live Feed', 'Popular', 'Organizations', 'Events'].map((tab, i) => (
                <button key={tab} className={`px-6 py-2.5 rounded-2xl text-sm font-black whitespace-nowrap transition-all ${i === 0 ? 'bg-primary text-slate-900' : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-white/5'}`}>
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            {RIPPLES.map((ripple, i) => (
              <motion.div 
                key={ripple.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white dark:bg-card-dark p-6 rounded-3xl border border-border-light dark:border-border-dark flex gap-6 group hover:border-primary/50 transition-all shadow-sm"
              >
                <div className="size-16 rounded-2xl overflow-hidden shrink-0 shadow-lg border-2 border-primary/10">
                  <img src={ripple.avatar} className="w-full h-full object-cover" alt={ripple.user} />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <p className="font-black text-lg">{ripple.user}</p>
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{ripple.time}</span>
                  </div>
                  <div className="flex flex-wrap items-center gap-x-1.5 text-slate-600 dark:text-slate-400 leading-tight">
                    <span>just {ripple.action}</span>
                    {ripple.isBadge ? (
                      <span className="text-orange-500 font-bold flex items-center gap-1">
                        <span className="material-symbols-outlined text-sm fill-1">military_tech</span>
                        {ripple.badge}
                      </span>
                    ) : (
                      <span className="text-slate-900 dark:text-white font-black">{ripple.task}</span>
                    )}
                  </div>
                  <div className="mt-4 flex items-center gap-4">
                    <button className="flex items-center gap-1.5 text-xs font-black text-slate-400 hover:text-red-500 transition-colors">
                      <span className="material-symbols-outlined text-lg">favorite</span> 24
                    </button>
                    <button className="flex items-center gap-1.5 text-xs font-black text-slate-400 hover:text-primary transition-colors">
                      <span className="material-symbols-outlined text-lg">comment</span> 8
                    </button>
                    <div className="ml-auto flex items-center gap-1.5 px-3 py-1 bg-primary/10 text-primary rounded-full text-[10px] font-bold">
                      <span className="material-symbols-outlined text-xs">bolt</span>
                      +{ripple.xp || 10} XP
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <aside className="lg:col-span-4 space-y-8">
          <div className="bg-slate-900 text-white rounded-[2.5rem] p-8 relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 size-40 bg-primary/20 blur-[80px]"></div>
            <h3 className="text-xl font-black mb-6 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">local_fire_department</span>
              Hot Causes
            </h3>
            <div className="space-y-4">
              {[
                { n: '#OceanGuard', count: '1.2k active', c: 'blue-500' },
                { n: '#GreenEarth', count: '850 active', c: 'primary' },
                { n: '#EduForAll', count: '420 active', c: 'orange-500' }
              ].map(tag => (
                <div key={tag.n} className="p-4 bg-white/5 rounded-2xl hover:bg-white/10 cursor-pointer transition-all border border-white/5">
                  <p className="font-black text-lg mb-1">{tag.n}</p>
                  <p className="text-xs text-slate-400 font-bold uppercase">{tag.count}</p>
                </div>
              ))}
            </div>
            <button className="w-full mt-8 py-4 bg-white text-slate-900 rounded-2xl font-black text-sm hover:scale-105 transition-all">Join a Group</button>
          </div>

          <div className="bg-white dark:bg-card-dark rounded-[2.5rem] p-8 border border-border-light dark:border-border-dark shadow-sm">
            <h3 className="text-xl font-black mb-6">Top Changemakers</h3>
            <div className="space-y-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img src={`https://picsum.photos/seed/${i*20}/40/40`} className="size-10 rounded-full bg-slate-100" />
                    <div>
                      <p className="font-bold text-sm">Volunteer_{i}</p>
                      <p className="text-[10px] font-bold text-primary uppercase">Master Level</p>
                    </div>
                  </div>
                  <span className="text-xs font-black">1.2k XP</span>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default CommunityPage;
