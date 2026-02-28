import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
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
  Loader2,
  Lightbulb,
  Sparkles,
  ListChecks,
  Layers,
  CalendarClock
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

  const tips = [
    {
      icon: <Sparkles className="w-4 h-4" />,
      title: 'Be specific in description',
      desc: 'Instead of "build an app", try "build a full-stack e-commerce app with user auth, product catalog, and Stripe checkout."',
      color: 'from-brand-accent/20 to-brand-accent/5',
    },
    {
      icon: <Layers className="w-4 h-4" />,
      title: 'Pick your actual tech stack',
      desc: 'The AI tailors tasks to the frameworks you choose — selecting the right ones gives you copy-paste-ready steps.',
      color: 'from-blue-400/20 to-blue-400/5',
    },
    {
      icon: <CalendarClock className="w-4 h-4" />,
      title: 'Set a realistic deadline',
      desc: 'A 2-day deadline for a full SaaS won\'t work well. Give enough days so the AI can break work into digestible chunks.',
      color: 'from-emerald-400/20 to-emerald-400/5',
    },
    {
      icon: <ListChecks className="w-4 h-4" />,
      title: 'Mention key features',
      desc: 'List the core features you want (auth, dashboard, API, etc.) in the description — the AI uses them to prioritize tasks.',
      color: 'from-violet-400/20 to-violet-400/5',
    },
  ];

  return (
    <div className="min-h-screen bg-brand-light dark:bg-brand-dark pt-8 sm:pt-12 pb-24 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_300px] xl:grid-cols-[1fr_340px] gap-6 lg:gap-8 items-start">

        {/* ─── Left: Form Card ─── */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="w-full max-w-2xl mx-auto lg:max-w-none bg-white dark:bg-brand-surface-dark rounded-[2rem] shadow-xl shadow-brand-dark/5 dark:shadow-none border border-brand-muted/20 dark:border-brand-muted/10 overflow-hidden transition-colors duration-300"
        >
          
          <div className="bg-gradient-to-b from-brand-accent/10 to-white dark:from-brand-accent/5 dark:to-brand-surface-dark p-6 sm:p-10 pb-6 transition-colors duration-300">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-dark dark:text-brand-light mb-2 tracking-tight transition-colors">
              Create New Project
            </h2>
            <p className="text-brand-muted font-medium transition-colors">
              Transform your vision into a structured roadmap.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="p-6 sm:p-10 pt-4 space-y-6">
            
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1, duration: 0.4 }}
            >
              <label className="flex items-center text-sm font-bold text-brand-dark dark:text-brand-muted mb-2 transition-colors">
                <Type className="w-4 h-4 mr-2 text-brand-accent" />
                Project Title
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g. E-commerce Platform Redesign"
                className="w-full rounded-xl border border-brand-muted/30 dark:border-brand-muted/15 bg-white dark:bg-brand-card-dark px-4 py-3.5 text-brand-dark dark:text-brand-light focus:ring-2 focus:ring-brand-accent focus:border-brand-accent outline-none transition-all placeholder:text-brand-muted/60"
                required
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.4 }}
            >
              <label className="flex items-center text-sm font-bold text-brand-dark dark:text-brand-muted mb-2 transition-colors">
                <FileText className="w-4 h-4 mr-2 text-brand-accent" />
                Project Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="What are the main goals and features of this project?"
                rows="4"
                className="w-full rounded-xl border border-brand-muted/30 dark:border-brand-muted/15 bg-white dark:bg-brand-card-dark px-4 py-3.5 text-brand-dark dark:text-brand-light focus:ring-2 focus:ring-brand-accent focus:border-brand-accent outline-none transition-all placeholder:text-brand-muted/60 resize-none"
                required
              ></textarea>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              
              <div className="relative" ref={dropdownRef}>
                <label className="flex items-center text-sm font-bold text-brand-dark dark:text-brand-muted mb-2 transition-colors">
                  <Terminal className="w-4 h-4 mr-2 text-brand-accent" />
                  Tech Stack
                </label>
                
                <div 
                  onClick={() => setIsTechMenuOpen(!isTechMenuOpen)}
                  className={`w-full min-h-[52px] rounded-xl border ${isTechMenuOpen ? 'border-brand-accent ring-2 ring-brand-accent/20' : 'border-brand-muted/30 dark:border-brand-muted/15'} bg-white dark:bg-brand-card-dark px-3 py-2 text-brand-dark dark:text-brand-light flex flex-wrap items-center gap-2 cursor-pointer transition-all`}
                >
                  {formData.techStack.length === 0 ? (
                    <span className="text-brand-muted/60 px-1 py-1.5">Select technologies...</span>
                  ) : (
                    formData.techStack.map(tech => (
                      <span key={tech} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-brand-accent/15 text-brand-accent text-sm font-medium">
                        {tech}
                        <X 
                          className="w-3 h-3 hover:text-brand-accent-hover cursor-pointer" 
                          onClick={(e) => { e.stopPropagation(); toggleTech(tech); }}
                        />
                      </span>
                    ))
                  )}
                  <div className="ml-auto text-brand-muted pr-1">
                    <ChevronDown className={`w-4 h-4 transition-transform ${isTechMenuOpen ? 'rotate-180' : ''}`} />
                  </div>
                </div>

                {isTechMenuOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className="absolute z-10 top-full mt-2 w-full max-h-80 overflow-y-auto rounded-xl bg-white dark:bg-brand-card-dark border border-brand-muted/30 dark:border-brand-muted/15 shadow-xl shadow-brand-dark/10 dark:shadow-none p-2"
                  >
                    {Object.entries(techCategories).map(([category, techs]) => (
                      <div key={category} className="mb-2 last:mb-0">
                        <div className="px-3 py-1.5 text-xs font-bold tracking-wider text-brand-muted uppercase">
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
                                    ? 'bg-brand-accent/10 text-brand-accent' 
                                    : 'text-brand-dark dark:text-brand-muted hover:bg-brand-light dark:hover:bg-brand-surface-dark'
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
                  </motion.div>
                )}
              </div>

              <div>
                <label className="flex items-center text-sm font-bold text-brand-dark dark:text-brand-muted mb-2 transition-colors">
                  <Calendar className="w-4 h-4 mr-2 text-brand-accent" />
                  Deadline
                </label>
                <input
                  type="date"
                  name="deadline"
                  value={formData.deadline}
                  onChange={handleChange}
                  className="w-full h-[52px] rounded-xl border border-brand-muted/30 dark:border-brand-muted/15 bg-white dark:bg-brand-card-dark px-4 text-brand-dark dark:text-brand-light focus:ring-2 focus:ring-brand-accent focus:border-brand-accent outline-none transition-all"
                  required
                />
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.4 }}
              className="pt-4"
            >
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02, boxShadow: '0 10px 40px rgba(255, 155, 81, 0.3)' }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 rounded-xl bg-brand-accent hover:bg-brand-accent-hover text-white font-bold text-lg flex items-center justify-center gap-2 shadow-lg shadow-brand-accent/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={formData.techStack.length === 0 || !formData.title || !formData.deadline}
              >
                {loading? (
                  <>
                    <Loader2 className="w-5 h-5 text-white/70 fill-current animate-spin" />
                    Generating...
                  </>
                ):(
                  <>
                    <Zap className="w-5 h-5 text-white/70 fill-current" />
                    Generate Plan
                  </>
                )}
              </motion.button>
            </motion.div>
          </form>
        </motion.div>

        <motion.aside
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.6, ease: 'easeOut' }}
          className="lg:sticky lg:top-24 w-full max-w-2xl mx-auto lg:max-w-none"
        >
          {/* Glowing header card */}
          <div className="relative mb-4 p-4 rounded-2xl bg-gradient-to-br from-brand-accent/10 via-brand-accent/5 to-transparent dark:from-brand-accent/15 dark:via-brand-accent/5 border border-brand-accent/20 dark:border-brand-accent/15 overflow-hidden">
            {/* Decorative pulse ring */}
            <motion.div
              className="absolute -top-4 -right-4 w-20 h-20 rounded-full bg-brand-accent/10 dark:bg-brand-accent/5"
              animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.1, 0.3] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            />
            <div className="relative flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-brand-accent/15 dark:bg-brand-accent/20 flex items-center justify-center">
                <Lightbulb className="w-5 h-5 text-brand-accent" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-brand-dark dark:text-brand-light">
                  Pro Tips
                </h3>
              </div>
            </div>
          </div>

          {/* Tip cards with timeline connector */}
          <div className="relative space-y-3">
            {/* Vertical connector line */}
            <div className="absolute left-[18px] top-4 bottom-4 w-px bg-gradient-to-b from-brand-accent/30 via-brand-muted/20 to-transparent dark:from-brand-accent/20 dark:via-brand-muted/10 hidden lg:block" />

            {tips.map((tip, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + i * 0.12, duration: 0.45 }}
                whileHover={{ x: 4, transition: { duration: 0.2 } }}
                className="group relative flex gap-3 p-3 rounded-xl bg-white dark:bg-brand-surface-dark border border-brand-muted/15 dark:border-brand-muted/10 hover:border-brand-accent/30 dark:hover:border-brand-accent/20 hover:shadow-md hover:shadow-brand-accent/5 transition-all duration-300 cursor-default"
              >
                {/* Numbered icon circle */}
                <div className={`relative z-10 shrink-0 w-9 h-9 rounded-xl bg-gradient-to-br ${tip.color} dark:opacity-90 flex items-center justify-center text-brand-accent group-hover:scale-110 transition-transform duration-300`}>
                  {tip.icon}
                </div>

                <div className="min-w-0">
                  <p className="text-sm font-semibold text-brand-dark dark:text-brand-light mb-0.5 leading-snug">
                    {tip.title}
                  </p>
                  <p className="text-xs text-brand-muted leading-relaxed">
                    {tip.desc}
                  </p>
                </div>

                {/* Hover accent bar */}
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-0 group-hover:h-3/5 bg-brand-accent rounded-full transition-all duration-300" />
              </motion.div>
            ))}
          </div>
                    
        </motion.aside>

      </div>
    </div>
  );
};

export default CreateProject;