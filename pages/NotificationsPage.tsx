
import React from 'react';
import { motion } from 'framer-motion';

const NOTIFICATIONS = [
  { id: 1, title: 'Milestone Reached!', text: 'You completed 10 tasks this week. Keep the streak going!', time: '2 hours ago', icon: 'emoji_events', color: 'text-purple-500', unread: true },
  { id: 2, title: 'Approval Required', text: 'Q4 Budget Report needs your final review and signature.', time: '5 hours ago', icon: 'verified_user', color: 'text-primary', unread: false },
  { id: 3, title: 'New Mention', text: 'Sarah Jenkins mentioned you in a comment: "This looks perfect!"', time: 'Yesterday, 4:12 PM', icon: 'chat_bubble', color: 'text-blue-500', unread: false },
  { id: 4, title: 'Streak at Risk!', text: 'Complete one more task today to maintain your 5-day streak.', time: 'Yesterday, 9:00 AM', icon: 'local_fire_department', color: 'text-orange-500', unread: false }
];

const NotificationsPage: React.FC = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-[960px] mx-auto px-6 py-10 space-y-8"
    >
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-4xl font-black tracking-tight">Notifications</h1>
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-primary text-slate-900 px-6 py-2 rounded-xl font-black text-sm shadow-lg shadow-primary/20 hover:brightness-105 transition-all"
        >
          Mark all as read
        </motion.button>
      </div>

      <div className="flex border-b border-border-light dark:border-border-dark gap-8 overflow-x-auto no-scrollbar">
        {['All (24)', 'Tasks', 'Achievements', 'Social', 'Organizations'].map((tab, i) => (
          <button key={tab} className={`pb-4 pt-2 text-sm font-black whitespace-nowrap transition-all border-b-4 ${i === 0 ? 'border-primary text-slate-900 dark:text-white' : 'border-transparent text-secondary hover:text-primary'}`}>
            {tab}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-black text-secondary uppercase tracking-widest py-2">Today</h3>
        {NOTIFICATIONS.slice(0, 2).map((n, i) => (
          <motion.div 
            key={n.id} 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ x: 5 }}
            className={`flex items-center gap-4 p-5 rounded-2xl border-l-4 transition-all cursor-pointer group bg-white dark:bg-card-dark border border-border-light dark:border-border-dark ${n.unread ? 'border-l-purple-500 shadow-md' : 'border-l-primary shadow-sm'} hover:shadow-lg`}
          >
            <div className={`size-12 rounded-xl flex items-center justify-center bg-slate-100 dark:bg-slate-800 ${n.color}`}>
              <span className="material-symbols-outlined text-2xl fill-1">{n.icon}</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <p className="font-black text-lg truncate">{n.title}</p>
                {n.unread && <div className="size-2 rounded-full bg-primary animate-pulse"></div>}
              </div>
              <p className="text-secondary text-sm font-medium">{n.text}</p>
              <p className="text-[10px] font-black uppercase text-secondary tracking-widest mt-2">{n.time}</p>
            </div>
            <button className="opacity-0 group-hover:opacity-100 p-2 text-secondary hover:text-slate-900 dark:hover:text-white transition-all">
              <span className="material-symbols-outlined">more_vert</span>
            </button>
          </motion.div>
        ))}

        <h3 className="text-lg font-black text-secondary uppercase tracking-widest py-2 mt-8">Yesterday</h3>
        {NOTIFICATIONS.slice(2).map((n, i) => (
          <motion.div 
            key={n.id} 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 + (i * 0.1) }}
            whileHover={{ x: 5 }}
            className="flex items-center gap-4 p-5 rounded-2xl border-l-4 border-l-slate-400 bg-white dark:bg-card-dark border border-border-light dark:border-border-dark shadow-sm hover:shadow-md transition-all cursor-pointer group"
          >
            <div className={`size-12 rounded-xl flex items-center justify-center bg-slate-100 dark:bg-slate-800 ${n.color}`}>
              <span className="material-symbols-outlined text-2xl fill-1">{n.icon}</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-black text-lg truncate mb-1">{n.title}</p>
              <p className="text-secondary text-sm font-medium">{n.text}</p>
              <p className="text-[10px] font-black uppercase text-secondary tracking-widest mt-2">{n.time}</p>
            </div>
            <button className="opacity-0 group-hover:opacity-100 p-2 text-secondary transition-all">
              <span className="material-symbols-outlined">more_vert</span>
            </button>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default NotificationsPage;
