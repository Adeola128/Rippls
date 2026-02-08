
import React from 'react';
import { motion } from 'framer-motion';

const SKILLS = [
  { name: 'Graphic Design', level: 4, xp: 450, totalXp: 1000, icon: 'brush', color: 'bg-blue-500' },
  { name: 'Data Entry', level: 2, xp: 120, totalXp: 300, icon: 'database', color: 'bg-primary' },
  { name: 'Translation', level: 1, xp: 45, totalXp: 100, icon: 'translate', color: 'bg-orange-500' },
  { name: 'Social Media', level: 3, xp: 800, totalXp: 1000, icon: 'share', color: 'bg-purple-500' },
];

const SkillsPage: React.FC = () => {
  return (
    <div className="max-w-[1200px] mx-auto px-6 py-10 space-y-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl font-black tracking-tight">Skills Inventory</h1>
          <p className="text-secondary">Track your professional growth through real-world impact.</p>
        </div>
        <button className="h-14 px-8 bg-primary text-slate-900 rounded-2xl font-black shadow-xl shadow-primary/20 flex items-center gap-2 hover:scale-105 transition-all">
          <span className="material-symbols-outlined font-bold">add</span>
          Add New Skill
        </button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {SKILLS.map((skill, i) => (
          <motion.div 
            key={skill.name}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ y: -5 }}
            className="bg-white dark:bg-card-dark p-8 rounded-[2rem] border border-border-light dark:border-border-dark shadow-sm group cursor-pointer"
          >
            <div className={`size-14 ${skill.color} text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:rotate-12 transition-transform`}>
              <span className="material-symbols-outlined text-2xl fill-1">{skill.icon}</span>
            </div>
            <h3 className="text-xl font-black mb-1">{skill.name}</h3>
            <p className="text-xs font-black text-primary uppercase tracking-widest mb-6">Level {skill.level}</p>
            
            <div className="space-y-2">
              <div className="flex justify-between text-[10px] font-bold uppercase text-slate-400">
                <span>Next Level</span>
                <span>{skill.xp}/{skill.totalXp} XP</span>
              </div>
              <div className="h-2 w-full bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${(skill.xp / skill.totalXp) * 100}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className={`h-full ${skill.color} rounded-full`}
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="bg-slate-50 dark:bg-white/5 rounded-[3rem] p-12 border border-slate-100 dark:border-white/5">
        <div className="max-w-[800px] mx-auto text-center space-y-6">
          <div className="size-20 bg-primary/20 text-primary rounded-[2rem] flex items-center justify-center mx-auto mb-8">
            <span className="material-symbols-outlined text-4xl font-black fill-1">school</span>
          </div>
          <h2 className="text-3xl font-black">Verify Your Expertise</h2>
          <p className="text-slate-500 font-medium text-lg leading-relaxed">
            Completed tasks are automatically verified by our organization partners. Verified skills appear with a special badge on your profile and increase your match-rate for high-level missions.
          </p>
          <div className="flex justify-center pt-6">
            <button className="px-10 py-4 border-2 border-primary text-primary rounded-2xl font-black hover:bg-primary hover:text-slate-900 transition-all">
              Request Verification Review
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillsPage;
