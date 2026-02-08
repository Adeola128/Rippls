
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { RipplLogo } from '../state';

const LandingPage: React.FC = () => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
  };

  const stagger = {
    visible: { transition: { staggerChildren: 0.15 } }
  };

  return (
    <div className="relative bg-white dark:bg-background-dark text-slate-900 dark:text-slate-100 selection:bg-primary selection:text-slate-900 overflow-x-hidden">
      
      {/* Navigation Overlay */}
      <motion.nav 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="absolute top-0 left-0 right-0 z-50 px-6 py-10"
      >
        <div className="max-w-[1400px] mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <RipplLogo className="size-11" />
            <span className="text-2xl font-black tracking-tighter">Rippl</span>
          </Link>
          <div className="flex items-center gap-10">
            <div className="hidden md:flex items-center gap-10">
              {['Explore', 'Partners', 'Impact'].map(item => (
                <a key={item} href={`#${item.toLowerCase()}`} className="text-xs font-black text-slate-500 hover:text-primary transition-colors uppercase tracking-[0.2em]">{item}</a>
              ))}
              <Link to="/org-signin" className="text-xs font-black text-blue-500 hover:text-blue-600 transition-colors uppercase tracking-[0.2em] flex items-center gap-2">
                <span className="material-symbols-outlined text-sm">corporate_fare</span>
                For Organizations
              </Link>
            </div>
            <Link to="/signin" className="h-12 px-8 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl text-sm font-black shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center gap-2">
              Get Started
              <span className="material-symbols-outlined text-sm font-bold">arrow_forward</span>
            </Link>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-32 pb-20">
        <div className="max-w-[1400px] mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center">
          <motion.div 
            initial="hidden" animate="visible" variants={stagger}
            className="flex flex-col items-start gap-10"
          >
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-primary/10 border border-primary/20">
              <span className="size-2.5 bg-primary rounded-full animate-ping"></span>
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Now Live: v2.5 Gamified Missions</span>
            </motion.div>
            
            <motion.h1 variants={fadeInUp} className="text-7xl md:text-[10rem] font-black tracking-tighter leading-[0.8] text-balance">
              Small acts. <br />
              <span className="text-primary italic">Global ripples.</span>
            </motion.h1>

            <motion.p variants={fadeInUp} className="text-xl md:text-3xl text-slate-500 dark:text-slate-400 max-w-[620px] font-medium leading-tight">
              The world-class platform connecting professional skills to verified social missions. Build your legacy while making an impact.
            </motion.p>

            <motion.div variants={fadeInUp} className="flex flex-col gap-6 w-full md:w-auto">
              <div className="flex flex-wrap gap-8">
                <Link to="/signup" className="h-24 px-16 bg-primary text-slate-900 rounded-[2.5rem] text-2xl font-black shadow-2xl shadow-primary/30 hover:shadow-primary/50 hover:-translate-y-2 transition-all flex items-center gap-4 group">
                  Start Your Journey
                  <span className="material-symbols-outlined font-black text-3xl group-hover:translate-x-2 transition-transform">rocket_launch</span>
                </Link>
                <div className="flex flex-col justify-center">
                  <div className="flex -space-x-4 mb-3">
                    {[1,2,3,4].map(i => (
                      <img key={i} src={`https://picsum.photos/seed/${i+50}/100/100`} className="size-12 rounded-full border-4 border-white dark:border-background-dark shadow-xl" alt="User" />
                    ))}
                    <div className="size-12 rounded-full bg-slate-100 dark:bg-white/10 border-4 border-white dark:border-background-dark flex items-center justify-center text-[10px] font-black backdrop-blur-md">+2k</div>
                  </div>
                  <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Join the verified community</p>
                </div>
              </div>
              <Link to="/org-signup" className="text-sm font-black text-slate-400 hover:text-blue-500 transition-colors flex items-center gap-2 group ml-4">
                Are you an organization? <span className="group-hover:underline">Partner with us</span>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </Link>
            </motion.div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9, x: 50 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative hidden lg:block"
          >
            <div className="aspect-square bg-slate-100 dark:bg-white/5 rounded-[6rem] overflow-hidden relative border-8 border-slate-50 dark:border-white/5 shadow-inner group">
              <img 
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=1200" 
                className="w-full h-full object-cover grayscale-[10%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"
                alt="Community of collaborators"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-slate-900/60 to-transparent"></div>
              
              <motion.div 
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-10 -left-10 bg-white dark:bg-card-dark p-10 rounded-[4rem] shadow-2xl border border-slate-100 dark:border-white/10"
              >
                <div className="flex items-center gap-4">
                  <div className="size-14 bg-primary/20 text-primary rounded-2xl flex items-center justify-center">
                    <span className="material-symbols-outlined text-3xl fill-1">schedule</span>
                  </div>
                  <div>
                    <p className="text-5xl font-black text-primary mb-1">12.5k</p>
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Hours Donated</p>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                animate={{ y: [0, 20, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute top-10 -right-10 bg-white dark:bg-card-dark p-8 rounded-[3rem] shadow-2xl border border-slate-100 dark:border-white/10"
              >
                <div className="flex items-center gap-4">
                   <div className="size-10 bg-blue-500 rounded-full flex items-center justify-center text-white">
                      <span className="material-symbols-outlined text-xl">verified</span>
                   </div>
                   <p className="text-sm font-black">AI-Matched Mission</p>
                </div>
              </motion.div>
            </div>
            
            {/* Background decorative elements */}
            <div className="absolute -top-20 -left-20 size-64 bg-primary/10 blur-[100px] rounded-full pointer-events-none"></div>
            <div className="absolute -bottom-20 -right-20 size-80 bg-blue-500/10 blur-[120px] rounded-full pointer-events-none"></div>
          </motion.div>
        </div>
      </section>

      {/* Partners Bar */}
      <section id="partners" className="py-24 bg-white dark:bg-background-dark border-y border-slate-100 dark:border-white/5 overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-16">
            <div className="max-w-[240px] text-center md:text-left">
              <p className="text-xs font-black uppercase tracking-[0.4em] text-slate-400 leading-tight">Trusted by Verified Impact Partners</p>
            </div>
            <div className="flex-1 flex flex-wrap justify-center md:justify-end gap-x-20 gap-y-12 items-center opacity-40 hover:opacity-100 transition-opacity duration-700">
              <div className="flex items-center gap-4">
                <span className="material-symbols-outlined text-5xl text-primary font-black">token</span>
                <span className="text-2xl font-black tracking-tighter uppercase">Malete Tech</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="material-symbols-outlined text-5xl text-blue-500 font-black">settings_voice</span>
                <span className="text-2xl font-black tracking-tighter uppercase">Oratora</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="material-symbols-outlined text-5xl text-slate-400 font-black">layers</span>
                <span className="text-2xl font-black tracking-tighter uppercase">Nexus Stack</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="material-symbols-outlined text-5xl text-orange-500 font-black">public</span>
                <span className="text-2xl font-black tracking-tighter uppercase">Global Aid</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="impact" className="px-6 py-48 relative">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid lg:grid-cols-3 gap-20 items-start">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-1 space-y-8 sticky top-32"
            >
              <h2 className="text-6xl font-black tracking-tighter leading-[0.9]">Changing the world should be <span className="text-primary italic">rewarding.</span></h2>
              <p className="text-xl text-slate-500 font-medium leading-relaxed">We've combined professional networking with social impact to create a flywheel of good.</p>
              <div className="pt-10">
                <Link to="/discovery" className="h-16 px-10 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl font-black inline-flex items-center gap-3 hover:scale-105 transition-all shadow-xl">
                  Browse Missions
                  <span className="material-symbols-outlined">explore</span>
                </Link>
              </div>
            </motion.div>
            
            <div className="lg:col-span-2 grid md:grid-cols-2 gap-10">
              {[
                { t: 'Skill Discovery', d: 'Connect your LinkedIn or GitHub and our AI matches you to missions where your code, design, or words matter most.', i: 'psychology', iColor: 'text-primary' },
                { t: 'Impact Resume', d: 'Every project you complete is verified and logged. Build a portfolio that shows the world not just what you do, but what you stand for.', i: 'history_edu', iColor: 'text-blue-500' },
                { t: 'Gamified Progress', d: 'Earn XP, rise through the global ranks, and unlock exclusive community badges and partner perks.', i: 'videogame_asset', iColor: 'text-orange-500' },
                { t: 'Direct Connection', d: 'Skip the bureaucracy. Talk directly to organization founders and impact leads through our integrated secure messenger.', i: 'forum', iColor: 'text-purple-500' }
              ].map((f, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="p-12 bg-slate-50 dark:bg-white/5 rounded-[4rem] border border-slate-100 dark:border-white/5 space-y-8 shadow-sm transition-all hover:shadow-2xl hover:shadow-primary/5"
                >
                  <div className={`size-20 bg-white dark:bg-card-dark rounded-[2rem] flex items-center justify-center shadow-inner ${f.iColor}`}>
                    <span className="material-symbols-outlined text-4xl font-black fill-1">{f.i}</span>
                  </div>
                  <h3 className="text-3xl font-black">{f.t}</h3>
                  <p className="text-slate-500 dark:text-slate-400 font-medium text-lg leading-relaxed">{f.d}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-20">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-[1400px] mx-auto bg-slate-900 text-white rounded-[5rem] p-20 md:p-32 relative overflow-hidden shadow-2xl"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_100%_0%,_rgba(19,236,109,0.2)_0%,_transparent_50%)]"></div>
          <div className="relative z-10 flex flex-col items-center text-center gap-12">
            <RipplLogo className="size-24" />
            <h2 className="text-7xl md:text-[9rem] font-black tracking-tighter leading-[0.8]">Ready to start <br /> <span className="text-primary italic">your ripple?</span></h2>
            <p className="text-2xl md:text-3xl text-slate-400 font-medium max-w-[800px] leading-tight">
              No fees. No fluff. Just pure impact. Join thousands of creators making a real difference today.
            </p>
            <div className="flex flex-wrap justify-center gap-8 mt-6">
              <Link to="/signup" className="h-24 px-20 bg-primary text-slate-900 rounded-[2.5rem] text-3xl font-black shadow-2xl hover:scale-105 transition-all flex items-center gap-4">
                Join Today
                <span className="material-symbols-outlined font-black text-3xl">dashboard_customize</span>
              </Link>
            </div>
          </div>
        </motion.div>
      </section>

      <footer className="px-6 py-32 border-t border-slate-100 dark:border-white/5">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-start gap-24">
          <div className="space-y-10 max-w-sm">
            <div className="flex items-center gap-4">
              <RipplLogo className="size-12" />
              <span className="text-3xl font-black tracking-tighter">Rippl</span>
            </div>
            <p className="text-slate-500 font-medium text-xl leading-relaxed">
              We empower the world's most talented individuals to tackle the most urgent social challenges through technology and creativity.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-20">
            <div>
              <h5 className="font-black text-[10px] uppercase tracking-[0.3em] text-slate-400 mb-10">Platform</h5>
              <ul className="space-y-5 text-slate-500 font-bold text-lg">
                <li><Link to="/discovery" className="hover:text-primary transition-colors">Find Missions</Link></li>
                <li><Link to="/leaderboard" className="hover:text-primary transition-colors">Global Ranks</Link></li>
                <li><Link to="/community" className="hover:text-primary transition-colors">Social Feed</Link></li>
                <li><Link to="/org-signin" className="hover:text-blue-500 transition-colors">For Organizations</Link></li>
              </ul>
            </div>
            <div>
              <h5 className="font-black text-[10px] uppercase tracking-[0.3em] text-slate-400 mb-10">Resources</h5>
              <ul className="space-y-5 text-slate-500 font-bold text-lg">
                <li><a href="#" className="hover:text-primary transition-colors">How it works</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Case Studies</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">API Docs</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-black text-[10px] uppercase tracking-[0.3em] text-slate-400 mb-10">Legal</h5>
              <ul className="space-y-5 text-slate-500 font-bold text-lg">
                <li><Link to="/privacy" className="hover:text-primary transition-colors">Privacy</Link></li>
                <li><Link to="/terms" className="hover:text-primary transition-colors">Terms</Link></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="max-w-[1400px] mx-auto mt-32 pt-10 border-t border-slate-100 dark:border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-base font-bold text-slate-400">© 2023 Rippl Foundation. All rights reserved. Built for changemakers.</p>
          <div className="flex items-center gap-3">
            <span className="text-xs font-black uppercase text-slate-400 tracking-widest">Status</span>
            <div className="flex items-center gap-2 px-4 py-1.5 bg-primary/10 rounded-full border border-primary/20">
              <span className="size-2 bg-primary rounded-full animate-pulse"></span>
              <span className="text-[10px] font-black text-primary uppercase">Systems Operational</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
