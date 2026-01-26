import React from 'react';
import Navbar from '@/components/Navbar';

export default function Home() {
  return (
    <main className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-zinc-50">
      <Navbar />

      {/* Background - Light Rays */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden">
        {/* Soft center glow */}
        <div className="absolute h-[500px] w-[500px] bg-gradient-to-r from-blue-100/40 to-teal-100/40 blur-[100px] rounded-full animate-pulse opacity-60" />

        {/* Rays Container - Rotates slowly */}
        <div className="absolute inset-0 animate-spin-slow opacity-30">
          {/* Creating multiple rays using conical gradients and masks is complex in pure css, 
              simpler approach: large radial gradients or rotated divs */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200vw] h-[200vw]">
            <div className="absolute inset-0 bg-[conic-gradient(from_0deg,transparent_0deg,white_10deg,transparent_20deg,white_40deg,transparent_60deg,white_80deg,transparent_90deg)] opacity-40 mix-blend-overlay" />
            <div className="absolute inset-0 bg-[conic-gradient(from_180deg,transparent_0deg,white_15deg,transparent_30deg,white_45deg,transparent_70deg,white_85deg,transparent_100deg)] opacity-30 mix-blend-overlay rotate-12" />
          </div>
        </div>

        {/* Secondary texture/grain (optional, skipping for clean look requests) */}
      </div>

      {/* Content - Centered */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 max-w-4xl mx-auto space-y-8">

        {/* Main Title - Paceforge */}
        <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter text-zinc-900 drop-shadow-sm select-none">
          Paceforge
        </h1>

        {/* Description */}
        <p className="text-lg md:text-xl text-zinc-500 font-medium max-w-2xl leading-relaxed">
          Paceforge is a study-urgency system that helps college students stay consistent by turning vague goals into daily, time-bound action.
        </p>

      </div>
    </main>
  );
}
