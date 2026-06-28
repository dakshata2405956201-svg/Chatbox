import React from 'react';
import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';
import { quickActions } from '../data/mockResponses';

const SuggestionCards = ({ onSelect }) => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 w-full mt-8">
      {quickActions.map((action, index) => {
        const Icon = Icons[action.icon];
        return (
          <motion.button
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index }}
            whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(255, 63, 108, 0.1)' }}
            onClick={() => onSelect(action.title)}
            className="p-6 bg-white border border-gray-100 rounded-2xl text-left hover:border-primary/20 transition-all group shadow-[0_8px_24px_rgba(15,23,42,0.03)]"
          >
            <div className="w-10 h-10 bg-lightGray rounded-2xl flex items-center justify-center mb-4 group-hover:bg-primary transition-colors">
              <Icon size={20} className="text-primary group-hover:text-white transition-colors" />
            </div>
            <h3 className="font-semibold text-textPrimary text-sm lg:text-base">{action.title}</h3>
            <p className="text-xs text-textSecondary mt-1">AI-suggested curation</p>
          </motion.button>
        );
      })}
    </div>
  );
};

export default SuggestionCards;
