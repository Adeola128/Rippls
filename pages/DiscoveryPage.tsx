import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MOCK_TASKS } from '../constants';
import { Link } from 'react-router-dom';

const DiscoveryPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [sortBy, setSortBy] = useState<'match' | 'newest' | 'xp'>('match');
  
  const categories = ['All', 'Graphic Design', 'Environment', 'Data Entry', 'Translation', 'Marketing'];

  const filteredTasks = useMemo(() => {
    let tasks = [...MOCK_TASKS].filter(task => 
      (activeCategory === 'All' || task.category === activeCategory) &&
      (task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.organization.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    if (sortBy === 'xp') tasks.sort((a, b) => b.xp - a.xp);
    if (sortBy === 'newest') tasks.sort((a, b) => b.id.localeCompare(a.id));
    if (sortBy === 'match') tasks.sort((a, b) => (parseInt(a.id) % 3) - (parseInt(b.id) % 3));

    return tasks;
  }, [searchTerm, activeCategory, sortBy]);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.98 },
    show: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    }
  };

  return (
    <div className="max-w-[1400px] mx-auto px-6 py-10 space-y-12">
      {/* Header Strategy */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col lg:flex-row lg:items-center justify-between gap-10"
      >
        <div className="max-w-xl">
          <h1 className="text-6xl md:text-7xl font-black tracking-tighter mb-4 leading-none text-slate-900 dark:text-white">Find Your <span className="text-primary italic">Impact.</span></h1>
          <p className="text-secondary font-medium text-lg md:text-xl">AI-powered mission matching for the world's most elite professional changemakers.</p>
        </div>
        
        <div className="flex-1 flex flex-col md:flex-row items-stretch gap-4 max-w-[700px]">
          <div className="flex-1 relative group">
            <input 
              className="w-full h-20 bg-white dark:bg-card-dark border-2 border-slate-100 dark:border-white/5 rounded-[2rem] px-16 font-bold text-xl focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all shadow-xl outline-none"
              placeholder="Search by skill, cause or tech..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <span className="material-symbols-outlined absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-primary transition-colors text-3xl">search</span>
          </div>
          
          <div className="flex bg-white dark:bg-card-dark p-2 rounded-3xl border border-slate-100 dark:border-white/5 shadow-lg">
            {(['match', 'xp', 'newest'] as const).map(option => (
              <button 
                key={option}
                onClick={() => setSortBy(option)}
                className={`px-6 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${sortBy === option ? 'bg-slate-900 dark:bg-primary text-white dark:text-slate-900 shadow-lg' : 'text-slate-400 hover:text-slate-900 dark:hover:text-white'}`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Category Ribbon */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="flex items-center gap-3 overflow-x-auto no-scrollbar pb-4"
      >
        {categories.map((cat) => (
          <motion.button 
            key={cat}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveCategory(cat)}
            className={`px-8 py-4 rounded-[1.5rem] text-xs font-black whitespace-nowrap transition-all border-2 ${activeCategory === cat ? 'bg-primary text-slate-900 border-primary shadow-2xl shadow-primary/30' : 'bg-white dark:bg-card-dark border-slate-100 dark:border-white/5 text-slate-500 hover:border-primary/40'}`}
          >
            {cat}
          </motion.button>
        ))}
      </motion.div>

      {/* Grid Architecture */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-10"
      >
        <AnimatePresence mode="popLayout">
          {filteredTasks.map((task) => (
            <motion.div
              layout
              key={task.id}
              variants={itemVariants}
              whileHover={{ y: -12 }}
              exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.3 } }}
              className="group"
            >
              <Link to={`/task/${task.id}`} className="block h-full bg-white dark:bg-card-dark rounded-[3.5rem] border border-border-light dark:border-border-dark overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-primary/10 hover:border-primary/30 transition-all flex flex-col relative">
                <div className="aspect-[1.5] relative overflow-hidden">
                  <img 
                    src={`https://picsum.photos/seed/ripple-${task.id}/800/600`} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 grayscale-[10%] group-hover:grayscale-0" 
                    alt="Task" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-100 transition-opacity"></div>
                  
                  <div className="absolute top-6 left-6 flex flex-col gap-2">
                    <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-md px-4 py-2 rounded-2xl flex items-center gap-2 border border-white/20 shadow-xl">
                      <span className="material-symbols-outlined text-primary text-xl fill-1">bolt</span>
                      <span className="text-[10px] font-black uppercase tracking-widest text-slate-900 dark:text-white">+{task.xp} XP</span>
                    </div>
                  </div>
                </div>
                
                <div className="p-10 flex-1 flex flex-col">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="px-3 py-1 bg-slate-100 dark:bg-white/5 rounded-xl text-[9px] font-black text-slate-500 uppercase tracking-widest">{task.category}</span>
                    <span className="px-3 py-1 bg-primary/10 text-primary rounded-xl text-[9px] font-black uppercase tracking-widest">{task.locationType}</span>
                  </div>
                  
                  <h3 className="text-3xl font-black mb-4 group-hover:text-primary transition-colors line-clamp-2 leading-tight tracking-tighter text-slate-900 dark:text-white">{task.title}</h3>
                  <p className="text-slate-500 dark:text-slate-400 text-base font-medium line-clamp-3 mb-8 leading-relaxed">
                    {task.description}
                  </p>
                  
                  <div className="mt-auto pt-8 border-t border-slate-100 dark:border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="size-10 rounded-2xl bg-slate-50 dark:bg-slate-900 p-1.5 border border-slate-100 dark:border-white/10 group-hover:rotate-6 transition-transform">
                        <img src={task.orgLogo} className="w-full h-full object-contain" alt="Org" />
                      </div>
                      <div>
                        <span className="text-[11px] font-black text-slate-900 dark:text-white block truncate max-w-[120px]">{task.organization}</span>
                        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Partner</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 text-[10px] font-black text-slate-400 group-hover:text-primary transition-colors">
                      <span className="material-symbols-outlined text-base">event_available</span>
                      {task.deadline.split(',')[0]}
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default DiscoveryPage;