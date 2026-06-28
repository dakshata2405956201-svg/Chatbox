import React from 'react';
import { motion } from 'framer-motion';

const TypingIndicator = () => {
  return (
    <div className="flex gap-3.5 w-full justify-start">
      <div className="w-10 h-10 rounded-none bg-gradient-to-br from-primary-500 to-primary-600 text-white flex-shrink-0 flex items-center justify-center mt-1 text-xs font-bold select-none shadow-md border border-primary-600">
        AI
      </div>
      <div className="flex items-center gap-3 px-5 py-3.5 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-none w-fit shadow-soft">
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
              className="w-1.5 h-1.5 bg-primary-500 rounded-none"
            />
          ))}
        </div>
        <span className="text-xs text-neutral-500 dark:text-neutral-400 font-medium">StyleMate is styling...</span>
      </div>
    </div>
  );
};

export default TypingIndicator;
