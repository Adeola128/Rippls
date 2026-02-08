
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CONVERSATIONS = [
  { id: 1, name: 'Green Earth Org', text: "Sure, the poster looks great! Let's talk tomorrow.", time: '10:42 AM', unread: true, active: true },
  { id: 2, name: 'Community Kitchen', text: 'Thanks for volunteering this weekend! We...', time: 'Yesterday', unread: true, active: false },
  { id: 3, name: 'Ocean Cleanup', text: 'Are you available for the beach patrol?', time: 'Tue', unread: false, active: false },
];

const MessagesPage: React.FC = () => {
  const [activeChat, setActiveChat] = useState(CONVERSATIONS[0]);

  return (
    <div className="flex h-[calc(100vh-72px)] overflow-hidden">
      <aside className="w-1/3 flex flex-col border-r border-border-light dark:border-border-dark bg-white dark:bg-background-dark">
        <div className="p-8 space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-black tracking-tight">Messages</h1>
            <motion.button 
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
              className="size-12 bg-primary text-slate-900 rounded-2xl flex items-center justify-center shadow-lg shadow-primary/20 transition-all"
            >
              <span className="material-symbols-outlined font-black">edit</span>
            </motion.button>
          </div>
          <div className="relative">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-secondary">search</span>
            <input className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl h-14 pl-12 pr-6 focus:ring-2 focus:ring-primary transition-all" placeholder="Search chats..." />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto px-4 space-y-2 no-scrollbar">
          {CONVERSATIONS.map((c, i) => (
            <motion.div 
              key={c.id} 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              onClick={() => setActiveChat(c)}
              className={`p-4 rounded-3xl flex items-center gap-4 cursor-pointer transition-all ${activeChat.id === c.id ? 'bg-primary/10 border border-primary/20' : 'hover:bg-slate-50 dark:hover:bg-slate-800/50'}`}
            >
              <div className="relative shrink-0">
                <img src={`https://picsum.photos/seed/${c.id}/100/100`} className="size-14 rounded-full object-cover border-2 border-white dark:border-slate-800" alt="A" />
                {c.unread && <div className="absolute bottom-0 right-0 size-4 bg-primary border-4 border-white dark:border-slate-800 rounded-full"></div>}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline mb-1">
                  <p className="font-black truncate">{c.name}</p>
                  <span className="text-[10px] text-secondary font-black">{c.time}</span>
                </div>
                <p className={`text-sm truncate font-medium ${c.unread ? 'text-slate-900 dark:text-white font-bold' : 'text-secondary'}`}>{c.text}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </aside>

      <section className="flex-1 flex flex-col bg-slate-50 dark:bg-slate-900/50">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeChat.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1 flex flex-col"
          >
            <header className="h-24 bg-white dark:bg-background-dark border-b border-border-light dark:border-border-dark px-10 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-4">
                <img src={`https://picsum.photos/seed/${activeChat.id}/100/100`} className="size-14 rounded-full border-2 border-primary/20" alt="Chat" />
                <div>
                  <h3 className="text-xl font-black leading-tight">{activeChat.name}</h3>
                  <p className="text-xs text-primary font-black flex items-center gap-1">
                    <span className="size-2 bg-primary rounded-full animate-pulse"></span> Active Now
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                {['call', 'videocam', 'more_vert'].map(icon => (
                  <motion.button 
                    key={icon}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="size-12 bg-slate-100 dark:bg-slate-800 rounded-2xl flex items-center justify-center hover:bg-primary hover:text-slate-900 transition-all"
                  >
                    <span className="material-symbols-outlined">{icon}</span>
                  </motion.button>
                ))}
              </div>
            </header>

            <div className="flex-1 overflow-y-auto p-10 space-y-8 flex flex-col no-scrollbar">
              <div className="self-center bg-slate-200 dark:bg-slate-800 px-6 py-2 rounded-full text-[10px] font-black text-secondary tracking-widest uppercase">Monday, October 16</div>
              
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="max-w-[70%] self-start flex gap-4"
              >
                <img src={`https://picsum.photos/seed/${activeChat.id}/40/40`} className="size-10 rounded-full mt-1 shrink-0" alt="A" />
                <div className="bg-white dark:bg-card-dark p-6 rounded-3xl rounded-tl-none shadow-sm border border-border-light dark:border-border-dark">
                  <p className="text-lg leading-relaxed">Hi Adeola! Thanks for your help with the upcoming Tree Planting Festival. Are you available for a quick sync?</p>
                  <span className="block text-[10px] text-secondary font-black mt-4 uppercase">10:30 AM</span>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="max-w-[70%] self-end flex flex-row-reverse gap-4"
              >
                <img src="https://picsum.photos/id/64/40/40" className="size-10 rounded-full mt-1 shrink-0" alt="U" />
                <div className="bg-primary text-slate-900 p-6 rounded-3xl rounded-tr-none shadow-xl shadow-primary/10">
                  <p className="text-lg font-bold leading-relaxed">Absolutely! I'd love to help. How about tomorrow at 10 AM?</p>
                  <div className="flex items-center gap-1 justify-end mt-4">
                    <span className="material-symbols-outlined text-sm font-black">done_all</span>
                    <span className="text-[10px] font-black uppercase">10:35 AM</span>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="max-w-[70%] self-start flex gap-4"
              >
                <img src={`https://picsum.photos/seed/${activeChat.id}/40/40`} className="size-10 rounded-full mt-1 shrink-0" alt="A" />
                <div className="bg-white dark:bg-card-dark p-6 rounded-3xl rounded-tl-none shadow-sm border border-border-light dark:border-border-dark">
                  <p className="text-lg leading-relaxed">Sure, the poster looks great! Let's talk tomorrow at the festival site.</p>
                  <span className="block text-[10px] text-secondary font-black mt-4 uppercase">10:42 AM</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="p-8 bg-white dark:bg-background-dark border-t border-border-light dark:border-border-dark shrink-0">
           <div className="max-w-[1000px] mx-auto flex items-center gap-4 bg-slate-50 dark:bg-slate-800 rounded-3xl p-3 pl-6 border border-border-light dark:border-border-dark focus-within:ring-2 ring-primary transition-all">
             <button className="text-secondary hover:text-primary transition-colors"><span className="material-symbols-outlined">add_circle</span></button>
             <button className="text-secondary hover:text-primary transition-colors"><span className="material-symbols-outlined">image</span></button>
             <input className="flex-1 bg-transparent border-none focus:ring-0 text-lg placeholder:text-secondary/50 py-2" placeholder="Write something..." />
             <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="size-14 bg-primary text-slate-900 rounded-2xl flex items-center justify-center shadow-lg shadow-primary/20 hover:brightness-105 transition-all"
             >
               <span className="material-symbols-outlined font-black fill-1">send</span>
             </motion.button>
           </div>
        </div>
      </section>
    </div>
  );
};

export default MessagesPage;
