
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';

const BackToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  // Scroll Progress logic for the ring
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const toggleVisibility = () => {
      // Show when scrolled down 400px
      if (window.pageYOffset > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility, { passive: true });
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5, y: 20, rotate: -45 }}
          animate={{ opacity: 1, scale: 1, y: 0, rotate: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20, rotate: 45 }}
          transition={{ 
            type: 'spring', 
            stiffness: 260, 
            damping: 20 
          }}
          // Positioned above WhatsApp (bottom-24) and Chatbot (bottom-6)
          // bottom-42 is roughly 168px from bottom
          className="fixed bottom-[168px] right-6 z-[120] pointer-events-auto"
        >
          <div className="relative w-14 h-14 flex items-center justify-center group">
            {/* Background Glow */}
            <div className="absolute inset-0 bg-cyan-500/20 rounded-full blur-md group-hover:bg-cyan-500/30 transition-all duration-300"></div>
            
            {/* SVG Progress Ring */}
            <svg 
              viewBox="0 0 100 100" 
              className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none"
            >
              {/* Track */}
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="rgba(255, 255, 255, 0.1)"
                strokeWidth="6"
              />
              {/* Active Progress */}
              <motion.circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="#06b6d4"
                strokeWidth="6"
                strokeLinecap="round"
                style={{ pathLength: smoothProgress }}
                className="drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]"
              />
            </svg>

            {/* Button */}
            <button
              onClick={scrollToTop}
              className="relative w-10 h-10 bg-slate-900 border border-slate-800 text-cyan-400 rounded-full flex items-center justify-center shadow-2xl hover:bg-cyan-500 hover:text-slate-950 hover:border-cyan-500 transition-all duration-300 active:scale-90"
              aria-label="Back to top"
            >
              <i className="fa-solid fa-chevron-up text-sm group-hover:-translate-y-1 transition-transform duration-300"></i>
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BackToTop;
