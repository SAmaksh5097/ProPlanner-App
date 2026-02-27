import React from 'react';

const ProjectCard = ({ project }) => {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md dark:shadow-none dark:hover:border-slate-700 transition-all flex flex-col h-full">
      
      <div className="flex justify-between items-start mb-4">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${project.iconColor}`}>
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm-1 2.5L18.5 10H13V4.5z" />
          </svg>
        </div>
        <span className={`px-2.5 py-1 rounded-md text-xs font-bold ${project.badgeColor}`}>
          {project.badgeText}
        </span>
      </div>

      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 transition-colors">
        {project.title}
      </h3>
      <div className="flex flex-wrap gap-2 mb-8">
        {project.tags.map((tag, index) => (
          <span
            key={index}
            className="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-full text-xs font-medium transition-colors"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="flex-grow"></div>

      <div className="mb-6">
        <div className="flex justify-between text-sm mb-2">
          <span className="font-medium text-slate-500 dark:text-slate-400">Progress</span>
          <span className="font-bold text-slate-900 dark:text-white">{project.progress}%</span>
        </div>
        <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2.5 transition-colors">
          <div
            className={`${project.progressColor} h-2.5 rounded-full transition-all duration-500`}
            style={{ width: `${project.progress}%` }}
          ></div>
        </div>
      </div>

      <div className="flex justify-between items-center border-t border-slate-100 dark:border-slate-800 pt-4 mt-auto transition-colors">
        <div className="flex items-center text-slate-500 dark:text-slate-400 text-sm font-medium">
          <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          {project.dueDate}
        </div>        
      </div>

    </div>
  );
};

export default ProjectCard;