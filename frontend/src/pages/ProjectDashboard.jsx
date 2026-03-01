import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '@clerk/clerk-react';
import { motion, AnimatePresence } from 'motion/react';
import axios from 'axios';
import ProjectBanner from '../components/ProjectBanner';
import { Loader2, AlertCircle, Save, Check } from 'lucide-react';
import TaskItem from '../components/TaskItem';
import RescheduleModal from '../components/RescheduleModal';

const ProjectDashboard = () => {
  const { id } = useParams();
  const { getToken } = useAuth();
  
  const [project, setProject] = useState(null);
  const [localRoadmap, setLocalRoadmap] = useState([]);
  const [hasChanges, setHasChanges] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showReschedule, setShowReschedule] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        const token = await getToken();
        const response = await axios.get(`${API_URL}/projects/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setProject(response.data);
        setLocalRoadmap(JSON.parse(JSON.stringify(response.data.roadmap)));
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Could not load the roadmap. It might have been deleted.");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProjectDetails();
  }, [id, getToken]);

  // Toggle a task locally (no API call)
  const handleToggleTask = (dayIndex, taskIndex) => {
    setLocalRoadmap(prev => {
      const updated = JSON.parse(JSON.stringify(prev));
      updated[dayIndex].tasks[taskIndex].completed = !updated[dayIndex].tasks[taskIndex].completed;
      return updated;
    });
    setHasChanges(true);
    setSaveSuccess(false);
  };

  // Toggle a subtask locally (no API call)
  const handleToggleSubTask = (dayIndex, taskIndex, subTaskIndex) => {
    setLocalRoadmap(prev => {
      const updated = JSON.parse(JSON.stringify(prev));
      updated[dayIndex].tasks[taskIndex].subTasks[subTaskIndex].completed = 
        !updated[dayIndex].tasks[taskIndex].subTasks[subTaskIndex].completed;
      return updated;
    });
    setHasChanges(true);
    setSaveSuccess(false);
  };

  // Save all changes at once
  const handleSave = async () => {
    setSaving(true);
    try {
      const token = await getToken();
      const response = await axios.put(`${API_URL}/projects/${id}/save-progress`, {
        roadmap: localRoadmap
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProject(response.data);
      setLocalRoadmap(JSON.parse(JSON.stringify(response.data.roadmap)));
      setHasChanges(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 2500);
    } catch (err) {
      console.error("Save failed:", err);
      alert("Failed to save progress. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  // Reschedule via AI
  const handleReschedule = async (updatedData) => {
    const token = await getToken();
    const response = await axios.put(`${API_URL}/projects/${id}/reschedule`, updatedData, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setProject(response.data);
    setLocalRoadmap(JSON.parse(JSON.stringify(response.data.roadmap)));
    setHasChanges(false);
    setShowReschedule(false);
  };

  // Calculate progress locally for live feedback
  const localProgress = localRoadmap.length > 0 
    ? (() => {
        const allTasks = localRoadmap.flatMap(d => d.tasks);
        const completed = allTasks.filter(t => t.completed).length;
        return allTasks.length > 0 ? Math.round((completed / allTasks.length) * 100) : 0;
      })()
    : (project?.progress || 0);

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

  return (
    <div className="min-h-screen bg-brand-light dark:bg-brand-dark pt-8 pb-24 transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <ProjectBanner 
            projectMeta={{
              title: project.title,
              daysRemaining: Math.ceil((new Date(project.deadline) - new Date()) / (1000*60*60*24)),
              progress: localProgress,
            }} 
            onReschedule={() => setShowReschedule(true)}
          />
        </motion.div>

        <div className="mt-10">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="flex items-center justify-between mb-6"
          >
            <h2 className="text-xl sm:text-2xl font-bold text-brand-dark dark:text-brand-light">
              AI Roadmap Schedule
            </h2>
            {hasChanges && (
              <span className="text-sm text-amber-500 dark:text-amber-400 font-medium animate-pulse">
                Unsaved changes
              </span>
            )}
          </motion.div>

          {/* Roadmap */}
          <div className="space-y-8">
            {localRoadmap.map((day, dayIndex) => (
              <motion.div 
                key={day._id || dayIndex} 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: dayIndex * 0.1, duration: 0.5 }}
                className="bg-white dark:bg-brand-surface-dark rounded-2xl p-6 border border-brand-muted/20 dark:border-brand-muted/10 shadow-sm"
              >
                <h3 className="text-lg sm:text-xl font-bold text-brand-dark dark:text-brand-light mb-4">
                  Day {day.dayNumber}
                </h3>
                
                <div className="divide-y divide-brand-muted/15 dark:divide-brand-muted/10">
                  {day.tasks.map((task, taskIndex) => (
                    <TaskItem 
                      key={task._id || taskIndex} 
                      task={task} 
                      onToggle={() => handleToggleTask(dayIndex, taskIndex)} 
                      onSubTaskToggle={(subTaskIndex) => handleToggleSubTask(dayIndex, taskIndex, subTaskIndex)}
                    />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>

      {/* Floating Save Button */}
      <AnimatePresence>
        {(hasChanges || saveSuccess) && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-8 right-8 z-40"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSave}
              disabled={saving || saveSuccess}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold shadow-lg cursor-pointer transition-colors ${
                saveSuccess 
                  ? 'bg-green-500 text-white' 
                  : 'bg-brand-accent text-white hover:bg-brand-accent/90'
              } disabled:cursor-default`}
            >
              {saving ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Saving...
                </>
              ) : saveSuccess ? (
                <>
                  <Check className="w-5 h-5" />
                  Saved!
                </>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  Save Changes
                </>
              )}
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Reschedule Modal */}
      {showReschedule && (
        <RescheduleModal 
          project={project}
          onClose={() => setShowReschedule(false)}
          onReschedule={handleReschedule}
        />
      )}
    </div>
  );
};

export default ProjectDashboard;