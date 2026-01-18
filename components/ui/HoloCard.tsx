'use client';
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { MouseEvent } from "react";
import { cn } from "@/lib/utils";

interface HoloCardProps {
  title: string;
  description: string;
  icon?: React.ComponentType<{ size?: number }>;
  className?: string;
}

export const HoloCard = ({ title, description, icon: Icon, className }: HoloCardProps) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div
      className={cn(
        "group relative border border-white/10 bg-gray-900/50 px-8 py-10 overflow-hidden rounded-xl",
        className
      )}
      onMouseMove={handleMouseMove}
    >
      {/* Efek Spotlight Mengikuti Mouse */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(14, 165, 233, 0.15),
              transparent 80%
            )
          `,
        }}
      />
      
      {/* Konten Kartu */}
      <div className="relative h-full flex flex-col z-10">
        <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-lg bg-white/5 border border-white/10 text-cyan-400">
            {Icon && <Icon size={24} />}
        </div>
        <h3 className="mb-2 text-xl font-bold text-white tracking-tight">{title}</h3>
        <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
      </div>
    </div>
  );
};