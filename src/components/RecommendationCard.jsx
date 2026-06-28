import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Star } from 'lucide-react';

const RecommendationCard = ({ item, onToggleShortlist, isShortlisted }) => {
  const [selectedSize, setSelectedSize] = useState(item.sizes?.[0]);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="bg-white dark:bg-neutral-800 rounded-none border border-neutral-200 dark:border-neutral-700 overflow-hidden shadow-soft hover:shadow-medium transition-all group"
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
          <div className="absolute top-3 left-3 bg-primary-500 text-white px-3 py-1 rounded-none text-xs font-bold shadow-md">
            {item.discount}
          </div>
        )}

        {/* AI Styled Pick Badge */}
        {item.badge && item.badge.includes('AI Styled') && (
          <div className="absolute top-3 right-3 bg-gradient-to-br from-primary-500 to-primary-600 text-white px-3 py-1 rounded-none text-xs font-bold shadow-md flex items-center gap-1">
            <Star className="w-3 h-3 fill-current" />
            {item.badge}
          </div>
        )}

        {/* Other Badges */}
        {item.badge && !item.badge.includes('AI Styled') && (
          <div className="absolute top-3 right-3 bg-neutral-900 dark:bg-neutral-700 text-white px-3 py-1 rounded-none text-xs font-bold shadow-md">
            {item.badge}
          </div>
        )}

        {/* Quick View Overlay */}
        <div className={`absolute inset-0 bg-black/30 flex items-end justify-center pb-4 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
          <button className="bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white px-6 py-2 rounded-none text-sm font-semibold shadow-lg hover:bg-primary-50 dark:hover:bg-primary-500 hover:text-primary-600 dark:hover:text-white transition-all transform hover:scale-105">
            Quick View
          </button>
        </div>

        {/* Wishlist Button */}
        <button
          onClick={() => onToggleShortlist && onToggleShortlist(item)}
          className={`absolute top-3 right-3 w-10 h-10 rounded-none flex items-center justify-center transition-all duration-200 shadow-md ${
            isShortlisted
              ? 'bg-primary-500 text-white'
              : 'bg-white dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-primary-50 dark:hover:bg-neutral-700'
          }`}
        >
          <Heart
            className={`w-5 h-5 transition-transform duration-200 ${isShortlisted ? 'fill-current scale-110' : ''}`}
          />
        </button>
      </div>

      <div className="p-4">
        {/* Product Name */}
        <h4 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 mb-1 line-clamp-2">
          {item.name}
        </h4>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-2">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-3.5 h-3.5 ${
                  i < Math.floor(item.rating)
                    ? 'text-yellow-400 fill-yellow-400'
                    : 'text-neutral-300 dark:text-neutral-600'
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-neutral-500 dark:text-neutral-400 font-medium ml-1">
            {item.rating}
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-lg font-bold text-neutral-900 dark:text-neutral-100">
            {item.price}
          </span>
          {item.originalPrice && (
            <span className="text-sm text-neutral-400 dark:text-neutral-500 line-through">
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
                  className={`flex-shrink-0 w-10 h-10 rounded-none text-xs font-bold transition-all border ${
                    selectedSize === size
                      ? 'bg-primary-500 text-white border-primary-500 shadow-md'
                      : 'bg-neutral-100 dark:bg-neutral-700 border-neutral-200 dark:border-neutral-600 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-600'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Add to Cart Button */}
        <button className="w-full bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 py-3 rounded-none text-sm font-bold hover:bg-primary-500 dark:hover:bg-primary-500 dark:hover:text-white transition-all flex items-center justify-center gap-2 border border-neutral-900 dark:border-white">
          Add to Bag
        </button>
      </div>
    </motion.div>
  );
};

export default RecommendationCard;
