
import React, { useState, useEffect, useMemo, createContext, useContext } from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { TaskStatus, Task, User } from './types';
import { MOCK_USER, MOCK_TASKS } from './constants';

// Context Definition
export interface AppState {
  user: User;
  tasks: Task[];
  notifications: any[];
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  userType: 'volunteer' | 'org';
  setUserType: (type: 'volunteer' | 'org') => void;
  acceptTask: (taskId: string, applicationData?: any) => void;
  createTask: (task: Task) => void;
  reviewApplication: (taskId: string, approved: boolean) => void;
  submitEvidence: (taskId: string, evidence: any) => void;
  verifySubmission: (taskId: string) => void;
  rejectSubmission: (taskId: string) => void;
  addNotification: (text: string, type?: 'info' | 'success' | 'warning') => void;
}

export const AppContext = createContext<AppState | undefined>(undefined);

export const useAppState = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useAppState must be used within AppProvider");
  return context;
};

// Component Imports
import LandingPage from './pages/LandingPage';
import VolunteerDashboard from './pages/VolunteerDashboard';
import DiscoveryPage from './pages/DiscoveryPage';
import TaskDetailPage from './pages/TaskDetailPage';
import ApplyToMissionPage from './pages/ApplyToMissionPage';
import ActiveTaskPage from './pages/ActiveTaskPage';
import LeaderboardPage from './pages/LeaderboardPage';
import NotificationsPage from './pages/NotificationsPage';
import SettingsPage from './pages/SettingsPage';
import InfoPage from './pages/InfoPage';
import AuthPage from './pages/AuthPage';
import OrgAuthPage from './pages/OrgAuthPage';
import OrganizationDashboard from './pages/OrganizationDashboard';
import PostTaskPage from './pages/PostTaskPage';
import ImpactPage from './pages/ImpactPage';
import OrgSettingsPage from './pages/OrgSettingsPage';
import PublicProfilePage from './pages/PublicProfilePage';
import OrganizationDetailPage from './pages/OrganizationDetailPage';
import OrganizationsPage from './pages/OrganizationsPage';
import ApplicationsPage from './pages/ApplicationsPage';
import AnalyticsDashboard from './pages/AnalyticsDashboard';
import MessagesPage from './pages/MessagesPage';
import CommunityPage from './pages/CommunityPage';
import SkillsPage from './pages/SkillsPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';

const PageWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 15 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -15 }}
    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    className="min-h-full"
  >
    {children}
  </motion.div>
);

const Navbar = () => {
  const location = useLocation();
  const { isDarkMode, toggleDarkMode, user, userType } = useAppState();

  const volunteerLinks = [
    { to: '/dashboard', label: 'Home', icon: 'home' },
    { to: '/discovery', label: 'Explore', icon: 'explore' },
    { to: '/leaderboard', label: 'Ranks', icon: 'leaderboard' },
    { to: '/impact', label: 'Impact', icon: 'monitoring' },
  ];

  const orgLinks = [
    { to: '/org-dashboard', label: 'Console', icon: 'dashboard' },
    { to: '/applications', label: 'Talent', icon: 'group' },
    { to: '/post-task', label: 'Post', icon: 'add_circle' },
    { to: '/analytics', label: 'Stats', icon: 'analytics' },
  ];

  const links = userType === 'org' ? orgLinks : volunteerLinks;
  const hideNav = ['/', '/signin', '/signup', '/org-signin', '/org-signup', '/forgot-password'].includes(location.pathname);
  if (hideNav) return null;

  return (
    <header className="fixed top-0 z-[100] w-full border-b border-border-light dark:border-border-dark bg-white/80 dark:bg-background-dark/80 backdrop-blur-xl px-8 py-4">
      <div className="max-w-[1440px] mx-auto flex items-center justify-between">
        <Link to={userType === 'org' ? "/org-dashboard" : "/dashboard"} className="flex items-center gap-3 group">
          <div className="size-10 bg-primary rounded-xl flex items-center justify-center text-slate-900 shadow-lg shadow-primary/20">
            <span className="material-symbols-outlined text-xl font-bold">waves</span>
          </div>
          <h2 className="text-slate-900 dark:text-white text-xl font-black tracking-tighter transition-colors group-hover:text-primary">Rippl</h2>
        </Link>
        <nav className="hidden md:flex items-center gap-2 bg-slate-100/50 dark:bg-white/5 p-1 rounded-2xl border border-white/10">
          {links.map((link) => (
            <Link 
              key={link.to} 
              to={link.to} 
              className={`relative px-6 py-2.5 text-[11px] font-extrabold uppercase tracking-widest flex items-center gap-2 transition-all rounded-xl ${location.pathname === link.to ? 'text-primary' : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'}`}
            >
              <span className="material-symbols-outlined text-[18px]">{link.icon}</span>
              {link.label}
              {location.pathname === link.to && (
                <motion.div 
                  layoutId="nav-pill" 
                  className="absolute inset-0 bg-white dark:bg-card-dark rounded-xl -z-10 shadow-sm border border-slate-200 dark:border-white/10" 
                  transition={{ type: "spring", bounce: 0.15, duration: 0.6 }}
                />
              )}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-4">
          <button onClick={toggleDarkMode} className="size-11 flex items-center justify-center rounded-2xl bg-slate-100 dark:bg-white/5 hover:bg-primary/10 transition-colors">
            <span className="material-symbols-outlined text-xl">{isDarkMode ? 'light_mode' : 'dark_mode'}</span>
          </button>
          <Link to={userType === 'org' ? "/org-settings" : "/settings"} className="flex items-center gap-3 pl-2 pr-5 py-2 rounded-full bg-slate-100 dark:bg-white/5 border border-transparent hover:border-primary/20 transition-all group">
            <img className="size-9 rounded-full object-cover border-2 border-primary/20 group-hover:border-primary transition-colors" src={userType === 'org' ? 'https://picsum.photos/id/100/100' : user.avatar} alt="User" />
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-700 dark:text-slate-200">{userType === 'org' ? 'Partner' : user.name.split(' ')[0]}</span>
          </Link>
        </div>
      </div>
    </header>
  );
};

const App: React.FC = () => {
  const [user, setUser] = useState<User>(MOCK_USER);
  const [tasks, setTasks] = useState<Task[]>(MOCK_TASKS);
  const [userType, setUserType] = useState<'volunteer' | 'org'>('volunteer');
  const [notifications, setNotifications] = useState<any[]>([]);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  const contextValue = useMemo(() => ({
    user, tasks, notifications, isDarkMode, userType,
    toggleDarkMode: () => setIsDarkMode(prev => !prev),
    setUserType: (type: 'volunteer' | 'org') => setUserType(type),
    addNotification: (text: string, type: 'info' | 'success' | 'warning' = 'info') => {
      setNotifications(prev => [{ id: Date.now(), text, type, time: 'Just now' }, ...prev]);
    },
    acceptTask: (taskId: string, applicationData?: any) => {
      setTasks(prev => prev.map(t => t.id === taskId ? { ...t, status: TaskStatus.PENDING, applicationDetails: applicationData } : t));
    },
    createTask: (newTask: Task) => setTasks(prev => [newTask, ...prev]),
    reviewApplication: (taskId: string, approved: boolean) => {
      setTasks(prev => prev.map(t => t.id === taskId ? { ...t, status: approved ? TaskStatus.IN_PROGRESS : TaskStatus.DECLINED } : t));
    },
    submitEvidence: (taskId: string, evidence: any) => {
      setTasks(prev => prev.map(t => t.id === taskId ? { ...t, status: TaskStatus.IN_REVIEW, evidence } : t));
    },
    verifySubmission: (taskId: string) => {
      setTasks(prev => prev.map(t => t.id === taskId ? { ...t, status: TaskStatus.COMPLETED } : t));
    },
    rejectSubmission: (taskId: string) => {
      setTasks(prev => prev.map(t => t.id === taskId ? { ...t, status: TaskStatus.IN_PROGRESS } : t));
    }
  }), [user, tasks, notifications, isDarkMode, userType]);

  return (
    <AppContext.Provider value={contextValue}>
      <Router>
        <Navbar />
        <main className="flex-1 pt-[88px]">
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<PageWrapper><LandingPage /></PageWrapper>} />
              <Route path="/signin" element={<PageWrapper><AuthPage mode="signin" /></PageWrapper>} />
              <Route path="/signup" element={<PageWrapper><AuthPage mode="signup" /></PageWrapper>} />
              <Route path="/org-signin" element={<PageWrapper><OrgAuthPage mode="signin" /></PageWrapper>} />
              <Route path="/org-signup" element={<PageWrapper><OrgAuthPage mode="signup" /></PageWrapper>} />
              <Route path="/forgot-password" element={<PageWrapper><ForgotPasswordPage /></PageWrapper>} />
              <Route path="/dashboard" element={<PageWrapper><VolunteerDashboard /></PageWrapper>} />
              <Route path="/org-dashboard" element={<PageWrapper><OrganizationDashboard /></PageWrapper>} />
              <Route path="/discovery" element={<PageWrapper><DiscoveryPage /></PageWrapper>} />
              <Route path="/task/:id" element={<PageWrapper><TaskDetailPage /></PageWrapper>} />
              <Route path="/apply/:id" element={<PageWrapper><ApplyToMissionPage /></PageWrapper>} />
              <Route path="/active-task/:id" element={<PageWrapper><ActiveTaskPage /></PageWrapper>} />
              <Route path="/leaderboard" element={<PageWrapper><LeaderboardPage /></PageWrapper>} />
              <Route path="/notifications" element={<PageWrapper><NotificationsPage /></PageWrapper>} />
              <Route path="/settings" element={<PageWrapper><SettingsPage /></PageWrapper>} />
              <Route path="/org-settings" element={<PageWrapper><OrgSettingsPage /></PageWrapper>} />
              <Route path="/impact" element={<PageWrapper><ImpactPage /></PageWrapper>} />
              <Route path="/profile/:id" element={<PageWrapper><PublicProfilePage /></PageWrapper>} />
              <Route path="/partner/:id" element={<PageWrapper><OrganizationDetailPage /></PageWrapper>} />
              <Route path="/organizations" element={<PageWrapper><OrganizationsPage /></PageWrapper>} />
              <Route path="/applications" element={<PageWrapper><ApplicationsPage /></PageWrapper>} />
              <Route path="/analytics" element={<PageWrapper><AnalyticsDashboard /></PageWrapper>} />
              <Route path="/post-task" element={<PageWrapper><PostTaskPage /></PageWrapper>} />
              <Route path="/messages" element={<PageWrapper><MessagesPage /></PageWrapper>} />
              <Route path="/community" element={<PageWrapper><CommunityPage /></PageWrapper>} />
              <Route path="/skills" element={<PageWrapper><SkillsPage /></PageWrapper>} />
              <Route path="/about" element={<PageWrapper><InfoPage type="about" /></PageWrapper>} />
              <Route path="/faq" element={<PageWrapper><InfoPage type="faq" /></PageWrapper>} />
              <Route path="/terms" element={<PageWrapper><InfoPage type="terms" /></PageWrapper>} />
              <Route path="/privacy" element={<PageWrapper><InfoPage type="privacy" /></PageWrapper>} />
            </Routes>
          </AnimatePresence>
        </main>
      </Router>
    </AppContext.Provider>
  );
};

export default App;
