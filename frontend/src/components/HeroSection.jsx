import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; 
import { motion } from 'motion/react';

const taglines = ["pro 😎", "legend 🚀", "G.O.A.T 🗿"];

const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.3 },
  },
};

const wordReveal = {
  hidden: { y: 24, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.6 + i * 0.2, duration: 0.6, ease: 'easeOut' },
  }),
};

const AnimatedHeadline = ({ text, className, accentWord }) => (
  <motion.h1
    variants={container}
    initial="hidden"
    animate="visible"
    className={className}
  >
    {text.split(' ').map((word, i) => (
      <span key={i} className="inline-block overflow-hidden mr-[0.3em]">
        <motion.span
          variants={wordReveal}
          className={`inline-block ${word === accentWord ? 'text-brand-accent' : ''}`}
        >
          {word}
        </motion.span>
      </span>
    ))}
  </motion.h1>
);

const HeroSection = () => {
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % taglines.length);
        setFade(true);
      }, 300);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">

      {/* Large peripheral floating orbs — accent "data points" */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={`orb-${i}`}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: 6 + (i % 3) * 6,
            height: 6 + (i % 3) * 6,
            background: `rgba(255, 155, 81, ${0.15 + (i % 3) * 0.1})`,
            top: `${12 + (i * 14) % 75}%`,
            left: `${8 + (i * 17) % 84}%`,
            filter: 'blur(1px)',
          }}
          animate={{
            y: [0, -(20 + i * 8), 0],
            x: [0, (i % 2 === 0 ? 12 : -12), 0],
            opacity: [0.25, 0.6, 0.25],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 5 + i * 1.2,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.7,
          }}
        />
      ))}

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-8 items-center">
          
          {/* ─── LEFT COLUMN ─── */}
          <div className="max-w-2xl">

            {/* Word‑by‑word staggered headline */}
            <AnimatedHeadline
              text="Plan Like A ProPlanner"
              accentWord="ProPlanner"
              className="text-3xl sm:text-5xl lg:text-7xl font-extrabold text-brand-dark dark:text-brand-light tracking-tight mb-4 sm:mb-6 leading-tight"
            />

            {/* Sub-heading with rotating tagline */}
            <motion.p 
              custom={0}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="text-base sm:text-lg lg:text-xl text-brand-dark/70 dark:text-brand-muted mb-6 sm:mb-8 leading-relaxed max-w-lg"
            >
              Plan your Projects like {' '}
              <span 
                className={`transition-opacity duration-500 ease-in-out text-xl font-bold text-brand-accent ${
                  fade ? 'opacity-100' : 'opacity-0'
                }`}
              >
                {taglines[index]}
              </span>
              <br />
              No more chaos, just clear, <span className="text-brand-accent font-semibold">AI‑powered</span> plans to ship efficiently.
            </motion.p>

            {/* ─── Magnetic Glow Button ─── */}
            <motion.div 
              custom={1}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="flex flex-col sm:flex-row gap-4 mb-10"
            >
              <Link to="/user-dashboard">
                <motion.button 
                  whileHover={{ 
                    scale: 1.07, 
                    boxShadow: '0 0 30px rgba(255,155,81,0.45), 0 0 60px rgba(255,155,81,0.15)',
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 sm:px-9 py-3 sm:py-4 rounded-full bg-brand-accent text-white font-bold text-base sm:text-lg shadow-[0_0_20px_rgba(255,155,81,0.3)] hover:bg-brand-accent-hover transition-colors relative overflow-hidden group"
                >
                  {/* Shine sweep */}
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
                  <span className="relative z-10">Create Plan</span>
                </motion.button>
              </Link>
            </motion.div>
          </div>

          {/* ─── RIGHT COLUMN: Floating UI Card ─── */}
          <motion.div 
            initial={{ opacity: 0, x: 60, rotateY: -5 }}
            animate={{ opacity: 1, x: 0, rotateY: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
            className="relative mx-auto w-full max-w-lg lg:max-w-none"
          >
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
              className="bg-white dark:bg-brand-surface-dark rounded-2xl shadow-2xl shadow-brand-dark/10 dark:shadow-brand-accent/5 border border-brand-muted/30 dark:border-brand-muted/10 p-6 sm:p-8 transition-colors duration-300"
            >
              {/* Fake browser header */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-amber-400" />
                  <div className="w-3 h-3 rounded-full bg-emerald-400" />
                </div>
                <div className="w-24 h-2 bg-brand-light dark:bg-brand-card-dark rounded-full" />
              </div>

              {/* Fake checklist items — staggered entrance */}
              <motion.div 
                className="space-y-4 mb-8"
                initial="hidden"
                animate="visible"
                variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.2, delayChildren: 0.8 } } }}
              >
                {[48, 32, 56].map((w, idx) => (
                  <motion.div
                    key={idx}
                    variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0 } }}
                    className={`flex items-center gap-4 ${idx === 1 ? 'bg-brand-accent/10 p-2 -ml-2 rounded-lg' : ''}`}
                  >
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                      idx === 1 
                        ? 'bg-brand-accent' 
                        : 'border-2 border-brand-muted/50 dark:border-brand-muted/30'
                    }`}>
                      {idx === 1 && (
                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                    <div 
                      className={`h-3 rounded-full ${
                        idx === 1 
                          ? 'bg-brand-accent/30 dark:bg-brand-accent/20' 
                          : 'bg-brand-light dark:bg-brand-card-dark'
                      }`} 
                      style={{ width: `${w * 4}px` }} 
                    />
                  </motion.div>
                ))}
              </motion.div>

              {/* Fake chart area */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.4, duration: 0.5 }}
                className="w-full h-48 bg-brand-light dark:bg-brand-card-dark/50 rounded-xl flex items-center justify-center"
              >
                {/* Animated mini bar chart */}
                <div className="flex items-end gap-2 sm:gap-3 h-20 sm:h-24">
                  {[40, 65, 50, 80, 55, 70].map((h, i) => (
                    <motion.div
                      key={i}
                      className="w-3 sm:w-4 rounded-t-sm bg-brand-accent/60 dark:bg-brand-accent/40"
                      initial={{ height: 0 }}
                      animate={{ height: `${h}%` }}
                      transition={{ delay: 1.6 + i * 0.1, duration: 0.5, ease: 'easeOut' }}
                    />
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;