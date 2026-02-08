import React, { createContext, useContext } from 'react';
import { Task, User, TaskStatus } from './types';
import { MOCK_USER } from './constants';

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
  if (!context) {
    return {
      user: MOCK_USER,
      tasks: [],
      notifications: [],
      isDarkMode: false,
      userType: 'volunteer',
      setUserType: () => {},
      toggleDarkMode: () => {},
      acceptTask: () => {},
      createTask: () => {},
      reviewApplication: () => {},
      submitEvidence: () => {},
      verifySubmission: () => {},
      rejectSubmission: () => {},
      addNotification: () => {}
    } as AppState;
  }
  return context;
};

export const RipplLogo = ({ className = "size-9" }: { className?: string }) => (
  <div className={`${className} bg-primary rounded-xl flex items-center justify-center text-slate-900 shadow-lg shadow-primary/20 transition-transform duration-700 hover:rotate-[360deg]`}>
    <span className="material-symbols-outlined text-xl font-bold">waves</span>
  </div>
);