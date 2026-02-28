import { Calendar } from 'lucide-react';
const ProjectCard = ({ project, onClick }) => {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md dark:shadow-none dark:hover:border-slate-700 transition-all flex flex-col h-full cursor-pointer" onClick={onClick}>
      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 transition-colors">
        {project.title}
      </h3>
      <div className="flex flex-wrap gap-2 mb-8">
        {project.tech_stack?.map((tag, index) => (
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
            className={`bg-blue-600 h-2.5 rounded-full transition-all duration-500`}
            style={{ width: `${project.progress}%` }}
          ></div>
        </div>
      </div>

      <div className="flex justify-between items-center border-t border-slate-100 dark:border-slate-800 pt-4 mt-auto transition-colors">
        <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-sm font-medium">
          <Calendar/>
          {new Date(project.deadline).toLocaleString('default', { month: 'short', day: 'numeric', year:'numeric' })}
        </div>        
      </div>
    </div>
  );
};

export default ProjectCard;