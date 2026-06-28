import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import ChatBox from '../components/ChatBox';
import { motion } from 'framer-motion';

/* Floating ambient blobs behind everything */
const AmbientBlobs = ({ darkMode }) => (
  <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
    <motion.div
      animate={{ x: [0, 60, -40, 0], y: [0, -50, 30, 0], scale: [1, 1.15, 0.95, 1] }}
      transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
      className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-none"
      style={{
        background: darkMode
          ? 'radial-gradient(circle, rgba(255, 63, 108, 0.15) 0%, transparent 70%)'
          : 'radial-gradient(circle, rgba(255, 63, 108, 0.12) 0%, transparent 70%)'
      }}
    />
    <motion.div
      animate={{ x: [0, -50, 40, 0], y: [0, 40, -60, 0], scale: [1, 0.9, 1.1, 1] }}
      transition={{ duration: 26, repeat: Infinity, ease: 'easeInOut' }}
      className="absolute top-1/3 -right-40 w-[600px] h-[600px] rounded-none"
      style={{
        background: darkMode
          ? 'radial-gradient(circle, rgba(168, 130, 255, 0.12) 0%, transparent 70%)'
          : 'radial-gradient(circle, rgba(168, 130, 255, 0.10) 0%, transparent 70%)'
      }}
    />
    <motion.div
      animate={{ x: [0, 30, -30, 0], y: [0, -30, 50, 0], scale: [1, 1.1, 0.95, 1] }}
      transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
      className="absolute -bottom-40 left-1/3 w-[450px] h-[450px] rounded-none"
      style={{
        background: darkMode
          ? 'radial-gradient(circle, rgba(255, 200, 100, 0.12) 0%, transparent 70%)'
          : 'radial-gradient(circle, rgba(255, 200, 100, 0.10) 0%, transparent 70%)'
      }}
    />
  </div>
);

const Home = () => {
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('darkMode');
      return saved ? JSON.parse(saved) : false;
    }
    return false;
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      document.body.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('dark');
    }
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <div className={`flex min-h-screen relative transition-colors duration-300 ${darkMode ? 'dark' : ''}`}>
      <AmbientBlobs darkMode={darkMode} />
      <Sidebar darkMode={darkMode} />
      <main className="flex-1 flex min-h-screen relative z-10 ml-64">
        <div className="flex-1 flex flex-col min-w-0">
          <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
          <div className="flex-1 overflow-hidden">
            <ChatBox darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
