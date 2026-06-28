import React from 'react';
import { Bell, Search, Moon, Sun } from 'lucide-react';
import { motion } from 'framer-motion';

const Header = ({ darkMode, toggleDarkMode }) => {
  return (
    <header className="h-20 bg-white/85 dark:bg-neutral-900/85 backdrop-blur-md border-b border-neutral-200 dark:border-neutral-700 flex items-center justify-between px-8 sticky top-0 z-10">
      <div>
        <h1 className="text-lg font-semibold text-neutral-900 dark:text-white tracking-tight">StyleMate AI</h1>
        <p className="text-xs text-neutral-500 dark:text-neutral-400 tracking-wide">Your Personal AI Fashion Stylist</p>
      </div>

      <div className="flex items-center gap-6">
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500 dark:text-neutral-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search your styles..."
            className="bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-none py-2.5 pl-10 pr-4 w-64 text-sm text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-500 focus:ring-1 focus:ring-primary-300 dark:focus:ring-primary-500 transition-all outline-none"
          />
        </div>

        <motion.button
          whileHover={{ scale: 1.1 }}
          className="relative p-2.5 text-neutral-500 dark:text-neutral-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors rounded-none hover:bg-neutral-100 dark:hover:bg-neutral-800"
        >
          <Bell size={22} />
          <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-primary-500 rounded-none border-2 border-white dark:border-neutral-900"></span>
        </motion.button>

        <div className="flex items-center gap-3 border-l border-neutral-200 dark:border-neutral-700 pl-6 ml-2">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-semibold text-neutral-900 dark:text-white">Dakshata</p>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">Gold Member</p>
          </div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="h-10 w-10 rounded-none bg-primary-100 dark:bg-primary-900/30 border border-primary-200 dark:border-primary-800 flex items-center justify-center overflow-hidden cursor-pointer shadow-sm"
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
