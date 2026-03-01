import React from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'motion/react';
import axios from 'axios';
import { useAuth } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';
import { Loader2, RefreshCw, Trash2  } from 'lucide-react';

const ProjectBanner = ({ projectMeta, onReschedule }) => {
  const navigate = useNavigate();
  const {id} = useParams();
  const [loading, setLoading] = React.useState(false);


  const { getToken } = useAuth();


  const handleDelete = async ()=>{
    if(!window.confirm("Are you sure you want to delete this project? This action cannot be undone.")){
      return;
    }
    setLoading(true)

    try{
      const token = await getToken();
      const response = await axios.delete(`${import.meta.env.VITE_API_URL}/projects/${id}`,{
        headers: { Authorization: `Bearer ${token}` }
      })
    } catch(error){
      console.log("Error deleting project",error);
    } finally{
      setLoading(false);
      navigate('/user-dashboard');
    }
  }


  if(loading){
    return (
      <Loader2 className="animate-spin text-brand-accent" />
    )
  }

  return (
    
    <div className="bg-white dark:bg-brand-surface-dark border border-brand-muted/20 dark:border-brand-muted/10 rounded-3xl p-6 sm:p-8 mb-10 shadow-sm transition-colors duration-300">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        
        {/* Left side: Project Info */}
        <div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-brand-dark dark:text-brand-light mb-3">
            {projectMeta.title}
          </h1>
          <div className="flex items-center text-brand-muted font-medium">
            <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {projectMeta.daysRemaining} days remaining
          </div>
        </div>

        {/* Right side: Progress Bar */}
        <div className="w-full md:w-64">
          <div className="flex justify-end text-sm font-bold text-brand-accent mb-2">
            {projectMeta.progress}% Complete
          </div>
          <div className="w-full bg-brand-light dark:bg-brand-card-dark rounded-full h-3">
            <motion.div 
              className="bg-brand-accent h-3 rounded-full" 
              initial={{ width: 0 }}
              animate={{ width: `${projectMeta.progress}%` }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
            />
          </div>
        </div>
        
      </div>
      <div className="flex gap-3 mt-4">
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="text-white font-medium shadow-md rounded-md p-2 bg-brand-accent cursor-pointer hover:bg-brand-accent/80 flex items-center gap-2" 
          onClick={onReschedule}
        >
          <RefreshCw className="w-4 h-4" />
          Edit & Reschedule
        </motion.button>
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="text-white font-medium shadow-md rounded-md p-2 bg-red-600 cursor-pointer hover:bg-red-800 flex gap-1 items-center" 
          onClick={handleDelete}
        >
          <Trash2 className='w-4 h-4'/>
          Delete Project
        </motion.button>
      </div>
    </div>
  );
};

export default ProjectBanner;