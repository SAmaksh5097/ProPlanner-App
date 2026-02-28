import React from 'react';

const ProjectBanner = ({ projectMeta }) => {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 mb-10 shadow-sm transition-colors duration-300">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        
        {/* Left side: Project Info */}
        <div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mb-3">
            {projectMeta.title}
          </h1>
          <div className="flex items-center text-slate-500 dark:text-slate-400 font-medium">
            <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {projectMeta.daysRemaining} days remaining
          </div>
        </div>

        {/* Right side: Progress Bar */}
        <div className="w-full md:w-64">
          <div className="flex justify-end text-sm font-bold text-blue-600 dark:text-blue-400 mb-2">
            {projectMeta.progress}% Complete
          </div>
          <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-3">
            <div 
              className="bg-blue-500 h-3 rounded-full transition-all duration-1000" 
              style={{ width: `${projectMeta.progress}%` }}
            ></div>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default ProjectBanner;