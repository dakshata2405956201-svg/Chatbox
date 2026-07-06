import React, { useState } from 'react';
import { motion } from 'framer-motion';

const RecommendationCard = ({ item, onToggleShortlist, isShortlisted }) => {
  const [selectedSize, setSelectedSize] = useState(item.sizes?.[0]);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -6, transition: { duration: 0.3, ease: "easeOut" } }}
      className="bg-slate-900/95 rounded-none border border-white/10 overflow-hidden shadow-[0_8px_24px_rgba(0,0,0,0.18)] hover:shadow-[0_16px_40px_rgba(0,0,0,0.25)] transition-all duration-300 group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-[3/4] overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover transition-transform duration-800 group-hover:scale-112"
          loading="lazy"
        />

        {/* Discount Badge */}
        {item.discount && (
          <div className="absolute top-4 left-4 bg-gradient-to-br from-primary-500 to-primary-600 text-white px-3.5 py-1.5 rounded-none text-xs font-bold shadow-[0_6px_18px_rgba(244,114,182,0.3)]">
            {item.discount}
          </div>
        )}

        {/* AI Styled Pick Badge */}
        {item.badge && item.badge.includes('AI Styled') && (
          <div className="absolute top-4 right-4 bg-gradient-to-br from-primary-500 to-primary-600 text-white px-3.5 py-1.5 rounded-none text-xs font-bold shadow-[0_6px_18px_rgba(244,114,182,0.3)]">
            {item.badge}
          </div>
        )}

        {/* Other Badges */}
        {item.badge && !item.badge.includes('AI Styled') && (
          <div className="absolute top-4 right-4 bg-white/10 text-white px-3.5 py-1.5 rounded-none text-xs font-bold border border-white/15">
            {item.badge}
          </div>
        )}

        {/* Quick View Overlay */}
        <div className={`absolute inset-0 bg-black/35 flex items-end justify-center pb-5 transition-opacity duration-400 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
          <button className="bg-slate-950 text-white px-7 py-2.5 rounded-none text-sm font-semibold border border-white/15 hover:bg-slate-900 transition-all duration-200 transform hover:scale-105 shadow-[0_6px_16px_rgba(0,0,0,0.3)]">
            Quick View
          </button>
        </div>

        {/* Wishlist Button */}
        <button
          onClick={() => onToggleShortlist && onToggleShortlist(item)}
          className={`absolute bottom-4 right-4 px-3.5 py-2 rounded-none flex items-center justify-center transition-all duration-300 text-xs font-semibold uppercase tracking-[0.16em] ${
            isShortlisted
              ? 'bg-gradient-to-br from-primary-500 to-primary-600 text-white shadow-[0_6px_18px_rgba(244,114,182,0.3)]'
              : 'bg-white/10 text-white/70 border border-white/15 hover:bg-white/15'
          }`}
        >
          {isShortlisted ? 'Saved' : 'Save'}
        </button>
      </div>

      <div className="p-5">
        {/* Product Name */}
        <h4 className="text-sm sm:text-base font-semibold text-white mb-2 line-clamp-2 leading-relaxed">
          {item.name}
        </h4>

        {/* Rating */}
        <div className="flex items-center gap-1.5 mb-3">
          <span className="text-xs font-medium text-white/50">
            Rating {item.rating}
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2.5 mb-4">
          <span className="text-lg sm:text-xl font-bold text-white">
            {item.price}
          </span>
          {item.originalPrice && (
            <span className="text-sm text-white/35 line-through">
              {item.originalPrice}
            </span>
          )}
        </div>

        {/* Size Selector */}
        {item.sizes && item.sizes.length > 0 && (
          <div className="mb-4">
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              {item.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`flex-shrink-0 w-10 h-10 sm:w-11 sm:h-11 rounded-none text-xs sm:text-sm font-semibold transition-all duration-200 border ${
                    selectedSize === size
                      ? 'bg-gradient-to-br from-primary-500 to-primary-600 text-white border-primary-500/30 shadow-[0_6px_18px_rgba(244,114,182,0.25)]'
                      : 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Add to Cart Button */}
        <button className="w-full bg-gradient-to-br from-white/15 to-white/10 text-white py-3.5 rounded-none text-sm sm:text-base font-semibold hover:from-white/20 hover:to-white/15 transition-all duration-200 border border-white/12 hover:border-white/20 shadow-[0_2px_8px_rgba(0,0,0,0.1)]">
          Add to Bag
        </button>
      </div>
    </motion.div>
  );
};

export default RecommendationCard;
