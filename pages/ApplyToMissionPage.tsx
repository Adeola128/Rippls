import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAppState } from '../state';

const ApplyToMissionPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { tasks, user, acceptTask } = useAppState();
  const task = tasks.find(t => t.id === id);

  const [step, setStep] = useState(1);
  const [pitch, setPitch] = useState('');
  const [motivation, setMotivation] = useState('');
  const [portfolioUrl, setPortfolioUrl] = useState('');
  const [resumeFile, setResumeFile] = useState<{ name: string; size: string } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!task) navigate('/discovery');
  }, [task, navigate]);

  if (!task) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setResumeFile({
        name: file.name,
        size: (file.size / 1024).toFixed(1) + ' KB'
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate application processing
    setTimeout(() => {
      acceptTask(task.id, { 
        pitch, 
        motivation, 
        resumeName: resumeFile?.name,
        portfolioUrl: portfolioUrl,
        submittedAt: new Date().toISOString() 
      });
      setIsSubmitting(false);
      setStep(3); // Go to success step
    }, 2000);
  };

  const isFormValid = pitch && motivation && (resumeFile || portfolioUrl);

  return (
    <div className="max-w-[1200px] mx-auto px-6 py-12 pb-32">
      <div className="grid lg:grid-cols-12 gap-12 items-start">
        
        {/* Left Side: Form */}
        <div className="lg:col-span-8 space-y-10">
          <header className="space-y-4">
            <Link to={`/task/${task.id}`} className="inline-flex items-center gap-2 text-slate-500 hover:text-primary transition-colors font-bold text-sm">
              <span className="material-symbols-outlined text-sm">arrow_back</span>
              Back to Mission Details
            </Link>
            <h1 className="text-5xl font-black tracking-tighter leading-none">Apply for <br /><span className="text-primary italic">{task.title}</span></h1>
            <p className="text-slate-500 font-medium text-lg">Tell the organization why you're the right fit for this impact mission.</p>
          </header>

          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div 
                key="step1"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-8"
              >
                <div className="bg-white dark:bg-card-dark rounded-[3rem] p-10 border border-border-light dark:border-border-dark shadow-xl space-y-8">
                  <div className="space-y-6">
                    <h3 className="text-2xl font-black flex items-center gap-3">
                      <span className="material-symbols-outlined text-primary text-3xl font-black">psychology</span>
                      Professional Pitch
                    </h3>
                    <div className="space-y-4">
                      <label className="text-xs font-black uppercase tracking-widest text-slate-400">Your Experience & Skills</label>
                      <textarea 
                        value={pitch}
                        onChange={(e) => setPitch(e.target.value)}
                        placeholder="e.g. I have 5 years of experience in Graphic Design and have worked on 3 similar non-profit branding projects..."
                        className="w-full min-h-[160px] bg-slate-50 dark:bg-slate-900 border-none rounded-2xl p-6 text-lg font-medium focus:ring-4 focus:ring-primary/20 transition-all outline-none resize-none"
                      />
                    </div>
                  </div>

                  <div className="space-y-6">
                    <h3 className="text-2xl font-black flex items-center gap-3">
                      <span className="material-symbols-outlined text-primary text-3xl font-black">volunteer_activism</span>
                      Mission Motivation
                    </h3>
                    <div className="space-y-4">
                      <label className="text-xs font-black uppercase tracking-widest text-slate-400">Why does this cause matter to you?</label>
                      <textarea 
                        value={motivation}
                        onChange={(e) => setMotivation(e.target.value)}
                        placeholder="e.g. I've always been passionate about tech education in underserved communities..."
                        className="w-full min-h-[160px] bg-slate-50 dark:bg-slate-900 border-none rounded-2xl p-6 text-lg font-medium focus:ring-4 focus:ring-primary/20 transition-all outline-none resize-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Professional Credentials Section */}
                <div className="bg-white dark:bg-card-dark rounded-[3rem] p-10 border border-border-light dark:border-border-dark shadow-xl space-y-8">
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-black flex items-center gap-3">
                      <span className="material-symbols-outlined text-primary text-3xl font-black">badge</span>
                      Credentials
                    </h3>
                    <span className="px-3 py-1 bg-blue-500/10 text-blue-500 text-[10px] font-black uppercase rounded-full border border-blue-500/20">Resume or Portfolio</span>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <label className="text-xs font-black uppercase tracking-widest text-slate-400">Upload Resume/CV</label>
                      <input 
                        type="file" 
                        ref={fileInputRef} 
                        onChange={handleFileChange} 
                        className="hidden" 
                        accept=".pdf,.doc,.docx"
                      />
                      
                      {!resumeFile ? (
                        <div 
                          onClick={() => fileInputRef.current?.click()}
                          className="h-48 border-2 border-dashed border-slate-200 dark:border-white/10 rounded-3xl flex flex-col items-center justify-center gap-3 cursor-pointer hover:border-primary hover:bg-primary/5 transition-all group"
                        >
                          <span className="material-symbols-outlined text-4xl text-slate-300 group-hover:text-primary group-hover:scale-110 transition-all">upload_file</span>
                          <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Select PDF or DOC</p>
                        </div>
                      ) : (
                        <div className="h-48 bg-slate-50 dark:bg-white/5 border border-primary/30 rounded-3xl p-6 flex flex-col justify-between relative group">
                          <button 
                            onClick={() => setResumeFile(null)}
                            className="absolute top-4 right-4 size-8 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center text-slate-400 hover:text-red-500 shadow-md"
                          >
                            <span className="material-symbols-outlined text-sm">close</span>
                          </button>
                          <div className="flex items-center gap-4">
                            <div className="size-12 bg-primary rounded-xl flex items-center justify-center text-slate-900">
                              <span className="material-symbols-outlined font-black">description</span>
                            </div>
                            <div className="min-w-0">
                              <p className="font-black truncate text-sm">{resumeFile.name}</p>
                              <p className="text-[10px] font-bold text-slate-400 uppercase">{resumeFile.size}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 text-[10px] font-black text-primary uppercase tracking-widest">
                            <span className="material-symbols-outlined text-sm">check_circle</span>
                            Ready to attach
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="space-y-4">
                      <label className="text-xs font-black uppercase tracking-widest text-slate-400">Portfolio or LinkedIn</label>
                      <div className="relative h-48 bg-slate-50 dark:bg-white/5 rounded-3xl flex flex-col p-6 gap-4 border border-border-light dark:border-border-dark">
                         <div className="size-12 bg-blue-500 rounded-xl flex items-center justify-center text-white">
                           <span className="material-symbols-outlined font-black">link</span>
                         </div>
                         <div className="space-y-2">
                           <input 
                             type="url"
                             value={portfolioUrl}
                             onChange={(e) => setPortfolioUrl(e.target.value)}
                             placeholder="https://behance.net/you"
                             className="w-full bg-white dark:bg-slate-900/50 border-2 border-transparent focus:border-primary rounded-xl h-12 px-4 font-bold text-sm outline-none transition-all"
                           />
                           <p className="text-[9px] font-bold text-slate-400 leading-tight">Past work helps organizations verify your expertise faster.</p>
                         </div>
                      </div>
                    </div>
                  </div>
                </div>

                <button 
                  onClick={() => setStep(2)}
                  disabled={!isFormValid}
                  className="w-full h-18 bg-slate-900 dark:bg-primary text-white dark:text-slate-900 rounded-2xl font-black text-xl shadow-xl hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                >
                  Review Application
                  <span className="material-symbols-outlined font-black">arrow_forward</span>
                </button>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div 
                key="step2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="bg-white dark:bg-card-dark rounded-[3.5rem] p-12 border-2 border-primary/20 shadow-2xl space-y-10"
              >
                <div className="space-y-6">
                  <h3 className="text-3xl font-black">Final Review</h3>
                  <div className="space-y-8">
                    <div className="space-y-2">
                      <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Applying as</p>
                      <div className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-white/5 rounded-2xl">
                        <img src={user.avatar} className="size-10 rounded-full border-2 border-primary" alt="U" />
                        <div>
                          <p className="font-black">{user.name}</p>
                          <p className="text-xs font-bold text-primary uppercase">Level {user.level} Contributor</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="space-y-2">
                        <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Credentials Provided</p>
                        <div className="p-4 bg-slate-50 dark:bg-white/5 rounded-2xl border border-slate-100 dark:border-white/10 flex items-center gap-3">
                          <span className="material-symbols-outlined text-primary">verified_user</span>
                          <span className="text-xs font-bold truncate">
                            {resumeFile ? `Attached: ${resumeFile.name}` : portfolioUrl ? `Link: ${portfolioUrl}` : 'None provided'}
                          </span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Motivation Sentiment</p>
                        <div className="p-4 bg-slate-50 dark:bg-white/5 rounded-2xl border border-slate-100 dark:border-white/10 flex items-center gap-3">
                          <span className="material-symbols-outlined text-blue-500">favorite</span>
                          <span className="text-xs font-bold">Strong Alignment</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Your Pitch</p>
                      <p className="text-slate-600 dark:text-slate-300 font-medium leading-relaxed italic border-l-4 border-primary pl-6 py-2">"{pitch}"</p>
                    </div>

                    <div className="space-y-2">
                      <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Motivation</p>
                      <p className="text-slate-600 dark:text-slate-300 font-medium leading-relaxed italic border-l-4 border-blue-500 pl-6 py-2">"{motivation}"</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row gap-4 pt-4">
                  <button 
                    onClick={() => setStep(1)}
                    className="flex-1 h-18 border-2 border-slate-200 dark:border-white/10 rounded-2xl font-black text-lg hover:bg-slate-50 dark:hover:bg-white/5 transition-all"
                  >
                    Edit Details
                  </button>
                  <button 
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="flex-[2] h-18 bg-primary text-slate-900 rounded-2xl font-black text-xl shadow-2xl shadow-primary/30 flex items-center justify-center gap-4 hover:brightness-105 transition-all disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <div className="size-8 border-4 border-slate-900/20 border-t-slate-900 rounded-full animate-spin" />
                    ) : (
                      <>Send Application <span className="material-symbols-outlined font-black">send</span></>
                    )}
                  </button>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div 
                key="step3"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white dark:bg-card-dark rounded-[4rem] p-16 border border-primary shadow-2xl text-center space-y-12 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-primary/5 pointer-events-none" />
                <motion.div 
                  initial={{ rotate: -20, scale: 0 }}
                  animate={{ rotate: 0, scale: 1 }}
                  transition={{ type: "spring", damping: 12 }}
                  className="size-32 bg-primary/20 text-primary rounded-[2.5rem] flex items-center justify-center mx-auto shadow-inner"
                >
                  <span className="material-symbols-outlined text-[80px] font-black">mark_email_read</span>
                </motion.div>
                
                <div className="space-y-4 relative z-10">
                  <h2 className="text-5xl font-black tracking-tighter">Application Sent!</h2>
                  <p className="text-xl text-slate-500 font-medium max-w-md mx-auto">
                    Excellent pitch. {task.organization} impact leads will review your profile and application details shortly.
                  </p>
                </div>

                <div className="pt-8 relative z-10">
                  <Link 
                    to="/dashboard" 
                    className="inline-flex h-20 px-12 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-[2rem] font-black text-xl items-center justify-center shadow-2xl hover:scale-105 transition-all"
                  >
                    Return to Dashboard
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right Side: Mission Summary */}
        <aside className="lg:col-span-4 sticky top-24">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-slate-900 text-white rounded-[3rem] p-8 shadow-2xl space-y-8 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 size-40 bg-primary/10 blur-[80px] pointer-events-none" />
            
            <div className="flex items-center gap-4 relative z-10">
              <div className="size-16 bg-white rounded-2xl p-2 flex items-center justify-center shadow-lg">
                <img src={task.orgLogo} className="w-full h-full object-contain" alt="L" />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] font-black uppercase text-primary tracking-widest mb-1">Impact Partner</p>
                <h4 className="font-black text-xl truncate">{task.organization}</h4>
              </div>
            </div>

            <div className="space-y-6 relative z-10">
              <div className="p-6 bg-white/5 rounded-2xl border border-white/5 space-y-4">
                <h5 className="font-black text-sm uppercase tracking-widest text-slate-400">Mission Brief</h5>
                <p className="text-sm font-medium text-slate-300 leading-relaxed italic line-clamp-4">
                  "{task.description}"
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-white/5 rounded-2xl border border-white/5 text-center">
                  <p className="text-2xl font-black text-primary">+{task.xp}</p>
                  <p className="text-[8px] font-black uppercase text-slate-500 tracking-widest">XP Reward</p>
                </div>
                <div className="p-4 bg-white/5 rounded-2xl border border-white/5 text-center">
                  <p className="text-2xl font-black text-blue-400">{task.hours}h</p>
                  <p className="text-[8px] font-black uppercase text-slate-500 tracking-widest">Estimated</p>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-white/10 relative z-10 text-center">
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-loose">
                Professionalism matters. <br />Your pitch is the first step to impact.
              </p>
            </div>
          </motion.div>
        </aside>

      </div>
    </div>
  );
};

export default ApplyToMissionPage;