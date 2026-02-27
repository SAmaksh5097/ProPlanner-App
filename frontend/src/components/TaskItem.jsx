import React from 'react';
import { Clock } from 'lucide-react';
const TaskItem = ({ task }) => {
  return (
    <div className="flex items-start gap-4 p-3 sm:p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-xl transition-colors group cursor-pointer">
      {/* Checkbox */}
      <div className="pt-0.5">
        <input 
          type="checkbox" 
          checked={task.completed} 
          
          className="w-5 h-5 text-blue-600 dark:text-blue-400 rounded focus:ring-blue-500 border-slate-300 dark:border-slate-700 transition-colors"
        />
      </div>
      
      {/* Task Content */}
      <div className="flex-1">
        <h4 className="text-base font-medium text-slate-900 dark:text-white mb-1">
          {task.title}
        </h4>
        <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 font-medium">
            <Clock className='w-4 h-4'/>
          {task.time}
        </div>
      </div>
    </div>
  );
};

export default TaskItem;