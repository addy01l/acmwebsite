'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');
    try {
      const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
      const response = await fetch(`${backendUrl}/api/contact/newsletter/subscribe`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setMessage(data.message || 'Subscribed successfully!');
        setEmail('');
      } else {
        setStatus('error');
        setMessage(data.message || 'Subscription failed. Try again.');
      }
    } catch (error) {
      console.error('Newsletter error:', error);
      setStatus('error');
      setMessage('Network error. Please try again.');
    }
  };

  return (
    <footer className="bg-zinc-950 border-t border-zinc-900/60 pt-16 pb-8 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Logo & Description */}
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <svg className="w-6 h-6 text-[#007BFF]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="12 2 2 7 12 12 22 7 12 2" />
                <polyline points="2 17 12 22 22 17" />
              </svg>
              <span className="text-md font-bold tracking-wider text-white">ACM SHIVALIK</span>
            </Link>
            <p className="text-zinc-400 text-xs leading-relaxed">
              Official ACM Student Chapter of Shivalik College of Engineering, Dehradun. Empowering student developers through technology, coding, and collaborative research.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-zinc-200 text-xs font-bold uppercase tracking-wider mb-4">Navigation</h3>
            <ul className="space-y-2.5 text-xs text-zinc-400">
              <li><Link href="/about" className="hover:text-[#007BFF] transition-colors">About Us</Link></li>
              <li><Link href="/team" className="hover:text-[#007BFF] transition-colors">Our Team</Link></li>
              <li><Link href="/events" className="hover:text-[#007BFF] transition-colors">ACM Events</Link></li>
              <li><Link href="/domains" className="hover:text-[#007BFF] transition-colors">Chapter Domains</Link></li>
              <li><Link href="/membership" className="hover:text-[#007BFF] transition-colors">Join Chapter</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-zinc-200 text-xs font-bold uppercase tracking-wider mb-4">ACM Network</h3>
            <ul className="space-y-2.5 text-xs text-zinc-400">
              <li><a href="https://www.acm.org/" target="_blank" rel="noopener noreferrer" className="hover:text-[#007BFF] transition-colors">ACM Global Portal</a></li>
              <li><a href="https://shivalikcollege.edu.in/" target="_blank" rel="noopener noreferrer" className="hover:text-[#007BFF] transition-colors">SCE Dehradun</a></li>
              <li><a href="https://india.acm.org/" target="_blank" rel="noopener noreferrer" className="hover:text-[#007BFF] transition-colors">ACM India</a></li>
              <li><a href="https://dl.acm.org/" target="_blank" rel="noopener noreferrer" className="hover:text-[#007BFF] transition-colors">ACM Digital Library</a></li>
            </ul>
          </div>

          {/* Newsletter subscription */}
          <div>
            <h3 className="text-zinc-200 text-xs font-bold uppercase tracking-wider mb-4">Newsletter</h3>
            <p className="text-zinc-400 text-xs mb-3 leading-relaxed">
              Stay updated with coding contests, workshops, and hackathons.
            </p>
            <form onSubmit={handleSubscribe} className="flex flex-col space-y-2">
              <div className="relative">
                <input
                  type="email"
                  placeholder="Enter email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={status === 'loading'}
                  className="w-full bg-zinc-900 border border-zinc-800 focus:border-[#007BFF] text-zinc-200 text-xs px-3 py-2 rounded-lg outline-none transition-colors"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full bg-[#007BFF] hover:bg-[#0069d9] text-white text-xs font-semibold py-2 rounded-lg transition-colors cursor-pointer disabled:opacity-50"
              >
                {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
              </button>
            </form>
            {message && (
              <p className={`text-[10px] mt-2 ${status === 'success' ? 'text-green-400' : 'text-red-400'}`}>
                {message}
              </p>
            )}
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-zinc-900/60 pt-8 flex flex-col sm:flex-row justify-between items-center text-zinc-500 text-[10px] space-y-4 sm:space-y-0">
          <div>
            © {new Date().getFullYear()} ACM Shivalik Student Chapter. All Rights Reserved.
          </div>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-zinc-300">Privacy Policy</a>
            <a href="#" className="hover:text-zinc-300">Terms of Service</a>
            <Link href="/admin/login" className="hover:text-[#007BFF]">Admin Portal</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
