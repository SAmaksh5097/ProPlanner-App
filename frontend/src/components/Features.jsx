import React from 'react';
import { motion } from 'motion/react';

const featuresData = [
  {
    id: 1,
    title: 'AI-generated day-wise plan',
    description: 'Get a structured roadmap for your project. Our AI analyzes your goal and breaks it down into manageable daily chunks.',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    id: 2,
    title: 'Smart task sequencing',
    description: 'Tasks ordered logically for efficient development. No more dependencies blocking your progress.',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
      </svg>
    ),
  },
  {
    id: 3,
    title: 'Simple progress tracking',
    description: 'Stay on track with a distraction-free checklist. See exactly how far you\'ve come with intuitive progress visuals.',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.6, ease: 'easeOut' },
  }),
};

const Features = () => {
  return (
    <section  
      id="features" 
      className="min-h-screen w-full flex flex-col justify-center py-12 sm:py-20 bg-brand-light dark:bg-brand-dark transition-colors duration-300"
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-brand-dark dark:text-brand-light mb-4 tracking-tight">
            Streamline Your <span className="text-brand-accent">Workflow</span>
          </h2>
          <p className="text-lg text-brand-dark/60 dark:text-brand-muted">
            Everything you need to move from idea to execution without the overwhelm.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuresData.map((feature, i) => (
            <motion.div 
              key={feature.id}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="p-5 sm:p-8 rounded-2xl bg-white dark:bg-brand-surface-dark border border-brand-muted/20 dark:border-brand-muted/10 hover:border-brand-accent/40 dark:hover:border-brand-accent/30 transition-colors duration-300 shadow-sm hover:shadow-lg hover:shadow-brand-accent/10"
            >
              {/* Icon Container */}
              <div className="w-12 h-12 rounded-xl bg-brand-accent/10 dark:bg-brand-accent/15 text-brand-accent flex items-center justify-center mb-6">
                {feature.icon}
              </div>
              
              {/* Card Text */}
              <h3 className="text-xl font-bold text-brand-dark dark:text-brand-light mb-3">
                {feature.title}
              </h3>
              <p className="text-brand-dark/60 dark:text-brand-muted leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
export default Features;