import React from 'react';
import { motion } from 'framer-motion';

const TypingIndicator = () => {
  return (
    <div className="flex gap-3.5 w-full justify-start">
      <div className="w-8 h-8 rounded-2xl bg-primary text-white flex-shrink-0 flex items-center justify-center mt-1 text-[11px] font-bold select-none shadow-sm">
        AI
      </div>
      <div className="flex items-center gap-3 px-5 py-3.5 bg-white border border-gray-100 rounded-2xl rounded-tl-md w-fit shadow-[0_2px_8px_rgba(15,23,42,0.02)]">
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
              className="w-1.5 h-1.5 bg-primary rounded-full"
            />
          ))}
        </div>
        <span className="text-xs text-textSecondary font-medium">StyleMate is styling...</span>
      </div>
    </div>
  );
};

export default TypingIndicator;
