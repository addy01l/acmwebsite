'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { API_BASE_URL } from '@/utils/api';
import * as LucideIcons from 'lucide-react';

interface Domain {
  id: string;
  name: string;
  description: string;
  skills: string[];
  teamLeads: string;
  icon: string;
}

export default function DomainsPage() {
  const [domains, setDomains] = useState<Domain[]>([]);
  const [loading, setLoading] = useState(true);

  const fallbackDomains: Domain[] = [
    {
      id: 'd-1',
      name: 'Tech',
      description: 'Web development, mobile apps, DevOps, and cloud systems. We build and maintain all digital platforms for the chapter.',
      skills: ['React', 'Next.js', 'Node.js', 'Docker', 'AWS', 'Git'],
      teamLeads: 'Aarav Sharma & Rohit Negi',
      icon: 'Code',
    },
    {
      id: 'd-2',
      name: 'Competitive Programming',
      description: 'Focuses on data structures, algorithms, problem-solving, and preparing students for ICPC, CodeChef, and LeetCode challenges.',
      skills: ['C++', 'Java', 'Algorithms', 'Data Structures', 'Greedy', 'Dynamic Programming'],
      teamLeads: 'Ishita Rawat',
      icon: 'Cpu',
    },
    {
      id: 'd-3',
      name: 'Design',
      description: 'Creating stunning visuals, posters, branding, UI/UX designs, and motion graphics for all ACM events and communications.',
      skills: ['Figma', 'Adobe Illustrator', 'Photoshop', 'UI/UX', 'Typography'],
      teamLeads: 'Kabir Thapa',
      icon: 'Palette',
    },
    {
      id: 'd-4',
      name: 'Management',
      description: 'The operational backbone. Handles event permissions, logistics, anchors, registrations, sponsorships, and budgeting.',
      skills: ['Event Planning', 'Public Speaking', 'Budgeting', 'Resource Management', 'Leadership'],
      teamLeads: 'Aditi Joshi & Divyansh Semwal',
      icon: 'Briefcase',
    },
    {
      id: 'd-5',
      name: 'Research',
      description: 'Fosters academic publications, exploring new technologies (AI/ML, Web3, IoT), writing research papers, and technical writing.',
      skills: ['Machine Learning', 'AI', 'LaTeX', 'Data Analysis', 'Research Methodology'],
      teamLeads: 'Dr. Sandeep Kumar & Ananya Sen',
      icon: 'BookOpen',
    },
    {
      id: 'd-6',
      name: 'Community',
      description: 'Handles student engagement, Discord moderation, outreach, social services, collaborations, and alumni networking.',
      skills: ['Public Relations', 'Community Building', 'Networking', 'Discord Ops'],
      teamLeads: 'Pooja Bhatt',
      icon: 'Users',
    },
    {
      id: 'd-7',
      name: 'Seminars',
      description: 'Organizes tech talks, industry expert interactions, alumni mentorship panels, and career guidance seminars.',
      skills: ['Speaker Management', 'Content Creation', 'Anchor Management', 'Webinar Tools'],
      teamLeads: 'Manas Kothari',
      icon: 'Presentation',
    },
    {
      id: 'd-8',
      name: 'Conferences',
      description: 'Arranges large-scale technical symposia, research presentations, and national-level student convocations.',
      skills: ['Abstract Review', 'Event Hosting', 'Academic Scheduling', 'PR'],
      teamLeads: 'Dr. Sandeep Kumar',
      icon: 'Globe',
    },
    {
      id: 'd-9',
      name: 'Startups',
      description: 'Incubating entrepreneurial ideas, pitch-deck guidance, business analysis, and connecting student founders with mentors.',
      skills: ['Business Model Canvas', 'Pitching', 'Finance', 'Market Research'],
      teamLeads: 'Siddharth Dobhal',
      icon: 'Rocket',
    },
  ];

  useEffect(() => {
    const fetchDomains = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/events/domains`);
        if (res.ok) {
          const data = await res.json();
          setDomains(data.length > 0 ? data : fallbackDomains);
        } else {
          setDomains(fallbackDomains);
        }
      } catch (err) {
        console.warn('Backend server offline. Loading fallback domains.');
        setDomains(fallbackDomains);
      } finally {
        setLoading(false);
      }
    };

    fetchDomains();
  }, []);

  // Helper to dynamically render Lucide Icons by name string
  const renderIcon = (iconName: string) => {
    const IconComponent = (LucideIcons as any)[iconName];
    if (IconComponent) {
      return <IconComponent className="w-8 h-8 text-[#007BFF] drop-shadow-[0_0_8px_rgba(0,123,255,0.4)]" />;
    }
    return <LucideIcons.Layers className="w-8 h-8 text-[#007BFF]" />;
  };

  return (
    <div className="py-16 px-4 md:px-8 max-w-7xl mx-auto relative">
      {/* Background neon glows */}
      <div className="absolute top-[20%] left-[-10%] w-[350px] h-[350px] rounded-full bg-[radial-gradient(circle_at_center,rgba(0,123,255,0.06)_0%,transparent_70%)] blur-[50px] pointer-events-none -z-10" />

      {/* Header */}
      <div className="text-center mb-16">
        <span className="px-3 py-1 border border-[#007BFF]/30 text-[#007BFF] bg-[#007BFF]/5 rounded-full text-[10px] font-bold tracking-widest uppercase mb-4 inline-block">
          ACM DOMAINS
        </span>
        <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-wide uppercase">
          Chapter <span className="text-[#007BFF]">Sectors</span>
        </h1>
        <p className="text-zinc-400 text-xs mt-3 max-w-xl mx-auto leading-relaxed">
          The 9 distinct disciplines driving technical proficiency, creative branding, logistical execution, startup ideation, and research at Shivalik.
        </p>
      </div>

      {loading ? (
        <div className="text-center py-20 text-zinc-500 text-sm">Loading domains matrix...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {domains.map((domain, idx) => (
            <motion.div
              key={domain.id || idx}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
              className="glass-panel glass-panel-hover p-8 rounded-3xl border border-zinc-900 flex flex-col justify-between min-h-[300px] animate-pulse-glow"
              style={{ animationDelay: `${idx * 0.15}s` }}
            >
              <div>
                {/* Domain Header: Icon & Title */}
                <div className="flex items-center justify-between mb-6">
                  {renderIcon(domain.icon)}
                  <span className="text-[10px] font-bold text-[#007BFF]/70 uppercase tracking-widest">
                    SECTOR {idx + 1}
                  </span>
                </div>

                <h3 className="text-white text-md font-bold uppercase tracking-wide mb-3">
                  {domain.name}
                </h3>
                
                <p className="text-zinc-400 text-xs leading-relaxed mb-6">
                  {domain.description}
                </p>
              </div>

              <div>
                {/* Skills tags */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {domain.skills.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="text-[9px] font-bold text-zinc-300 bg-zinc-900 border border-zinc-800 px-2 py-0.5 rounded"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {/* Team Leads */}
                <div className="border-t border-zinc-900/60 pt-4 flex items-center justify-between text-[10px] text-zinc-500">
                  <span>TEAM LEADS</span>
                  <span className="font-bold text-zinc-300 uppercase">{domain.teamLeads}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
