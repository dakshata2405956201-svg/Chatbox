import React from 'react';
import { Bell, Search } from 'lucide-react';
import { motion } from 'framer-motion';

const Header = () => {
  return (
    <header className="h-20 bg-white/85 backdrop-blur-md border-b border-gray-100 flex items-center justify-between px-8 sticky top-0 z-10">
      <div>
        <h1 className="text-lg font-semibold text-textPrimary tracking-tight">StyleMate AI</h1>
        <p className="text-xs text-textSecondary tracking-wide">Your Personal AI Fashion Stylist</p>
      </div>

      <div className="flex items-center gap-6">
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-textSecondary w-4 h-4" />
          <input 
            type="text" 
            placeholder="Search your styles..." 
            className="bg-lightGray border border-gray-200 rounded-md py-2.5 pl-10 pr-4 w-64 text-sm focus:ring-1 focus:ring-primary/30 transition-all outline-none"
          />
        </div>

        <motion.button 
          whileHover={{ scale: 1.1 }}
          className="relative p-2.5 text-textSecondary hover:text-primary transition-colors rounded-md hover:bg-lightGray"
        >
          <Bell size={22} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full border-2 border-white"></span>
        </motion.button>

        <div className="flex items-center gap-3 border-l border-gray-100 pl-6 ml-2">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-semibold text-textPrimary">Dakshata</p>
            <p className="text-[10px] text-textSecondary">Gold Member</p>
          </div>
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="w-10 h-10 rounded-md bg-secondary border border-primary/15 flex items-center justify-center overflow-hidden cursor-pointer shadow-sm"
          >
            <img 
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=60" 
              alt="Profile" 
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>
      </div>
    </header>
  );
};

export default Header;
