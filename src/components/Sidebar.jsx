import React from 'react';
import {
  Plus,
  Heart,
  History,
  User,
  Settings,
  MessageSquare,
  Sparkles,
  Check,
  ChevronDown
} from 'lucide-react';
import { motion } from 'framer-motion';

const Sidebar = ({ darkMode }) => {
  const navItems = [
    { label: 'Saved Looks' },
    { label: 'Style History' },
    { label: 'Style Profile' },
    { label: 'Settings' },
  ];

  return (
    <div className="w-64 h-screen glass-panel-strong flex flex-col fixed left-0 top-0 z-20 border-r border-neutral-200 dark:border-neutral-700">
      <div className="p-6 flex items-center border-b border-neutral-200 dark:border-neutral-700">
        <div>
          <span className="block text-[11px] uppercase tracking-[0.28em] text-neutral-500 dark:text-neutral-400">Fashion AI</span>
          <span className="text-xl font-semibold tracking-tight text-neutral-900 dark:text-white">StyleMate <span className="text-primary-500">AI</span></span>
        </div>
      </div>

      <div className="px-4 mt-4">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full bg-primary-500 text-white py-3 rounded-none flex items-center justify-center font-medium shadow-md shadow-primary-500/20 hover:bg-primary-600 transition-all border border-primary-600"
        >
          <span>New Chat</span>
        </motion.button>
      </div>

      <nav className="flex-1 px-4 mt-8 space-y-2">
        <div className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider mb-4 px-2">Menu</div>

        <button className="w-full flex items-center gap-3 px-3 py-2.5 text-neutral-900 dark:text-white bg-white/50 dark:bg-neutral-800/50 rounded-none font-medium transition-all border border-neutral-200 dark:border-neutral-700">
          <span>Assistant</span>
        </button>

        {navItems.map((item, index) => (
          <motion.button
            key={index}
            whileHover={{ x: 4, backgroundColor: darkMode ? 'rgba(64,64,64,0.4)' : 'rgba(255,255,255,0.4)' }}
            className="w-full flex items-center gap-3 px-3 py-2.5 text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white rounded-none font-medium transition-all"
          >
            <span>{item.label}</span>
          </motion.button>
        ))}

        <div className="mt-5 rounded-none glass-panel-subtle p-4 border border-neutral-200 dark:border-neutral-700">
          <div className="text-[10px] uppercase tracking-[0.28em] text-primary-500 font-semibold">StyleMate Pro</div>
          <div className="mt-3 text-sm font-semibold text-neutral-900 dark:text-white leading-6 max-w-[180px]">Unlock limitless style possibilities</div>
          <ul className="mt-3 space-y-2 text-xs text-neutral-500 dark:text-neutral-400">
            <li className="flex items-center gap-2">• Personalized styling</li>
            <li className="flex items-center gap-2">• Early access to trends</li>
            <li className="flex items-center gap-2">• Unlimited chats</li>
          </ul>
          <button className="mt-4 w-full rounded-none bg-neutral-900 dark:bg-white py-3 text-xs font-semibold uppercase tracking-[0.26em] text-white dark:text-neutral-900 transition-all hover:bg-black dark:hover:bg-neutral-100 border border-neutral-900 dark:border-white">
            Upgrade Now
          </button>
        </div>
      </nav>

      <div className="p-4 border-t border-white/20 dark:border-neutral-700">
        <div className="rounded-none glass-panel-subtle p-3 flex items-center gap-3 border border-neutral-200 dark:border-neutral-700">
          <div className="h-11 w-11 rounded-none overflow-hidden border border-neutral-200 dark:border-neutral-700">
            <img
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=60"
              alt="Profile"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="flex-1 text-left">
            <div className="text-sm font-semibold text-neutral-900 dark:text-white">Dakshata</div>
            <div className="text-xs text-neutral-500 dark:text-neutral-400">View Profile</div>
          </div>
          <ChevronDown size={16} className="text-neutral-500 dark:text-neutral-400" />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
