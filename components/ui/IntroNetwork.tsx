'use client';

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

interface IntroNetworkProps {
  onStart: () => void;
}

const IntroNetwork: React.FC<IntroNetworkProps> = ({ onStart }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onStart();
    }, 3000); // 3 seconds delay

    return () => clearTimeout(timer);
  }, [onStart]);

  return (
    <div className="w-full h-full flex items-center justify-center bg-black">
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="w-16 h-16 mx-auto mb-4 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
          <h1 className="text-2xl md:text-4xl font-bold text-cyan-400 mb-2">HIMATIKA</h1>
          <p className="text-neutral-400 text-sm md:text-lg">Initializing System...</p>
        </motion.div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="text-neutral-500 text-xs tracking-[0.4em] animate-pulse"
        >
          ESTABLISHING CONNECTION...
        </motion.p>
      </div>
    </div>
  );
};

export { IntroNetwork };
