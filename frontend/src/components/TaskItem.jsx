import React from 'react';
import { Clock, Check } from 'lucide-react';

const TaskItem = ({ task, onToggle }) => {
  return (
    <div 
      onClick={onToggle} // Clicking the whole row toggles the task
      className="flex items-start gap-4 p-3 sm:p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-xl transition-colors group cursor-pointer"
    >
      {/* Custom Checkbox Design */}
      <div className="pt-0.5">
        <div className={`w-6 h-6 rounded-md border flex items-center justify-center transition-all ${
          task.completed 
          ? 'bg-blue-600 border-blue-600' 
          : 'border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800'
        }`}>
          {task.completed && <Check className="w-4 h-4 text-white" strokeWidth={3} />}
        </div>
      </div>
      
      {/* Task Content */}
      <div className="flex-1">
        <h4 className={`text-base font-medium transition-all ${
          task.completed 
          ? 'text-slate-400 dark:text-slate-500 line-through' 
          : 'text-slate-900 dark:text-white'
        }`}>
          {task.title}
        </h4>
        <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 font-medium">
          <Clock className='w-4 h-4'/>
          {task.timeEstimate || task.time} {/* Using the backend key name */}
        </div>
      </div>
    </div>
  );
};

export default TaskItem;