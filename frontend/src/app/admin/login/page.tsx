'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { API_BASE_URL } from '@/utils/api';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // If already logged in, redirect to dashboard
  useEffect(() => {
    const token = localStorage.getItem('acm_admin_token');
    if (token) {
      router.push('/admin/dashboard');
    }
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('acm_admin_token', data.token);
        localStorage.setItem('acm_admin_user', JSON.stringify(data.user));
        
        // Redirect to dashboard
        router.push('/admin/dashboard');
      } else {
        setErrorMsg(data.message || 'Login failed. Invalid email or password.');
      }
    } catch (err) {
      console.error('Login error:', err);
      setErrorMsg('A network error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex flex-col justify-center items-center px-4 relative">
      {/* Background neon glows */}
      <div className="absolute top-[30%] left-[50%] -translate-x-[50%] w-[350px] h-[350px] rounded-full bg-[radial-gradient(circle_at_center,rgba(0,123,255,0.06)_0%,transparent_70%)] blur-[50px] pointer-events-none -z-10" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-panel p-8 rounded-3xl border border-zinc-900 w-full max-w-md shadow-2xl animate-pulse-glow"
      >
        <div className="text-center mb-8">
          <svg className="w-12 h-12 text-[#007BFF] mx-auto mb-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
          <h1 className="text-xl font-extrabold text-white tracking-widest uppercase">
            ADMIN PORTAL
          </h1>
          <p className="text-zinc-500 text-xs mt-1">Authorized access only</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          {/* Email */}
          <div className="flex flex-col space-y-1">
            <label className="text-zinc-500 text-[10px] font-bold uppercase tracking-wider">Email Address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-zinc-950 border border-zinc-800 text-zinc-200 text-xs px-3 py-2.5 rounded-xl outline-none focus:border-[#007BFF] transition-colors"
              placeholder="admin@acmshivalik.org"
            />
          </div>

          {/* Password */}
          <div className="flex flex-col space-y-1">
            <label className="text-zinc-500 text-[10px] font-bold uppercase tracking-wider">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-zinc-950 border border-zinc-800 text-zinc-200 text-xs px-3 py-2.5 rounded-xl outline-none focus:border-[#007BFF] transition-colors"
              placeholder="••••••••"
            />
          </div>

          {errorMsg && (
            <div className="p-3 bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-semibold rounded-xl">
              {errorMsg}
            </div>
          )}

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#007BFF] hover:bg-[#0069d9] text-white text-xs font-extrabold uppercase py-3 rounded-xl transition-all shadow-[0_0_15px_rgba(0,123,255,0.25)] cursor-pointer disabled:opacity-50"
          >
            {loading ? 'Authenticating...' : 'Sign In'}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
