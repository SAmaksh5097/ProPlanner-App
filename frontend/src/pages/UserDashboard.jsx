import { useState, useEffect } from 'react';
import ProjectCard from '../components/ProjectCard';
import { Link } from 'react-router-dom';
import { PlusCircle, Plus,  Clock, CheckCircle2, Loader2  } from 'lucide-react';
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
        // Updated to the standard route we used in the backend
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
      <div className="flex items-center justify-center min-h-screen bg-slate-50 dark:bg-slate-950">
        <Loader2 className="animate-spin text-blue-600" size={48} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-10 pb-20 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                Welcome back, Developer!
              </h1>
            </div>
            <p className="text-slate-500 dark:text-slate-400 text-lg">
              Manage your AI-generated development pipelines.
            </p>
          </div>
          
          <Link to='/create-project'>
            <button className='flex gap-2 items-center bg-blue-600 text-white px-5 py-3 rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-500/30 font-bold transition-all active:scale-95'>
              <Plus size={20}/>
              <span>Start New Project</span>
            </button>
          </Link>
        </div>

        <div className="border-b border-slate-200 dark:border-slate-800 mb-8 flex justify-between items-center">
          <nav className="flex space-x-8">
            {['Ongoing', 'Completed'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-4 px-1 border-b-2 font-bold text-sm flex items-center transition-all ${
                  activeTab === tab
                    ? 'border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-500'
                    : 'border-transparent text-slate-500 hover:text-slate-700'
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
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
            {filteredProjects.length} Projects
          </span>
        </div>

        {/* Projects Grid */}
        {filteredProjects.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800">
             <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-full mb-4 text-slate-300">
                <PlusCircle size={40} />
             </div>
             <p className="text-slate-500 font-medium">No {activeTab.toLowerCase()} projects found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects?.map((project) => (
              <ProjectCard 
                key={project._id} 
                project={project} 
                onClick={() => navigate(`/project-dashboard/${project._id}`)} 
              />
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default UserDashboard;