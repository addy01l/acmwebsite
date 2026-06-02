'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

const NAV_LINKS = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Team', href: '/team' },
  { name: 'Events', href: '/events' },
  { name: 'Domains', href: '/domains' },
  { name: 'Join ACM', href: '/membership' },
  { name: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  // Sync scroll depth and admin session status
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress(window.scrollY / totalScroll);
      }
    };

    const checkAdmin = () => {
      const token = localStorage.getItem('acm_admin_token');
      setIsAdmin(!!token);
    };

    window.addEventListener('scroll', handleScroll);
    checkAdmin();

    // Set interval to check session changes periodically
    const interval = setInterval(checkAdmin, 2000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(interval);
    };
  }, [pathname]);

  const handleLogout = () => {
    localStorage.removeItem('acm_admin_token');
    localStorage.removeItem('acm_admin_user');
    setIsAdmin(false);
    router.push('/');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-zinc-950/75 backdrop-blur-md border-b border-zinc-900/60 transition-all duration-300">
      {/* Scroll indicator bar */}
      <div
        className="absolute bottom-0 left-0 h-[2px] bg-[#007BFF] shadow-[0_0_8px_#007BFF] transition-all duration-75"
        style={{ width: `${scrollProgress * 100}%` }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo Brand */}
          <Link href="/" className="flex items-center space-x-2 group">
            <svg
              className="w-7 h-7 text-[#007BFF] group-hover:rotate-6 transition-transform duration-300"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <polygon points="12 2 2 7 12 12 22 7 12 2" />
              <polyline points="2 17 12 22 22 17" />
            </svg>
            <span className="text-lg font-bold tracking-wider text-white group-hover:text-[#007BFF] transition-colors duration-300">
              ACM SHIVALIK
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1 lg:space-x-4">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`px-3 py-2 rounded-md text-sm font-medium tracking-wide transition-all duration-200 relative ${
                    isActive ? 'text-[#007BFF]' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute bottom-0 left-2 right-2 h-[2px] bg-[#007BFF] rounded"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}

            {isAdmin && (
              <>
                <Link
                  href="/admin/dashboard"
                  className="ml-4 px-3 py-1.5 border border-[#007BFF]/30 hover:border-[#007BFF] text-[#007BFF] rounded-md text-xs font-semibold uppercase tracking-wider bg-[#007BFF]/5 hover:bg-[#007BFF]/10 transition-all duration-300"
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-3 py-1.5 border border-red-500/30 hover:border-red-500 text-red-400 hover:text-red-500 rounded-md text-xs font-semibold uppercase tracking-wider bg-red-500/5 hover:bg-red-500/10 transition-all duration-300 cursor-pointer"
                >
                  Logout
                </button>
              </>
            )}
          </div>

          {/* Mobile menu trigger */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-zinc-400 hover:text-white hover:bg-zinc-900 focus:outline-none cursor-pointer"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden glass-panel border-t border-zinc-900 overflow-hidden"
          >
            <div className="px-2 pt-2 pb-4 space-y-1 sm:px-3">
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`block px-3 py-2.5 rounded-md text-base font-semibold tracking-wide transition-all ${
                      isActive ? 'bg-[#007BFF]/10 text-[#007BFF] border-l-2 border-[#007BFF]' : 'text-zinc-300 hover:bg-zinc-900 hover:text-white'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}

              {isAdmin && (
                <div className="pt-4 border-t border-zinc-900 mt-4 space-y-2 px-3">
                  <Link
                    href="/admin/dashboard"
                    onClick={() => setIsOpen(false)}
                    className="block text-center px-4 py-2 border border-[#007BFF]/40 text-[#007BFF] rounded-md font-semibold bg-[#007BFF]/5 hover:bg-[#007BFF]/10 transition-all text-sm"
                  >
                    Admin Dashboard
                  </Link>
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      handleLogout();
                    }}
                    className="block w-full text-center px-4 py-2 border border-red-500/40 text-red-400 rounded-md font-semibold bg-red-500/5 hover:bg-red-500/10 transition-all text-sm cursor-pointer"
                  >
                    Logout Admin
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
