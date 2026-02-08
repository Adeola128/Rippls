import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAppState } from '../state';
import { TaskStatus } from '../types';

const TaskDetailPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { tasks } = useAppState();
  
  const task = (tasks || []).find(t => t.id === id) || (tasks && tasks[0]);

  if (!task) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="size-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const isAlreadyActive = task.status === TaskStatus.IN_PROGRESS || task.status === TaskStatus.IN_REVIEW;
  const isPending = task.status === TaskStatus.PENDING;

  const handleApply = () => {
    if (isAlreadyActive) {
      navigate(`/active-task/${task.id}`);
    } else if (isPending) {
      navigate('/dashboard');
    } else {
      navigate(`/apply/${task.id}`);
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-[1200px] mx-auto px-6 py-8">
      <motion.nav initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-2 text-sm font-medium text-secondary mb-8">
        <Link to="/discovery" className="hover:text-primary transition-colors">Discovery</Link>
        <span className="material-symbols-outlined text-sm">chevron_right</span>
        <span className="text-slate-900 dark:text-white truncate">{task.title}</span>
      </motion.nav>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative h-64 md:h-96 rounded-[3rem] overflow-hidden mb-20 shadow-2xl">
        <img src={`https://picsum.photos/seed/${task.id}/1200/600`} className="w-full h-full object-cover" alt="Banner" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
        <div className="absolute bottom-8 left-8 right-8 flex flex-col md:flex-row items-end md:items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.3 }} className="p-1 bg-white dark:bg-background-dark rounded-3xl shadow-2xl">
              <img src={task.orgLogo} className="size-20 md:size-32 rounded-3xl object-cover" alt="Logo" />
            </motion.div>
            <div>
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="flex items-center gap-2">
                <h2 className="text-3xl md:text-4xl font-black text-white drop-shadow-md">{task.organization}</h2>
                <span className="material-symbols-outlined text-primary fill-1 text-2xl">verified</span>
              </motion.div>
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="text-white/80 font-bold mt-1">Social Impact Partner since 2021</motion.p>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 space-y-12">
          <section>
            <h1 className="text-4xl md:text-5xl font-black leading-tight mb-8">{task.title}</h1>
            <div className="flex flex-wrap gap-4">
              {[
                { icon: 'schedule', text: `${task.hours} hours` },
                { icon: 'calendar_today', text: task.deadline },
                { icon: 'bolt', text: `+${task.xp} XP`, primary: true },
                { icon: 'public', text: task.locationType }
              ].map((pill, i) => (
                <div key={i} className={`flex items-center gap-2 px-5 py-3 rounded-2xl font-black text-sm shadow-sm ${pill.primary ? 'bg-primary/20 text-primary border border-primary/20' : 'bg-white dark:bg-card-dark border border-slate-100 dark:border-white/5'}`}>
                  <span className="material-symbols-outlined text-xl fill-1">{pill.icon}</span>
                  {pill.text}
                </div>
              ))}
            </div>
          </section>

          <section className="prose prose-slate dark:prose-invert max-w-none">
            <h3 className="text-2xl font-black mb-4">About this mission</h3>
            <p className="text-slate-600 dark:text-gray-400 leading-relaxed text-lg mb-8">{task.description}</p>
            <h3 className="text-2xl font-black mb-6">Key Deliverables</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {['Execute key designs based on brief', 'Collaborate with lead', 'Optimize assets', 'Weekly status sync'].map((item, i) => (
                <div key={i} className="flex gap-4 items-center p-5 bg-white dark:bg-card-dark rounded-2xl border border-slate-100 dark:border-white/5 shadow-sm">
                  <span className="material-symbols-outlined text-primary fill-1">check_circle</span>
                  <span className="font-bold text-slate-700 dark:text-slate-200">{item}</span>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="lg:col-span-4">
          <div className="sticky top-24 space-y-6">
            <div className="bg-white dark:bg-card-dark border border-border-light dark:border-border-dark rounded-[3rem] p-10 shadow-2xl relative overflow-hidden text-center">
              <div className="absolute top-0 right-0 size-32 bg-primary/10 blur-3xl" />
              <h3 className="text-xl font-black mb-6">Mission Access</h3>
              <div className="text-primary text-5xl font-black mb-8">+{task.xp} XP</div>
              
              <button 
                onClick={handleApply}
                className={`w-full h-16 ${isPending ? 'bg-amber-500 text-white' : isAlreadyActive ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900' : 'bg-primary text-slate-900'} font-black text-xl rounded-2xl shadow-xl transition-all hover:scale-[1.02] flex items-center justify-center gap-2 mb-4`}
              >
                <span className="material-symbols-outlined font-black">
                  {isPending ? 'pending' : isAlreadyActive ? 'rocket_launch' : 'mark_as_unread'}
                </span>
                {isPending ? 'Application Pending' : isAlreadyActive ? 'Enter Workbench' : 'Apply for Mission'}
              </button>
              
              {!isAlreadyActive && !isPending && (
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest leading-relaxed">
                  Requires professional vetting by {task.organization} impact leads.
                </p>
              )}
            </div>

            <div className="bg-slate-900 text-white rounded-[2.5rem] p-8 space-y-4">
              <h4 className="font-black text-lg">Requirements</h4>
              <div className="space-y-3">
                <div className="flex justify-between text-sm"><span className="text-slate-400">Availability</span><span className="font-bold">Flexible</span></div>
                <div className="flex justify-between text-sm"><span className="text-slate-400">Experience</span><span className="font-bold">Intermediate</span></div>
                <div className="flex justify-between text-sm"><span className="text-slate-400">Duration</span><span className="font-bold">~{task.hours}h total</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TaskDetailPage;