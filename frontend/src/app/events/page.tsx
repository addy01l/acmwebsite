'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { API_BASE_URL } from '@/utils/api';

interface Event {
  id: string;
  title: string;
  description: string;
  category: string;
  date: string;
  venue: string;
  banner: string;
  regLink?: string | null;
  isUpcoming: boolean;
  gallery?: { id: string; imageUrl: string }[];
}

const CATEGORIES = ['All', 'Hackathons', 'Workshops', 'Seminars', 'Coding Contests', 'Research Events'];

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [filterCategory, setFilterCategory] = useState('All');
  const [showUpcoming, setShowUpcoming] = useState(true);
  const [loading, setLoading] = useState(true);

  const fallbackEvents: Event[] = [
    {
      id: 'mock-1',
      title: 'Shivalik Hack-a-thon 2026',
      description: 'A 36-hour non-stop hackathon challenging student developers to solve real-world problems in Healthcare, FinTech, and Smart Education.',
      category: 'Hackathons',
      date: '2026-10-15T09:00:00Z',
      venue: 'Main Auditorium, SCE Dehradun',
      banner: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=800',
      regLink: 'https://forms.gle/shivalikhack2026',
      isUpcoming: true,
    },
    {
      id: 'mock-2',
      title: 'Hands-on Web Dev Workshop',
      description: 'Learn modern full-stack web development using Next.js 15, Tailwind CSS, and Prisma ORM. From absolute scratch to cloud deployment.',
      category: 'Workshops',
      date: '2026-03-12T10:00:00Z',
      venue: 'Lab 4, CSE Department',
      banner: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&q=80&w=800',
      regLink: null,
      isUpcoming: false,
      gallery: [
        { id: 'g-1', imageUrl: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&q=80&w=400' },
        { id: 'g-2', imageUrl: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&q=80&w=400' },
      ],
    },
    {
      id: 'mock-3',
      title: 'Competitive Programming Masterclass',
      description: 'A deep-dive seminar exploring graph algorithms and dynamic programming patterns to crack top product-company interviews.',
      category: 'Seminars',
      date: '2026-02-05T11:00:00Z',
      venue: 'Seminar Hall 2, SCE Dehradun',
      banner: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800',
      regLink: null,
      isUpcoming: false,
    },
  ];

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/events`);
        if (res.ok) {
          const data = await res.json();
          setEvents(data.length > 0 ? data : fallbackEvents);
        } else {
          setEvents(fallbackEvents);
        }
      } catch (err) {
        console.warn('Backend server offline. Loading fallback mock events.');
        setEvents(fallbackEvents);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Filter list
  const filteredEvents = events.filter((e) => {
    const matchesTab = e.isUpcoming === showUpcoming;
    const matchesCategory = filterCategory === 'All' || e.category === filterCategory;
    return matchesTab && matchesCategory;
  });

  // Extract all gallery images for the showcase
  const allGalleryImages = events
    .flatMap((e) => e.gallery || [])
    .filter((img) => img.imageUrl);

  return (
    <div className="py-16 px-4 md:px-8 max-w-7xl mx-auto relative">
      {/* Background neon glows */}
      <div className="absolute top-[30%] right-[-10%] w-[450px] h-[450px] rounded-full bg-[radial-gradient(circle_at_center,rgba(0,123,255,0.06)_0%,transparent_70%)] blur-[70px] pointer-events-none -z-10" />

      {/* Header */}
      <div className="text-center mb-12">
        <span className="px-3 py-1 border border-[#007BFF]/30 text-[#007BFF] bg-[#007BFF]/5 rounded-full text-[10px] font-bold tracking-widest uppercase mb-4 inline-block">
          ACM EVENTS
        </span>
        <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-wide uppercase">
          Explore Our <span className="text-[#007BFF]">Innovations</span>
        </h1>
        <p className="text-zinc-400 text-xs mt-3 max-w-xl mx-auto leading-relaxed">
          Participate in Hackathons, learn in Workshops, network in Seminars, and publish through Research wing panels.
        </p>
      </div>

      {/* Navigation Tabs (Upcoming vs Past) & Category filters */}
      <div className="flex flex-col items-center gap-6 mb-12">
        {/* Toggle between Upcoming / Past */}
        <div className="flex bg-zinc-900/60 p-1 border border-zinc-800 rounded-xl relative">
          <button
            onClick={() => setShowUpcoming(true)}
            className={`px-6 py-2 text-xs font-bold rounded-lg cursor-pointer transition-all duration-200 ${
              showUpcoming ? 'bg-[#007BFF] text-white' : 'text-zinc-400 hover:text-white'
            }`}
          >
            Upcoming Events
          </button>
          <button
            onClick={() => setShowUpcoming(false)}
            className={`px-6 py-2 text-xs font-bold rounded-lg cursor-pointer transition-all duration-200 ${
              !showUpcoming ? 'bg-[#007BFF] text-white' : 'text-zinc-400 hover:text-white'
            }`}
          >
            Past Activities
          </button>
        </div>

        {/* Category Filters scroll grid */}
        <div className="flex flex-wrap items-center justify-center gap-2 max-w-3xl">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider cursor-pointer border transition-all ${
                filterCategory === cat
                  ? 'border-[#007BFF] text-[#007BFF] bg-[#007BFF]/5'
                  : 'border-zinc-800 text-zinc-500 hover:text-zinc-300 hover:border-zinc-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Events Listings Grid */}
      {loading ? (
        <div className="text-center py-20 text-zinc-500 text-sm">Loading events catalog...</div>
      ) : (
        <div className="max-w-5xl mx-auto">
          <AnimatePresence mode="popLayout">
            {filteredEvents.length > 0 ? (
              <motion.div
                layout
                className="grid grid-cols-1 md:grid-cols-2 gap-8"
              >
                {filteredEvents.map((event) => (
                  <motion.div
                    key={event.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className="glass-panel rounded-3xl overflow-hidden border border-zinc-900 hover:border-[#007BFF]/30 flex flex-col h-full"
                  >
                    {/* Event Banner */}
                    <div className="aspect-video relative overflow-hidden bg-zinc-900 border-b border-zinc-900">
                      <img
                        src={event.banner}
                        alt={event.title}
                        className="object-cover w-full h-full hover:scale-105 transition-transform duration-500"
                      />
                      <span className="absolute top-4 left-4 text-[9px] font-extrabold text-[#007BFF] uppercase bg-[#007BFF]/10 border border-[#007BFF]/30 px-2.5 py-1 rounded-md backdrop-blur-md">
                        {event.category}
                      </span>
                    </div>

                    {/* Event Details */}
                    <div className="p-6 flex flex-col flex-grow">
                      <h3 className="text-white text-lg font-bold leading-snug">{event.title}</h3>
                      <p className="text-zinc-400 text-xs mt-2 leading-relaxed mb-6 flex-grow">{event.description}</p>
                      
                      <div className="border-t border-zinc-900 pt-4 flex flex-col gap-2 text-[11px] text-zinc-500 mb-6">
                        <div className="flex justify-between">
                          <span><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</span>
                          <span><strong>Venue:</strong> {event.venue}</span>
                        </div>
                      </div>

                      {/* Event Button */}
                      {event.isUpcoming ? (
                        event.regLink ? (
                          <a
                            href={event.regLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full text-center px-4 py-2 bg-[#007BFF] hover:bg-[#0069d9] text-white text-xs font-bold rounded-lg transition-colors cursor-pointer"
                          >
                            Register Online
                          </a>
                        ) : (
                          <Link
                            href="/membership"
                            className="w-full text-center px-4 py-2 bg-[#007BFF] hover:bg-[#0069d9] text-white text-xs font-bold rounded-lg transition-colors"
                          >
                            Apply via ACM Membership
                          </Link>
                        )
                      ) : (
                        <button
                          disabled
                          className="w-full px-4 py-2 border border-zinc-800 text-zinc-600 text-xs font-bold rounded-lg cursor-not-allowed"
                        >
                          Concluded
                        </button>
                      )}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20 text-zinc-500 text-sm"
              >
                No events found matching your criteria.
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* Gallery Showcase */}
      {allGalleryImages.length > 0 && (
        <section className="mt-28 border-t border-zinc-900 pt-16">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-extrabold text-white uppercase tracking-wider">
              Event <span className="text-[#007BFF]">Gallery</span>
            </h2>
            <p className="text-zinc-400 text-xs mt-2">Glimpses of learning, hacking and team building</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {allGalleryImages.map((img, index) => (
              <motion.div
                key={img.id}
                whileHover={{ scale: 1.02 }}
                className="aspect-square relative overflow-hidden rounded-2xl border border-zinc-900 bg-zinc-950/40"
              >
                <img
                  src={img.imageUrl}
                  alt={`Gallery Image ${index + 1}`}
                  className="object-cover w-full h-full grayscale hover:grayscale-0 transition-all duration-300"
                />
              </motion.div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
