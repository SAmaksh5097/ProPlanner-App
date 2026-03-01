import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Clock, Check, ChevronDown } from 'lucide-react';

const TaskItem = ({ task, onToggle, onSubTaskToggle }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const hasSubTasks = task.subTasks && task.subTasks.length > 0;

  const completedSubTasks = hasSubTasks ? task.subTasks.filter(s => s.completed).length : 0;

  return (
    <div className="py-0.5">
      <div className="flex items-start gap-4 p-3 sm:p-4 hover:bg-brand-light/60 dark:hover:bg-brand-card-dark/50 rounded-xl transition-colors group">
        
        {/* Checkbox */}
        <div className="pt-0.5 cursor-pointer" onClick={onToggle}>
          <motion.div 
            animate={task.completed ? { scale: [1, 1.2, 1] } : {}}
            transition={{ duration: 0.3 }}
            className={`w-6 h-6 rounded-md border flex items-center justify-center transition-all ${
              task.completed 
              ? 'bg-brand-accent border-brand-accent' 
              : 'border-brand-muted/50 dark:border-brand-muted/30 bg-white dark:bg-brand-card-dark'
            }`}
          >
            {task.completed && <Check className="w-4 h-4 text-white" strokeWidth={3} />}
          </motion.div>
        </div>
        
        {/* Task Content */}
        <div 
          className="flex-1 cursor-pointer select-none" 
          onClick={() => hasSubTasks && setIsExpanded(!isExpanded)}
        >
          <h4 className={`text-base font-medium transition-all ${
            task.completed 
            ? 'text-brand-muted line-through' 
            : 'text-brand-dark dark:text-brand-light'
          }`}>
            {task.title}
          </h4>
          <div className="flex items-center gap-3 mt-0.5">
            <div className="flex items-center gap-1.5 text-sm text-brand-muted font-medium">
              <Clock className='w-4 h-4'/>
              {task.timeEstimate || task.time}
            </div>
            {hasSubTasks && (
              <span className="text-xs text-brand-muted/70 font-medium">
                {completedSubTasks}/{task.subTasks.length} steps
              </span>
            )}
          </div>
        </div>

        {/* Expand Button */}
        {hasSubTasks && (
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="pt-1.5 text-brand-muted hover:text-brand-accent transition-colors"
          >
            <motion.div animate={{ rotate: isExpanded ? 180 : 0 }} transition={{ duration: 0.2 }}>
              <ChevronDown className="w-5 h-5" />
            </motion.div>
          </button>
        )}
      </div>

      {/* SubTasks Dropdown */}
      <AnimatePresence>
        {isExpanded && hasSubTasks && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="ml-14 pl-4 border-l-2 border-brand-accent/30 space-y-1 pb-3">
              {task.subTasks.map((subTask, index) => (
                <motion.div 
                  key={subTask._id || index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.2 }}
                  onClick={() => onSubTaskToggle(index)}
                  className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-brand-light/40 dark:hover:bg-brand-card-dark/30 cursor-pointer transition-colors"
                >
                  <div className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 transition-all ${
                    subTask.completed 
                    ? 'bg-brand-accent/80 border-brand-accent/80' 
                    : 'border-brand-muted/40 dark:border-brand-muted/25'
                  }`}>
                    {subTask.completed && <Check className="w-3 h-3 text-white" strokeWidth={3} />}
                  </div>
                  <span className={`text-sm leading-snug ${
                    subTask.completed
                    ? 'text-brand-muted line-through'
                    : 'text-brand-dark/80 dark:text-brand-light/80'
                  }`}>
                    {subTask.title}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TaskItem;