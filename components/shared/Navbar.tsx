'use client';

import React from 'react';

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-6 pointer-events-none">
      <div className="pointer-events-auto bg-black/50 backdrop-blur-md border border-white/10 px-6 py-3 rounded-full flex items-center gap-6 shadow-2xl transition-all duration-300 hover:border-cyan-500/30">
        <span className="font-bold text-lg tracking-tight cursor-pointer hover:text-cyan-400 transition-colors">
          HIMATIKA<span className="text-cyan-500">.</span>
        </span>
        
        <div className="h-4 w-[1px] bg-white/20 hidden md:block" />
        
        <div className="hidden md:flex gap-6 text-sm font-medium text-neutral-400">
          <a href="#about" className="hover:text-white transition-colors hover:scale-105 transform">Tentang</a>
          <a href="#proker" className="hover:text-white transition-colors hover:scale-105 transform">Program</a>
          <a href="#contact" className="hover:text-white transition-colors hover:scale-105 transform">Kontak</a>
        </div>
        
        <button className="bg-white text-black text-xs font-bold px-4 py-2 rounded-full hover:bg-cyan-500 hover:text-white transition-all active:scale-95">
          Join Us
        </button>
      </div>
    </nav>
  );
}