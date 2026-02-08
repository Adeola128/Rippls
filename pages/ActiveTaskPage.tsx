
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAppState } from '../state';

const ActiveTaskPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { tasks, submitEvidence } = useAppState();
  const task = tasks.find(t => t.id === id) || tasks[0];
  
  const [view, setView] = useState<'submission' | 'success'>('submission');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Logic: Evidence Data
  const [summary, setSummary] = useState('');
  const [link, setLink] = useState('');
  const [evidenceFiles, setEvidenceFiles] = useState<any[]>([]);
  
  // Logic: Functional Checklist
  const [validation, setValidation] = useState([
    { id: 1, label: 'Work meets the impact brief requirements', status: false },
    { id: 2, label: 'Evidence provided is clear and high-resolution', status: false },
    { id: 3, label: 'Links are shared with public/partner access', status: false }
  ]);

  const toggleValidation = (vid: number) => {
    setValidation(prev => prev.map(v => v.id === vid ? { ...v, status: !v.status } : v));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        setEvidenceFiles(prev => [...prev, {
          id: Date.now(),
          name: file.name,
          preview: event.target?.result,
          type: file.type
        }]);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmitFlow = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validation.every(v => v.status)) {
      alert("Please confirm all validation points to proceed.");
      return;
    }
    
    setIsSubmitting(true);
    // Simulate complex proof-of-work processing
    setTimeout(() => {
      submitEvidence(task.id, { summary, link, files: evidenceFiles });
      setIsSubmitting(false);
      setView('success');
    }, 2500);
  };

  return (
    <div className="min-h-[calc(100vh-72px)] bg-slate-50 dark:bg-background-dark py-12 px-6 relative overflow-hidden">
      
      {/* Decorative environment */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <AnimatePresence mode="wait">
          {view === 'submission' && (
            <motion.div 
              key="submission"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="space-y-12"
            >
              <header className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                <div className="flex items-center gap-6">
                  <div className="size-20 bg-white dark:bg-card-dark rounded-3xl p-4 shadow-2xl border border-border-light dark:border-border-dark flex items-center justify-center">
                    <img src={task.orgLogo} alt="Logo" className="w-full h-full object-contain" />
                  </div>
                  <div>
                    <div className="flex items-center gap-3">
                      <span className="px-3 py-1 bg-primary text-slate-900 rounded-full text-[10px] font-black uppercase tracking-widest">Workbench</span>
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest tracking-widest">ID: {task.id}</span>
                    </div>
                    <h1 className="text-4xl font-black tracking-tighter mt-1">{task.title}</h1>
                    <p className="text-slate-500 font-bold">Organization: <span className="text-slate-900 dark:text-white">{task.organization}</span></p>
                  </div>
                </div>
                <Link to="/dashboard" className="h-14 px-8 border-2 border-slate-200 dark:border-white/10 rounded-2xl flex items-center text-xs font-black text-slate-500 hover:text-red-500 transition-all uppercase tracking-widest">
                  Abort Submission
                </Link>
              </header>

              <div className="grid lg:grid-cols-12 gap-10">
                {/* Proof of Work Collection */}
                <form onSubmit={handleSubmitFlow} className="lg:col-span-8 space-y-10">
                  
                  {/* Evidence Stage 1: File Capture */}
                  <section className="bg-white dark:bg-card-dark rounded-[3.5rem] p-10 border border-border-light dark:border-border-dark shadow-xl space-y-8">
                    <div className="flex items-center justify-between">
                      <h3 className="text-2xl font-black flex items-center gap-3">
                        <span className="material-symbols-outlined text-primary text-3xl font-black">photo_camera</span>
                        Visual Evidence
                      </h3>
                      <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Photos / Artifacts</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <label className="group relative cursor-pointer block">
                        <input type="file" className="hidden" onChange={handleFileUpload} />
                        <div className="h-56 border-2 border-dashed border-slate-200 dark:border-white/10 rounded-3xl flex flex-col items-center justify-center gap-4 bg-slate-50/50 dark:bg-white/5 group-hover:border-primary transition-all">
                          <div className="size-14 bg-white dark:bg-slate-900 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-all">
                            <span className="material-symbols-outlined text-primary text-3xl font-black">cloud_upload</span>
                          </div>
                          <p className="text-sm font-black text-slate-400 uppercase tracking-widest group-hover:text-primary transition-colors">Capture Proof</p>
                        </div>
                      </label>

                      <div className="h-56 overflow-y-auto no-scrollbar space-y-3 p-1">
                        {evidenceFiles.length > 0 ? evidenceFiles.map(file => (
                          <motion.div 
                            key={file.id} 
                            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                            className="p-4 bg-slate-50 dark:bg-white/5 rounded-2xl flex items-center gap-4 border border-border-light dark:border-border-dark"
                          >
                            <div className="size-12 rounded-lg bg-white overflow-hidden shrink-0 border border-slate-100">
                              <img src={file.preview} className="w-full h-full object-cover" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-[11px] font-black truncate">{file.name}</p>
                              <p className="text-[9px] font-bold text-slate-400 uppercase">Uploaded</p>
                            </div>
                            <button type="button" onClick={() => setEvidenceFiles(f => f.filter(x => x.id !== file.id))} className="text-slate-300 hover:text-red-500 transition-colors">
                              <span className="material-symbols-outlined text-sm">close</span>
                            </button>
                          </motion.div>
                        )) : (
                          <div className="h-full flex flex-col items-center justify-center text-center opacity-30 italic">
                            <p className="text-xs font-bold text-slate-400">Waiting for evidence...</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </section>

                  {/* Evidence Stage 2: Digital Deliverables */}
                  <section className="bg-white dark:bg-card-dark rounded-[3.5rem] p-10 border border-border-light dark:border-border-dark shadow-xl space-y-8">
                    <h3 className="text-2xl font-black flex items-center gap-3">
                      <span className="material-symbols-outlined text-primary text-3xl font-black">attachment</span>
                      Digital Artifacts
                    </h3>
                    <div className="relative group">
                      <input 
                        required
                        type="url"
                        value={link}
                        onChange={(e) => setLink(e.target.value)}
                        placeholder="Figma, GitHub, or Cloud Link URL..."
                        className="w-full h-18 bg-slate-50 dark:bg-slate-900/50 border-none rounded-2xl px-14 font-bold focus:ring-4 focus:ring-primary/20 transition-all outline-none text-lg"
                      />
                      <span className="material-symbols-outlined absolute left-5 top-1/2 -translate-y-1/2 text-primary">link</span>
                    </div>
                  </section>

                  {/* Evidence Stage 3: Impact Logging */}
                  <section className="bg-white dark:bg-card-dark rounded-[3.5rem] p-10 border border-border-light dark:border-border-dark shadow-xl space-y-8">
                    <h3 className="text-2xl font-black flex items-center gap-3">
                      <span className="material-symbols-outlined text-primary text-3xl font-black">history_edu</span>
                      Impact Summary
                    </h3>
                    <textarea 
                      required
                      value={summary}
                      onChange={(e) => setSummary(e.target.value)}
                      placeholder="Summarize what was achieved. Focus on the impact created for the mission..."
                      className="w-full min-h-[220px] bg-slate-50 dark:bg-slate-900/50 border-none rounded-[2rem] p-8 text-lg font-medium focus:ring-4 focus:ring-primary/20 transition-all outline-none resize-none"
                    />
                  </section>
                </form>

                {/* Validation & Verification Panel */}
                <aside className="lg:col-span-4 space-y-8">
                  <div className="bg-slate-900 text-white rounded-[3.5rem] p-10 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 size-60 bg-primary/10 blur-[80px] pointer-events-none" />
                    
                    <h3 className="text-2xl font-black mb-8 flex items-center gap-3 relative z-10">
                      <span className="material-symbols-outlined text-primary text-3xl font-black fill-1">verified_user</span>
                      Integrity Check
                    </h3>

                    <div className="space-y-4 relative z-10">
                      {validation.map((v) => (
                        <motion.div 
                          key={v.id} 
                          onClick={() => toggleValidation(v.id)}
                          whileHover={{ x: 5 }}
                          className={`p-6 rounded-[2rem] border-2 cursor-pointer transition-all flex items-center gap-4 ${v.status ? 'bg-primary/20 border-primary/40' : 'bg-white/5 border-white/5 hover:border-primary/30'}`}
                        >
                          <div className={`size-8 rounded-xl flex items-center justify-center transition-all ${v.status ? 'bg-primary text-slate-900' : 'bg-white/10 text-slate-400'}`}>
                            <span className="material-symbols-outlined font-black text-lg">{v.status ? 'check' : 'circle'}</span>
                          </div>
                          <span className={`text-sm font-bold ${v.status ? 'text-primary' : 'text-slate-400'}`}>{v.label}</span>
                        </motion.div>
                      ))}
                    </div>

                    <div className="mt-12 pt-10 border-t border-white/10 relative z-10">
                      <motion.button 
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        disabled={isSubmitting || !validation.every(v => v.status)}
                        onClick={handleSubmitFlow}
                        className="w-full h-20 bg-primary text-slate-900 rounded-3xl font-black text-xl shadow-2xl shadow-primary/30 flex items-center justify-center gap-4 transition-all hover:brightness-105 disabled:opacity-30 disabled:grayscale"
                      >
                        {isSubmitting ? (
                          <div className="size-8 border-4 border-slate-900/20 border-t-slate-900 rounded-full animate-spin" />
                        ) : (
                          <>Log Final Impact <span className="material-symbols-outlined font-black text-2xl">rocket_launch</span></>
                        )}
                      </motion.button>
                      
                      <div className="mt-8 flex justify-between items-center px-4">
                        <div className="text-center">
                          <p className="text-3xl font-black text-primary">+{task.xp}</p>
                          <p className="text-[9px] font-black uppercase text-slate-500 tracking-widest">XP Growth</p>
                        </div>
                        <div className="h-10 w-px bg-white/10" />
                        <div className="text-center">
                          <p className="text-3xl font-black text-blue-400">+{task.hours}</p>
                          <p className="text-[9px] font-black uppercase text-slate-500 tracking-widest">Verified Hrs</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white dark:bg-card-dark p-8 rounded-[3rem] border border-border-light dark:border-border-dark shadow-sm">
                    <h4 className="text-xl font-black mb-4 flex items-center gap-2">
                       <span className="material-symbols-outlined text-blue-500">info</span>
                       Partner Policy
                    </h4>
                    <p className="text-sm text-slate-500 font-medium leading-relaxed">
                      Your submission will be audited by <strong>{task.organization}</strong> impact leads. Verified Master Level volunteers usually see verification within 4 hours.
                    </p>
                  </div>
                </aside>
              </div>
            </motion.div>
          )}

          {view === 'success' && (
            <motion.div 
              key="success"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-3xl mx-auto flex flex-col items-center justify-center text-center py-28 bg-white dark:bg-card-dark rounded-[5rem] shadow-2xl border border-primary/20 space-y-12 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,_rgba(19,236,109,0.1)_0%,_transparent_50%)]"></div>
              
              <motion.div 
                initial={{ rotate: -15, scale: 0 }}
                animate={{ rotate: 0, scale: 1 }}
                transition={{ type: "spring", damping: 10, stiffness: 100, delay: 0.2 }}
                className="size-48 bg-primary/20 text-primary rounded-[3rem] flex items-center justify-center relative z-10 shadow-2xl shadow-primary/10"
              >
                <span className="material-symbols-outlined text-[100px] font-black fill-1">verified</span>
                <motion.div 
                  animate={{ scale: [1, 1.4, 1], opacity: [1, 0, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="absolute inset-0 border-4 border-primary rounded-[3rem]"
                />
              </motion.div>

              <div className="space-y-4 relative z-10">
                <h2 className="text-6xl font-black tracking-tighter">Impact Logged!</h2>
                <p className="text-xl text-slate-500 font-medium max-w-md mx-auto">
                  Your work for <strong>{task.organization}</strong> is now in the review queue. We'll notify you when the rewards are released.
                </p>
              </div>

              <div className="flex flex-col gap-4 w-full max-w-xs relative z-10 pt-10">
                <Link to="/dashboard" className="h-20 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-[2.5rem] font-black text-xl flex items-center justify-center shadow-2xl hover:scale-105 transition-all">Back to Dashboard</Link>
                <Link to="/discovery" className="text-xs font-black text-slate-400 hover:text-primary transition-colors uppercase tracking-[0.3em]">Browse New Missions</Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ActiveTaskPage;
