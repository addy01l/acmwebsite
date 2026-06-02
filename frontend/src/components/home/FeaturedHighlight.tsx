'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { API_BASE_URL } from '@/utils/api';

export default function FeaturedHighlight() {
  const [closestEvent, setClosestEvent] = useState<any>(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/events?isUpcoming=true`);
        if (!res.ok) throw new Error('Failed to fetch');
        const data = await res.json();
        if (data.length > 0) {
          setClosestEvent(data[0]);
        }
      } catch (err) {
        setClosestEvent({
          id: 'mock-1',
          title: 'Shivalik Hack-a-thon 2026',
          description: 'A 36-hour non-stop hackathon challenging student developers to solve real-world problems in Healthcare, FinTech, and Smart Education.',
          category: 'Hackathons',
          date: '2026-10-15T09:00:00Z',
          venue: 'Main Auditorium, SCE Dehradun',
          banner: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=800',
          regLink: '/membership',
          isUpcoming: true,
        });
      }
    };
    fetchEvent();
  }, []);

  if (!closestEvent) return null;

  return (
    <section className="py-16 max-w-7xl mx-auto px-4 md:px-8">
      <div className="text-center mb-12">
        <h2 className="text-2xl md:text-4xl font-extrabold text-white uppercase tracking-wide">
          Featured <span className="text-[#007BFF]">Upcoming Event</span>
        </h2>
        <p className="text-zinc-400 text-xs mt-2 font-medium">Join us in our next digital venture</p>
      </div>
      <div className="glass-panel p-6 rounded-3xl max-w-4xl mx-auto flex flex-col md:flex-row gap-6 items-center">
        <div className="w-full md:w-1/2 aspect-video relative rounded-2xl overflow-hidden border border-zinc-800">
          <img
            src={closestEvent.banner}
            alt={closestEvent.title}
            className="object-cover w-full h-full"
          />
        </div>
        <div className="w-full md:w-1/2 flex flex-col">
          <span className="text-xs font-bold text-[#007BFF] uppercase tracking-widest">{closestEvent.category}</span>
          <h3 className="text-xl md:text-2xl font-bold text-white mt-2 leading-snug">{closestEvent.title}</h3>
          <p className="text-zinc-400 text-xs mt-3 leading-relaxed mb-5">{closestEvent.description}</p>
          
          <div className="flex flex-col space-y-2 text-xs text-zinc-500 mb-6">
            <span className="flex items-center"><strong className="text-zinc-300 mr-2">Date:</strong> {new Date(closestEvent.date).toLocaleDateString()}</span>
            <span className="flex items-center"><strong className="text-zinc-300 mr-2">Venue:</strong> {closestEvent.venue}</span>
          </div>

          {closestEvent.regLink ? (
            <a
              href={closestEvent.regLink}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2.5 bg-[#007BFF] hover:bg-[#0069d9] text-white text-xs font-bold rounded-lg text-center shadow-[0_0_15px_rgba(0,123,255,0.25)] transition-all cursor-pointer"
            >
              Register Now
            </a>
          ) : (
            <Link
              href="/membership"
              className="px-6 py-2.5 bg-[#007BFF] hover:bg-[#0069d9] text-white text-xs font-bold rounded-lg text-center shadow-[0_0_15px_rgba(0,123,255,0.25)] transition-all"
            >
              Register via Joining ACM
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
