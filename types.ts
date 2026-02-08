export enum TaskStatus {
  NEW = 'New',
  URGENT = 'Urgent',
  ACTIVE = 'Active',
  PENDING = 'Pending',
  IN_PROGRESS = 'In Progress',
  IN_REVIEW = 'In Review',
  COMPLETED = 'Completed',
  DECLINED = 'Declined'
}

export interface Task {
  id: string;
  title: string;
  organization: string;
  orgLogo: string;
  category: string;
  description: string;
  xp: number;
  hours: number;
  deadline: string;
  locationType: 'Remote' | 'Physical';
  locationName: string;
  status: TaskStatus;
  tags: string[];
  evidence?: any;
  applicationDetails?: {
    pitch: string;
    motivation: string;
    resumeName?: string;
    portfolioUrl?: string;
    submittedAt: string;
  };
}

export interface User {
  name: string;
  level: number;
  currentXP: number;
  targetXP: number;
  streak: number;
  totalXP: number;
  totalHours: number;
  avatar: string;
}

export interface Achievement {
  id: string;
  title: string;
  type: string;
  icon: string;
  color: string;
  description: string;
}