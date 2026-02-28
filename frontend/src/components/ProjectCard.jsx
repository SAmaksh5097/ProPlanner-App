import { Calendar } from 'lucide-react';
import { motion } from 'motion/react';

const ProjectCard = ({ project, onClick }) => {
  return (
    <motion.div 
      whileHover={{ y: -6, transition: { duration: 0.25 } }}
      className="bg-white dark:bg-brand-surface-dark rounded-2xl p-6 border border-brand-muted/20 dark:border-brand-muted/10 shadow-sm hover:shadow-lg hover:shadow-brand-accent/10 dark:shadow-none dark:hover:border-brand-accent/20 transition-all flex flex-col h-full cursor-pointer" 
      onClick={onClick}
    >
      <h3 className="text-xl font-bold text-brand-dark dark:text-brand-light mb-3 transition-colors">
        {project.title}
      </h3>
      <div className="flex flex-wrap gap-2 mb-8">
        {project.tech_stack?.map((tag, index) => (
          <span
            key={index}
            className="px-2.5 py-1 bg-brand-light dark:bg-brand-card-dark text-brand-dark/70 dark:text-brand-muted rounded-full text-xs font-medium transition-colors"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="flex-grow"></div>

      <div className="mb-6">
        <div className="flex justify-between text-sm mb-2">
          <span className="font-medium text-brand-muted">Progress</span>
          <span className="font-bold text-brand-dark dark:text-brand-light">{project.progress}%</span>
        </div>
        <div className="w-full bg-brand-light dark:bg-brand-card-dark rounded-full h-2.5 transition-colors">
          <motion.div
            className="bg-brand-accent h-2.5 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${project.progress}%` }}
            transition={{ duration: 1, ease: 'easeOut' }}
          />
        </div>
      </div>

      <div className="flex justify-between items-center border-t border-brand-muted/20 dark:border-brand-muted/10 pt-4 mt-auto transition-colors">
        <div className="flex items-center gap-2 text-brand-muted text-sm font-medium">
          <Calendar/>
          {new Date(project.deadline).toLocaleString('default', { month: 'short', day: 'numeric', year:'numeric' })}
        </div>        
      </div>
    </motion.div>
  );
};

export default ProjectCard;