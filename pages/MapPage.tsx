import React from 'react';
import { motion } from 'framer-motion';

const MapPage: React.FC = () => {
  return (
    <div className="h-[calc(100vh-72px)] relative bg-[#050a08] overflow-hidden flex flex-col items-center justify-center">
      {/* Void Environment */}
      <div className="absolute inset-0 map-noise"></div>
      
      {/* Central Neural Hub */}
      <div className="relative z-10 max-w-5xl px-8 text-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative mb-16"
        >
          {/* Animated Orbitals */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <motion.div 
              animate={{ rotate: 360, scale: [1, 1.05, 1] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="size-[500px] border border-primary/20 rounded-full opacity-30"
            />
            <motion.div 
              animate={{ rotate: -360, scale: [1, 1.1, 1] }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              className="size-[400px] border border-blue-500/20 rounded-full opacity-30 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            />
          </div>

          <div className="size-48 bg-primary/10 backdrop-blur-3xl text-primary rounded-full flex items-center justify-center mx-auto shadow-[0_0_100px_rgba(19,236,109,0.3)] border border-primary/30 relative z-20">
            <motion.span 
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="material-symbols-outlined text-8xl font-black"
            >hub</motion.span>
          </div>
        </motion.div>

        <div className="space-y-8 relative z-30">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <h1 className="text-7xl md:text-9xl font-black tracking-tighter text-white leading-[0.8] mb-6">
              Deconstructing <br /> 
              <span className="text-primary italic">The Grid.</span>
            </h1>
            <p className="text-2xl md:text-3xl text-slate-400 font-medium max-w-3xl mx-auto leading-tight">
              We have removed the static map elements to build a real-time <strong className="text-white">Neural Impact Topology</strong>. 
              The future of volunteering isn't a coordinate; it's a connection.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="flex flex-wrap justify-center gap-6 pt-10"
          >
            {[
              { l: 'Status', v: 'Map elements purged', c: 'text-primary' },
              { l: 'Architecture', v: 'Neural Node-Mapping', c: 'text-blue-400' },
              { l: 'ETA', v: 'Q1 2024 Deployment', c: 'text-orange-400' }
            ].map((stat, i) => (
              <div key={i} className="px-8 py-5 bg-white/5 border border-white/10 rounded-[2rem] backdrop-blur-2xl text-left min-w-[240px] hover:border-white/20 transition-all group">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1 group-hover:text-primary transition-colors">{stat.l}</p>
                <p className="text-white font-black text-lg">{stat.v}</p>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="pt-12"
          >
            <button className="h-24 px-16 bg-primary text-slate-900 rounded-[3rem] font-black text-2xl shadow-[0_0_60px_rgba(19,236,109,0.3)] hover:scale-105 active:scale-95 transition-all">
              Join the Beta Core
            </button>
          </motion.div>
        </div>
      </div>

      {/* Background Depth Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border border-white/5 rounded-full"
            style={{ width: `${(i + 1) * 300}px`, height: `${(i + 1) * 300}px` }}
            animate={{ scale: [1, 1.2, 1], opacity: [0.05, 0.1, 0.05] }}
            transition={{ duration: 10, delay: i * 2, repeat: Infinity }}
          />
        ))}
      </div>
    </div>
  );
};

export default MapPage;