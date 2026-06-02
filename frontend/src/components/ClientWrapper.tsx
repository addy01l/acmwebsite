'use client';

import React, { useState, useEffect } from 'react';
import LoadingScreen from './LoadingScreen';
import Navbar from './Navbar';
import Footer from './Footer';
import ParticleBackground from './ParticleBackground';
import CursorGlow from './CursorGlow';
import WhatsAppButton from './WhatsAppButton';

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Hide native body scrollbar during loading screen
    if (loading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [loading]);

  return (
    <>
      {loading ? (
        <LoadingScreen onFinished={() => {
          setLoading(false);
          // Small delay before showing content to let fadeout complete
          setTimeout(() => setShowContent(true), 100);
        }} />
      ) : (
        <div className={`min-h-screen flex flex-col transition-opacity duration-700 ${showContent ? 'opacity-100' : 'opacity-0'}`}>
          <Navbar />
          <ParticleBackground />
          <CursorGlow />
          
          {/* Main content viewport */}
          <main className="flex-grow pt-16">
            {children}
          </main>
          
          <Footer />
          <WhatsAppButton />
        </div>
      )}
    </>
  );
}
