import React from 'react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="contact" className="py-12 px-6 border-t border-white/10 bg-black text-center relative z-10">
      <div className="max-w-4xl mx-auto">
         <h2 className="text-2xl font-bold mb-6 tracking-tight">
            HIMATIKA <span className="text-cyan-500">UNU YOGYAKARTA</span>
         </h2>
         
         <div className="flex justify-center gap-8 mb-8 text-neutral-400 text-sm font-medium">
           <a href="#" className="hover:text-white transition-colors hover:underline decoration-cyan-500 underline-offset-4">Instagram</a>
           <a href="#" className="hover:text-white transition-colors hover:underline decoration-cyan-500 underline-offset-4">LinkedIn</a>
           <a href="#" className="hover:text-white transition-colors hover:underline decoration-cyan-500 underline-offset-4">GitHub</a>
           <a href="#" className="hover:text-white transition-colors hover:underline decoration-cyan-500 underline-offset-4">Email</a>
         </div>
         
         <p className="text-neutral-600 text-xs font-mono">
           &copy; {currentYear} Dept. Kominfo HIMATIKA. Built with Next.js 14 & Three.js.
         </p>
      </div>
    </footer>
  );
}