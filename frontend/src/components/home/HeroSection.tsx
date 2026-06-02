import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import ThreeMascot from '@/components/ThreeMascot';

export default function HeroSection() {
  return (
    <section className="min-h-[85vh] flex flex-col justify-center items-center px-4 md:px-8 text-center max-w-7xl mx-auto pt-12 md:pt-24">
      {/* 3D Wireframe Mascot */}
      <div className="w-full max-w-[280px] md:max-w-[400px] aspect-square flex items-center justify-center relative z-20 mb-4">
        <ThreeMascot />
      </div>

      {/* Subtitle */}
      <motion.span
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="px-3 py-1 border border-[#007BFF]/30 text-[#007BFF] bg-[#007BFF]/5 rounded-full text-xs font-semibold tracking-widest uppercase mb-4"
      >
        OUR MISSION
      </motion.span>

      {/* Main Title */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.15 }}
        className="text-4xl md:text-7xl font-extrabold tracking-tight text-white mb-6 uppercase"
      >
        Building the Future of <span className="text-[#007BFF] text-glow-strong">Computing</span>
      </motion.h1>

      {/* Description */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="text-zinc-400 text-sm md:text-lg max-w-2xl leading-relaxed mb-8"
      >
        Empowering students at Shivalik College through innovation, research, and technical excellence. Join the premier global community for computing professionals and students.
      </motion.p>

      {/* CTA Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.45 }}
        className="flex flex-col sm:flex-row gap-4 relative z-20"
      >
        <Link
          href="/membership"
          className="px-8 py-3 bg-[#007BFF] hover:bg-[#0069d9] text-white text-sm font-semibold rounded-lg shadow-[0_0_20px_rgba(0,123,255,0.4)] transition-all transform hover:-translate-y-0.5"
        >
          Join ACM
        </Link>
        <Link
          href="/events"
          className="px-8 py-3 border border-zinc-800 hover:border-zinc-700 text-zinc-300 hover:text-white text-sm font-semibold rounded-lg bg-zinc-950/40 backdrop-blur-md transition-all transform hover:-translate-y-0.5"
        >
          Explore Events
        </Link>
      </motion.div>
    </section>
  );
}
