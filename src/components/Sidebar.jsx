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

const Sidebar = () => {
  const navItems = [
    { label: 'Saved Looks' },
    { label: 'Style History' },
    { label: 'Style Profile' },
    { label: 'Settings' },
  ];

  return (
    <div className="w-64 h-screen glass-panel-strong flex flex-col fixed left-0 top-0 z-20">
      <div className="p-6 flex items-center">
        <div>
          <span className="block text-[11px] uppercase tracking-[0.28em] text-textSecondary">Fashion AI</span>
          <span className="text-xl font-semibold tracking-tight text-textPrimary">StyleMate <span className="text-primary">AI</span></span>
        </div>
      </div>

      <div className="px-4 mt-4">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full bg-primary text-white py-3 rounded-xl flex items-center justify-center font-medium shadow-md shadow-primary/20 hover:bg-opacity-90 transition-all"
        >
          <span>New Chat</span>
        </motion.button>
      </div>

      <nav className="flex-1 px-4 mt-8 space-y-2">
        <div className="text-xs font-semibold text-textSecondary uppercase tracking-wider mb-4 px-2">Menu</div>
        
        <button className="w-full flex items-center gap-3 px-3 py-2.5 text-textPrimary bg-white/50 rounded-xl font-medium transition-all border border-white/40">
          <span>Assistant</span>
        </button>

        {navItems.map((item, index) => (
          <motion.button
            key={index}
            whileHover={{ x: 4, backgroundColor: 'rgba(255,255,255,0.4)' }}
            className="w-full flex items-center gap-3 px-3 py-2.5 text-textSecondary hover:text-textPrimary rounded-xl font-medium transition-all group"
          >
            <span>{item.label}</span>
          </motion.button>
        ))}

        <div className="mt-5 rounded-[24px] glass-panel-subtle p-4">
          <div className="text-[10px] uppercase tracking-[0.28em] text-primary font-semibold">StyleMate Pro</div>
          <div className="mt-3 text-sm font-semibold text-textPrimary leading-6 max-w-[180px]">Unlock limitless style possibilities</div>
          <ul className="mt-3 space-y-2 text-xs text-textSecondary">
            <li className="flex items-center gap-2">• Personalized styling</li>
            <li className="flex items-center gap-2">• Early access to trends</li>
            <li className="flex items-center gap-2">• Unlimited chats</li>
          </ul>
          <button className="mt-4 w-full rounded-xl bg-[#111111] py-3 text-xs font-semibold uppercase tracking-[0.26em] text-white transition-all hover:bg-black">
            Upgrade Now
          </button>
        </div>
      </nav>

      <div className="p-4 border-t border-white/20">
        <div className="rounded-[18px] glass-panel-subtle p-3 flex items-center gap-3">
          <div className="h-11 w-11 rounded-2xl overflow-hidden border border-white/40">
            <img
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=60"
              alt="Dakshata"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="flex-1 text-left">
            <div className="text-sm font-semibold text-textPrimary">Dakshata</div>
            <div className="text-xs text-textSecondary">View Profile</div>
          </div>
          <ChevronDown size={16} className="text-textSecondary" />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
