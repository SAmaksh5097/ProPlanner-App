import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import ProjectCard from '../components/ProjectCard';
import { Link } from 'react-router-dom';
import { PlusCircle, Plus, Clock, CheckCircle2, Loader2 } from 'lucide-react';
import {useAuth, useUser} from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const UserDashboard = () => {
  const [activeTab, setActiveTab] = useState('Ongoing');
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const { getToken, user } = useAuth();
  const navigate = useNavigate();

  
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const token = await getToken();
        const response = await axios.get('http://localhost:5000/projects/my-projects', {
          headers: { Authorization: `Bearer ${token}` }
        });
        if(Array.isArray(response.data)){
          setProjects(response.data);
        }else{
          setProjects([]);
        }
      } catch (error) {
        console.error("Error fetching projects", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, [getToken]);

  

  const filteredProjects = projects.filter(project => {
    if (activeTab === 'Ongoing') return project.progress < 100;
    if (activeTab === 'Completed') return project.progress === 100;
    return true;
  });
  

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-brand-light dark:bg-brand-dark">
        <Loader2 className="animate-spin text-brand-accent" size={48} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-light dark:bg-brand-dark pt-10 pb-20 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8"
        >
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-brand-dark dark:text-brand-light tracking-tight">
                Welcome back, Developer!
              </h1>
            </div>
            <p className="text-brand-muted dark:text-brand-muted text-lg">
              Manage your AI-generated development pipelines.
            </p>
          </div>
          
          <Link to='/create-project'>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className='flex gap-2 items-center bg-brand-accent text-white px-5 py-3 rounded-xl hover:bg-brand-accent-hover shadow-lg shadow-brand-accent/30 font-bold transition-all'
            >
              <Plus size={20}/>
              <span>Start New Project</span>
            </motion.button>
          </Link>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="border-b border-brand-muted/30 dark:border-brand-muted/10 mb-8 flex justify-between items-center"
        >
          <nav className="flex space-x-4 sm:space-x-8">
            {['Ongoing', 'Completed'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-4 px-1 border-b-2 font-bold text-sm flex items-center transition-all ${
                  activeTab === tab
                    ? 'border-brand-accent text-brand-accent'
                    : 'border-transparent text-brand-muted hover:text-brand-dark dark:hover:text-brand-light'
                }`}
              >
                {tab === 'Ongoing' ? (
                  <Clock className="w-4 h-4 mr-2" />
                ) : (
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                )}
                {tab}
              </button>
            ))}
          </nav>
          <span className="text-xs font-bold text-brand-muted uppercase tracking-widest">
            {filteredProjects.length} Projects
          </span>
        </motion.div>

        {/* Projects Grid */}
        {filteredProjects.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center justify-center py-20 bg-white dark:bg-brand-surface-dark rounded-[2.5rem] border border-brand-muted/20 dark:border-brand-muted/10"
          >
             <div className="p-4 bg-brand-light dark:bg-brand-card-dark rounded-full mb-4 text-brand-muted">
                <PlusCircle size={40} />
             </div>
             <p className="text-brand-muted font-medium">No {activeTab.toLowerCase()} projects found.</p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects?.map((project, i) => (
              <motion.div
                key={project._id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
              >
                <ProjectCard 
                  project={project} 
                  onClick={() => navigate(`/project-dashboard/${project._id}`)} 
                />
              </motion.div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default UserDashboard;