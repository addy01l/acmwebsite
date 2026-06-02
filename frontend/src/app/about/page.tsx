'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function AboutPage() {
  const milestones = [
    {
      year: '2023',
      title: 'Chapter Inauguration',
      desc: 'Officially registered as ACM Student Chapter at Shivalik College of Engineering, Dehradun, with 40 founding members.',
    },
    {
      year: '2024',
      title: 'First National Hackathon',
      desc: 'Organized Shivalik Hack-a-thon, receiving over 120 registrations from 15 different colleges across Uttarakhand.',
    },
    {
      year: '2025',
      title: 'Research and Publications Boom',
      desc: 'Formed the dedicated ACM Research Wing, helping students publish 8 research papers in international IEEE conferences.',
    },
    {
      year: '2026',
      title: 'Next-Gen Developer Incubation',
      desc: 'Expanding chapter domains to support startups, web3, and cloud integrations for 150+ active members.',
    },
  ];

  return (
    <div className="relative py-16 px-4 md:px-8 max-w-7xl mx-auto overflow-hidden">
      {/* Background highlight */}
      <div className="absolute top-[20%] right-[-10%] w-[400px] h-[400px] rounded-full bg-[radial-gradient(circle_at_center,rgba(0,123,255,0.06)_0%,transparent_70%)] blur-[60px] pointer-events-none -z-10" />

      {/* Header */}
      <div className="text-center mb-16">
        <span className="px-3 py-1 border border-[#007BFF]/30 text-[#007BFF] bg-[#007BFF]/5 rounded-full text-[10px] font-bold tracking-widest uppercase mb-4 inline-block">
          WHO WE ARE
        </span>
        <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-wide uppercase">
          About <span className="text-[#007BFF]">ACM Shivalik</span>
        </h1>
        <p className="text-zinc-400 text-xs mt-3 max-w-xl mx-auto leading-relaxed">
          Discover our values, missions, and the timeline that defines our journey at Shivalik College of Engineering.
        </p>
      </div>

      {/* Story */}
      <section className="mb-20 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-white uppercase tracking-wide border-b border-[#007BFF]/20 pb-2">Our Story</h2>
          <p className="text-zinc-400 text-xs leading-relaxed">
            The Association for Computing Machinery (ACM) Student Chapter at Shivalik College of Engineering, Dehradun was founded to build a collaborative space where computer science enthusiasts, programmers, designers, and researchers can interact. We believe learning is most effective when applied through team efforts.
          </p>
          <p className="text-zinc-400 text-xs leading-relaxed">
            Over the years, we have grown from a small group of enthusiastic coding hobbyists to a major academic and professional development club. We host regular workshops, competitive programming contests, research writing meetups, and mock interviews to make students industry-ready from day one.
          </p>
        </div>
        <div className="glass-panel p-8 rounded-3xl border border-[#007BFF]/20 relative overflow-hidden animate-pulse-glow">
          <h3 className="text-[#007BFF] font-extrabold text-lg uppercase tracking-wider mb-2">ACM Global Context</h3>
          <p className="text-zinc-400 text-xs leading-relaxed mb-4">
            ACM is the world's largest educational and scientific computing society, delivering resources that advance computing as a science and a profession. ACM provides the industry's premier Digital Library and serves its members and the computing profession with leading-edge publications, conferences, and career resources.
          </p>
          <a
            href="https://www.acm.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-bold text-white hover:text-[#007BFF] transition-colors underline"
          >
            Learn more about ACM Global →
          </a>
        </div>
      </section>

      {/* Mission, Vision, Goals */}
      <section className="mb-24 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="glass-panel p-6 rounded-2xl">
          <h3 className="text-lg font-bold text-white mb-3 uppercase tracking-wide border-b border-zinc-800 pb-2">Vision</h3>
          <p className="text-zinc-400 text-xs leading-relaxed">
            To build a community of innovative software professionals who can solve complex engineering tasks through analytical thinking and coding solutions, making SCE a hub of technical excellence in India.
          </p>
        </div>
        <div className="glass-panel p-6 rounded-2xl">
          <h3 className="text-lg font-bold text-white mb-3 uppercase tracking-wide border-b border-zinc-800 pb-2">Mission</h3>
          <p className="text-zinc-400 text-xs leading-relaxed">
            To hold practical code laboratories, design marathons, and provide platform interactions with working professionals from the technology sector, while facilitating academic research paper publications.
          </p>
        </div>
        <div className="glass-panel p-6 rounded-2xl">
          <h3 className="text-lg font-bold text-white mb-3 uppercase tracking-wide border-b border-zinc-800 pb-2">Core Goals</h3>
          <p className="text-zinc-400 text-xs leading-relaxed">
            Foster self-learning, increase student placement readiness in core software industries, nurture start-up business ideas, and cultivate logical analytical reasoning through persistent competitive programming.
          </p>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-8">
        <div className="text-center mb-16">
          <h2 className="text-2xl md:text-3xl font-extrabold text-white uppercase tracking-wide">
            Our Journey <span className="text-[#007BFF]">Milestones</span>
          </h2>
          <p className="text-zinc-400 text-xs mt-2">Chronology of growth and key chapter achievements</p>
        </div>

        {/* Chronological tree */}
        <div className="relative max-w-2xl mx-auto border-l-2 border-zinc-900 ml-4 md:ml-auto">
          {milestones.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              className="mb-12 ml-6 relative"
            >
              {/* Dot icon */}
              <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-[#050505] border-2 border-[#007BFF] shadow-[0_0_10px_#007BFF] z-10" />

              <span className="text-[#007BFF] text-sm font-extrabold tracking-widest">{item.year}</span>
              <h3 className="text-white text-md font-bold mt-1 leading-snug">{item.title}</h3>
              <p className="text-zinc-400 text-xs mt-2 leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Why Join ACM */}
      <section className="py-20 bg-zinc-950/40 backdrop-blur-md border-y border-zinc-900/60 mt-20 rounded-3xl">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <h2 className="text-2xl md:text-4xl font-extrabold text-white uppercase tracking-wide">
              Why Join <span className="text-[#007BFF]">ACM Shivalik</span>
            </h2>
            <p className="text-zinc-400 text-xs mt-2">Grow, code, collaborate and unlock professional opportunities</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="glass-panel p-6 rounded-2xl">
              <div className="w-10 h-10 rounded-lg bg-[#007BFF]/10 flex items-center justify-center text-[#007BFF] font-bold text-lg mb-4">01</div>
              <h3 className="text-md font-bold text-white mb-2">Global Community Access</h3>
              <p className="text-zinc-400 text-xs leading-relaxed">Connect with ACM members worldwide and attend international conferences at subsidized student rates.</p>
            </div>
            <div className="glass-panel p-6 rounded-2xl">
              <div className="w-10 h-10 rounded-lg bg-[#007BFF]/10 flex items-center justify-center text-[#007BFF] font-bold text-lg mb-4">02</div>
              <h3 className="text-md font-bold text-white mb-2">Hands-on Projects</h3>
              <p className="text-zinc-400 text-xs leading-relaxed">Collaborate on open-source platforms and create real-world software products as part of our technical sub-teams.</p>
            </div>
            <div className="glass-panel p-6 rounded-2xl">
              <div className="w-10 h-10 rounded-lg bg-[#007BFF]/10 flex items-center justify-center text-[#007BFF] font-bold text-lg mb-4">03</div>
              <h3 className="text-md font-bold text-white mb-2">Research Mentorship</h3>
              <p className="text-zinc-400 text-xs leading-relaxed">Get guided by faculty coordinators to write technical papers and publish your research in reputed journals.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-4xl font-extrabold text-white uppercase tracking-wide">
            Testimonials
          </h2>
          <p className="text-zinc-400 text-xs mt-2">What our student members and alumni say</p>
        </div>

        <div className="max-w-2xl mx-auto text-center glass-panel p-8 rounded-3xl relative">
          <p className="text-zinc-300 text-xs md:text-sm italic leading-relaxed mb-6">
            "Being a part of ACM Shivalik was the turning point of my college life. The hands-on hackathons and mentorship sessions prepared me for my software engineering role at Microsoft."
          </p>
          <h4 className="text-white text-sm font-bold">Aditya Vardhan</h4>
          <span className="text-[#007BFF] text-[10px] uppercase font-bold tracking-wider">Alumni (CSE 2024)</span>
        </div>
      </section>

      {/* Sponsors/Partners */}
      <section className="py-16 bg-zinc-950/20 max-w-7xl mx-auto px-4 md:px-8 text-center border-t border-zinc-900/40 rounded-3xl">
        <h3 className="text-zinc-500 text-xs font-bold uppercase tracking-widest mb-10">COLLABORATION PARTNERS</h3>
        <div className="flex flex-wrap items-center justify-center gap-12 opacity-40 grayscale hover:grayscale-0 transition-all duration-300">
          <span className="text-lg md:text-xl font-bold tracking-wider text-white">ACM INDIA</span>
          <span className="text-lg md:text-xl font-bold tracking-wider text-white">SHIVALIK COLLEGE</span>
          <span className="text-lg md:text-xl font-bold tracking-wider text-white">MICROSOFT LSC</span>
          <span className="text-lg md:text-xl font-bold tracking-wider text-white">GITHUB EDUCATION</span>
        </div>
      </section>
    </div>
  );
}
