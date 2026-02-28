import React from 'react';
import { motion } from 'motion/react';
import { Clock, Check } from 'lucide-react';

const TaskItem = ({ task, onToggle }) => {
  return (
    <motion.div 
      onClick={onToggle}
      whileHover={{ x: 4 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
      className="flex items-start gap-4 p-3 sm:p-4 hover:bg-brand-light/60 dark:hover:bg-brand-card-dark/50 rounded-xl transition-colors group cursor-pointer"
    >
      {/* Custom Checkbox Design */}
      <div className="pt-0.5">
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
      <div className="flex-1">
        <h4 className={`text-base font-medium transition-all ${
          task.completed 
          ? 'text-brand-muted line-through' 
          : 'text-brand-dark dark:text-brand-light'
        }`}>
          {task.title}
        </h4>
        <div className="flex items-center gap-2 text-sm text-brand-muted font-medium">
          <Clock className='w-4 h-4'/>
          {task.timeEstimate || task.time}
        </div>
      </div>
    </motion.div>
  );
};

export default TaskItem;