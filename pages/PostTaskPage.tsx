
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAppState } from '../App';
import { TaskStatus, Task } from '../types';
import { GoogleGenAI } from "@google/genai";

const PostTaskPage: React.FC = () => {
  const navigate = useNavigate();
  const { createTask, addNotification } = useAppState();
  const [step, setStep] = useState(1);
  const [isAiGenerating, setIsAiGenerating] = useState(false);
  const [aiPrompt, setAiPrompt] = useState('');
  
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Design & Creative');
  const [description, setDescription] = useState('');
  const [xp, setXp] = useState(100);
  const [hours, setHours] = useState(5);
  const [locationType, setLocationType] = useState<'Remote' | 'Physical'>('Remote');
  const [locationName, setLocationName] = useState('Online');

  const handleAiArchitect = async () => {
    if (!aiPrompt.trim()) return;
    setIsAiGenerating(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Act as a professional social impact coordinator. 
        Create a detailed volunteering mission brief for an organization based on this goal: "${aiPrompt}". 
        Return ONLY a JSON object with: 
        "title": "catchy mission title", 
        "category": "Design & Creative", 
        "description": "2 paragraphs describing the tasks and the impact",
        "suggested_xp": 200,
        "suggested_hours": 5`,
        config: { responseMimeType: 'application/json' }
      });
      
      const text = response.text;
      if (text) {
        const data = JSON.parse(text);
        setTitle(data.title || title);
        setCategory(data.category || category);
        setDescription(data.description || description);
        setXp(data.suggested_xp || xp);
        setHours(data.suggested_hours || hours);
        addNotification("Drafted with Gemini AI", "success");
      }
    } catch (error) {
      console.error(error);
      addNotification("Draft generation failed", "warning");
    } finally {
      setIsAiGenerating(false);
      setAiPrompt('');
    }
  };

  const handlePublish = () => {
    const newTask: Task = {
      id: Math.random().toString(36).substr(2, 9),
      title,
      organization: 'Partner Org',
      orgLogo: 'https://picsum.photos/id/20/100/100',
      category,
      description,
      xp,
      hours,
      deadline: 'Nov 30, 2023',
      locationType,
      locationName,
      status: TaskStatus.NEW,
      tags: [category, locationType]
    };
    createTask(newTask);
    navigate('/org-dashboard');
  };

  return (
    <div className="max-w-[1200px] mx-auto px-6 py-10 pb-32">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-8 flex flex-col gap-8">
          <h1 className="text-4xl font-black tracking-tight mb-2">Post a Mission</h1>
          
          <div className="bg-slate-900 text-white p-8 rounded-[2.5rem] relative overflow-hidden group">
            <div className="absolute top-0 right-0 size-60 bg-primary/10 blur-[100px]" />
            <h3 className="text-xl font-black mb-4 relative z-10 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">psychology</span>
              Gemini AI Architect
            </h3>
            <div className="flex flex-col md:flex-row gap-4 relative z-10">
              <input 
                value={aiPrompt}
                onChange={(e) => setAiPrompt(e.target.value)}
                placeholder="What's your mission goal? (e.g. Design a logo for a local school)..."
                className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-6 h-14 outline-none focus:border-primary transition-all"
              />
              <button 
                onClick={handleAiArchitect}
                disabled={isAiGenerating || !aiPrompt.trim()}
                className="h-14 px-8 bg-primary text-slate-900 rounded-2xl font-black hover:scale-105 active:scale-95 disabled:opacity-50 transition-all"
              >
                {isAiGenerating ? 'Thinking...' : 'Magic Draft'}
              </button>
            </div>
          </div>

          <div className="bg-white dark:bg-card-dark p-10 rounded-[2.5rem] border border-border-light dark:border-border-dark space-y-8">
            <div className="space-y-4">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Title</label>
              <input 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-900/50 rounded-2xl h-16 px-6 text-xl font-bold border-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div className="space-y-4">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Description</label>
              <textarea 
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full min-h-[200px] bg-slate-50 dark:bg-slate-900/50 rounded-[2rem] p-8 text-lg border-none focus:ring-2 focus:ring-primary resize-none"
              />
            </div>
            <div className="pt-10">
              <button onClick={handlePublish} className="w-full h-18 bg-primary text-slate-900 rounded-2xl font-black text-xl hover:scale-105 transition-all">
                Publish Mission
              </button>
            </div>
          </div>
        </div>

        <aside className="lg:col-span-4">
          <div className="sticky top-24 bg-slate-900 text-white rounded-[2.5rem] p-10 space-y-6">
            <h3 className="text-xl font-black">Quick Preview</h3>
            <div className="p-6 bg-white/5 rounded-2xl border border-white/5">
              <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Selected Model</p>
              <p className="font-bold text-primary">Gemini 3 Flash</p>
            </div>
            <div className="p-6 bg-white/5 rounded-2xl border border-white/5">
              <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">XP Reward</p>
              <p className="font-bold">{xp} XP</p>
            </div>
            <p className="text-xs text-slate-400 font-medium leading-relaxed">
              Your mission will be vetted for professional alignment before being listed in the Discovery feed.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default PostTaskPage;
