'use client';

import React, { useEffect, useState } from 'react';

function StatCounter({ value, label }: { value: number; label: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = value;
    if (end === 0) return;
    
    const stepTime = Math.abs(Math.floor(1500 / end));
    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start >= end) {
        clearInterval(timer);
      }
    }, Math.max(stepTime, 20));

    return () => clearInterval(timer);
  }, [value]);

  return (
    <div className="glass-panel glass-panel-hover p-6 rounded-2xl text-center flex flex-col items-center justify-center min-w-[160px] animate-pulse-glow">
      <span className="text-3xl md:text-4xl font-extrabold text-[#007BFF] text-glow-strong">
        {count}+
      </span>
      <span className="text-zinc-400 text-xs md:text-sm mt-2 font-medium tracking-wide">
        {label}
      </span>
    </div>
  );
}

export default function StatsOverview() {
  return (
    <section className="py-16 max-w-7xl mx-auto px-4 md:px-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
        <StatCounter value={18} label="Members" />
        <StatCounter value={2} label="Hackathons" />
        <StatCounter value={9} label="Domains" />
        <StatCounter value={1} label="Years Active" />
      </div>
    </section>
  );
}
