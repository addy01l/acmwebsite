'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoadingScreenProps {
  onFinished: () => void;
}

export default function LoadingScreen({ onFinished }: LoadingScreenProps) {
  const [stage, setStage] = useState(0); 
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Fast, energetic, and seamless 2-second animation
    const logoTimer = setTimeout(() => setStage(1), 100);   // Logo scales up
    const textTimer = setTimeout(() => setStage(2), 600);   // Text reveals
    const endTimer = setTimeout(() => {
      setVisible(false);
      setTimeout(onFinished, 400); // Allow fadeout animation to complete
    }, 2000); // 2-second total duration

    return () => {
      clearTimeout(logoTimer);
      clearTimeout(textTimer);
      clearTimeout(endTimer);
    };
  }, [onFinished]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          exit={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#050505] overflow-hidden"
        >
          {/* Logo & Glow Aura */}
          <div className="relative mb-6 flex items-center justify-center">
            {/* Subtle Glowing Aura */}
            <AnimatePresence>
              {stage >= 1 && (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{
                    scale: [1, 1.2, 1.1],
                    opacity: 0.5,
                  }}
                  transition={{
                    duration: 1.5,
                    ease: 'easeOut',
                  }}
                  className="absolute w-48 h-48 rounded-full bg-[radial-gradient(circle,rgba(0,123,255,0.3)_0%,transparent_70%)] filter blur-2xl"
                />
              )}
            </AnimatePresence>

            {/* ACM Logo scaling up with motion blur */}
            <motion.div
              initial={{ scale: 0.5, opacity: 0, filter: 'blur(15px)', y: 10 }}
              animate={{
                scale: stage >= 1 ? 1 : 0.5,
                opacity: stage >= 1 ? 1 : 0,
                filter: stage >= 1 ? 'blur(0px)' : 'blur(15px)',
                y: stage >= 1 ? 0 : 10
              }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }} // Energetic spring-like custom easing
              className="relative z-10 w-28 h-28 flex items-center justify-center"
            >
              <img 
                src="/acm_blue_logo.png" 
                alt="ACM Logo" 
                className="w-full h-full object-contain filter drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]"
              />
            </motion.div>
          </div>

          {/* Text reveal */}
          <div className="text-center overflow-hidden h-[40px] flex items-center justify-center">
            <AnimatePresence>
              {stage >= 2 && (
                <motion.h1
                  initial={{ y: 20, opacity: 0, filter: 'blur(8px)' }}
                  animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="text-xl md:text-2xl font-bold tracking-[0.2em] text-white uppercase"
                >
                  Shivalik Chapter
                </motion.h1>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
