import React from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import ChatBox from '../components/ChatBox';
import { motion } from 'framer-motion';

const quickActions = [
  { label: 'Wedding Outfit' },
  { label: 'Farewell Outfit' },
  { label: 'Interview Look' },
  { label: 'Party Wear' },
  { label: 'Casual Look' },
  { label: 'Festive Wear' },
];

const trendingLooks = [
  { title: 'Coquette Aesthetic', subtitle: 'Soft, feminine & dreamy' },
  { title: 'Old Money Style', subtitle: 'Timeless & sophisticated' },
  { title: 'Quiet Luxury', subtitle: 'Understated elegance' },
  { title: 'Y2K Revival', subtitle: 'Trendy & nostalgic' },
];

const savedLooks = [
  'Black Satin Evening',
  'Beige Office Edit',
  'Neutral Capsule',
];

/* Floating ambient blobs behind everything */
const AmbientBlobs = () => (
  <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
    <motion.div
      animate={{ x: [0, 60, -40, 0], y: [0, -50, 30, 0], scale: [1, 1.15, 0.95, 1] }}
      transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
      className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full"
      style={{ background: 'radial-gradient(circle, rgba(255, 63, 108, 0.12) 0%, transparent 70%)' }}
    />
    <motion.div
      animate={{ x: [0, -50, 40, 0], y: [0, 40, -60, 0], scale: [1, 0.9, 1.1, 1] }}
      transition={{ duration: 26, repeat: Infinity, ease: 'easeInOut' }}
      className="absolute top-1/3 -right-40 w-[600px] h-[600px] rounded-full"
      style={{ background: 'radial-gradient(circle, rgba(168, 130, 255, 0.10) 0%, transparent 70%)' }}
    />
    <motion.div
      animate={{ x: [0, 30, -30, 0], y: [0, -30, 50, 0], scale: [1, 1.1, 0.95, 1] }}
      transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
      className="absolute -bottom-40 left-1/3 w-[450px] h-[450px] rounded-full"
      style={{ background: 'radial-gradient(circle, rgba(255, 200, 100, 0.10) 0%, transparent 70%)' }}
    />
  </div>
);

const HeroBanner = () => (
  <motion.section
    initial={{ opacity: 0, y: 18 }}
    animate={{ opacity: 1, y: 0 }}
    className="glass-panel rounded-[18px] px-8 py-7 overflow-hidden"
  >
    <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
      <div className="max-w-xl">
        <h2 className="font-serif text-4xl lg:text-[3.35rem] leading-[0.95] text-textPrimary tracking-tight">What will you style today?</h2>
        <p className="mt-4 text-sm lg:text-base text-textSecondary">Discover looks that are uniquely you.</p>
      </div>
      <div className="hidden lg:block relative h-36 w-[320px] rounded-[24px] glass-panel-subtle overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(255,63,108,0.08),transparent_35%),radial-gradient(circle_at_80%_30%,rgba(17,24,39,0.06),transparent_32%)]" />
        <div className="absolute right-5 top-5 h-24 w-28 rounded-[20px] bg-white/40 border border-white/60 shadow-sm" />
        <div className="absolute left-6 bottom-6 h-20 w-20 rounded-[18px] bg-white/30 border border-white/50 shadow-sm" />
        <div className="absolute left-10 top-8 h-24 w-24 rounded-[28px] border border-primary/15" />
        <div className="absolute left-12 top-8 h-24 w-24 rounded-[28px] border border-primary/10 translate-x-2 translate-y-2" />
      </div>
    </div>

    <div className="mt-6 flex flex-wrap gap-3">
      {quickActions.map((item) => {
        return (
          <button
            key={item.label}
            className="inline-flex items-center gap-3 rounded-xl border border-white/50 bg-white/50 backdrop-blur-sm px-4 py-3 text-sm font-medium text-textPrimary shadow-[0_4px_12px_rgba(15,23,42,0.04)] transition-all hover:-translate-y-0.5 hover:bg-white/70 hover:border-primary/20 hover:shadow-md"
          >
            <span>{item.label}</span>
          </button>
        );
      })}
    </div>
  </motion.section>
);

const Home = () => {
  return (
    <div className="flex min-h-screen relative">
      <AmbientBlobs />
      <Sidebar />
      <main className="flex-1 ml-64 flex min-h-screen relative z-10">
        <div className="flex-1 flex flex-col min-w-0">
          <Header />
          <div className="flex-1 overflow-y-auto pb-32 px-4 lg:px-6">
            <div className="max-w-[1180px] mx-auto py-4 lg:py-6 space-y-6">
              <HeroBanner />
              <ChatBox />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
