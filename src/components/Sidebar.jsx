import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const MIN_WIDTH = 220;
const MAX_WIDTH = 360;

const Sidebar = ({ darkMode, width, onWidthChange }) => {
  const dragStateRef = useRef({ startX: 0, startWidth: width, dragging: false });

  useEffect(() => {
    const handleMouseMove = (event) => {
      if (!dragStateRef.current.dragging) return;

      const nextWidth = Math.min(
        MAX_WIDTH,
        Math.max(MIN_WIDTH, dragStateRef.current.startWidth + (event.clientX - dragStateRef.current.startX))
      );

      onWidthChange(nextWidth);
    };

    const handleMouseUp = () => {
      dragStateRef.current.dragging = false;
      document.body.style.userSelect = '';
      document.body.style.cursor = '';
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [onWidthChange]);

  const startResize = (event) => {
    dragStateRef.current = {
      startX: event.clientX,
      startWidth: width,
      dragging: true,
    };

    document.body.style.userSelect = 'none';
    document.body.style.cursor = 'col-resize';
  };

  const navItems = [
    { label: 'Saved Looks' },
    { label: 'Style History' },
    { label: 'Style Profile' },
    { label: 'Settings' },
  ];

  return (
    <div
      className="h-screen glass-panel-strong flex flex-col fixed left-0 top-0 z-20 overflow-hidden"
      style={{ width: `${width}px` }}
    >
      <div className="px-5 py-4 flex items-center border-b border-white/5">
        <div className="min-w-0">
          <span className="block text-[10px] uppercase tracking-[0.34em] text-white/45">Fashion AI</span>
          <span className="block mt-1 text-sm font-semibold tracking-[0.08em] text-white">Workspace</span>
        </div>
      </div>

      <div className="px-4 pt-4">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full bg-primary-500 text-white py-3 rounded-none flex items-center justify-center font-semibold shadow-[0_10px_24px_rgba(244,114,182,0.25)] hover:bg-primary-400 transition-all"
        >
          <span>New Chat</span>
        </motion.button>
      </div>

      <nav className="flex-1 px-4 mt-8 space-y-2">
        <div className="text-[10px] font-semibold text-white/40 uppercase tracking-[0.3em] mb-3 px-2">Menu</div>

        <button className="w-full flex items-center gap-3 px-3.5 py-2.5 text-white bg-primary-500/18 rounded-none font-medium transition-all text-left min-w-0 border border-primary-500/15 shadow-[0_8px_20px_rgba(0,0,0,0.12)]">
          <span>Assistant</span>
        </button>

        {navItems.map((item, index) => (
          <motion.button
            key={index}
            whileHover={{ x: 4, backgroundColor: darkMode ? 'rgba(64,64,64,0.4)' : 'rgba(255,255,255,0.4)' }}
            className="w-full flex items-center gap-3 px-3.5 py-2.5 text-white/65 hover:text-white rounded-none font-medium transition-all text-left min-w-0 hover:bg-white/4"
          >
            <span className="break-words whitespace-normal">{item.label}</span>
          </motion.button>
        ))}

        <div className="mt-5 rounded-none glass-panel-subtle p-4 border border-white/5">
          <div className="text-[10px] uppercase tracking-[0.34em] text-primary-400 font-semibold">StyleMate Pro</div>
          <div className="mt-3 text-sm font-semibold text-white leading-6 max-w-full break-words whitespace-normal">Unlock limitless style possibilities</div>
          <ul className="mt-3 space-y-2 text-xs text-white/55">
            <li>Personalized styling</li>
            <li>Early access to trends</li>
            <li>Unlimited chats</li>
          </ul>
          <button className="mt-4 w-full rounded-none bg-neutral-950 py-3 text-xs font-semibold uppercase tracking-[0.26em] text-white transition-all hover:bg-neutral-900 border border-white/5">
            Upgrade Now
          </button>
        </div>
      </nav>

      <div className="p-4 border-t border-white/5">
        <div className="rounded-none glass-panel-subtle p-3 flex items-center gap-3 border border-white/5">
          <div className="h-11 w-11 rounded-none overflow-hidden border border-white/5">
            <img
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=60"
              alt="Profile"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="flex-1 text-left">
            <div className="text-sm font-semibold text-white">Dakshata</div>
            <div className="text-xs text-white/55 break-words whitespace-normal">View Profile</div>
          </div>
          <span className="text-white/45 text-xs uppercase tracking-[0.24em]">Open</span>
        </div>
      </div>

      <button
        type="button"
        aria-label="Resize sidebar"
        onMouseDown={startResize}
        className="absolute top-0 right-0 h-full w-2 cursor-col-resize bg-transparent hover:bg-primary-500/10 transition-colors"
      />
    </div>
  );
};

export default Sidebar;
