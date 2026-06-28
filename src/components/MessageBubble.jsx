import React from 'react';
import { motion } from 'framer-motion';
import RecommendationCard from './RecommendationCard';

const MessageBubble = ({ message }) => {
  const isAI = message.role === 'ai';

  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className={`flex w-full ${isAI ? 'justify-start' : 'justify-end'}`}
    >
      <div className={`flex gap-3.5 w-full ${isAI ? 'flex-row' : 'flex-row-reverse'}`}>
        <div className={`w-8 h-8 rounded-2xl flex-shrink-0 flex items-center justify-center mt-1 text-[11px] font-bold select-none
          ${isAI ? 'bg-primary text-white shadow-sm' : 'bg-gray-150 text-gray-600 border border-gray-250 bg-gray-100'}`}
        >
          {isAI ? 'AI' : 'D'}
        </div>

        <div className="flex flex-col gap-3.5 flex-1 max-w-[calc(100%-2.75rem)]">
          <div 
            className={`px-5 py-4 rounded-2xl text-sm leading-relaxed shadow-[0_2px_8px_rgba(15,23,42,0.02)] w-fit
              ${isAI 
                ? 'bg-white border border-gray-100 text-textPrimary rounded-tl-md max-w-[85%] md:max-w-[70%]' 
                : 'bg-primary text-white rounded-tr-md ml-auto max-w-[85%] md:max-w-[70%]'}`}
          >
            {message.content}
          </div>

          {message.recommendations && (
            <motion.div 
              initial="hidden"
              animate="show"
              variants={{
                hidden: { opacity: 0 },
                show: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.1
                  }
                }
              }}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mt-1 w-full"
            >
              {message.recommendations.map((item, idx) => (
                <motion.div
                  key={idx}
                  variants={{
                    hidden: { opacity: 0, y: 15 },
                    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } }
                  }}
                >
                  <RecommendationCard item={item} />
                </motion.div>
              ))}
            </motion.div>
          )}

          {message.stylingTip && (
            <motion.div 
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-lightGray border border-gray-200 p-5 rounded-2xl text-sm text-textPrimary max-w-[85%] md:max-w-[70%] border-l-4 border-l-primary"
            >
              <span className="font-bold text-primary not-italic block mb-1 uppercase tracking-wider text-[11px]">Styling Tip</span>
              {message.stylingTip}
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default MessageBubble;
