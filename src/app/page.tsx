import React from 'react';
import Navbar from '@/components/Navbar';

export default function Home() {
  return (
    <main className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-zinc-50">
      <Navbar />

      {/* Background - Cinematic Image */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 z-0">
          {/* Using standard img tag for simplicity in styling absolute, or Next.js Image if imported. 
               Using div with background-image is also fine but Next.js Image is better for optimization.
               Since I cannot import Image component easily without adding import, I will use a standard img tag with object-cover 
               OR purely CSS if I want to avoid imports. But Next.js Image is best. 
               I need to add the import first? No, I can use a replacement chunk that includes the import if needed, 
               but here I am replacing the *body* of the component.
               Wait, I need to check imports.
           */}
          <img
            src="/background.png"
            alt="Golden hour window background"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Overlay for text readability - Warm/Dark gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/20 z-1 mix-blend-multiply" />
        <div className="absolute inset-0 bg-amber-900/10 z-1 mix-blend-overlay" />
      </div>

      {/* Content - Centered */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 max-w-4xl mx-auto space-y-8 mt-20">

        {/* Main Title - Paceforge */}
        <h1 className="text-7xl md:text-9xl lg:text-[12rem] font-serif font-black tracking-tight text-amber-50 drop-shadow-2xl select-none">
          Paceforge
        </h1>

        {/* Description */}
        <p className="text-lg md:text-xl text-amber-100/90 font-serif font-medium max-w-2xl leading-relaxed drop-shadow-lg text-shadow-sm">
          Paceforge is a study-urgency system that helps college students stay consistent by turning vague goals into daily, time-bound action.
        </p>

      </div>
    </main>
  );
}
