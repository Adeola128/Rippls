import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'sent'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    
    // Simulate API call
    setTimeout(() => {
      setStatus('sent');
    }, 1500);
  };

  return (
    <div className="min-h-screen flex bg-white dark:bg-background-dark">
      {/* Left Side: Brand (Consistent with AuthPage) */}
      <div className="hidden lg:flex w-1/2 bg-slate-900 p-20 flex-col justify-between relative overflow-hidden">
        <div className="absolute top-0 right-0 size-[600px] bg-primary/20 blur-[120px] rounded-full pointer-events-none -translate-y-1/2 translate-x-1/2"></div>
        
        <Link to="/" className="flex items-center gap-3 relative z-10 group">
          <div className="size-10 bg-primary rounded-xl flex items-center justify-center text-slate-900 shadow-lg group-hover:rotate-12 transition-transform">
            <span className="material-symbols-outlined font-black">waves</span>
          </div>
          <span className="text-2xl font-black tracking-tighter text-white">Rippl</span>
        </Link>

        <div className="relative z-10 space-y-8">
          <h2 className="text-6xl font-black text-white leading-tight">
            Security <br />
            matters in the <br />
            <span className="text-primary italic">impact economy.</span>
          </h2>
          <p className="text-slate-400 text-xl font-medium max-w-md">
            Don't worry. We'll help you regain access to your legacy. Your verified impact is safe with us.
          </p>
        </div>

        <div className="relative z-10 flex gap-8 text-slate-500 text-xs font-black uppercase tracking-[0.2em]">
          <Link to="/about" className="hover:text-primary transition-colors">Documentation</Link>
          <Link to="/privacy" className="hover:text-primary transition-colors">Privacy</Link>
          <Link to="/faq" className="hover:text-primary transition-colors">Help</Link>
        </div>
      </div>

      {/* Right Side: Recover Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 md:p-20 relative">
        <Link to="/signin" className="absolute top-8 left-8 flex items-center gap-2 group text-slate-500 hover:text-primary transition-colors">
          <span className="material-symbols-outlined transition-transform group-hover:-translate-x-1">arrow_back</span>
          <span className="font-bold text-sm">Back to Sign In</span>
        </Link>

        <AnimatePresence mode="wait">
          {status !== 'sent' ? (
            <motion.div 
              key="request"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="w-full max-w-md space-y-10"
            >
              <div className="space-y-4">
                <div className="size-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mb-6">
                  <span className="material-symbols-outlined text-3xl font-black">lock_open</span>
                </div>
                <h1 className="text-4xl font-black tracking-tight">Recover Access</h1>
                <p className="text-slate-500 font-medium">
                  Enter the email address associated with your account and we'll send you a recovery link.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-slate-400">Email Address</label>
                  <input 
                    required
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={status === 'loading'}
                    className="w-full h-16 bg-slate-50 dark:bg-white/5 border-2 border-transparent focus:border-primary rounded-2xl px-6 font-bold outline-none transition-all disabled:opacity-50" 
                    placeholder="name@email.com"
                  />
                </div>

                <button 
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full h-16 bg-slate-900 dark:bg-primary text-white dark:text-slate-900 rounded-2xl font-black text-lg shadow-xl hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 disabled:grayscale disabled:opacity-50"
                >
                  {status === 'loading' ? (
                    <div className="size-6 border-4 border-current border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>Send Recovery Link <span className="material-symbols-outlined font-black">send</span></>
                  )}
                </button>
              </form>
            </motion.div>
          ) : (
            <motion.div 
              key="sent"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              className="w-full max-w-md flex flex-col items-center text-center space-y-8"
            >
              <motion.div 
                initial={{ rotate: -20, scale: 0 }}
                animate={{ rotate: 0, scale: 1 }}
                transition={{ type: "spring", damping: 10, stiffness: 100 }}
                className="size-24 bg-primary text-slate-900 rounded-[2.5rem] flex items-center justify-center shadow-2xl shadow-primary/30"
              >
                <span className="material-symbols-outlined text-5xl font-black fill-1">mark_email_read</span>
              </motion.div>

              <div className="space-y-4">
                <h2 className="text-4xl font-black tracking-tighter">Check your inbox!</h2>
                <p className="text-slate-500 font-medium text-lg leading-relaxed">
                  We've sent a secure recovery link to <span className="text-slate-900 dark:text-white font-black">{email}</span>.
                </p>
              </div>

              <div className="pt-6 w-full space-y-4">
                <Link 
                  to="/signin" 
                  className="block w-full h-16 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl font-black text-lg flex items-center justify-center shadow-xl hover:scale-[1.02] transition-all"
                >
                  Return to Sign In
                </Link>
                <button 
                  onClick={() => setStatus('idle')}
                  className="text-xs font-black uppercase tracking-widest text-slate-400 hover:text-primary transition-colors"
                >
                  Didn't receive it? Try again
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;