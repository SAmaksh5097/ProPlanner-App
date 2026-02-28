import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import TaskItem from './TaskItem';

const DayBlock = ({ dayData }) => {
  const [isOpen, setIsOpen] = useState(dayData.defaultOpen);

  // Status-based styling maps
  const styles = {
    active: {
      badgeBg: 'bg-brand-accent/15',
      badgeText: 'text-brand-accent',
      titleText: 'text-brand-dark dark:text-brand-light',
    },
    upcoming: {
      badgeBg: 'bg-brand-muted/20',
      badgeText: 'text-brand-dark dark:text-brand-muted',
      titleText: 'text-brand-dark dark:text-brand-light',
    },
    past: {
      badgeBg: 'bg-brand-light dark:bg-brand-card-dark',
      badgeText: 'text-brand-muted',
      titleText: 'text-brand-muted',
    }
  };

  const currentStyle = styles[dayData.status];
  const taskCount = dayData.tasks.length;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={`mb-4 rounded-2xl border transition-colors duration-300 ${
        isOpen 
          ? 'bg-white dark:bg-brand-surface-dark border-brand-muted/30 dark:border-brand-muted/15 shadow-sm' 
          : 'bg-white/60 dark:bg-brand-surface-dark/60 border-brand-muted/15 dark:border-brand-muted/10 hover:border-brand-muted/30 dark:hover:border-brand-muted/20'
      }`}
    >
      
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
            <p className="text-sm font-medium text-brand-muted">
              {dayData.date}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {!isOpen && taskCount > 0 && (
            <span className="hidden sm:inline-flex items-center px-2.5 py-1 rounded-full bg-brand-light dark:bg-brand-card-dark text-xs font-bold text-brand-muted">
              {taskCount} tasks
            </span>
          )}
          <motion.svg 
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className="w-5 h-5 text-brand-muted" 
            fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </motion.svg>
        </div>
      </button>

      {/* Accordion Body */}
      <AnimatePresence>
        {isOpen && taskCount > 0 && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="p-2 sm:p-4 border-t border-brand-muted/15 dark:border-brand-muted/10">
              <div className="space-y-1">
                {dayData.tasks.map(task => (
                  <TaskItem key={task.id} task={task} />
                ))}
              </div>
            </div>
          </motion.div>
        )}
        {isOpen && taskCount === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="p-6 text-center border-t border-brand-muted/15 dark:border-brand-muted/10 text-brand-muted"
          >
            No tasks scheduled for this day.
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default DayBlock;