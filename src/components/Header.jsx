import React from 'react';
import { motion } from 'framer-motion';

const Header = ({ darkMode, toggleDarkMode }) => {
  return (
    <header className="h-16 bg-neutral-900/96 border-b border-white/6 flex items-center justify-between px-7 sticky top-0 z-10">
      <div>
        <h1 className="font-street-script text-4xl font-semibold text-white leading-none">StyleMate AI</h1>
        <p className="text-[11px] text-white/50 tracking-[0.18em] uppercase mt-1">Your Personal AI Fashion Stylist</p>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative hidden lg:block">
          <input
            type="text"
            placeholder="Search your styles..."
            className="bg-white/5 border border-white/8 rounded-lg py-2.5 px-4 w-72 text-sm text-white placeholder-white/35 focus:ring-1 focus:ring-primary-400/30 transition-all outline-none"
          />
        </div>

        <div className="flex items-center gap-3 border-l border-white/8 pl-4 ml-1">
          <button
            onClick={toggleDarkMode}
            className="px-3 py-2 rounded-lg text-xs font-semibold uppercase tracking-[0.22em] text-white/75 bg-white/5 hover:bg-white/10 transition-colors"
          >
            Theme
          </button>
          <button className="px-3 py-2 rounded-lg text-xs font-semibold uppercase tracking-[0.22em] text-white/75 bg-white/5 hover:bg-white/10 transition-colors">
            Saved
          </button>
          <div className="flex items-center gap-3 border-l border-white/8 pl-4 ml-1">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-semibold text-white">Dakshata</p>
              <p className="text-xs text-white/55">Gold Member</p>
            </div>
            <motion.div
              whileHover={{ scale: 1.03 }}
              className="h-10 w-10 rounded-lg bg-white/8 border border-white/8 flex items-center justify-center overflow-hidden cursor-pointer"
            >
              <img
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=60"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
