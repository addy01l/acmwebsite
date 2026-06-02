'use client';

import React from 'react';
import HeroSection from '@/components/home/HeroSection';
import StatsOverview from '@/components/home/StatsOverview';
import FeaturedHighlight from '@/components/home/FeaturedHighlight';
import CallToAction from '@/components/home/CallToAction';

export default function HomePage() {
  return (
    <div className="relative overflow-hidden w-full">
      {/* Background radial highlight */}
      <div className="absolute top-[10%] left-[50%] -translate-x-[50%] w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle_at_center,rgba(0,123,255,0.08)_0%,transparent_70%)] blur-[80px] pointer-events-none -z-10" />

      {/* Hero Section */}
      <HeroSection />

      {/* Statistics Section */}
      <StatsOverview />

      {/* Featured Upcoming Event Showcase */}
      <FeaturedHighlight />

      {/* Call To Action */}
      <CallToAction />
    </div>
  );
}
