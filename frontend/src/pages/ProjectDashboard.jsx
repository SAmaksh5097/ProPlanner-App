import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // To get the ID from URL
import { useAuth } from '@clerk/clerk-react';
import axios from 'axios';
import ProjectBanner from '../components/ProjectBanner';
import { Loader2, AlertCircle } from 'lucide-react';
import TaskItem from '../components/TaskItem';

const ProjectDashboard = () => {
  const { id } = useParams(); // Gets the project ID from /project/:id
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
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
        <Loader2 className="animate-spin text-blue-600" size={48} />
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-950 text-center px-4">
        <AlertCircle className="w-16 h-16 text-red-500 mb-4" />
        <h2 className="text-2xl font-bold dark:text-white">{error}</h2>
      </div>
    );
  }

  const handleToggleTask = async (dayNumber, taskTitle) => {
  try {
    const token = await getToken();
    
    // 1. Call the backend
    const response = await axios.patch('http://localhost:5000/projects/toggle-task', {
      projectId: id, // from useParams
      dayNumber,
      taskTitle
    }, {
      headers: { Authorization: `Bearer ${token}` }
    });

    // 2. IMPORTANT: Update the 'project' state with the NEW data from the server
    // This includes the new progress percentage!
    setProject(response.data); 
    
  } catch (err) {
    console.error("Toggle failed:", err);
    alert("Could not update task. Check if your backend is running.");
  }
};

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-8 pb-24 transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Real data passed to Banner */}
        <ProjectBanner projectMeta={{
          title: project.title,
          daysRemaining: Math.ceil((new Date(project.deadline) - new Date()) / (1000*60*60*24)),
          progress: project.progress
        }} />

        <div className="mt-10">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              AI Roadmap Schedule
            </h2>
          </div>

          {/* Real Roadmap Data */}
          <div className="space-y-8">
  {project.roadmap.map((day) => (
    <div key={day._id} className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-100 dark:border-slate-800 shadow-sm">
      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
        Day {day.dayNumber}
      </h3>
      
      <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {day.tasks.map((task) => (
            <TaskItem 
              key={task._id} 
              task={task} 
              onToggle={() => handleToggleTask(day.dayNumber, task.title)} 
            />
          ))}
      </div>
    </div>
  ))}
</div>
        </div>

      </div>
    </div>
  );
};

export default ProjectDashboard;