'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { API_BASE_URL } from '@/utils/api';
import confetti from 'canvas-confetti';

export default function MembershipPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    branch: 'Computer Science & Engineering',
    year: '1',
    enrollmentNo: '',
    skills: '',
  });
  const [resume, setResume] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      
      // Limit file size to 5MB
      if (file.size > 5 * 1024 * 1024) {
        setStatus('error');
        setMessage('File size exceeds the 5MB limit. Please upload a smaller file.');
        setResume(null);
        return;
      }
      setResume(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resume) {
      setStatus('error');
      setMessage('Please upload your resume.');
      return;
    }

    setLoading(true);
    setStatus('idle');
    setMessage('');

    const payload = new FormData();
    payload.append('name', formData.name);
    payload.append('email', formData.email);
    payload.append('phone', formData.phone);
    payload.append('branch', formData.branch);
    payload.append('year', formData.year);
    payload.append('enrollmentNo', formData.enrollmentNo);
    payload.append('skills', formData.skills);
    payload.append('resume', resume);

    try {
      const response = await fetch(`${API_BASE_URL}/api/applications/submit`, {
        method: 'POST',
        body: payload,
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setMessage(data.message || 'Application submitted successfully!');
        
        // Trigger celebratory confetti
        confetti({
          particleCount: 150,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#007BFF', '#25D366', '#FFFFFF'],
        });

        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          branch: 'Computer Science & Engineering',
          year: '1',
          enrollmentNo: '',
          skills: '',
        });
        setResume(null);
      } else {
        setStatus('error');
        setMessage(data.message || 'Submission failed. Please check your inputs.');
      }
    } catch (err) {
      console.error('Submit application error:', err);
      setStatus('error');
      setMessage('A network error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-16 px-4 md:px-8 max-w-4xl mx-auto relative">
      {/* Background neon glows */}
      <div className="absolute top-[20%] left-[-10%] w-[350px] h-[350px] rounded-full bg-[radial-gradient(circle_at_center,rgba(0,123,255,0.06)_0%,transparent_70%)] blur-[50px] pointer-events-none -z-10" />

      {/* Header */}
      <div className="text-center mb-12">
        <span className="px-3 py-1 border border-[#007BFF]/30 text-[#007BFF] bg-[#007BFF]/5 rounded-full text-[10px] font-bold tracking-widest uppercase mb-4 inline-block">
          JOIN CHAPTER
        </span>
        <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-wide uppercase">
          Apply For <span className="text-[#007BFF]">Membership</span>
        </h1>
        <p className="text-zinc-400 text-xs mt-3 max-w-md mx-auto leading-relaxed">
          Fill out the application to join the ACM Shivalik Student Chapter. Admin review takes 2-3 working days.
        </p>
      </div>

      {/* Registration Form Panel */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel p-8 md:p-12 rounded-3xl border border-zinc-900 animate-pulse-glow"
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name */}
            <div className="flex flex-col space-y-2">
              <label className="text-zinc-400 text-xs font-bold uppercase">Full Name</label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleInputChange}
                className="bg-zinc-950 border border-zinc-800 text-zinc-200 text-xs px-4 py-3 rounded-xl outline-none focus:border-[#007BFF] transition-colors"
                placeholder="Enter full name"
              />
            </div>

            {/* Email */}
            <div className="flex flex-col space-y-2">
              <label className="text-zinc-400 text-xs font-bold uppercase">Email Address</label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                className="bg-zinc-950 border border-zinc-800 text-zinc-200 text-xs px-4 py-3 rounded-xl outline-none focus:border-[#007BFF] transition-colors"
                placeholder="email@example.com"
              />
            </div>

            {/* Phone */}
            <div className="flex flex-col space-y-2">
              <label className="text-zinc-400 text-xs font-bold uppercase">Phone Number</label>
              <input
                type="tel"
                name="phone"
                required
                value={formData.phone}
                onChange={handleInputChange}
                className="bg-zinc-950 border border-zinc-800 text-zinc-200 text-xs px-4 py-3 rounded-xl outline-none focus:border-[#007BFF] transition-colors"
                placeholder="e.g. 9876543210"
              />
            </div>

            {/* Enrollment Number */}
            <div className="flex flex-col space-y-2">
              <label className="text-zinc-400 text-xs font-bold uppercase">Enrollment Number</label>
              <input
                type="text"
                name="enrollmentNo"
                required
                value={formData.enrollmentNo}
                onChange={handleInputChange}
                className="bg-zinc-950 border border-zinc-800 text-zinc-200 text-xs px-4 py-3 rounded-xl outline-none focus:border-[#007BFF] transition-colors"
                placeholder="Enter university roll number"
              />
            </div>

            {/* Branch */}
            <div className="flex flex-col space-y-2">
              <label className="text-zinc-400 text-xs font-bold uppercase">Academic Branch</label>
              <select
                name="branch"
                value={formData.branch}
                onChange={handleInputChange}
                className="bg-zinc-950 border border-zinc-800 text-zinc-200 text-xs px-4 py-3 rounded-xl outline-none focus:border-[#007BFF] transition-colors cursor-pointer"
              >
                <option value="Computer Science & Engineering">Computer Science & Engineering</option>
                <option value="Information Technology">Information Technology</option>
                <option value="Electronics & Communication">Electronics & Communication</option>
                <option value="Mechanical Engineering">Mechanical Engineering</option>
                <option value="Civil Engineering">Civil Engineering</option>
              </select>
            </div>

            {/* Year */}
            <div className="flex flex-col space-y-2">
              <label className="text-zinc-400 text-xs font-bold uppercase">Current Year</label>
              <select
                name="year"
                value={formData.year}
                onChange={handleInputChange}
                className="bg-zinc-950 border border-zinc-800 text-zinc-200 text-xs px-4 py-3 rounded-xl outline-none focus:border-[#007BFF] transition-colors cursor-pointer"
              >
                <option value="1">1st Year</option>
                <option value="2">2nd Year</option>
                <option value="3">3rd Year</option>
                <option value="4">4th Year</option>
              </select>
            </div>
          </div>

          {/* Skills */}
          <div className="flex flex-col space-y-2">
            <label className="text-zinc-400 text-xs font-bold uppercase">Skills & Tech Stack</label>
            <textarea
              name="skills"
              required
              rows={3}
              value={formData.skills}
              onChange={handleInputChange}
              className="bg-zinc-950 border border-zinc-800 text-zinc-200 text-xs px-4 py-3 rounded-xl outline-none focus:border-[#007BFF] transition-colors resize-none"
              placeholder="e.g. React, Python, C++, Figma, UI/UX"
            />
          </div>

          {/* Resume Upload */}
          <div className="flex flex-col space-y-2">
            <label className="text-zinc-400 text-xs font-bold uppercase">Upload Resume (PDF, DOC, DOCX - Max 5MB)</label>
            <div className="relative border-2 border-dashed border-zinc-800 hover:border-[#007BFF]/50 transition-colors rounded-xl p-6 bg-zinc-950/40 text-center flex flex-col items-center justify-center cursor-pointer">
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
                className="absolute inset-0 opacity-0 cursor-pointer"
                required
              />
              <svg className="w-8 h-8 text-zinc-500 mb-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
              <span className="text-zinc-400 text-xs font-medium">
                {resume ? resume.name : 'Drag and drop file here, or click to upload'}
              </span>
            </div>
          </div>

          {/* Message Prompt */}
          {message && (
            <div
              className={`p-4 rounded-xl text-xs font-semibold ${
                status === 'success' ? 'bg-green-500/10 border border-green-500/30 text-green-400' : 'bg-red-500/10 border border-red-500/30 text-red-400'
              }`}
            >
              {message}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#007BFF] hover:bg-[#0069d9] text-white text-xs font-extrabold uppercase py-3 rounded-xl transition-all shadow-[0_0_15px_rgba(0,123,255,0.25)] hover:shadow-[0_0_25px_rgba(0,123,255,0.45)] cursor-pointer disabled:opacity-50"
          >
            {loading ? 'Submitting Application...' : 'Submit Application'}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
