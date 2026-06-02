'use client';

import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CursorGlow() {
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Motion values for coordinates
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth springs for buttery delay effect
  const springConfig = { damping: 25, stiffness: 250, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    setMounted(true);
    
    // Check if device is touch-based
    const checkTouch = () => {
      setIsTouchDevice(
        window.matchMedia('(pointer: coarse)').matches ||
        'ontouchstart' in window ||
        navigator.maxTouchPoints > 0
      );
    };

    checkTouch();

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    if (!isTouchDevice) {
      window.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isTouchDevice, mouseX, mouseY]);

  if (!mounted || isTouchDevice) return null;

  return (
    <motion.div
      style={{
        left: smoothX,
        top: smoothY,
        x: '-50%',
        y: '-50%',
      }}
      className="fixed pointer-events-none w-[350px] h-[350px] rounded-full z-[9999] opacity-35 bg-[radial-gradient(circle_at_center,rgba(0,123,255,0.15)_0%,transparent_70%)] blur-[40px]"
    />
  );
}
