import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useAppState } from '../state';
import { TaskStatus } from '../types';

const OrganizationDashboard: React.FC = () => {
  const { tasks } = useAppState();
  
  // Logic: Real queue of submissions in review
  const pendingReview = tasks.filter(t => t.status === TaskStatus.IN_REVIEW);
  const pendingApplicants = tasks.filter(t => t.status === TaskStatus.PENDING);
  const activeMissions = tasks.filter(t => t.status === TaskStatus.IN_PROGRESS);
  const completedMissions = tasks.filter(t => t.status === TaskStatus.COMPLETED);
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="max-w-[1400px] mx-auto px-6 py-8 space-y-12 pb-32"
    >
      {/* Dynamic Intelligence Header */}
      <motion.div variants={itemVariants} className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-slate-100 dark:border-white/5 pb-10">
        <div className="space-y-2">
          <div className="flex items-center gap-4">
            <div className="size-16 bg-blue-600 rounded-3xl flex items-center justify-center text-white shadow-xl shadow-blue-500/20">
              <span className="material-symbols-outlined text-4xl font-black">corporate_fare</span>
            </div>
            <div>
              <h1 className="text-5xl font-black tracking-tight leading-none text-slate-900 dark:text-white">Partner <span className="text-blue-600 italic">Command.</span></h1>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-slate-500 font-bold uppercase tracking-widest text-[11px]">Malete Tech Forum Console v2.8</span>
                <span className="size-1.5 bg-primary rounded-full animate-pulse"></span>
                <span className="text-[10px] font-black text-primary uppercase tracking-widest">Live</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4">
           <Link to="/post-task" className="h-16 px-10 bg-blue-600 text-white rounded-2xl font-black text-lg shadow-2xl shadow-blue-500/20 flex items-center gap-3 hover:scale-105 transition-all">
             <span className="material-symbols-outlined font-black">add_circle</span>
             Launch Mission
           </Link>
        </div>
      </motion.div>

      {/* COMMAND STATS */}
      <motion.div variants={containerVariants} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Impact Points', val: '24.5k', inc: '↑ 12%', c: 'text-primary', i: 'bolt', sub: 'Awarded to community' },
          { label: 'Active Squads', val: activeMissions.length, inc: 'Live', c: 'text-blue-500', i: 'groups', sub: 'Work in progress' },
          { label: 'Pending Review', val: pendingApplicants.length + pendingReview.length, inc: 'Action', c: 'text-orange-500', i: 'history_edu', sub: 'Applicants & Audits' },
          { label: 'Completed', val: completedMissions.length, inc: 'Verified', c: 'text-purple-500', i: 'verified_user', sub: 'Global success stories' }
        ].map((s, i) => (
          <motion.div 
            key={i} 
            variants={itemVariants}
            whileHover={{ y: -5, scale: 1.02 }}
            className="bg-white dark:bg-card-dark p-8 rounded-[3rem] border border-border-light dark:border-border-dark shadow-sm flex flex-col gap-6 cursor-default relative overflow-hidden group"
          >
            <div className="flex justify-between items-start">
              <div className={`size-14 rounded-2xl bg-slate-50 dark:bg-white/5 flex items-center justify-center ${s.c} shadow-inner`}>
                <span className="material-symbols-outlined fill-1 font-black text-3xl">{s.i}</span>
              </div>
              <span className={`text-[11px] font-black uppercase px-3 py-1 rounded-full ${s.c} bg-current/10 border border-current/20`}>{s.inc}</span>
            </div>
            <div>
              <span className="text-secondary text-[11px] font-black uppercase tracking-[0.2em]">{s.label}</span>
              <p className="text-5xl font-black tabular-nums text-slate-900 dark:text-white mt-1">{s.val}</p>
              <p className="text-[10px] font-bold text-slate-400 uppercase mt-2">{s.sub}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* PIPELINE OVERVIEW */}
        <motion.div variants={itemVariants} className="lg:col-span-8 space-y-10">
          <div className="flex items-center justify-between px-2">
            <h2 className="text-3xl font-black tracking-tight flex items-center gap-3">
              <span className="material-symbols-outlined text-blue-600 text-4xl">view_kanban</span>
              Mission Pipeline
            </h2>
            <Link to="/applications" className="text-sm font-black text-blue-600 hover:underline flex items-center gap-2">
              Full Pipeline Console <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </Link>
          </div>

          <div className="space-y-4">
             <AnimatePresence mode="popLayout">
               {tasks.length > 0 ? tasks.slice(0, 5).map((t, i) => (
                 <motion.div 
                  key={t.id} 
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-white dark:bg-card-dark p-8 rounded-[3rem] border border-border-light dark:border-border-dark flex flex-col md:flex-row md:items-center justify-between gap-8 transition-all hover:border-blue-500/40 shadow-sm relative overflow-hidden"
                 >
                   <div className="flex gap-6">
                     <div className="size-20 rounded-[1.5rem] bg-slate-50 dark:bg-slate-900 flex items-center justify-center text-blue-600 shadow-inner group-hover:scale-105 transition-transform">
                       <span className="material-symbols-outlined text-4xl font-black">{t.category === 'Environment' ? 'eco' : t.category === 'Technology & IT' ? 'terminal' : 'language'}</span>
                     </div>
                     <div className="min-w-0">
                       <h3 className="font-black text-2xl tracking-tighter truncate text-slate-900 dark:text-white leading-tight">{t.title}</h3>
                       <div className="flex items-center gap-3 mt-2">
                          <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${t.status === TaskStatus.URGENT ? 'bg-red-500/10 text-red-500' : t.status === TaskStatus.IN_PROGRESS ? 'bg-blue-500/10 text-blue-500' : 'bg-slate-100 dark:bg-white/5 text-slate-500'}`}>
                            {t.status}
                          </span>
                          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{t.xp} XP Offered</span>
                       </div>
                     </div>
                   </div>
                   <div className="flex items-center gap-4">
                     {t.status === TaskStatus.PENDING && (
                       <div className="bg-orange-500/10 text-orange-500 px-4 py-2 rounded-xl text-[10px] font-black border border-orange-500/20">NEW APPLICANT</div>
                     )}
                     {t.status === TaskStatus.IN_REVIEW && (
                       <div className="bg-primary/10 text-primary px-4 py-2 rounded-xl text-[10px] font-black border border-primary/20">AUDIT READY</div>
                     )}
                     <Link to="/applications" className="h-14 px-8 bg-slate-900 text-white dark:bg-white dark:text-slate-900 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center hover:scale-105 transition-all shadow-xl">
                       {t.status === TaskStatus.IN_PROGRESS ? 'Monitor' : 'Manage'}
                     </Link>
                   </div>
                 </motion.div>
               )) : (
                 <div className="py-20 text-center border-2 border-dashed border-slate-200 dark:border-white/5 rounded-[4rem] opacity-30">
                    <span className="material-symbols-outlined text-6xl">cloud_upload</span>
                    <p className="font-black mt-4">Launch your first mission to see the pipeline</p>
                 </div>
               )}
             </AnimatePresence>
          </div>
        </motion.div>

        {/* LIVE ACTIVITY FEED */}
        <motion.aside variants={itemVariants} className="lg:col-span-4 space-y-8">
          <div className="bg-white dark:bg-card-dark p-10 rounded-[3.5rem] border border-border-light dark:border-border-dark shadow-sm h-full flex flex-col">
            <h3 className="font-black text-2xl tracking-tight mb-8 flex items-center gap-3">
              <span className="material-symbols-outlined text-blue-600">tide</span>
              Live Activity
            </h3>
            
            <div className="space-y-8 flex-1">
              <AnimatePresence>
                {pendingApplicants.length > 0 && pendingApplicants.map((app, i) => (
                  <motion.div key={`app-${app.id}`} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="flex gap-4 relative">
                    <div className="size-10 bg-orange-500/10 text-orange-500 rounded-xl flex items-center justify-center shrink-0 border border-orange-500/20">
                      <span className="material-symbols-outlined text-xl">person_add</span>
                    </div>
                    <div>
                      <p className="text-sm font-black text-slate-900 dark:text-white leading-tight">New Pitch Received</p>
                      <p className="text-[10px] text-slate-500 font-medium mt-1">Volunteer applied for <strong>{app.title}</strong></p>
                      <p className="text-[9px] font-black text-slate-400 uppercase mt-2">Just now</p>
                    </div>
                  </motion.div>
                ))}

                {pendingReview.length > 0 && pendingReview.map((rev, i) => (
                  <motion.div key={`rev-${rev.id}`} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="flex gap-4">
                    <div className="size-10 bg-blue-500/10 text-blue-500 rounded-xl flex items-center justify-center shrink-0 border border-blue-500/20">
                      <span className="material-symbols-outlined text-xl">history_edu</span>
                    </div>
                    <div>
                      <p className="text-sm font-black text-slate-900 dark:text-white leading-tight">Evidence Submitted</p>
                      <p className="text-[10px] text-slate-500 font-medium mt-1">Audit ready for <strong>{rev.title}</strong></p>
                      <p className="text-[9px] font-black text-slate-400 uppercase mt-2">New</p>
                    </div>
                  </motion.div>
                ))}
                
                {completedMissions.length > 0 && completedMissions.map((c, i) => (
                  <motion.div key={`comp-${c.id}`} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="flex gap-4">
                    <div className="size-10 bg-primary/10 text-primary rounded-xl flex items-center justify-center shrink-0 border border-primary/20">
                      <span className="material-symbols-outlined text-xl">verified</span>
                    </div>
                    <div>
                      <p className="text-sm font-black text-slate-900 dark:text-white leading-tight">Impact Verified</p>
                      <p className="text-[10px] text-slate-500 font-medium mt-1">Rewards released for <strong>{c.title}</strong></p>
                      <p className="text-[9px] font-black text-slate-400 uppercase mt-2">Verified</p>
                    </div>
                  </motion.div>
                ))}

                {pendingApplicants.length === 0 && pendingReview.length === 0 && completedMissions.length === 0 && (
                  <div className="flex flex-col items-center justify-center py-20 opacity-20">
                     <span className="material-symbols-outlined text-5xl mb-4">notifications_off</span>
                     <p className="text-[10px] font-black uppercase">No Recent Activity</p>
                  </div>
                )}
              </AnimatePresence>
            </div>

            <button className="w-full mt-10 py-5 bg-slate-50 dark:bg-white/5 rounded-3xl font-black text-[11px] uppercase tracking-widest text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all border border-slate-100 dark:border-white/5">
              Download Audit History
            </button>
          </div>
        </motion.aside>
      </div>
    </motion.div>
  );
};

export default OrganizationDashboard;