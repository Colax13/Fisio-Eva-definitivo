import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

export function WaveBackground() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 40,
        y: (e.clientY / window.innerHeight - 0.5) * 40,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none bg-[#fbf9f8] z-0">
      <motion.div 
        animate={{
          x: mousePosition.x,
          y: mousePosition.y
        }}
        transition={{ type: "spring", stiffness: 30, damping: 20 }}
        className="absolute inset-[-15%] w-[130%] h-[130%]"
      >
        <svg viewBox="0 0 1000 1000" preserveAspectRatio="none" className="w-full h-full opacity-80">
          <defs>
            <linearGradient id="grad-teal-light" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#76c6b7" stopOpacity="0.5"/>
              <stop offset="100%" stopColor="#76c6b7" stopOpacity="0"/>
            </linearGradient>
            <linearGradient id="grad-purple-light" x1="100%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#c29bc9" stopOpacity="0.5"/>
              <stop offset="100%" stopColor="#c29bc9" stopOpacity="0"/>
            </linearGradient>
            <filter id="blur-heavy" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="50" />
            </filter>
            <filter id="blur-medium" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="30" />
            </filter>
          </defs>

          {/* Teal Waves (Top Left) */}
          <motion.path 
            d="M0,150 C300,450 500,-100 1000,250 L1000,0 L0,0 Z" 
            fill="url(#grad-teal-light)" 
            filter="url(#blur-heavy)"
            animate={{ d: [
              "M0,150 C300,450 500,-100 1000,250 L1000,0 L0,0 Z",
              "M0,250 C400,250 600,0 1000,150 L1000,0 L0,0 Z",
              "M0,150 C300,450 500,-100 1000,250 L1000,0 L0,0 Z"
            ]}}
            transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.path 
            d="M0,50 C400,350 600,-50 1000,150 L1000,0 L0,0 Z" 
            fill="url(#grad-teal-light)" 
            filter="url(#blur-medium)"
            animate={{ d: [
              "M0,50 C400,350 600,-50 1000,150 L1000,0 L0,0 Z",
              "M0,150 C300,450 500,-100 1000,250 L1000,0 L0,0 Z",
              "M0,50 C400,350 600,-50 1000,150 L1000,0 L0,0 Z"
            ]}}
            transition={{ duration: 30, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          />

          {/* Purple Waves (Bottom Right) */}
          <motion.path 
            d="M0,850 C400,650 600,1100 1000,750 L1000,1000 L0,1000 Z" 
            fill="url(#grad-purple-light)" 
            filter="url(#blur-heavy)"
            animate={{ d: [
              "M0,850 C400,650 600,1100 1000,750 L1000,1000 L0,1000 Z",
              "M0,750 C300,850 500,900 1000,850 L1000,1000 L0,1000 Z",
              "M0,850 C400,650 600,1100 1000,750 L1000,1000 L0,1000 Z"
            ]}}
            transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.path 
            d="M0,950 C300,750 500,1050 1000,850 L1000,1000 L0,1000 Z" 
            fill="url(#grad-purple-light)" 
            filter="url(#blur-medium)"
            animate={{ d: [
              "M0,950 C300,750 500,1050 1000,850 L1000,1000 L0,1000 Z",
              "M0,850 C400,650 600,1100 1000,750 L1000,1000 L0,1000 Z",
              "M0,950 C300,750 500,1050 1000,850 L1000,1000 L0,1000 Z"
            ]}}
            transition={{ duration: 32, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          />

          {/* Fibrous lines top */}
          <motion.path 
            d="M0,200 C300,450 500,0 1000,250" 
            stroke="#76c6b7"
            strokeWidth="2"
            fill="none"
            opacity="0.2"
            animate={{ d: [
              "M0,200 C300,450 500,0 1000,250",
              "M0,280 C350,300 550,50 1000,180",
              "M0,200 C300,450 500,0 1000,250"
            ]}}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          />
           <motion.path 
            d="M0,160 C320,400 480,-50 1000,280" 
            stroke="#76c6b7"
            strokeWidth="1.5"
            fill="none"
            opacity="0.25"
            animate={{ d: [
              "M0,160 C320,400 480,-50 1000,280",
              "M0,240 C380,250 520,10 1000,210",
              "M0,160 C320,400 480,-50 1000,280"
            ]}}
            transition={{ duration: 22, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          />

          {/* Fibrous lines bottom */}
           <motion.path 
            d="M0,800 C400,600 600,1000 1000,750" 
            stroke="#c29bc9"
            strokeWidth="2"
            fill="none"
            opacity="0.2"
            animate={{ d: [
              "M0,800 C400,600 600,1000 1000,750",
              "M0,720 C350,750 550,950 1000,820",
              "M0,800 C400,600 600,1000 1000,750"
            ]}}
            transition={{ duration: 19, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          />
           <motion.path 
            d="M0,850 C380,550 620,1050 1000,700" 
            stroke="#c29bc9"
            strokeWidth="1.5"
            fill="none"
            opacity="0.25"
            animate={{ d: [
              "M0,850 C380,550 620,1050 1000,700",
              "M0,780 C320,700 580,1000 1000,770",
              "M0,850 C380,550 620,1050 1000,700"
            ]}}
            transition={{ duration: 24, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          />
        </svg>
      </motion.div>
    </div>
  );
}
