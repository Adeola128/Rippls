import React from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, PieChart, Pie } from 'recharts';
import { MOCK_ACHIEVEMENTS } from '../constants';

const contributionData = [
  { name: 'Jan', val: 12 },
  { name: 'Feb', val: 18 },
  { name: 'Mar', val: 15 },
  { name: 'Apr', val: 25 },
  { name: 'May', val: 20 },
  { name: 'Jun', val: 32 },
];

const categoryData = [
  { name: 'Design', value: 19.2, color: '#13ec6d' },
  { name: 'Writing', value: 8, color: '#4c9a6c' },
  { name: 'Events', value: 4.8, color: '#0d9488' }
];

const ImpactPage: React.FC = () => {
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
      className="max-w-[1280px] mx-auto px-6 py-8 space-y-10"
    >
      <motion.div variants={itemVariants} className="flex flex-col gap-2">
        <h1 className="text-4xl font-black tracking-tight">Your Personal Impact</h1>
        <p className="text-secondary">Celebrating your contributions to the community</p>
      </motion.div>

      <motion.div variants={itemVariants} className="bg-slate-900 text-white rounded-2xl p-8 border border-white/5 relative overflow-hidden group">
        <div className="relative z-10 flex flex-col items-center gap-4 text-center">
          <p className="uppercase text-[10px] font-bold tracking-[0.2em] text-primary">Global Contribution</p>
          <motion.div 
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="flex items-baseline gap-2"
          >
            <span className="text-7xl font-black">32</span>
            <span className="text-2xl font-bold opacity-60">Hours</span>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="px-4 py-1.5 rounded-full bg-primary/20 text-primary text-xs font-bold border border-primary/20 flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-sm">trending_up</span> +40% vs last month
          </motion.div>
        </div>
        {/* Subtle ripple lines bg */}
        <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
          {[1,2,3,4,5].map(i => (
            <motion.div 
              key={i} 
              animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.2, 0.1] }}
              transition={{ duration: 4, delay: i * 0.5, repeat: Infinity }}
              className="absolute border border-white rounded-full" 
              style={{ width: `${i*150}px`, height: `${i*150}px` }} 
            />
          ))}
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <motion.div variants={itemVariants} className="bg-white dark:bg-card-dark rounded-xl p-8 border border-border-light dark:border-border-dark shadow-sm">
          <h3 className="font-bold text-lg mb-6">Impact Categories</h3>
          <div className="h-[200px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie 
                  data={categoryData} 
                  innerRadius={60} 
                  outerRadius={80} 
                  paddingAngle={5} 
                  dataKey="value"
                  animationBegin={200}
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-6 space-y-3">
            {categoryData.map(c => (
              <div key={c.name} className="flex justify-between items-center text-sm">
                <div className="flex items-center gap-2">
                  <div className="size-2 rounded-full" style={{ backgroundColor: c.color }}></div>
                  <span className="font-medium">{c.name}</span>
                </div>
                <span className="font-bold">{c.value}h ({(c.value/32*100).toFixed(0)}%)</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="lg:col-span-2 bg-white dark:bg-card-dark rounded-xl p-8 border border-border-light dark:border-border-dark shadow-sm">
          <h3 className="font-bold text-lg mb-6">Contribution History</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={contributionData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.1} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis hide />
                <Tooltip cursor={{ fill: 'rgba(19,236,109,0.05)' }} />
                <Bar 
                  dataKey="val" 
                  fill="#13ec6d" 
                  radius={[6, 6, 0, 0]}
                  animationBegin={400} 
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      <motion.div variants={itemVariants} className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold">Achievements</h3>
          <button className="text-sm font-bold text-primary hover:underline transition-all">View All</button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {MOCK_ACHIEVEMENTS.map((a, i) => (
            <motion.div 
              key={a.id} 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -5, scale: 1.05 }}
              className="bg-white dark:bg-card-dark p-6 rounded-xl border border-border-light dark:border-border-dark shadow-sm flex flex-col items-center text-center gap-3 cursor-pointer group"
            >
              <div className="size-16 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-primary shadow-inner transition-colors group-hover:bg-primary/20">
                <span className="material-symbols-outlined text-3xl fill-1">{a.icon}</span>
              </div>
              <h4 className="font-bold text-sm">{a.title}</h4>
              <p className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">{a.type}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ImpactPage;