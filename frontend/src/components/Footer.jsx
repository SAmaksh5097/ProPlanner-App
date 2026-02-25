import React from 'react';
import {LaptopMinimalCheck} from 'lucide-react'
const Footer = () => {
  return (
    <footer className="bg-white dark:bg-slate-950 border-t border-slate-100 dark:border-slate-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-5 py-2">
        
        {/* Top Row: Logo & Links */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          
          {/* Logo */}
          <div className="flex items-center gap-2">
            <LaptopMinimalCheck className='w-10 h-10'/>
            <span className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
              ProPlanner
            </span>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-wrap justify-center gap-6 md:gap-8">
            <a href="#" className="text-sm font-medium text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-sm font-medium text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-sm font-medium text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors">
              Contact
            </a>
          </nav>
          
        </div>

        {/* Bottom Row: Copyright */}
        <div className="mt-12 pt-8 border-t border-slate-100 dark:border-slate-800/50 flex flex-col items-center justify-center text-center">
          <p className="text-sm text-slate-400 dark:text-slate-500">
            © {new Date().getFullYear()} ProPlanner. All rights reserved. Built for builders.
          </p>
          <p className='text-sm text-slate-500'>WebApp made with ❤️ by SAmaksh</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;