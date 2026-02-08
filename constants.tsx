
import React from 'react';
import { Task, TaskStatus, Achievement } from './types';

export const MOCK_USER = {
  name: 'Adeola Ogundimu',
  level: 14,
  currentXP: 2300,
  targetXP: 2450,
  streak: 12,
  totalXP: 2450,
  totalHours: 24,
  avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCxQSYywIWeIucfIYcMRdTrfuieUMLusDWJlW0jCfnKnkbDONj2PkSnhmHItlL_KGwcD7Q1vEvuMoJ0A2y1DVYs6PoGcNdictZB407v9RQpKsa-f9XGOBx3Re1Neljmct5_GMob-yEqs122xGiddMOrurYB7mNLsJeoMJTgDX2RsTw5QnRmcUUZTuQ5OuQf9JncsX_7bPAKTHD2UzOSv30Vxq9yvloqHEORCjaj7A6MneVMEs35pZ6Q4UMBIHiIXr0-lhvowyFRdyM'
};

export const MOCK_TASKS: Task[] = [
  {
    id: '1',
    title: 'Annual Gala Branding',
    organization: 'Malete Tech Forum',
    orgLogo: 'https://picsum.photos/id/100/100',
    category: 'Graphic Design',
    description: 'Help the Malete Tech Forum design promotional materials for their upcoming fundraising gala. We need posters, social media banners, and email headers.',
    xp: 200,
    hours: 5,
    deadline: 'Oct 30, 2023',
    locationType: 'Remote',
    locationName: 'Online',
    status: TaskStatus.IN_PROGRESS,
    tags: ['Graphic Design', 'Remote']
  },
  {
    id: '2',
    title: 'Voice AI Localization',
    organization: 'Oratora',
    orgLogo: 'https://picsum.photos/id/101/100',
    category: 'Translation',
    description: 'Assist Oratora in identifying cultural nuances for their local voice AI platform. Requires native-level fluency and tech awareness.',
    xp: 450,
    hours: 6,
    deadline: 'Oct 28, 2023',
    locationType: 'Remote',
    locationName: 'Online',
    status: TaskStatus.URGENT,
    tags: ['Translation', 'AI']
  },
  {
    id: '3',
    title: 'Beach Cleanup Logistics',
    organization: 'Ocean Guardians',
    orgLogo: 'https://picsum.photos/id/102/100',
    category: 'Environment',
    description: 'Coordinate the transport of collected waste to the recycling facility.',
    xp: 500,
    hours: 8,
    deadline: 'Nov 2, 2023',
    locationType: 'Physical',
    locationName: 'Coney Island, NY',
    status: TaskStatus.ACTIVE,
    tags: ['Environment', 'Physical']
  },
  {
    id: '4',
    title: 'Social Media Strategy',
    organization: 'Health Bridge',
    orgLogo: 'https://picsum.photos/id/103/100',
    category: 'Marketing',
    description: 'Create a 30-day engagement plan for local neighborhood outreach programs.',
    xp: 300,
    hours: 4,
    deadline: 'Nov 5, 2023',
    locationType: 'Remote',
    locationName: 'Online',
    status: TaskStatus.NEW,
    tags: ['Marketing', 'Strategy']
  }
];

export const MOCK_ACHIEVEMENTS: Achievement[] = [
  {
    id: 'a1',
    title: 'Community Hero',
    type: 'Master Achievement',
    icon: 'shield_person',
    color: 'primary',
    description: 'Awarded for consistent excellence.'
  },
  {
    id: 'a2',
    title: 'Spark Starter',
    type: 'First Impact Badge',
    icon: 'auto_awesome',
    color: 'teal-accent',
    description: 'Your very first contribution.'
  },
  {
    id: 'a3',
    title: '30 Day Streak',
    type: 'Consistent Impact',
    icon: 'local_fire_department',
    color: 'orange-500',
    description: 'Kept the momentum for 30 days.'
  },
  {
    id: 'a4',
    title: 'Lead Mentor',
    type: 'Guide 5+ Members',
    icon: 'groups',
    color: 'purple-500',
    description: 'Helping others find their way.'
  }
];
