import React from 'react';
import { motion } from 'framer-motion';
import RecommendationCard from './RecommendationCard';

const MessageBubble = ({ message, onToggleShortlist, shortlistedItems, onFollowUp }) => {
  const isAI = message.role === 'ai';

  const formatTime = () => {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className={`flex w-full ${isAI ? 'justify-start' : 'justify-end'}`}
    >
      <div className={`flex gap-4 w-full ${isAI ? 'flex-row' : 'flex-row-reverse'}`}>
        {/* Avatar */}
        <div className={`w-11 h-11 rounded-none flex-shrink-0 flex items-center justify-center mt-1 text-xs font-semibold select-none shadow-lg border ${
          isAI
            ? 'bg-gradient-to-br from-primary-500 to-primary-600 text-white border-primary-600 shadow-[0_4px_14px_rgba(244,114,182,0.25)]'
            : 'bg-gradient-to-br from-neutral-200 to-neutral-300 dark:from-neutral-600 dark:to-neutral-700 text-neutral-700 dark:text-neutral-200 border-neutral-300 dark:border-neutral-600'
        }`}>
          {isAI ? 'AI' : 'U'}
        </div>

        <div className="flex flex-col gap-4 flex-1 max-w-[calc(100%-3.75rem)]">
          {/* Message Content */}
          <div className={`px-6 py-4 rounded-none text-sm sm:text-base leading-relaxed shadow-soft w-fit border ${
            isAI
              ? 'bg-white dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100 shadow-[0_4px_12px_rgba(0,0,0,0.08)]'
              : 'bg-gradient-to-br from-primary-500 to-primary-600 border-primary-600 text-white ml-auto shadow-[0_4px_12px_rgba(244,114,182,0.18)]'
          }`}>
            {message.content}
          </div>

          {/* Timestamp */}
          <div className={`text-xs text-neutral-400 dark:text-neutral-500 ${isAI ? '' : 'ml-auto'}`}>
            {formatTime()}
          </div>

          {/* Product Recommendations */}
          {message.recommendations && (
            <motion.div
              initial="hidden"
              animate="show"
              variants={{
                hidden: { opacity: 0 },
                show: {
                  opacity: 1,
                  transition: { staggerChildren: 0.12 }
                }
              }}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 w-full mt-2"
            >
              {message.recommendations.map((item, idx) => (
                <motion.div
                  key={item.id || idx}
                  variants={{
                    hidden: { opacity: 0, y: 18 },
                    show: {
                      opacity: 1,
                      y: 0,
                      transition: { type: 'spring', stiffness: 320, damping: 26 }
                    }
                  }}
                >
                  <RecommendationCard
                    item={item}
                    onToggleShortlist={onToggleShortlist}
                    isShortlisted={shortlistedItems.some(i => i.id === item.id)}
                  />
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Follow-up Suggestions */}
          {message.followUpSuggestions && message.followUpSuggestions.length > 0 && (
            <div className="flex flex-wrap gap-2.5 mt-2">
              {message.followUpSuggestions.map((suggestion, idx) => (
                <motion.button
                  key={idx}
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => onFollowUp && onFollowUp(suggestion)}
                  className="px-5 py-2.5 text-xs sm:text-sm font-semibold rounded-none bg-white/5 text-white/70 hover:bg-white/12 hover:text-white transition-all duration-300 border border-white/10"
                >
                  {suggestion}
                </motion.button>
              ))}
            </div>
          )}

          {/* Styling Tip */}
          {message.stylingTip && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.4 }}
              className="bg-white/4 border-l-4 border-l-primary-500 border border-white/6 p-5 rounded-none text-sm sm:text-base text-white/82"
            >
              <span className="font-bold text-primary-400 block mb-2 uppercase tracking-wider text-xs">
                Styling Tip
              </span>
              {message.stylingTip}
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default MessageBubble;
