import React, { useEffect,useState } from 'react';
import { Link } from 'react-router-dom'; 
import { motion } from 'motion/react';

const texts = ["pro 😎", "legend 🚀", "G.O.A.T 🗿"]

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: 'easeOut' },
  }),
};

const HeroSection = () => {
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);
  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);

      setTimeout(() => {
        setIndex((prev) => (prev + 1) % texts.length);
        setFade(true);
      }, 300);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-brand-light dark:bg-brand-dark transition-colors duration-300">
      
      {/* Background gradient blob */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-brand-accent/5 to-brand-light dark:from-brand-accent/5 dark:to-brand-dark -z-10 transition-colors duration-300" />
      
      {/* Floating accent orbs */}
      <motion.div 
        className="absolute top-20 left-10 w-72 h-72 bg-brand-accent/10 rounded-full blur-3xl"
        animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div 
        className="absolute bottom-20 right-10 w-96 h-96 bg-brand-muted/20 rounded-full blur-3xl"
        animate={{ x: [0, -20, 0], y: [0, 30, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          
          {/* LEFT COLUMN: Text Content & CTAs */}
          <div className="max-w-2xl">

            <motion.h1 
              custom={0}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="text-5xl lg:text-7xl font-extrabold text-brand-dark dark:text-brand-light tracking-tight mb-6 transition-colors duration-300"
            >
              Pro<span className="text-brand-accent">Planner</span>
            </motion.h1>

            <motion.p 
              custom={1}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="text-lg lg:text-xl text-brand-dark/70 dark:text-brand-muted mb-8 leading-relaxed max-w-lg transition-colors duration-300"
            >
              Plan your Projects like a <span className={`transition-opacity duration-500 ease-in-out text-xl font-bold text-brand-accent ${fade?"opacity-100":"opacity-0"} `}>{texts[index]}</span>
              <br />
              No more chaos, just clear, actionable plans to get your projects done efficiently.
            </motion.p>

            <motion.div 
              custom={2}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="flex flex-col sm:flex-row gap-4 mb-10"
            >
              <Link to={'/user-dashboard'}>
                <motion.button 
                  whileHover={{ scale: 1.05, boxShadow: '0 10px 40px rgba(255, 155, 81, 0.3)' }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3.5 rounded-full bg-brand-accent text-white font-semibold shadow-lg shadow-brand-accent/20 hover:bg-brand-accent-hover transition-colors"
                >
                  Create Plan
                </motion.button>
              </Link>
            </motion.div>
          </div>

          {/* RIGHT COLUMN: UI Mockup Graphic */}
          <motion.div 
            initial={{ opacity: 0, x: 60, rotateY: -5 }}
            animate={{ opacity: 1, x: 0, rotateY: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
            className="relative mx-auto w-full max-w-lg lg:max-w-none"
          >
            <motion.div 
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="bg-white dark:bg-brand-surface-dark rounded-2xl shadow-2xl shadow-brand-dark/10 dark:shadow-brand-accent/5 border border-brand-muted/30 dark:border-brand-muted/10 p-6 sm:p-8 transition-colors duration-300"
            >
              
              {/* Fake Browser/App Header */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-amber-400" />
                  <div className="w-3 h-3 rounded-full bg-emerald-400" />
                </div>
                <div className="w-24 h-2 bg-brand-light dark:bg-brand-card-dark rounded-full transition-colors duration-300" />
              </div>

              {/* Fake Checklist Items */}
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-5 h-5 rounded-full border-2 border-brand-muted/50 dark:border-brand-muted/30 transition-colors duration-300" />
                  <div className="h-3 w-48 bg-brand-light dark:bg-brand-card-dark rounded-full transition-colors duration-300" />
                </div>
                <div className="flex items-center gap-4 bg-brand-accent/10 dark:bg-brand-accent/10 p-2 -ml-2 rounded-lg transition-colors duration-300">
                  <div className="w-5 h-5 rounded-full bg-brand-accent flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div className="h-3 w-32 bg-brand-accent/30 dark:bg-brand-accent/20 rounded-full transition-colors duration-300" />
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-5 h-5 rounded-full border-2 border-brand-muted/50 dark:border-brand-muted/30 transition-colors duration-300" />
                  <div className="h-3 w-56 bg-brand-light dark:bg-brand-card-dark rounded-full transition-colors duration-300" />
                </div>
              </div>

              {/* Fake Bottom Chart/Content Area */}
              <div className="w-full h-48 bg-brand-light dark:bg-brand-card-dark/50 rounded-xl flex items-center justify-center transition-colors duration-300">
                <svg className="w-12 h-12 text-brand-muted dark:text-brand-muted/40 transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M3 3v18h18M9 15v6M15 9v12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                </svg>
              </div>

            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;