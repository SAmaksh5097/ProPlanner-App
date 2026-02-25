import React, { useEffect,useState } from 'react';

const texts = ["pro 😎", "legend 🚀", "G.O.A.T 🗿"]
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
    <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-white dark:bg-slate-950 transition-colors duration-300">
      
      {/* Background gradient blob (updated for light/dark mode) */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-50/50 to-white dark:from-blue-900/10 dark:to-slate-950 -z-10 transition-colors duration-300" />

      {/* Added py-20 to ensure spacing on mobile if content overflows */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          
          {/* LEFT COLUMN: Text Content & CTAs */}
          <div className="max-w-2xl">

            {/* Main Heading */}
            <h1 className="text-5xl lg:text-7xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-6 transition-colors duration-300">
              ProPlanner
            </h1>

            {/* Sub-heading */}
            <p className="text-lg lg:text-xl text-slate-600 dark:text-slate-400 mb-8 leading-relaxed max-w-lg transition-colors duration-300">
              Plan your Projects like a <span className={`transition-opacity duration-500  ease-in-out text-xl font-bold ${fade?"opacity-100":"opacity-0"} `}>{texts[index]}</span>
              <br />
              No more chaos, just clear, actionable plans to get your projects done efficiently.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <button className="px-8 py-3.5 rounded-full bg-blue-600 text-white font-semibold shadow-lg shadow-blue-600/20 hover:bg-blue-700 transition-colors">
                Create Plan
              </button>
            </div>

            {/* Social Proof */}
          </div>

          {/* RIGHT COLUMN: UI Mockup Graphic */}
          <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
            {/* The Floating UI Card */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl shadow-slate-200/50 dark:shadow-blue-900/5 border border-slate-100 dark:border-slate-800 p-6 sm:p-8 transition-colors duration-300">
              
              {/* Fake Browser/App Header */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-amber-400" />
                  <div className="w-3 h-3 rounded-full bg-emerald-400" />
                </div>
                <div className="w-24 h-2 bg-slate-100 dark:bg-slate-800 rounded-full transition-colors duration-300" />
              </div>

              {/* Fake Checklist Items */}
              <div className="space-y-4 mb-8">
                {/* Item 1 - Unchecked */}
                <div className="flex items-center gap-4">
                  <div className="w-5 h-5 rounded-full border-2 border-slate-200 dark:border-slate-700 transition-colors duration-300" />
                  <div className="h-3 w-48 bg-slate-100 dark:bg-slate-800 rounded-full transition-colors duration-300" />
                </div>
                {/* Item 2 - Checked (Active) */}
                <div className="flex items-center gap-4 bg-blue-50/50 dark:bg-blue-900/20 p-2 -ml-2 rounded-lg transition-colors duration-300">
                  <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div className="h-3 w-32 bg-blue-200 dark:bg-blue-800/50 rounded-full transition-colors duration-300" />
                </div>
                {/* Item 3 - Unchecked */}
                <div className="flex items-center gap-4">
                  <div className="w-5 h-5 rounded-full border-2 border-slate-200 dark:border-slate-700 transition-colors duration-300" />
                  <div className="h-3 w-56 bg-slate-100 dark:bg-slate-800 rounded-full transition-colors duration-300" />
                </div>
              </div>

              {/* Fake Bottom Chart/Content Area */}
              <div className="w-full h-48 bg-slate-100 dark:bg-slate-800/50 rounded-xl flex items-center justify-center transition-colors duration-300">
                {/* Simple Chart Icon Placeholder */}
                <svg className="w-12 h-12 text-slate-300 dark:text-slate-600 transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M3 3v18h18M9 15v6M15 9v12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                </svg>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;