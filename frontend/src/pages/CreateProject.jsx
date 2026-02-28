import React, { useState, useRef, useEffect } from 'react';
import { 
  Type, 
  FileText, 
  Terminal, 
  Calendar, 
  Zap, 
  History, 
  CircleHelp,
  ChevronDown,
  X,
  Check,
  Loader2
} from 'lucide-react';

import { useNavigate } from 'react-router-dom';
import {useAuth} from '@clerk/clerk-react';
import axios from 'axios';

// Organized Tech Options
const techCategories = {
  Frontend: ['React', 'Next.js', 'Vue.js', 'Angular', 'Svelte', 'Tailwind CSS'],
  Backend: ['Node.js', 'Express', 'Django', 'FastAPI', 'Spring Boot', 'Ruby on Rails'],
  Database: ['MongoDB', 'PostgreSQL', 'MySQL', 'Firebase', 'Redis', 'Supabase'],
};

const CreateProject = () => {
  // State for the form fields
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    techStack: [], // Now an array to hold multiple selections
    deadline: '',
  });

  // State for the custom dropdown
  const [isTechMenuOpen, setIsTechMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsTechMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();
  const {getToken} = useAuth();
  const [loading,setLoading] = useState(false);

  const toggleTech = (tech) => {
    setFormData((prev) => {
      const isSelected = prev.techStack.includes(tech);
      const updatedStack = isSelected
        ? prev.techStack.filter((t) => t !== tech) 
        : [...prev.techStack, tech]; 
      return { ...prev, techStack: updatedStack };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    
    try{
      const token = await getToken();
      const payload = {
        title: formData.title,
        description: formData.description,
        tech_stack: formData.techStack,
        deadline: formData.deadline
      };

      const response = await axios.post('http://localhost:5000/projects/create',payload,{
        headers:{Authorization: `Bearer ${token}`}
      })

      if(response.status === 201){
        console.log("Project created",response.data);
        alert("Project created successfully!")
        navigate('/user-dashboard')
      }
      else if(response.status === 401){
        alert("Unauthorized. Please log in again.");
      }
      else if(response.status === 500){
        alert("Server error. Please try again later.");
      }
    } catch(error){
      console.error("Error creating project",error);
    } finally{
      setLoading(false);
    }

  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center pt-12 pb-24 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      
      <div className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-[2rem] shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-800 overflow-hidden transition-colors duration-300">
        
        <div className="bg-gradient-to-b from-blue-50/80 to-white dark:from-blue-900/20 dark:to-slate-900 p-8 sm:p-10 pb-6 transition-colors duration-300">
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-2 tracking-tight transition-colors">
            Create New Project
          </h2>
          <p className="text-slate-500 dark:text-slate-400 font-medium transition-colors">
            Transform your vision into a structured roadmap.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 sm:p-10 pt-4 space-y-6">
          
          <div>
            <label className="flex items-center text-sm font-bold text-slate-700 dark:text-slate-300 mb-2 transition-colors">
              <Type className="w-4 h-4 mr-2 text-slate-400 dark:text-slate-500" />
              Project Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g. E-commerce Platform Redesign"
              className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/50 px-4 py-3.5 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all placeholder:text-slate-400 dark:placeholder:text-slate-500"
              required
            />
          </div>

          <div>
            <label className="flex items-center text-sm font-bold text-slate-700 dark:text-slate-300 mb-2 transition-colors">
              <FileText className="w-4 h-4 mr-2 text-slate-400 dark:text-slate-500" />
              Project Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="What are the main goals and features of this project?"
              rows="4"
              className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/50 px-4 py-3.5 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all placeholder:text-slate-400 dark:placeholder:text-slate-500 resize-none"
              required
            ></textarea>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <div className="relative" ref={dropdownRef}>
              <label className="flex items-center text-sm font-bold text-slate-700 dark:text-slate-300 mb-2 transition-colors">
                <Terminal className="w-4 h-4 mr-2 text-slate-400 dark:text-slate-500" />
                Tech Stack
              </label>
              
              <div 
                onClick={() => setIsTechMenuOpen(!isTechMenuOpen)}
                className={`w-full min-h-[52px] rounded-xl border ${isTechMenuOpen ? 'border-blue-500 ring-2 ring-blue-500/20' : 'border-slate-200 dark:border-slate-700'} bg-white dark:bg-slate-800/50 px-3 py-2 text-slate-900 dark:text-white flex flex-wrap items-center gap-2 cursor-pointer transition-all`}
              >
                {formData.techStack.length === 0 ? (
                  <span className="text-slate-400 dark:text-slate-500 px-1 py-1.5">Select technologies...</span>
                ) : (
                  formData.techStack.map(tech => (
                    <span key={tech} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 text-sm font-medium">
                      {tech}
                      <X 
                        className="w-3 h-3 hover:text-blue-900 dark:hover:text-blue-100 cursor-pointer" 
                        onClick={(e) => { e.stopPropagation(); toggleTech(tech); }}
                      />
                    </span>
                  ))
                )}
                <div className="ml-auto text-slate-400 dark:text-slate-500 pr-1">
                  <ChevronDown className={`w-4 h-4 transition-transform ${isTechMenuOpen ? 'rotate-180' : ''}`} />
                </div>
              </div>

              {isTechMenuOpen && (
                <div className="absolute z-10 top-full mt-2 w-full max-h-80 overflow-y-auto rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xl shadow-slate-200/50 dark:shadow-none p-2 animate-in fade-in slide-in-from-top-2 duration-200">
                  {Object.entries(techCategories).map(([category, techs]) => (
                    <div key={category} className="mb-2 last:mb-0">
                      <div className="px-3 py-1.5 text-xs font-bold tracking-wider text-slate-400 dark:text-slate-500 uppercase">
                        {category}
                      </div>
                      <div className="space-y-0.5">
                        {techs.map(tech => {
                          const isSelected = formData.techStack.includes(tech);
                          return (
                            <div 
                              key={tech}
                              onClick={() => toggleTech(tech)}
                              className={`flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer text-sm font-medium transition-colors ${
                                isSelected 
                                  ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400' 
                                  : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700/50'
                              }`}
                            >
                              {tech}
                              {isSelected && <Check className="w-4 h-4" />}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div>
              <label className="flex items-center text-sm font-bold text-slate-700 dark:text-slate-300 mb-2 transition-colors">
                <Calendar className="w-4 h-4 mr-2 text-slate-400 dark:text-slate-500" />
                Deadline
              </label>
              <input
                type="date"
                name="deadline"
                value={formData.deadline}
                onChange={handleChange}
                className="w-full h-[52px] rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/50 px-4 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all placeholder:text-slate-400 dark:placeholder:text-slate-500"
                required
              />
            </div>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              className="w-full py-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg flex items-center justify-center gap-2 shadow-lg shadow-blue-500/30 transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={formData.techStack.length === 0 || !formData.title || !formData.deadline}
            >
              {loading? (
                <>
                  <Loader2 className="w-5 h-5 text-blue-200 fill-current animate-spin" />
                  Generating...
                </>
              ):(
                <>
                  <Zap className="w-5 h-5 text-blue-200 fill-current" />
                  Generate Plan
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      
    </div>
  );
};

export default CreateProject;