'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { API_BASE_URL } from '@/utils/api';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [promptMsg, setPromptMsg] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus('idle');
    setPromptMsg('');

    try {
      const response = await fetch(`${API_BASE_URL}/api/contact/message`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setPromptMsg(data.message || 'Message sent successfully!');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus('error');
        setPromptMsg(data.message || 'Failed to send message.');
      }
    } catch (err) {
      console.error('Submit contact message error:', err);
      setStatus('error');
      setPromptMsg('A network error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-16 px-4 md:px-8 max-w-7xl mx-auto relative">
      {/* Background neon glows */}
      <div className="absolute top-[20%] right-[-10%] w-[350px] h-[350px] rounded-full bg-[radial-gradient(circle_at_center,rgba(0,123,255,0.06)_0%,transparent_70%)] blur-[50px] pointer-events-none -z-10" />

      {/* Header */}
      <div className="text-center mb-16">
        <span className="px-3 py-1 border border-[#007BFF]/30 text-[#007BFF] bg-[#007BFF]/5 rounded-full text-[10px] font-bold tracking-widest uppercase mb-4 inline-block">
          CONTACT US
        </span>
        <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-wide uppercase">
          Get In <span className="text-[#007BFF]">Touch</span>
        </h1>
        <p className="text-zinc-400 text-xs mt-3 max-w-md mx-auto leading-relaxed">
          Have query about hackathons, memberships, or collaborations? Shoot us a message or visit our campus.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-6xl mx-auto items-start">
        {/* Contact Form Panel */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="glass-panel p-8 rounded-3xl border border-zinc-900 animate-pulse-glow"
        >
          <h2 className="text-lg font-bold text-white uppercase tracking-wide mb-6 border-b border-[#007BFF]/25 pb-2">
            Send Message
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div className="flex flex-col space-y-1">
              <label className="text-zinc-500 text-[10px] font-bold uppercase">Name</label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleInputChange}
                className="bg-zinc-950 border border-zinc-800 text-zinc-200 text-xs px-3 py-2.5 rounded-xl outline-none focus:border-[#007BFF] transition-colors"
                placeholder="Your Name"
              />
            </div>

            {/* Email */}
            <div className="flex flex-col space-y-1">
              <label className="text-zinc-500 text-[10px] font-bold uppercase">Email</label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                className="bg-zinc-950 border border-zinc-800 text-zinc-200 text-xs px-3 py-2.5 rounded-xl outline-none focus:border-[#007BFF] transition-colors"
                placeholder="your.email@example.com"
              />
            </div>

            {/* Subject */}
            <div className="flex flex-col space-y-1">
              <label className="text-zinc-500 text-[10px] font-bold uppercase">Subject</label>
              <input
                type="text"
                name="subject"
                required
                value={formData.subject}
                onChange={handleInputChange}
                className="bg-zinc-950 border border-zinc-800 text-zinc-200 text-xs px-3 py-2.5 rounded-xl outline-none focus:border-[#007BFF] transition-colors"
                placeholder="Topic of discussion"
              />
            </div>

            {/* Message */}
            <div className="flex flex-col space-y-1">
              <label className="text-zinc-500 text-[10px] font-bold uppercase">Message</label>
              <textarea
                name="message"
                required
                rows={4}
                value={formData.message}
                onChange={handleInputChange}
                className="bg-zinc-950 border border-zinc-800 text-zinc-200 text-xs px-3 py-2.5 rounded-xl outline-none focus:border-[#007BFF] transition-colors resize-none"
                placeholder="Write your message here..."
              />
            </div>

            {/* Message Prompt */}
            {promptMsg && (
              <div
                className={`p-3 rounded-xl text-xs font-semibold ${
                  status === 'success' ? 'bg-green-500/10 border border-green-500/30 text-green-400' : 'bg-red-500/10 border border-red-500/30 text-red-400'
                }`}
              >
                {promptMsg}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#007BFF] hover:bg-[#0069d9] text-white text-xs font-extrabold uppercase py-3 rounded-xl transition-all shadow-[0_0_15px_rgba(0,123,255,0.25)] cursor-pointer disabled:opacity-50"
            >
              {loading ? 'Sending Message...' : 'Send Message'}
            </button>
          </form>
        </motion.div>

        {/* Info & Map Column */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-8"
        >
          {/* Quick Contacts */}
          <div className="glass-panel p-6 rounded-3xl border border-zinc-900 space-y-4">
            <h2 className="text-white text-md font-bold uppercase tracking-wider mb-2">Connect Directly</h2>
            
            <div className="flex items-start gap-4">
              <svg className="w-5 h-5 text-[#007BFF] mt-0.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <div>
                <h4 className="text-zinc-400 text-xs font-bold uppercase">Email Handle</h4>
                <a href="mailto:acm.sce@shivalikcollege.edu.in" className="text-zinc-200 text-xs hover:text-[#007BFF] transition-colors">
                  acm.sce@shivalikcollege.edu.in
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <svg className="w-5 h-5 text-[#007BFF] mt-0.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <div>
                <h4 className="text-zinc-400 text-xs font-bold uppercase">Location Coordinates</h4>
                <p className="text-zinc-200 text-xs leading-relaxed">
                  Shivalik College of Engineering,<br />
                  Shimla Bypass Road, Dehradun, Uttarakhand, India
                </p>
              </div>
            </div>
          </div>

          {/* Responsive Iframe Map */}
          <div className="w-full h-[250px] rounded-3xl border border-zinc-900 overflow-hidden relative shadow-lg">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3444.629399222567!2d77.9254359!3d30.304561!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39092be0ad39276d%3A0xe54fb77eb566d7f!2sShivalik%20College%20of%20Engineering!5e0!3m2!1sen!2sin!4v1717312000000!5m2!1sen!2sin"
              className="w-full h-full border-0 grayscale invert contrast-[1.1] opacity-75 hover:opacity-100 transition-opacity duration-300"
              allowFullScreen={false}
              loading="lazy"
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
