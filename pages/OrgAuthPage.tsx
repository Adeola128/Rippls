import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useAppState } from '../state';

interface OrgAuthPageProps {
  mode: 'signin' | 'signup';
}

const OrgAuthPage: React.FC<OrgAuthPageProps> = ({ mode: initialMode }) => {
  const navigate = useNavigate();
  const { setUserType } = useAppState();
  const [mode, setMode] = useState(initialMode);
  const [orgName, setOrgName] = useState('');
  const [mission, setMission] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setUserType('org');
    navigate('/org-dashboard');
  };

  return (
    <div className="min-h-screen flex bg-white dark:bg-background-dark">
      <div className="hidden lg:flex w-1/2 bg-blue-600 p-20 flex-col justify-between relative overflow-hidden">
        <div className="absolute top-0 right-0 size-[600px] bg-white/10 blur-[120px] rounded-full pointer-events-none -translate-y-1/2 translate-x-1/2"></div>
        <Link to="/" className="flex items-center gap-3 relative z-10">
          <div className="size-10 bg-white rounded-xl flex items-center justify-center text-blue-600 shadow-lg">
            <span className="material-symbols-outlined font-black">corporate_fare</span>
          </div>
          <span className="text-2xl font-black tracking-tighter text-white">Rippl <span className="text-[10px] uppercase font-bold bg-white/20 px-2 py-0.5 rounded ml-2">For Orgs</span></span>
        </Link>
        <div className="relative z-10 space-y-8">
          <h2 className="text-6xl font-black text-white leading-tight">
            Scale your <br />
            mission with <br />
            <span className="italic">elite talent.</span>
          </h2>
          <p className="text-blue-100 text-xl font-medium max-w-md">
            Connect your non-profit to 10k+ verified professionals. Manage missions, track impact, and scale your ripple.
          </p>
        </div>
        <div className="relative z-10 flex gap-8 text-blue-200 text-xs font-black uppercase tracking-[0.2em]">
          <a href="#" className="hover:text-white transition-colors">Safety Portal</a>
          <a href="#" className="hover:text-white transition-colors">Audit Logs</a>
          <a href="#" className="hover:text-white transition-colors">Legal</a>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 md:p-20 relative">
        <motion.div 
          key={mode}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full max-w-md space-y-10"
        >
          <div className="space-y-4">
             <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/10 text-blue-500 rounded-full border border-blue-500/20 text-[10px] font-black uppercase tracking-widest">
               Partner Gateway
             </div>
            <h1 className="text-4xl font-black tracking-tight">
              {mode === 'signin' ? 'Partner Access' : 'Register Organization'}
            </h1>
            <p className="text-slate-500 font-medium">
              Join the ecosystem of verified impact makers.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {mode === 'signup' && (
              <>
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-slate-400">Organization Name</label>
                  <input required value={orgName} onChange={(e) => setOrgName(e.target.value)} className="w-full h-14 bg-slate-50 dark:bg-white/5 border-2 border-transparent focus:border-blue-500 rounded-2xl px-6 font-bold outline-none transition-all" placeholder="e.g. Green Earth Foundation" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-slate-400">Main Cause</label>
                  <select className="w-full h-14 bg-slate-50 dark:bg-white/5 border-2 border-transparent focus:border-blue-500 rounded-2xl px-6 font-bold outline-none transition-all">
                    <option>Environment</option>
                    <option>Education</option>
                    <option>Emergency Aid</option>
                    <option>Technology</option>
                  </select>
                </div>
              </>
            )}
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-slate-400">Partner Email</label>
              <input required type="email" className="w-full h-14 bg-slate-50 dark:bg-white/5 border-2 border-transparent focus:border-blue-500 rounded-2xl px-6 font-bold outline-none transition-all" placeholder="impact@org.com" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-slate-400">Console Password</label>
              <input required type="password" className="w-full h-14 bg-slate-50 dark:bg-white/5 border-2 border-transparent focus:border-blue-500 rounded-2xl px-6 font-bold outline-none transition-all" placeholder="••••••••" />
            </div>

            <button type="submit" className="w-full h-16 bg-blue-600 text-white rounded-2xl font-black text-lg shadow-xl shadow-blue-500/20 hover:scale-[1.02] active:scale-95 transition-all">
              {mode === 'signin' ? 'Access Dashboard' : 'Initiate Registration'}
            </button>
          </form>

          <p className="text-center text-sm font-medium text-slate-500">
            {mode === 'signin' ? "New Organization?" : "Already a Partner?"}{' '}
            <button onClick={() => setMode(mode === 'signin' ? 'signup' : 'signin')} className="text-blue-500 font-black hover:underline">
              {mode === 'signin' ? 'Join Now' : 'Sign in'}
            </button>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default OrgAuthPage;