'use client';

export default function TechBackground() {
  return (
    <div className="fixed inset-0 z-[-1] h-full w-full bg-black">
      {/* Grid Dasar */}
      <div className="absolute h-full w-full bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      
      {/* Efek Cahaya Atas (Spotlight) */}
      <div className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-b from-blue-500/10 via-purple-500/5 to-transparent blur-3xl opacity-40" />
    </div>
  );
}