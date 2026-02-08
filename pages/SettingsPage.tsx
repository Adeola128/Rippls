
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MOCK_USER } from '../constants';

const SettingsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('Account');

  const tabs = [
    { n: 'Account', i: 'person' },
    { n: 'Preferences', i: 'settings' },
    { n: 'Interests', i: 'volunteer_activism' },
    { n: 'Privacy', i: 'lock' },
    { n: 'Support', i: 'help' }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-[1280px] mx-auto px-6 py-10"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <aside className="lg:col-span-3">
          <motion.div 
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="bg-white dark:bg-card-dark rounded-2xl shadow-sm overflow-hidden p-2 border border-border-light dark:border-border-dark"
          >
            <div className="p-4 border-b border-border-light dark:border-border-dark">
              <h3 className="font-bold text-lg">Settings</h3>
              <p className="text-sm text-secondary">Personalize your account</p>
            </div>
            <nav className="mt-4 flex flex-col gap-1">
              {tabs.map(item => (
                <button 
                  key={item.n} 
                  onClick={() => setActiveTab(item.n)}
                  className={`flex items-center gap-3 px-4 py-3 text-sm font-bold transition-all rounded-xl relative ${activeTab === item.n ? 'text-primary bg-primary/10' : 'hover:bg-slate-50 dark:hover:bg-slate-800'}`}
                >
                  <span className="material-symbols-outlined text-xl">{item.i}</span>
                  {item.n}
                  {activeTab === item.n && (
                    <motion.div 
                      layoutId="tab-indicator"
                      className="absolute left-0 w-1 h-2/3 bg-primary rounded-r-full"
                    />
                  )}
                </button>
              ))}
            </nav>
          </motion.div>
          <motion.button 
            whileHover={{ scale: 1.02, backgroundColor: 'rgba(239, 68, 68, 0.1)' }}
            whileTap={{ scale: 0.98 }}
            className="mt-6 flex items-center justify-center gap-2 w-full px-4 py-4 border-2 border-red-500/50 text-red-500 rounded-2xl font-black text-sm transition-colors"
          >
            <span className="material-symbols-outlined">logout</span>
            Log Out
          </motion.button>
        </aside>

        <section className="lg:col-span-9 space-y-8">
          <AnimatePresence mode="wait">
            <motion.div 
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-8"
            >
              <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-black tracking-tight">{activeTab} Settings</h1>
                <p className="text-secondary">Update your public profile and connected accounts.</p>
              </div>

              <div className="bg-white dark:bg-card-dark rounded-3xl p-8 border border-border-light dark:border-border-dark shadow-sm">
                <div className="flex flex-col md:flex-row items-center gap-8 mb-10">
                  <motion.div 
                    whileHover={{ scale: 1.05 }}
                    className="relative group cursor-pointer"
                  >
                    <img src={MOCK_USER.avatar} className="size-32 rounded-full border-4 border-primary/20 object-cover shadow-xl" alt="P" />
                    <button className="absolute bottom-0 right-0 bg-primary text-slate-900 p-2 rounded-full shadow-lg hover:scale-110 transition-transform">
                      <span className="material-symbols-outlined text-sm">edit</span>
                    </button>
                  </motion.div>
                  <div className="flex-1 text-center md:text-left">
                    <h4 className="text-2xl font-black">{MOCK_USER.name}</h4>
                    <p className="text-secondary font-medium">Member since March 2023</p>
                    <div className="mt-4 flex flex-wrap justify-center md:justify-start gap-2">
                      <span className="px-4 py-1.5 bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest rounded-full border border-primary/20">Elite Contributor</span>
                    </div>
                  </div>
                  <button className="bg-slate-100 dark:bg-slate-800 px-6 py-3 rounded-xl font-bold text-sm hover:bg-slate-200 transition-colors">Change Photo</button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-sm font-black text-slate-500 uppercase tracking-widest">Full Name</label>
                    <motion.input 
                      whileFocus={{ scale: 1.01 }}
                      className="w-full bg-slate-50 dark:bg-slate-900 border-none rounded-xl h-14 px-5 focus:ring-2 focus:ring-primary transition-all" 
                      type="text" 
                      defaultValue={MOCK_USER.name} 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-black text-slate-500 uppercase tracking-widest">Email Address</label>
                    <motion.input 
                      whileFocus={{ scale: 1.01 }}
                      className="w-full bg-slate-50 dark:bg-slate-900 border-none rounded-xl h-14 px-5 focus:ring-2 focus:ring-primary transition-all" 
                      type="email" 
                      defaultValue="adeola@rippl.io" 
                    />
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <label className="text-sm font-black text-slate-500 uppercase tracking-widest">Bio</label>
                    <motion.textarea 
                      whileFocus={{ scale: 1.01 }}
                      className="w-full min-h-[120px] bg-slate-50 dark:bg-slate-900 border-none rounded-xl p-5 focus:ring-2 focus:ring-primary resize-none transition-all" 
                      defaultValue="Passionate about environmental conservation and community development. Let's make an impact together!" 
                    />
                  </div>
                </div>
                
                <div className="mt-10 pt-8 border-t border-border-light dark:border-border-dark flex justify-end gap-4">
                  <button className="px-8 py-3 rounded-xl font-bold text-secondary hover:text-slate-900 transition-colors">Discard</button>
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-10 py-3 bg-primary text-slate-900 rounded-xl font-black text-lg shadow-lg shadow-primary/20 hover:brightness-105 transition-all"
                  >
                    Save Changes
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </section>
      </div>
    </motion.div>
  );
};

export default SettingsPage;
