import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams, Link } from 'react-router-dom';
import { ORGS } from './OrganizationsPage';
import { MOCK_TASKS } from '../constants';

const OrganizationDetailPage: React.FC = () => {
  const { id } = useParams();
  const org = ORGS.find(o => o.id === id) || ORGS[0];
  const [activeTab, setActiveTab] = useState('Missions');
  const [isFollowing, setIsFollowing] = useState(false);

  // Filter tasks belonging to this org
  const activeMissions = MOCK_TASKS.filter(t => t.organization === org.n);

  const tabs = ['Missions', 'About', 'Impact Feed'];

  return (
    <div className="bg-slate-50 dark:bg-background-dark min-h-screen">
      {/* Hero Header */}
      <section className="relative h-[400px] w-full overflow-hidden">
        <img 
          src={`https://images.unsplash.com/photo-1517245318773-b7b83ae927ff?auto=format&fit=crop&q=80&w=2000`} 
          className="w-full h-full object-cover grayscale-[20%] opacity-80"
          alt="Org Banner"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background-light dark:from-background-dark via-transparent to-transparent"></div>
        
        <Link to="/organizations" className="absolute top-8 left-8 z-10 size-12 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center text-white hover:bg-white/20 transition-all border border-white/10">
          <span className="material-symbols-outlined font-black">arrow_back</span>
        </Link>
      </section>

      {/* Main Identity Card */}
      <div className="max-w-[1440px] mx-auto px-6 -mt-32 relative z-20 space-y-10">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-card-dark rounded-[4rem] p-10 md:p-16 border border-border-light dark:border-border-dark shadow-2xl flex flex-col md:flex-row items-center md:items-start gap-12"
        >
          <div className="relative shrink-0">
            <div className="size-48 md:size-60 rounded-[3rem] bg-white dark:bg-slate-900 p-6 border-4 border-slate-50 dark:border-white/5 shadow-2xl">
              <img src={org.i} className="w-full h-full object-contain" alt="Logo" />
            </div>
            {org.v && (
              <div className="absolute -bottom-4 -right-4 size-16 bg-primary text-slate-900 rounded-2xl flex items-center justify-center shadow-2xl border-4 border-white dark:border-card-dark">
                <span className="material-symbols-outlined text-4xl fill-1">verified</span>
              </div>
            )}
          </div>

          <div className="flex-1 text-center md:text-left space-y-6">
            <div className="space-y-2">
              <h1 className="text-5xl md:text-6xl font-black tracking-tighter leading-none">{org.n}</h1>
              <p className="text-xl font-bold text-primary flex items-center justify-center md:justify-start gap-2">
                <span className="material-symbols-outlined fill-1">corporate_fare</span>
                {org.c}
              </p>
            </div>
            <p className="text-lg text-slate-500 dark:text-slate-400 font-medium leading-relaxed max-w-2xl">
              A leading global force in {org.c.toLowerCase()} dedicated to systemic change through high-impact professional volunteering and direct community engagement.
            </p>
            
            <div className="flex flex-wrap justify-center md:justify-start gap-4">
              <button 
                onClick={() => setIsFollowing(!isFollowing)}
                className={`h-16 px-10 rounded-2xl font-black text-lg transition-all flex items-center gap-3 shadow-xl ${isFollowing ? 'bg-slate-100 text-slate-500' : 'bg-primary text-slate-900 hover:scale-105'}`}
              >
                <span className="material-symbols-outlined font-black">{isFollowing ? 'check' : 'person_add'}</span>
                {isFollowing ? 'Following' : 'Follow Partner'}
              </button>
              <button className="h-16 px-10 bg-slate-900 dark:bg-white/5 text-white rounded-2xl font-black text-lg transition-all hover:bg-slate-800 flex items-center gap-3">
                <span className="material-symbols-outlined">public</span>
                Visit Website
              </button>
            </div>
          </div>

          <div className="w-full md:w-auto grid grid-cols-2 gap-4">
             <div className="bg-slate-50 dark:bg-white/5 p-8 rounded-[2.5rem] border border-slate-100 dark:border-white/5 text-center">
               <p className="text-4xl font-black text-primary">{org.h}h</p>
               <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mt-1">Total Impact</p>
             </div>
             <div className="bg-slate-50 dark:bg-white/5 p-8 rounded-[2.5rem] border border-slate-100 dark:border-white/5 text-center">
               <p className="text-4xl font-black text-blue-500">{org.m}</p>
               <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mt-1">Missions</p>
             </div>
             <div className="col-span-2 bg-slate-900 dark:bg-primary/10 text-white dark:text-primary p-6 rounded-[2.5rem] flex items-center justify-center gap-3">
               <span className="material-symbols-outlined text-3xl font-black fill-1">bolt</span>
               <span className="text-xl font-black">98 Ripple Score</span>
             </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-10">
          <main className="lg:col-span-8 space-y-10">
            {/* Tab Navigation */}
            <div className="flex gap-2 bg-white dark:bg-card-dark p-2 rounded-3xl border border-border-light dark:border-border-dark shadow-sm overflow-x-auto no-scrollbar">
              {tabs.map(tab => (
                <button 
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 h-12 px-8 rounded-2xl font-black text-sm whitespace-nowrap transition-all ${activeTab === tab ? 'bg-primary text-slate-900 shadow-xl shadow-primary/20' : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'}`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Content Area */}
            <AnimatePresence mode="wait">
              {activeTab === 'Missions' && (
                <motion.div 
                  key="missions"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-6"
                >
                  <h3 className="text-2xl font-black px-2">Active Opportunities</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    {activeMissions.length > 0 ? activeMissions.map((task, i) => (
                      <motion.div 
                        key={task.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-white dark:bg-card-dark p-8 rounded-[3rem] border border-border-light dark:border-border-dark group hover:border-primary/50 transition-all shadow-sm"
                      >
                         <div className="flex justify-between items-start mb-6">
                           <span className="px-3 py-1 bg-primary/10 text-primary text-[10px] font-black uppercase rounded-full">+{task.xp} XP</span>
                           <span className="text-[10px] font-black text-slate-400 uppercase">{task.locationType}</span>
                         </div>
                         <h4 className="text-xl font-black mb-2 group-hover:text-primary transition-colors">{task.title}</h4>
                         <p className="text-sm text-slate-500 font-medium line-clamp-2 mb-8 leading-relaxed">{task.description}</p>
                         <Link to={`/task/${task.id}`} className="w-full h-12 bg-slate-100 dark:bg-white/5 rounded-xl flex items-center justify-center font-black text-xs group-hover:bg-primary group-hover:text-slate-900 transition-all">
                           Mission Details
                         </Link>
                      </motion.div>
                    )) : (
                      <div className="col-span-2 p-20 text-center bg-white dark:bg-card-dark rounded-[3rem] border-2 border-dashed border-border-light dark:border-border-dark">
                        <span className="material-symbols-outlined text-5xl text-slate-300 mb-4">search_off</span>
                        <p className="text-lg font-black text-slate-500">No active missions right now.</p>
                        <p className="text-sm text-slate-400 font-medium">Check back soon or follow to get notified!</p>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}

              {activeTab === 'About' && (
                <motion.div 
                  key="about"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="bg-white dark:bg-card-dark p-12 rounded-[3.5rem] border border-border-light dark:border-border-dark shadow-sm space-y-10"
                >
                  <section className="space-y-4">
                    <h3 className="text-3xl font-black tracking-tight">Our Story</h3>
                    <p className="text-lg text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                      Founded in 2018, {org.n} emerged from a simple observation: there is an immense disconnect between highly-skilled individuals and the non-profits that need them most. We bridge that gap by providing a platform for sustainable, skill-based growth.
                    </p>
                  </section>
                  <section className="space-y-4">
                    <h3 className="text-3xl font-black tracking-tight">Core Values</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      {['Transparency first', 'Radical Collaboration', 'Impact over Ego', 'Future-proof solutions'].map(v => (
                        <div key={v} className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-white/5 rounded-2xl">
                          <span className="material-symbols-outlined text-primary fill-1">verified</span>
                          <span className="font-bold">{v}</span>
                        </div>
                      ))}
                    </div>
                  </section>
                </motion.div>
              )}

              {activeTab === 'Impact Feed' && (
                <motion.div 
                   key="feed"
                   initial={{ opacity: 0, x: -20 }}
                   animate={{ opacity: 1, x: 0 }}
                   exit={{ opacity: 0, x: 20 }}
                   className="space-y-8"
                >
                   {[1,2,3].map(i => (
                     <div key={i} className="bg-white dark:bg-card-dark p-10 rounded-[3rem] border border-border-light dark:border-border-dark shadow-sm flex flex-col md:flex-row gap-8">
                       <div className="size-40 rounded-3xl overflow-hidden shrink-0 shadow-lg">
                         <img src={`https://picsum.photos/seed/impact${i}/400/400`} className="w-full h-full object-cover" alt="History" />
                       </div>
                       <div className="space-y-4">
                         <p className="text-[10px] font-black uppercase text-primary tracking-widest">Completed Ripple • 2 weeks ago</p>
                         <h4 className="text-2xl font-black">Community Center Rebranding</h4>
                         <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                           A massive collaboration involving 12 designers and 5 copywriters that resulted in a 400% increase in local engagement.
                         </p>
                         <div className="flex -space-x-3 pt-2">
                           {[1,2,3,4].map(u => (
                             <img key={u} src={`https://picsum.photos/seed/${u+20}/100/100`} className="size-10 rounded-full border-4 border-white dark:border-card-dark shadow-sm" alt="V" />
                           ))}
                           <div className="size-10 rounded-full bg-slate-100 dark:bg-white/10 flex items-center justify-center text-[10px] font-black">+8</div>
                         </div>
                       </div>
                     </div>
                   ))}
                </motion.div>
              )}
            </AnimatePresence>
          </main>

          <aside className="lg:col-span-4 space-y-8">
            <div className="bg-slate-900 text-white rounded-[3rem] p-10 space-y-10 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 size-32 bg-primary/10 blur-[60px]"></div>
              <h3 className="text-2xl font-black">Org Leads</h3>
              <div className="space-y-6">
                {[
                  { n: 'Sarah Jenkins', r: 'Founding Lead', i: 'https://picsum.photos/seed/sarahj/100/100' },
                  { n: 'David K.', r: 'Operations Director', i: 'https://picsum.photos/seed/davidk/100/100' }
                ].map((lead, i) => (
                  <div key={i} className="flex items-center gap-4 group cursor-pointer">
                    <img src={lead.i} className="size-14 rounded-2xl object-cover border-2 border-primary/20" alt="L" />
                    <div>
                      <h5 className="font-black group-hover:text-primary transition-colors">{lead.n}</h5>
                      <p className="text-xs font-black text-slate-500 uppercase tracking-widest">{lead.r}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full h-14 bg-white/5 border border-white/10 rounded-2xl font-black text-xs hover:bg-white hover:text-slate-900 transition-all">
                Contact Office
              </button>
            </div>

            <div className="bg-gradient-to-br from-primary/10 to-blue-500/10 p-10 rounded-[3rem] border border-primary/20 shadow-inner space-y-4">
              <h4 className="text-xl font-black">Become a Pillar</h4>
              <p className="text-sm text-slate-500 font-medium leading-relaxed">
                Organizations like {org.n} rely on "Master" level volunteers to lead mission squads. Earn your rank to unlock leadership roles.
              </p>
              <Link to="/discovery" className="block text-center py-4 bg-primary text-slate-900 rounded-2xl font-black text-xs hover:scale-105 transition-all">
                Find High-Level Missions
              </Link>
            </div>
          </aside>
        </div>
      </div>
      
      {/* Footer Spacer */}
      <div className="h-20"></div>
    </div>
  );
};

export default OrganizationDetailPage;