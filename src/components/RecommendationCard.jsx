import React, { useState } from 'react';
import { motion } from 'framer-motion';

const RecommendationCard = ({ item, onToggleShortlist, isShortlisted }) => {
  const [selectedSize, setSelectedSize] = useState(item.sizes?.[0]);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="bg-slate-900/95 rounded-lg border border-white/6 overflow-hidden shadow-[0_16px_32px_rgba(0,0,0,0.22)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.28)] transition-all group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-[3/4] overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />

        {/* Discount Badge */}
        {item.discount && (
          <div className="absolute top-3 left-3 bg-primary-500 text-white px-3 py-1 rounded-lg text-xs font-bold shadow-[0_10px_24px_rgba(244,114,182,0.25)]">
            {item.discount}
          </div>
        )}

        {/* AI Styled Pick Badge */}
        {item.badge && item.badge.includes('AI Styled') && (
          <div className="absolute top-3 right-3 bg-primary-500 text-white px-3 py-1 rounded-lg text-xs font-bold shadow-[0_10px_24px_rgba(244,114,182,0.25)]">
            {item.badge}
          </div>
        )}

        {/* Other Badges */}
        {item.badge && !item.badge.includes('AI Styled') && (
          <div className="absolute top-3 right-3 bg-white/8 text-white px-3 py-1 rounded-lg text-xs font-bold border border-white/6">
            {item.badge}
          </div>
        )}

        {/* Quick View Overlay */}
        <div className={`absolute inset-0 bg-black/30 flex items-end justify-center pb-4 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
          <button className="bg-slate-950 text-white px-6 py-2 rounded-lg text-sm font-semibold border border-white/8 hover:bg-slate-900 transition-all transform hover:scale-105">
            Quick View
          </button>
        </div>

        {/* Wishlist Button */}
        <button
          onClick={() => onToggleShortlist && onToggleShortlist(item)}
          className={`absolute bottom-3 right-3 px-3 py-2 rounded-lg flex items-center justify-center transition-all duration-200 text-xs font-semibold uppercase tracking-[0.14em] ${
            isShortlisted
              ? 'bg-primary-500 text-white shadow-[0_10px_24px_rgba(244,114,182,0.25)]'
              : 'bg-white/8 text-white/75 border border-white/8 hover:bg-white/12'
          }`}
        >
          {isShortlisted ? 'Saved' : 'Save'}
        </button>
      </div>

      <div className="p-4">
        {/* Product Name */}
        <h4 className="text-sm font-semibold text-white mb-1 line-clamp-2">
          {item.name}
        </h4>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-2">
          <span className="text-xs font-medium text-white/55">
            Rating {item.rating}
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-lg font-bold text-white">
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
          <div className="mb-3">
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              {item.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`flex-shrink-0 w-10 h-10 rounded-lg text-xs font-bold transition-all border ${
                    selectedSize === size
                      ? 'bg-primary-500 text-white border-primary-400/20 shadow-[0_10px_24px_rgba(244,114,182,0.25)]'
                      : 'bg-white/5 border-white/8 text-white/70 hover:bg-white/10'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Add to Cart Button */}
        <button className="w-full bg-white/8 text-white py-3 rounded-lg text-sm font-semibold hover:bg-white/12 transition-all border border-white/8">
          Add to Bag
        </button>
      </div>
    </motion.div>
  );
};

export default RecommendationCard;
