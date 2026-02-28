import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '@clerk/clerk-react';
import { motion } from 'motion/react';
import axios from 'axios';
import ProjectBanner from '../components/ProjectBanner';
import { Loader2, AlertCircle } from 'lucide-react';
import TaskItem from '../components/TaskItem';

const ProjectDashboard = () => {
  const { id } = useParams();
  const { getToken } = useAuth();
  
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        const token = await getToken();
        const response = await axios.get(`http://localhost:5000/projects/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setProject(response.data);
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Could not load the roadmap. It might have been deleted.");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProjectDetails();
  }, [id, getToken]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-light dark:bg-brand-dark">
        <Loader2 className="animate-spin text-brand-accent" size={48} />
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-brand-light dark:bg-brand-dark text-center px-4">
        <AlertCircle className="w-16 h-16 text-red-500 mb-4" />
        <h2 className="text-2xl font-bold text-brand-dark dark:text-brand-light">{error}</h2>
      </div>
    );
  }

  const handleToggleTask = async (dayNumber, taskTitle) => {
  try {
    const token = await getToken();
    
    const response = await axios.patch('http://localhost:5000/projects/toggle-task', {
      projectId: id,
      dayNumber,
      taskTitle
    }, {
      headers: { Authorization: `Bearer ${token}` }
    });

    setProject(response.data); 
    
  } catch (err) {
    console.error("Toggle failed:", err);
    alert("Could not update task. Check if your backend is running.");
  }
};

  return (
    <div className="min-h-screen bg-brand-light dark:bg-brand-dark pt-8 pb-24 transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <ProjectBanner projectMeta={{
            title: project.title,
            daysRemaining: Math.ceil((new Date(project.deadline) - new Date()) / (1000*60*60*24)),
            progress: project.progress,
          }} />
        </motion.div>

        <div className="mt-10">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="flex items-center justify-between mb-6"
          >
            <h2 className="text-2xl font-bold text-brand-dark dark:text-brand-light">
              AI Roadmap Schedule
            </h2>
          </motion.div>

          {/* Real Roadmap Data */}
          <div className="space-y-8">
  {project.roadmap.map((day, i) => (
    <motion.div 
      key={day._id} 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: i * 0.1, duration: 0.5 }}
      className="bg-white dark:bg-brand-surface-dark rounded-2xl p-6 border border-brand-muted/20 dark:border-brand-muted/10 shadow-sm"
    >
      <h3 className="text-xl font-bold text-brand-dark dark:text-brand-light mb-4">
        Day {day.dayNumber}
      </h3>
      
      <div className="divide-y divide-brand-muted/15 dark:divide-brand-muted/10">
          {day.tasks.map((task) => (
            <TaskItem 
              key={task._id} 
              task={task} 
              onToggle={() => handleToggleTask(day.dayNumber, task.title)} 
            />
          ))}
      </div>
    </motion.div>
  ))}
</div>
        </div>

      </div>
    </div>
  );
};

export default ProjectDashboard;