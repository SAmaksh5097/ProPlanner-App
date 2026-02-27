import React, { useState } from 'react';
import TaskItem from './TaskItem';

const DayBlock = ({ dayData }) => {
  const [isOpen, setIsOpen] = useState(dayData.defaultOpen);

  // Status-based styling maps
  const styles = {
    active: {
      badgeBg: 'bg-emerald-100 dark:bg-emerald-900/30',
      badgeText: 'text-emerald-700 dark:text-emerald-400',
      titleText: 'text-slate-900 dark:text-white',
    },
    upcoming: {
      badgeBg: 'bg-blue-100 dark:bg-blue-900/30',
      badgeText: 'text-blue-700 dark:text-blue-400',
      titleText: 'text-slate-900 dark:text-white',
    },
    past: {
      badgeBg: 'bg-slate-100 dark:bg-slate-800',
      badgeText: 'text-slate-400 dark:text-slate-500',
      titleText: 'text-slate-400 dark:text-slate-500',
    }
  };

  const currentStyle = styles[dayData.status];
  const taskCount = dayData.tasks.length;

  return (
    <div className={`mb-4 rounded-2xl border transition-colors duration-300 ${
      isOpen 
        ? 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 shadow-sm' 
        : 'bg-white/60 dark:bg-slate-900/60 border-slate-100 dark:border-slate-800 hover:border-slate-200 dark:hover:border-slate-700'
    }`}>
      
      {/* Accordion Header */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-5 sm:p-6 text-left focus:outline-none"
      >
        <div className="flex items-center gap-4 sm:gap-6">
          <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${currentStyle.badgeBg} ${currentStyle.badgeText}`}>
            D{dayData.dayNumber}
          </div>
          <div>
            <h3 className={`text-xl font-bold mb-1 ${currentStyle.titleText}`}>
              Day {dayData.dayNumber}
            </h3>
            <p className="text-sm font-medium text-slate-500 dark:text-slate-500">
              {dayData.date}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {!isOpen && taskCount > 0 && (
            <span className="hidden sm:inline-flex items-center px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-500 dark:text-slate-400">
              {taskCount} tasks
            </span>
          )}
          <svg 
            className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} 
            fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>

      {/* Accordion Body */}
      {isOpen && taskCount > 0 && (
        <div className="p-2 sm:p-4 border-t border-slate-100 dark:border-slate-800">
          <div className="space-y-1">
            {dayData.tasks.map(task => (
              <TaskItem key={task.id} task={task} />
            ))}
          </div>
        </div>
      )}
      {isOpen && taskCount === 0 && (
        <div className="p-6 text-center border-t border-slate-100 dark:border-slate-800 text-slate-500 dark:text-slate-400">
          No tasks scheduled for this day.
        </div>
      )}
    </div>
  );
};

export default DayBlock;