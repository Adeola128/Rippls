
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

interface InfoPageProps {
  type: 'about' | 'faq' | 'terms' | 'privacy';
}

const CONTENT = {
  about: {
    title: "About Rippl",
    subtitle: "Empowering the next generation of changemakers.",
    sections: [
      { h: "Our Mission", p: "We believe that everyone has a superpower—a skill that can change a life, clean an ocean, or build a school. Rippl is the operating system for social impact, connecting world-class talent with verified missions." },
      { h: "The Ripple Effect", p: "Every hour you donate doesn't just complete a task; it creates a ripple. We use gamification to track that impact and turn professional growth into community growth." }
    ]
  },
  faq: {
    title: "Help Center",
    subtitle: "Common questions about the ripple movement.",
    sections: [
      { h: "How is XP calculated?", p: "XP is based on task complexity, duration, and urgency. Verified masters can earn bonus multipliers for mentoring newcomers." },
      { h: "Can I post a mission?", p: "Only verified organizations with a tax-exempt status or proven social footprint can currently post missions to ensure our volunteers make a real impact." }
    ]
  },
  terms: {
    title: "Terms of Service",
    subtitle: "Rules of the road for our ecosystem.",
    sections: [
      { h: "The Rippl Commitment", p: "By joining, you agree to provide high-quality professional contributions and adhere to our ethical guidelines. No hate speech, no fake impact." }
    ]
  },
  privacy: {
    title: "Privacy Policy",
    subtitle: "Your data is yours. Period.",
    sections: [
      { h: "Data Sovereignty", p: "We never sell volunteer or organization data. Your impact logs and skill metrics are used only to match you with the best possible missions." }
    ]
  }
};

const InfoPage: React.FC<InfoPageProps> = ({ type }) => {
  const page = CONTENT[type];

  return (
    <div className="max-w-[1000px] mx-auto px-6 py-20">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-16"
      >
        <header className="space-y-4 text-center">
          <h1 className="text-6xl font-black tracking-tighter">{page.title}</h1>
          <p className="text-xl text-slate-500 font-medium">{page.subtitle}</p>
        </header>

        <div className="bg-white dark:bg-card-dark p-12 md:p-20 rounded-[4rem] border border-border-light dark:border-border-dark shadow-sm space-y-12">
          {page.sections.map((s, i) => (
            <section key={i} className="space-y-6">
              <h2 className="text-3xl font-black">{s.h}</h2>
              <p className="text-xl text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                {s.p}
              </p>
            </section>
          ))}
          
          <div className="pt-12 border-t border-slate-50 dark:border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex gap-8 text-xs font-black uppercase tracking-widest text-slate-400">
              <Link to="/about" className="hover:text-primary transition-colors">About</Link>
              <Link to="/faq" className="hover:text-primary transition-colors">FAQ</Link>
              <Link to="/terms" className="hover:text-primary transition-colors">Terms</Link>
              <Link to="/privacy" className="hover:text-primary transition-colors">Privacy</Link>
            </div>
            <Link to="/dashboard" className="h-14 px-10 bg-slate-900 dark:bg-primary text-white dark:text-slate-900 rounded-2xl font-black flex items-center gap-2 shadow-xl">
              Back to Dashboard
              <span className="material-symbols-outlined">arrow_forward</span>
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default InfoPage;
