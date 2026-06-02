'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { API_BASE_URL } from '@/utils/api';

interface TeamMember {
  id: string;
  name: string;
  position: string;
  department: string;
  category: string;
  photo: string;
  linkedin?: string | null;
  github?: string | null;
  email?: string | null;
}

export default function TeamPage() {
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);

  const fallbackTeam: TeamMember[] = [
    {
      id: 'f-1',
      name: 'Dr. Sandeep Kumar',
      position: 'Faculty Coordinator',
      department: 'Computer Science & Engineering',
      category: 'Faculty Coordinator',
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400',
      linkedin: 'https://linkedin.com',
      github: 'https://github.com',
      email: 'sandeep.kumar@shivalikcollege.edu.in',
    },
    {
      id: 'f-2',
      name: 'Aarav Sharma',
      position: 'Chairperson',
      department: 'Computer Science & Engineering',
      category: 'Executive Board',
      photo: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=400',
      linkedin: 'https://linkedin.com',
      github: 'https://github.com',
      email: 'aarav.sharma.acm@gmail.com',
    },
    {
      id: 'f-3',
      name: 'Ishita Rawat',
      position: 'Vice-Chairperson & CP Lead',
      department: 'Computer Science & Engineering',
      category: 'Executive Board',
      photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
      linkedin: 'https://linkedin.com',
      github: 'https://github.com',
      email: 'ishita.rawat.acm@gmail.com',
    },
    {
      id: 'f-4',
      name: 'Rohit Negi',
      position: 'Technical Lead',
      department: 'Computer Science & Engineering',
      category: 'Technical Team',
      photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=400',
      linkedin: 'https://linkedin.com',
      github: 'https://github.com',
      email: 'rohit.negi.acm@gmail.com',
    },
    {
      id: 'f-5',
      name: 'Kabir Thapa',
      position: 'Design Lead',
      department: 'Computer Science & Engineering',
      category: 'Design Team',
      photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400',
      linkedin: 'https://linkedin.com',
      github: 'https://github.com',
      email: 'kabir.thapa.acm@gmail.com',
    },
  ];

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/team`);
        if (res.ok) {
          const data = await res.json();
          setTeam(data.length > 0 ? data : fallbackTeam);
        } else {
          setTeam(fallbackTeam);
        }
      } catch (err) {
        console.warn('Backend server offline. Rendering fallback team lists.');
        setTeam(fallbackTeam);
      } finally {
        setLoading(false);
      }
    };

    fetchTeam();
  }, []);

  // Filter lists by category
  const coordinator = team.find((m) => m.category === 'Faculty Coordinator');
  const board = team.filter((m) => m.category === 'Executive Board');
  const technical = team.filter((m) => m.category === 'Technical Team');
  const design = team.filter((m) => m.category === 'Design Team');
  const management = team.filter((m) => m.category === 'Management Team');
  const research = team.filter((m) => m.category === 'Research Team');

  const renderMemberCard = (member: TeamMember) => (
    <motion.div
      key={member.id}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="glass-panel rounded-2xl overflow-hidden border border-zinc-900 group hover:border-[#007BFF]/40 shadow-lg"
    >
      {/* Profile Photo */}
      <div className="aspect-[4/5] relative overflow-hidden bg-zinc-900">
        <img
          src={member.photo}
          alt={member.name}
          className="object-cover w-full h-full grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
        />
        {/* Soft overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80" />
        
        {/* Position Details overlay */}
        <div className="absolute bottom-4 left-4 right-4 z-10">
          <span className="text-[9px] font-bold text-[#007BFF] uppercase tracking-wider bg-[#007BFF]/10 px-2 py-0.5 border border-[#007BFF]/30 rounded">
            {member.department}
          </span>
          <h3 className="text-white text-md font-bold mt-1.5 leading-snug">{member.name}</h3>
          <p className="text-zinc-400 text-xs font-semibold">{member.position}</p>
        </div>
      </div>

      {/* Social quicklinks */}
      <div className="px-4 py-3 bg-zinc-950 border-t border-zinc-900 flex justify-around items-center">
        {member.linkedin ? (
          <a
            href={member.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-500 hover:text-[#007BFF] transition-colors"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
            </svg>
          </a>
        ) : (
          <span className="w-4 h-4" />
        )}
        
        {member.github ? (
          <a
            href={member.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-500 hover:text-white transition-colors"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
          </a>
        ) : (
          <span className="w-4 h-4" />
        )}

        {member.email ? (
          <a
            href={`mailto:${member.email}`}
            className="text-zinc-500 hover:text-[#007BFF] transition-colors"
          >
            <svg className="w-4 h-4 fill-none stroke-current" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </a>
        ) : (
          <span className="w-4 h-4" />
        )}
      </div>
    </motion.div>
  );

  return (
    <div className="py-16 px-4 md:px-8 max-w-7xl mx-auto relative">
      {/* Background neon glows */}
      <div className="absolute top-[20%] left-[-10%] w-[350px] h-[350px] rounded-full bg-[radial-gradient(circle_at_center,rgba(0,123,255,0.06)_0%,transparent_70%)] blur-[50px] pointer-events-none -z-10" />

      {/* Header */}
      <div className="text-center mb-16">
        <span className="px-3 py-1 border border-[#007BFF]/30 text-[#007BFF] bg-[#007BFF]/5 rounded-full text-[10px] font-bold tracking-widest uppercase mb-4 inline-block">
          MEET OUR TEAM
        </span>
        <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-wide uppercase">
          The Minds Behind <span className="text-[#007BFF]">ACM Shivalik</span>
        </h1>
        <p className="text-zinc-400 text-xs mt-3 max-w-xl mx-auto leading-relaxed">
          Faculty advisors and student leaders who organize, build, and support the chapter's operational excellence.
        </p>
      </div>

      {loading ? (
        <div className="text-center py-20 text-zinc-500 text-sm">Loading team board...</div>
      ) : (
        <div className="space-y-24">
          
          {/* Faculty Coordinator Section */}
          {coordinator && (
            <section className="flex flex-col items-center">
              <h2 className="text-xl md:text-2xl font-bold text-white uppercase tracking-wider mb-8 text-center border-b border-[#007BFF]/20 pb-2 w-full max-w-md">
                Faculty Advisor
              </h2>
              <div className="w-full max-w-[280px]">
                {renderMemberCard(coordinator)}
              </div>
            </section>
          )}

          {/* Executive Board Section */}
          {board.length > 0 && (
            <section className="space-y-8">
              <h2 className="text-xl md:text-2xl font-bold text-white uppercase tracking-wider text-center border-b border-[#007BFF]/20 pb-2 max-w-sm mx-auto">
                Executive Board
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-6xl mx-auto justify-center">
                {board.map(renderMemberCard)}
              </div>
            </section>
          )}

          {/* Technical Team Section */}
          {technical.length > 0 && (
            <section className="space-y-8">
              <h2 className="text-xl md:text-2xl font-bold text-white uppercase tracking-wider text-center border-b border-[#007BFF]/20 pb-2 max-w-sm mx-auto">
                Technical Team
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-6xl mx-auto justify-center">
                {technical.map(renderMemberCard)}
              </div>
            </section>
          )}

          {/* Design Team Section */}
          {design.length > 0 && (
            <section className="space-y-8">
              <h2 className="text-xl md:text-2xl font-bold text-white uppercase tracking-wider text-center border-b border-[#007BFF]/20 pb-2 max-w-sm mx-auto">
                Creative & Design Team
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-6xl mx-auto justify-center">
                {design.map(renderMemberCard)}
              </div>
            </section>
          )}

          {/* Management Team Section */}
          {management.length > 0 && (
            <section className="space-y-8">
              <h2 className="text-xl md:text-2xl font-bold text-white uppercase tracking-wider text-center border-b border-[#007BFF]/20 pb-2 max-w-sm mx-auto">
                Management Team
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-6xl mx-auto justify-center">
                {management.map(renderMemberCard)}
              </div>
            </section>
          )}

          {/* Research Team Section */}
          {research.length > 0 && (
            <section className="space-y-8">
              <h2 className="text-xl md:text-2xl font-bold text-white uppercase tracking-wider text-center border-b border-[#007BFF]/20 pb-2 max-w-sm mx-auto">
                Research & Publications Wing
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-6xl mx-auto justify-center">
                {research.map(renderMemberCard)}
              </div>
            </section>
          )}

        </div>
      )}
    </div>
  );
}
