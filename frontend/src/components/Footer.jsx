import React from 'react';
import { motion } from 'motion/react';
import {LaptopMinimalCheck} from 'lucide-react'
const Footer = () => {
  return (
    <motion.footer 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="bg-white dark:bg-brand-dark border-t border-brand-muted/20 dark:border-brand-muted/10 transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-5 py-2">
        
        {/* Top Row: Logo & Links */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          
          {/* Logo */}
          <div className="flex items-center gap-2">
            <LaptopMinimalCheck className='w-10 h-10 text-brand-accent'/>
            <span className="text-xl font-bold text-brand-dark dark:text-brand-light tracking-tight">
              ProPlanner
            </span>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-wrap justify-center gap-6 md:gap-8">
            <a href="#" className="text-sm font-medium text-brand-muted hover:text-brand-accent dark:text-brand-muted dark:hover:text-brand-accent transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-sm font-medium text-brand-muted hover:text-brand-accent dark:text-brand-muted dark:hover:text-brand-accent transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-sm font-medium text-brand-muted hover:text-brand-accent dark:text-brand-muted dark:hover:text-brand-accent transition-colors">
              Contact
            </a>
          </nav>
          
        </div>

        {/* Bottom Row: Copyright */}
        <div className="mt-12 pt-8 border-t border-brand-muted/20 dark:border-brand-muted/10 flex flex-col items-center justify-center text-center">
          <p className="text-sm text-brand-muted dark:text-brand-muted/60">
            © {new Date().getFullYear()} ProPlanner. All rights reserved. Built for builders.
          </p>
          <p className='text-sm text-brand-muted/80'>WebApp made with ❤️ by SAmaksh</p>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;