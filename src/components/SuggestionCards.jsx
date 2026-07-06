import React from 'react';
import { motion } from 'framer-motion';
import { quickActions } from '../data/mockResponses';

const SuggestionCards = ({ onSelect }) => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 w-full mt-8">
      {quickActions.map((action, index) => {
        const badge = action.title
          .split(' ')
          .map((part) => part.charAt(0))
          .join('')
          .slice(0, 2)
          .toUpperCase();
        return (
          <motion.button
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index }}
            whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(255, 63, 108, 0.1)' }}
            onClick={() => onSelect(action.title)}
            className="p-6 bg-slate-900/95 border border-white/6 rounded-none text-left hover:bg-slate-800 transition-all group shadow-[0_8px_24px_rgba(0,0,0,0.2)]"
          >
            <div className="w-10 h-10 bg-primary-500/15 rounded-none flex items-center justify-center mb-4 text-[10px] font-bold tracking-[0.2em] text-primary-300 group-hover:bg-primary-500 group-hover:text-white transition-colors">
              {badge}
            </div>
            <h3 className="font-semibold text-white text-sm lg:text-base">{action.title}</h3>
            <p className="text-xs text-white/55 mt-1">AI-suggested curation</p>
          </motion.button>
        );
      })}
    </div>
  );
};

export default SuggestionCards;
