import React from 'react';
import Link from 'next/link';

export default function CallToAction() {
  return (
    <section className="py-20 text-center px-4 mb-10">
      <div className="max-w-4xl mx-auto glass-panel p-10 md:p-16 rounded-3xl border border-[#007BFF]/30 relative overflow-hidden animate-pulse-glow">
        <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4 uppercase tracking-wide">
          Ready to shape the <span className="text-[#007BFF] text-glow">Future?</span>
        </h2>
        <p className="text-zinc-400 text-xs md:text-sm max-w-lg mx-auto mb-8 leading-relaxed">
          Join the elite circle of student developers, researchers, and creators. Elevate your coding capabilities and network with industry experts.
        </p>
        <Link
          href="/membership"
          className="px-8 py-3 bg-[#007BFF] hover:bg-[#0069d9] text-white text-sm font-semibold rounded-lg shadow-[0_0_20px_rgba(0,123,255,0.4)] transition-all cursor-pointer inline-block transform hover:-translate-y-0.5"
        >
          Apply for Membership
        </Link>
      </div>
    </section>
  );
}
