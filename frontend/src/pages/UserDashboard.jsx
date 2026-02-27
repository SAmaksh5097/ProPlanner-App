import React, { useState } from 'react';
import ProjectCard from '../components/ProjectCard';

const mockProjects = [
  {
    id: 1,
    title: 'Mobile App Redesign',
    tags: ['React Native', 'Firebase'],
    progress: 65,
    badgeText: 'High Priority',
    badgeColor: 'text-amber-700 bg-amber-100 dark:text-amber-400 dark:bg-amber-900/30',
    iconColor: 'text-blue-600 bg-blue-100 dark:text-blue-400 dark:bg-blue-900/30',
    dueDate: 'Due in 5 days',
    progressColor: 'bg-blue-500 dark:bg-blue-400',
  },
  {
    id: 2,
    title: 'E-commerce Backend',
    tags: ['Node.js', 'PostgreSQL', 'Redis'],
    progress: 42,
    badgeText: 'Internal',
    badgeColor: 'text-slate-600 bg-slate-100 dark:text-slate-300 dark:bg-slate-800',
    iconColor: 'text-emerald-600 bg-emerald-100 dark:text-emerald-400 dark:bg-emerald-900/30',
    dueDate: 'Due in 12 days',
    progressColor: 'bg-emerald-500 dark:bg-emerald-400',
  },
  {
    id: 3,
    title: 'Analytics Dashboard',
    tags: ['Next.js', 'Tailwind CSS'],
    progress: 88,
    badgeText: 'Critical',
    badgeColor: 'text-rose-700 bg-rose-100 dark:text-rose-400 dark:bg-rose-900/30',
    iconColor: 'text-purple-600 bg-purple-100 dark:text-purple-400 dark:bg-purple-900/30',
    dueDate: 'Due in 2 days',
    progressColor: 'bg-purple-500 dark:bg-purple-400',
  },
];

const UserDashboard = () => {
  const [activeTab, setActiveTab] = useState('Ongoing');

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-10 pb-20 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-1 tracking-tight transition-colors">
              Good morning, (User)! Here are your projects.
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-lg transition-colors">
              Manage your ongoing development pipelines and architectural plans
            </p>
          </div>
          <button className="inline-flex items-center px-5 py-2.5 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 shadow-sm transition-colors whitespace-nowrap">
            <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            Create New Plan
          </button>
        </div>

        <div className="border-b border-slate-200 dark:border-slate-800 mb-8 transition-colors">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab('Ongoing')}
              className={`pb-4 px-1 border-b-2 font-medium text-sm flex items-center transition-colors ${
                activeTab === 'Ongoing'
                  ? 'border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-500'
                  : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700'
              }`}
            >
              <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Ongoing
            </button>
            <button
              onClick={() => setActiveTab('Completed')}
              className={`pb-4 px-1 border-b-2 font-medium text-sm flex items-center transition-colors ${
                activeTab === 'Completed'
                  ? 'border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-500'
                  : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700'
              }`}
            >
              <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Completed
            </button>
          </nav>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

      </div>
    </div>
  );
};

export default UserDashboard;