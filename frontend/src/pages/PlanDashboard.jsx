import React from 'react';
import ProjectBanner from '../components/ProjectBanner';
import DayBlock from '../components/DayBlock';

// --- MOCK DATA ---
const projectMeta = {
  title: 'E-commerce Redesign',
  breadcrumbs: 'PROJECTS > CURRENT SPRINT',
  daysRemaining: 14,
  progress: 65,
};

const planData = [
  {
    id: 1,
    dayNumber: 1,
    date: 'October 24, 2023',
    status: 'active',
    defaultOpen: true,
    tasks: [
      { id: 101, title: 'Finalize wireframe sketches', time: '2.5 hrs', completed: true },
      { id: 102, title: 'Review feedback with stakeholder', time: '1.0 hr', completed: true },
      { id: 103, title: 'Prepare typography scale', time: '1.5 hrs', completed: false },
      { id: 104, title: 'Define primary color palette', time: '0.5 hrs', completed: false },
    ],
  },
  {
    id: 2,
    dayNumber: 2,
    date: 'October 25, 2023',
    status: 'upcoming',
    defaultOpen: false,
    tasks: [
      { id: 201, title: 'Build hero section component', time: '2.0 hrs', completed: false },
      { id: 202, title: 'Setup routing framework', time: '1.0 hr', completed: false },
      { id: 203, title: 'Configure global state', time: '1.5 hrs', completed: false },
    ],
  },
  {
    id: 3,
    dayNumber: 3,
    date: 'October 26, 2023',
    status: 'past',
    defaultOpen: false,
    tasks: [],
  },
];

const PlanDashboard = () => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-8 pb-24 transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <ProjectBanner projectMeta={projectMeta} />

        {/* --- Schedule Section --- */}
        <div>
          {/* Section Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              Plan Schedule
            </h2>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-sm font-bold hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
              Filter
            </button>
          </div>

          {/* Days List */}
          <div>
            {planData.map((day) => (
              <DayBlock key={day.id} dayData={day} />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default PlanDashboard;