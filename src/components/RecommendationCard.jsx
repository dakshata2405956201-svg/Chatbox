import React from 'react';
import { motion } from 'framer-motion';
import { Heart, ShoppingBag, Star } from 'lucide-react';

const RecommendationCard = ({ item }) => {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-all group"
    >
      <div className="relative aspect-[3/4] overflow-hidden">
        <img 
          src={item.image} 
          alt={item.name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
          <button className="w-full bg-white text-textPrimary py-2 rounded-xl text-xs font-bold flex items-center justify-center hover:bg-primary hover:text-white transition-all">
            Quick View
          </button>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-1">
          <h4 className="text-sm font-semibold text-textPrimary truncate flex-1">{item.name}</h4>
          <div className="text-[10px] bg-green-50 text-green-700 px-2 py-1 rounded-xl leading-none font-bold">
            Rating: {item.rating}
          </div>
        </div>
        <p className="text-primary font-bold text-sm mb-3">{item.price}</p>
        
        <button className="w-full border border-gray-200 py-2 rounded-xl text-[10px] font-bold text-textSecondary hover:border-primary hover:text-primary transition-all tracking-wide">
          VIEW DETAILS
        </button>
      </div>
    </motion.div>
  );
};

export default RecommendationCard;
