import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';

interface AuthPageProps {
  mode: 'signin' | 'signup';
}

const AuthPage: React.FC<AuthPageProps> = ({ mode: initialMode }) => {
  const navigate = useNavigate();
  const [mode, setMode] = useState(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate successful login
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex bg-white dark:bg-background-dark">
      {/* Left Side: Brand & Social Proof */}
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
            The impact <br />
            economy is <br />
            <span className="text-primary italic">calling you.</span>
          </h2>
          <p className="text-slate-400 text-xl font-medium max-w-md">
            Join 2,500+ professionals using their weekends to change the world. 100% verified, 100% gamified.
          </p>
          
          <div className="flex -space-x-4">
            {[1,2,3,4,5].map(i => (
              <img key={i} src={`https://picsum.photos/seed/${i+100}/100/100`} className="size-12 rounded-full border-4 border-slate-900" alt="U" />
            ))}
            <div className="size-12 rounded-full bg-white/10 flex items-center justify-center text-xs font-black text-white backdrop-blur-md">+12</div>
          </div>
        </div>

        <div className="relative z-10 flex gap-8 text-slate-500 text-xs font-black uppercase tracking-[0.2em]">
          <a href="#" className="hover:text-primary transition-colors">Documentation</a>
          <a href="#" className="hover:text-primary transition-colors">Privacy</a>
          <a href="#" className="hover:text-primary transition-colors">Help</a>
        </div>
      </div>

      {/* Right Side: Forms */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 md:p-20 relative">
        <Link to="/" className="lg:hidden absolute top-8 left-8 flex items-center gap-2">
          <span className="material-symbols-outlined text-primary">arrow_back</span>
          <span className="font-bold text-sm">Back to Home</span>
        </Link>

        <motion.div 
          key={mode}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full max-w-md space-y-10"
        >
          <div className="space-y-4">
            <h1 className="text-4xl font-black tracking-tight">
              {mode === 'signin' ? 'Welcome Back' : 'Create Account'}
            </h1>
            <p className="text-slate-500 font-medium">
              {mode === 'signin' 
                ? 'Sign in to your dashboard to continue your ripple.' 
                : 'Start your journey as a verified changemaker today.'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {mode === 'signup' && (
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-slate-400">Full Name</label>
                <input 
                  required
                  className="w-full h-14 bg-slate-50 dark:bg-white/5 border-2 border-transparent focus:border-primary rounded-2xl px-6 font-bold outline-none transition-all" 
                  placeholder="e.g. Jane Doe"
                />
              </div>
            )}
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-slate-400">Email Address</label>
              <input 
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-14 bg-slate-50 dark:bg-white/5 border-2 border-transparent focus:border-primary rounded-2xl px-6 font-bold outline-none transition-all" 
                placeholder="name@email.com"
              />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-xs font-black uppercase tracking-widest text-slate-400">Password</label>
                {mode === 'signin' && (
                  <Link to="/forgot-password" title="Recover Password" className="text-[10px] font-black uppercase text-primary hover:underline">Forgot?</Link>
                )}
              </div>
              <input 
                required
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-14 bg-slate-50 dark:bg-white/5 border-2 border-transparent focus:border-primary rounded-2xl px-6 font-bold outline-none transition-all" 
                placeholder="••••••••"
              />
            </div>

            <button 
              type="submit"
              className="w-full h-16 bg-slate-900 dark:bg-primary text-white dark:text-slate-900 rounded-2xl font-black text-lg shadow-xl hover:scale-[1.02] active:scale-95 transition-all"
            >
              {mode === 'signin' ? 'Sign In' : 'Create Account'}
            </button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-100 dark:border-white/5"></div></div>
            <div className="relative flex justify-center text-xs uppercase font-black tracking-widest"><span className="bg-white dark:bg-background-dark px-4 text-slate-400">Or continue with</span></div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button className="h-14 border-2 border-slate-100 dark:border-white/5 rounded-2xl flex items-center justify-center gap-3 hover:bg-slate-50 dark:hover:bg-white/5 transition-all">
              <img src="https://www.google.com/favicon.ico" className="size-5 grayscale hover:grayscale-0" alt="G" />
              <span className="text-sm font-bold">Google</span>
            </button>
            <button className="h-14 border-2 border-slate-100 dark:border-white/5 rounded-2xl flex items-center justify-center gap-3 hover:bg-slate-50 dark:hover:bg-white/5 transition-all">
              <img src="https://github.com/favicon.ico" className="size-5 dark:invert" alt="GH" />
              <span className="text-sm font-bold">GitHub</span>
            </button>
          </div>

          <p className="text-center text-sm font-medium text-slate-500">
            {mode === 'signin' ? "Don't have an account?" : "Already have an account?"}{' '}
            <button 
              onClick={() => setMode(mode === 'signin' ? 'signup' : 'signin')}
              className="text-primary font-black hover:underline"
            >
              {mode === 'signin' ? 'Sign up' : 'Sign in'}
            </button>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default AuthPage;