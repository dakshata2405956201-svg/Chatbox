import React from 'react';
import { motion } from 'framer-motion';

const TypingIndicator = () => {
  return (
    <div className="flex gap-3.5 w-full justify-start">
      <div className="w-10 h-10 rounded-lg bg-primary-500 text-white flex-shrink-0 flex items-center justify-center mt-1 text-xs font-bold select-none shadow-[0_10px_24px_rgba(244,114,182,0.25)] border border-primary-400/20">
        AI
      </div>
      <div className="flex items-center gap-3 px-5 py-3.5 bg-slate-900/90 border border-white/6 rounded-lg w-fit shadow-[0_10px_24px_rgba(0,0,0,0.18)]">
        <div className="flex gap-1.5">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{ scale: [1, 1.3, 1], opacity: [0.4, 1, 0.4] }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeInOut"
              }}
              className="w-1.5 h-1.5 bg-primary-400 rounded-sm"
            />
          ))}
        </div>
        <span className="text-xs text-white/55 font-medium">StyleMate is styling...</span>
      </div>
    </div>
  );
};

export default TypingIndicator;
