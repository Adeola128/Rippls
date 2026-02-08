
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useAppState } from '../state';
import { TaskStatus } from '../types';

const VolunteerDashboard: React.FC = () => {
  const { user, tasks } = useAppState();
  
  const activeMissions = tasks.filter(t => t.status === TaskStatus.IN_PROGRESS || t.status === TaskStatus.IN_REVIEW);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.1
      } 
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.6, 
        ease: [0.22, 1, 0.36, 1] 
      } 
    }
  };

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="max-w-[1400px] mx-auto px-6 py-10 space-y-10"
    >
      <motion.section variants={itemVariants} className="grid lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 bg-slate-900 text-white rounded-[3.5rem] p-10 relative overflow-hidden flex flex-col justify-between min-h-[400px] shadow-2xl">
          <div className="relative z-10 flex items-center gap-8">
            <motion.div 
              whileHover={{ rotate: 5, scale: 1.05 }}
              className="relative"
            >
              <img src={user.avatar} className="size-32 rounded-[2.5rem] object-cover border-4 border-primary/30 shadow-2xl" alt="P" />
              <div className="absolute -top-2 -right-2 size-12 bg-primary text-slate-900 rounded-2xl flex items-center justify-center font-black text-lg shadow-lg border-4 border-slate-900">{user.level}</div>
            </motion.div>
            <div>
              <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
                <h1 className="text-5xl font-black tracking-tighter">Welcome back, {user.name.split(' ')[0]}!</h1>
                <p className="text-slate-400 font-medium text-xl mt-2 flex items-center gap-2">
                  Your impact trajectory is <span className="text-primary font-bold flex items-center gap-1">Rising Fast <span className="material-symbols-outlined text-xl">trending_up</span></span>.
                </p>
              </motion.div>
            </div>
          </div>

          <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            {[
              { l: 'Total XP', v: user.totalXP.toLocaleString(), i: 'stars', c: 'text-primary' },
              { l: 'Impact Hours', v: user.totalHours, i: 'schedule', c: 'text-blue-400' },
              { l: 'Missions', v: tasks.filter(t => t.status === TaskStatus.COMPLETED).length, i: 'task_alt', c: 'text-purple-400' },
              { l: 'Streak', v: user.streak, i: 'local_fire_department', c: 'text-orange-400' },
            ].map((stat, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ y: -5, backgroundColor: 'rgba(255,255,255,0.08)' }}
                className="bg-white/5 border border-white/5 p-6 rounded-[2.5rem] group cursor-default backdrop-blur-sm transition-all"
              >
                <span className={`material-symbols-outlined ${stat.c} mb-3 text-3xl fill-1`}>{stat.i}</span>
                <p className="text-3xl font-black">{stat.v}</p>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{stat.l}</p>
              </motion.div>
            ))}
          </div>
          <div className="absolute top-0 right-0 size-[600px] bg-primary/10 blur-[140px] rounded-full -translate-y-1/2 translate-x-1/2"></div>
        </div>

        <div className="lg:col-span-4 bg-white dark:bg-card-dark rounded-[3.5rem] p-10 border border-border-light dark:border-border-dark shadow-sm flex flex-col justify-between overflow-hidden relative group">
          <div className="absolute top-0 right-0 size-32 bg-primary/5 blur-3xl group-hover:bg-primary/10 transition-colors" />
          <div className="space-y-6 relative z-10">
            <div className="flex justify-between items-end">
              <h3 className="text-2xl font-black">Rank Progression</h3>
              <span className="text-xs font-black text-primary uppercase tracking-[0.2em]">Level {user.level + 1}</span>
            </div>
            <div className="h-6 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden p-1.5 shadow-inner">
              <motion.div 
                initial={{ width: 0 }} 
                animate={{ width: `${(user.currentXP / user.targetXP) * 100}%` }} 
                transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                className="h-full bg-primary rounded-full shadow-lg shadow-primary/20 relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-[shimmer_2s_infinite] pointer-events-none" />
              </motion.div>
            </div>
            <p className="text-sm font-bold text-slate-500 text-right">{user.targetXP - user.currentXP} XP to Rank Up</p>
          </div>
          
          <Link to="/discovery" className="w-full h-20 bg-slate-900 text-white dark:bg-white/10 rounded-[2rem] font-black text-lg flex items-center justify-center gap-4 hover:bg-primary hover:text-slate-900 transition-all shadow-xl hover:-translate-y-1 relative z-10 overflow-hidden group">
            <span className="material-symbols-outlined text-2xl group-hover:rotate-12 transition-transform">explore</span>
            Enter Discovery
          </Link>
        </div>
      </motion.section>

      <div className="grid lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-8">
          <section className="space-y-6">
            <motion.h2 variants={itemVariants} className="text-3xl font-black tracking-tight px-2">Work Lifecycle</motion.h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              {activeMissions.length > 0 ? activeMissions.map((task, i) => (
                <motion.div 
                  key={task.id}
                  variants={itemVariants}
                  whileHover={{ y: -8, scale: 1.01 }}
                  className="bg-white dark:bg-card-dark rounded-[3rem] border border-border-light dark:border-border-dark p-8 shadow-sm group relative overflow-hidden"
                >
                  <div className="flex items-center gap-5 mb-8">
                    <div className="size-16 bg-slate-50 dark:bg-slate-900 p-3 rounded-[1.5rem] border border-slate-100 dark:border-white/5 shadow-inner">
                      <img src={task.orgLogo} className="w-full h-full object-contain" alt="Org" />
                    </div>
                    <div>
                      <h4 className="font-black text-xl group-hover:text-primary transition-colors truncate">{task.title}</h4>
                      <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">{task.organization}</p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <span className={`text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full ${task.status === TaskStatus.IN_REVIEW ? 'bg-orange-500/10 text-orange-500 border border-orange-500/20' : 'bg-primary/10 text-primary border border-primary/20'}`}>
                        {task.status === TaskStatus.IN_REVIEW ? 'Under Audit' : 'Active Duty'}
                      </span>
                      <div className="flex items-center gap-1.5 bg-slate-50 dark:bg-white/5 px-3 py-1 rounded-xl">
                        <span className="material-symbols-outlined text-primary fill-1 text-base">stars</span>
                        <span className="text-xs font-black">+{task.xp} XP</span>
                      </div>
                    </div>
                    
                    {task.status === TaskStatus.IN_REVIEW ? (
                      <div className="p-5 bg-slate-50 dark:bg-white/5 rounded-2xl text-xs font-bold text-slate-500 italic border border-dashed border-border-light dark:border-border-dark">
                        Evidence submitted. Awaiting partner verification...
                      </div>
                    ) : (
                      <Link to={`/active-task/${task.id}`} className="w-full h-14 bg-slate-900 text-white rounded-2xl flex items-center justify-center font-black text-sm hover:bg-primary hover:text-slate-900 transition-all shadow-lg group">
                        Log Final Impact
                        <span className="material-symbols-outlined ml-2 group-hover:translate-x-1 transition-transform">arrow_forward</span>
                      </Link>
                    )}
                  </div>
                </motion.div>
              )) : (
                <motion.div 
                  variants={itemVariants}
                  className="md:col-span-2 p-20 bg-white dark:bg-card-dark rounded-[4rem] border-2 border-dashed border-border-light dark:border-border-dark text-center space-y-6 flex flex-col items-center"
                >
                  <motion.div 
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ repeat: Infinity, duration: 4 }}
                    className="size-24 bg-primary/5 text-primary rounded-full flex items-center justify-center"
                  >
                    <span className="material-symbols-outlined text-6xl">rocket_launch</span>
                  </motion.div>
                  <div className="space-y-2">
                    <p className="text-2xl font-black">Ready to start your first ripple?</p>
                    <p className="text-slate-400 font-medium">Browse opportunities to start earning XP today.</p>
                  </div>
                  <Link to="/discovery" className="px-12 py-4 bg-primary text-slate-900 rounded-[2rem] font-black text-sm inline-block shadow-2xl shadow-primary/20 hover:scale-105 transition-all">Browse Opportunities</Link>
                </motion.div>
              )}
            </div>
          </section>
        </div>

        <div className="lg:col-span-4 space-y-8">
          <motion.section variants={itemVariants} className="bg-white dark:bg-card-dark rounded-[3.5rem] p-8 border border-border-light dark:border-border-dark shadow-sm">
            <h3 className="text-2xl font-black mb-8 px-2">Verification Stream</h3>
            <div className="space-y-6">
              {tasks.filter(t => t.status === TaskStatus.COMPLETED).length > 0 ? (
                tasks.filter(t => t.status === TaskStatus.COMPLETED).slice(0, 3).map((task, idx) => (
                  <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    key={idx} 
                    className="flex items-center gap-5 p-5 bg-slate-50 dark:bg-white/5 rounded-3xl border border-border-light dark:border-border-dark"
                  >
                    <div className="size-12 bg-primary/10 text-primary rounded-2xl flex items-center justify-center shadow-inner">
                      <span className="material-symbols-outlined font-black text-2xl">verified</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-base font-black truncate">{task.title}</p>
                      <p className="text-[10px] font-black uppercase text-slate-400 mt-1">+{task.xp} XP AWARDED</p>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="text-center py-10 opacity-30 italic">
                  <p className="text-sm font-bold">No verified impact yet.</p>
                </div>
              )}
            </div>
          </motion.section>

          <motion.div 
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            className="bg-indigo-600 text-white p-10 rounded-[4rem] shadow-2xl relative overflow-hidden group cursor-pointer"
          >
            <div className="relative z-10 space-y-4">
              <h3 className="text-2xl font-black">Master Insight</h3>
              <p className="text-white/80 text-lg font-medium leading-relaxed italic">"Verified skill-nodes are the core currency of the next economy."</p>
              <button className="text-[10px] font-black text-white/50 uppercase tracking-[0.3em] mt-6">Read Whitepaper</button>
            </div>
            <span className="absolute -bottom-10 -right-10 material-symbols-outlined text-[10rem] opacity-10 pointer-events-none group-hover:rotate-12 transition-transform duration-1000">auto_awesome</span>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default VolunteerDashboard;
