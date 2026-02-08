
import React from 'react';
import { motion } from 'framer-motion';

const TOP_THREE = [
  { id: 2, name: 'Jordan Lee', xp: '8,420 XP', rank: 2, avatar: 'https://picsum.photos/id/65/100/100', color: 'slate-300' },
  { id: 1, name: 'Alex Rivera', xp: '12,500 XP', rank: 1, avatar: 'https://picsum.photos/id/66/100/100', color: 'primary' },
  { id: 3, name: 'Sam Taylor', xp: '7,150 XP', rank: 3, avatar: 'https://picsum.photos/id/67/100/100', color: 'amber-600' }
];

const LeaderboardPage: React.FC = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-[1280px] mx-auto px-6 py-8 space-y-10"
    >
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-black tracking-tight">Leaderboard</h1>
        <p className="text-secondary">Celebrating the top contributors in the Rippl community</p>
      </div>

      <div className="flex justify-center items-end gap-4 md:gap-12 py-10 bg-slate-900 rounded-[3rem] border border-white/5 shadow-2xl relative overflow-hidden">
        {/* Podium Background Effect */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,_rgba(19,236,109,0.1)_0%,_transparent_60%)] pointer-events-none"></div>
        
        {/* 2nd Place */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="flex flex-col items-center gap-4 group"
        >
          <div className="relative">
            <motion.img 
              whileHover={{ scale: 1.1 }}
              src={TOP_THREE[0].avatar} 
              className="size-24 rounded-full border-4 border-slate-400 object-cover shadow-xl cursor-pointer" 
              alt="2nd" 
            />
            <div className="absolute -bottom-2 -right-2 bg-slate-400 text-slate-900 size-8 rounded-full flex items-center justify-center font-black">2</div>
          </div>
          <div className="text-center">
            <p className="text-white font-bold">{TOP_THREE[0].name}</p>
            <p className="text-primary text-sm font-bold">{TOP_THREE[0].xp}</p>
          </div>
          <motion.div 
            initial={{ height: 0 }}
            animate={{ height: 96 }}
            transition={{ delay: 0.8, duration: 0.8, ease: "easeOut" }}
            className="w-28 bg-slate-400/20 rounded-t-2xl flex items-center justify-center border-t border-x border-slate-400/20"
          >
            <span className="material-symbols-outlined text-slate-400 text-4xl fill-1">workspace_premium</span>
          </motion.div>
        </motion.div>

        {/* 1st Place */}
        <motion.div 
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="flex flex-col items-center gap-4 -translate-y-8 scale-110 group z-10"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full scale-150"></div>
            <motion.img 
              whileHover={{ scale: 1.1, rotate: 5 }}
              src={TOP_THREE[1].avatar} 
              className="relative size-32 rounded-full border-4 border-primary object-cover shadow-2xl cursor-pointer" 
              alt="1st" 
            />
            <div className="absolute -bottom-2 -right-2 bg-primary text-slate-900 size-10 rounded-full flex items-center justify-center font-black shadow-lg">1</div>
            <div className="absolute -top-10 left-1/2 -translate-x-1/2">
              <motion.span 
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="material-symbols-outlined text-yellow-400 text-5xl fill-1 drop-shadow-[0_0_10px_rgba(250,204,21,0.5)]"
              >star</motion.span>
            </div>
          </div>
          <div className="text-center">
            <p className="text-white text-xl font-black">{TOP_THREE[1].name}</p>
            <p className="text-primary font-black">{TOP_THREE[1].xp}</p>
          </div>
          <motion.div 
            initial={{ height: 0 }}
            animate={{ height: 128 }}
            transition={{ delay: 0.6, duration: 1, ease: "easeOut" }}
            className="w-32 bg-primary/20 rounded-t-3xl flex items-center justify-center border-t border-x border-primary/40"
          >
            <span className="material-symbols-outlined text-primary text-6xl fill-1">emoji_events</span>
          </motion.div>
        </motion.div>

        {/* 3rd Place */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="flex flex-col items-center gap-4 group"
        >
          <div className="relative">
            <motion.img 
              whileHover={{ scale: 1.1 }}
              src={TOP_THREE[2].avatar} 
              className="size-20 rounded-full border-4 border-amber-600 object-cover shadow-xl cursor-pointer" 
              alt="3rd" 
            />
            <div className="absolute -bottom-2 -right-2 bg-amber-600 text-slate-900 size-7 rounded-full flex items-center justify-center font-black">3</div>
          </div>
          <div className="text-center">
            <p className="text-white font-bold">{TOP_THREE[2].name}</p>
            <p className="text-primary text-sm font-bold">{TOP_THREE[2].xp}</p>
          </div>
          <motion.div 
            initial={{ height: 0 }}
            animate={{ height: 64 }}
            transition={{ delay: 1, duration: 0.8, ease: "easeOut" }}
            className="w-24 bg-amber-600/20 rounded-t-2xl flex items-center justify-center border-t border-x border-amber-600/20"
          >
            <span className="material-symbols-outlined text-amber-600 text-3xl fill-1">military_tech</span>
          </motion.div>
        </motion.div>
      </div>

      {/* Your Rank Bar */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.2 }}
        className="bg-primary rounded-3xl p-6 flex items-center justify-between shadow-2xl group overflow-hidden relative"
      >
        <div className="flex items-center gap-6 relative z-10">
          <img src="https://picsum.photos/id/64/100/100" className="size-16 rounded-full border-2 border-slate-900" alt="You" />
          <div>
            <p className="text-slate-900 text-xs font-black uppercase tracking-widest opacity-60">Your Position</p>
            <h3 className="text-slate-900 text-3xl font-black">#47 <span className="text-sm opacity-60">You</span></h3>
          </div>
        </div>
        <div className="flex items-center gap-8 relative z-10">
           <div className="text-right">
              <p className="text-slate-900 font-black text-xl">4,200 XP</p>
              <p className="text-slate-900/60 text-xs font-bold flex items-center justify-end gap-1">
                <span className="material-symbols-outlined text-sm">trending_up</span> +3 this week
              </p>
           </div>
           <div className="bg-slate-900/10 px-4 py-2 rounded-full border border-slate-900/10">
             <span className="text-slate-900 font-black">Top 15%</span>
           </div>
        </div>
        <motion.div 
          animate={{ x: [-200, 600] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 pointer-events-none"
        />
      </motion.div>

      {/* List */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="bg-white dark:bg-card-dark rounded-2xl border border-border-light dark:border-border-dark overflow-hidden shadow-sm"
      >
        <table className="w-full text-left">
          <thead className="bg-slate-50 dark:bg-slate-800/50 border-b border-border-light dark:border-border-dark">
            <tr className="text-slate-500 text-[10px] font-black uppercase tracking-widest">
              <th className="px-8 py-4">Rank</th>
              <th className="px-8 py-4">Volunteer</th>
              <th className="px-8 py-4">Level</th>
              <th className="px-8 py-4">XP</th>
              <th className="px-8 py-4 text-right">Trend</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-light dark:divide-border-dark">
            {[4,5,6,7,8,9,10].map((r, i) => (
              <motion.tr 
                key={r} 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.4 + (i * 0.05) }}
                className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors cursor-default"
              >
                <td className="px-8 py-6 font-black text-lg">#{r}</td>
                <td className="px-8 py-6">
                  <div className="flex items-center gap-3">
                    <img src={`https://picsum.photos/seed/${r}/40/40`} className="size-10 rounded-full" alt="V" />
                    <span className="font-bold">Volunteer Name {r}</span>
                  </div>
                </td>
                <td className="px-8 py-6">
                  <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase">Master</span>
                </td>
                <td className="px-8 py-6 font-bold">{7000 - r*200}</td>
                <td className="px-8 py-6 text-right">
                  <span className="text-primary font-bold flex items-center justify-end gap-1">
                    <span className="material-symbols-outlined text-sm">north</span> {r % 2 === 0 ? 2 : 1}
                  </span>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default LeaderboardPage;
