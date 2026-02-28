import React, { useEffect, useState, useCallback } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

const AnimatedBackground = ({ children }) => {
  const [windowSize, setWindowSize] = useState({ w: 0, h: 0 });

  // Mouse-tracking motion values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring for parallax blobs (inverted, slow follow)
  const blobX = useSpring(0, { stiffness: 20, damping: 40 });
  const blobY = useSpring(0, { stiffness: 20, damping: 40 });

  // Secondary blob (even slower, different offset)
  const blob2X = useSpring(0, { stiffness: 12, damping: 50 });
  const blob2Y = useSpring(0, { stiffness: 12, damping: 50 });

  useEffect(() => {
    setWindowSize({ w: window.innerWidth, h: window.innerHeight });
    const handleResize = () => setWindowSize({ w: window.innerWidth, h: window.innerHeight });
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleMouseMove = useCallback((e) => {
    const { clientX, clientY } = e;
    const centerX = windowSize.w / 2;
    const centerY = windowSize.h / 2;

    // Inverse parallax: blobs move opposite to cursor
    const offsetX = (clientX - centerX) / centerX; // -1 to 1
    const offsetY = (clientY - centerY) / centerY; // -1 to 1

    blobX.set(-offsetX * 80);
    blobY.set(-offsetY * 60);
    blob2X.set(offsetX * 50);
    blob2Y.set(offsetY * 40);
  }, [windowSize, blobX, blobY, blob2X, blob2Y]);

  return (
    <div 
      className="relative overflow-hidden bg-brand-light dark:bg-brand-dark transition-colors duration-500"
      onMouseMove={handleMouseMove}
    >
      {/* Primary Pulse Blob - rgb(191, 201, 209) */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 w-full h-full -z-10"
        aria-hidden
      >
        {/* Large ambient blob #1 — muted pulse */}
        <motion.div
          className="absolute w-[350px] h-[350px] sm:w-[500px] sm:h-[500px] lg:w-[700px] lg:h-[700px] rounded-full opacity-40 dark:opacity-15"
          style={{
            x: blobX,
            y: blobY,
            top: '10%',
            left: '15%',
            background: 'radial-gradient(circle, rgba(191,201,209,0.6) 0%, transparent 70%)',
          }}
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Large ambient blob #2 — muted pulse, offset */}
        <motion.div
          className="absolute w-[300px] h-[300px] sm:w-[450px] sm:h-[450px] lg:w-[600px] lg:h-[600px] rounded-full opacity-30 dark:opacity-10"
          style={{
            x: blob2X,
            y: blob2Y,
            bottom: '5%',
            right: '10%',
            background: 'radial-gradient(circle, rgba(191,201,209,0.5) 0%, transparent 70%)',
          }}
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        />

        {/* The Accent Pulse — warm orange glow at center */}
        <motion.div
          className="absolute w-[250px] h-[250px] sm:w-[380px] sm:h-[380px] lg:w-[500px] lg:h-[500px] rounded-full opacity-20 dark:opacity-10"
          style={{
            top: '30%',
            left: '50%',
            x: '-50%',
            background: 'radial-gradient(circle, rgba(255,155,81,0.25) 0%, transparent 70%)',
          }}
          animate={{ scale: [1, 1.3, 1], opacity: [0.15, 0.25, 0.15] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        />
      </motion.div>

      {/* Floating Tech Orbs — small accent-color data points */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden>
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: 4 + (i % 3) * 4,
              height: 4 + (i % 3) * 4,
              background: i % 2 === 0 
                ? 'rgba(255, 155, 81, 0.5)' 
                : 'rgba(191, 201, 209, 0.5)',
              top: `${10 + (i * 11) % 80}%`,
              left: `${5 + (i * 13) % 90}%`,
            }}
            animate={{
              y: [0, -30 - (i * 7), 0],
              x: [0, 15 * (i % 2 === 0 ? 1 : -1), 0],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: 4 + (i * 1.3),
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.8,
            }}
          />
        ))}
      </div>

      {/* Page content */}
      {children}
    </div>
  );
};

export default AnimatedBackground;
