import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Send,
  Sparkles,
  GraduationCap,
  Briefcase,
  Shirt,
  BookOpen,
  Heart,
  X,
  Moon,
  Sun as SunIcon,
  Heart as HeartIcon,
  Crown
} from 'lucide-react';
import MessageBubble from './MessageBubble';
import TypingIndicator from './TypingIndicator';
import { fashionRecommendations, occasionPresets } from '../data/mockResponses';

const ChatBox = ({ darkMode, toggleDarkMode }) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [shortlistedItems, setShortlistedItems] = useState([]);
  const [showShortlist, setShowShortlist] = useState(false);
  const [minBudget, setMinBudget] = useState(0);
  const [maxBudget, setMaxBudget] = useState(10000);
  const messagesContainerRef = useRef(null);

  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const getIconForPreset = (iconName) => {
    switch (iconName) {
      case 'Sparkles':
        return Sparkles;
      case 'GraduationCap':
        return GraduationCap;
      case 'Briefcase':
        return Briefcase;
      case 'Shirt':
        return Shirt;
      case 'BookOpen':
        return BookOpen;
      case 'Heart':
        return Heart;
      case 'Crown':
        return Crown;
      default:
        return Sparkles;
    }
  };

  const handleSend = (content) => {
    const messageContent = content || input;
    if (!messageContent.trim()) return;

    const userMessage = { role: 'user', content: messageContent };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      let aiResponse = {
        role: 'ai',
        content: "I'm here to help you find the perfect outfit. Let me put together some amazing looks for you.",
        recommendations: [],
        stylingTip: "",
        followUpSuggestions: []
      };

      const lowerContent = messageContent.toLowerCase();
      const matchedRecommendation = fashionRecommendations.find(rec =>
        lowerContent.includes(rec.category.toLowerCase())
      );

      if (matchedRecommendation) {
        aiResponse = {
          role: 'ai',
          content: `Perfect choice for ${matchedRecommendation.category}. Here are some curated picks just for you.`,
          recommendations: matchedRecommendation.outfit,
          stylingTip: matchedRecommendation.stylingTip,
          followUpSuggestions: matchedRecommendation.followUpSuggestions
        };
      } else {
        const defaultRec = fashionRecommendations[0];
        aiResponse = {
          role: 'ai',
          content: "Great question. Here are some stylish recommendations to inspire you.",
          recommendations: defaultRec.outfit,
          stylingTip: defaultRec.stylingTip,
          followUpSuggestions: defaultRec.followUpSuggestions
        };
      }

      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleToggleShortlist = (item) => {
    setShortlistedItems(prev => {
      const isShortlisted = prev.some(i => i.id === item.id);
      if (isShortlisted) {
        return prev.filter(i => i.id !== item.id);
      } else {
        return [...prev, item];
      }
    });
  };

  return (
    <div className="glass-panel flex flex-col h-full w-full relative">
      {/* Chat Header */}
      <div className="px-6 py-4 border-b border-white/30 dark:border-neutral-700/50 bg-white/40 dark:bg-neutral-800/40 backdrop-blur-xl flex items-center justify-between flex-shrink-0 z-10">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-none flex items-center justify-center shadow-md">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 rounded-none border-2 border-white dark:border-neutral-800" />
          </div>
          <div>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 font-medium">Online</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={toggleDarkMode}
            className="p-2.5 rounded-none bg-white/50 dark:bg-neutral-700/50 text-neutral-700 dark:text-neutral-300 hover:bg-white dark:hover:bg-neutral-700 transition-all"
          >
            {darkMode ? <SunIcon className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
          <button
            onClick={() => setShowShortlist(!showShortlist)}
            className="relative p-2.5 rounded-none bg-white/50 dark:bg-neutral-700/50 text-neutral-700 dark:text-neutral-300 hover:bg-white dark:hover:bg-neutral-700 transition-all"
          >
            <HeartIcon className="w-5 h-5" />
            {shortlistedItems.length > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary-500 text-white text-xs font-bold rounded-none flex items-center justify-center">
                {shortlistedItems.length}
              </span>
            )}
          </button>
          {messages.length > 0 && (
            <button
              onClick={() => setMessages([])}
              className="text-xs font-bold text-neutral-500 dark:text-neutral-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors px-3 py-2 rounded-none hover:bg-white/50 dark:hover:bg-neutral-700/50 uppercase tracking-wider"
            >
              New Chat
            </button>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Chat Messages */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <div
            ref={messagesContainerRef}
            className="flex-1 overflow-y-auto px-4 sm:px-6 py-6 space-y-6 scroll-smooth bg-transparent z-10"
          >
            <AnimatePresence>
              {messages.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  className="h-full flex flex-col items-center justify-center text-center max-w-2xl mx-auto space-y-6 py-8"
                >
                  <div className="w-16 h-16 glass-panel-strong rounded-none flex items-center justify-center z-10 shadow-lg">
                    <Sparkles className="text-primary-500 w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-neutral-900 dark:text-white">Discover Your Style</h3>
                    <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-2 leading-relaxed">
                      Tell me about the occasion or style you're looking for, and I'll curate the perfect look for you.
                    </p>
                  </div>

                  {/* Quick Actions */}
                  <div className="w-full space-y-3">
                    <p className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                      Pick an occasion
                    </p>
                    <div className="flex flex-wrap gap-2 justify-center">
                      {occasionPresets.map((preset, idx) => {
                        const Icon = getIconForPreset(preset.icon);
                        return (
                          <motion.button
                            key={idx}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleSend(`Style a ${preset.category} outfit`)}
                            className="glass-panel-subtle px-4 py-3 rounded-none text-xs font-semibold text-neutral-700 dark:text-neutral-200 hover:bg-white dark:hover:bg-neutral-700 hover:shadow-md transition-all flex items-center gap-2 border border-neutral-200 dark:border-neutral-700"
                          >
                            <Icon className="w-4 h-4" />
                            {preset.label}
                          </motion.button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Budget Slider */}
                  <div className="w-full glass-panel-subtle rounded-none p-4 border border-neutral-200 dark:border-neutral-700">
                    <p className="text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-3 flex items-center gap-2">
                      Budget Range
                      <span className="ml-auto text-primary-500 font-bold">
                        ₹{minBudget.toLocaleString()} - ₹{maxBudget.toLocaleString()}
                      </span>
                    </p>
                    <div className="space-y-2">
                      <input
                        type="range"
                        min="0"
                        max="20000"
                        step="500"
                        value={minBudget}
                        onChange={(e) => setMinBudget(Number(e.target.value))}
                        className="w-full h-2 bg-neutral-200 dark:bg-neutral-700 rounded-none appearance-none cursor-pointer accent-primary-500"
                      />
                      <input
                        type="range"
                        min="0"
                        max="20000"
                        step="500"
                        value={maxBudget}
                        onChange={(e) => setMaxBudget(Number(e.target.value))}
                        className="w-full h-2 bg-neutral-200 dark:bg-neutral-700 rounded-none appearance-none cursor-pointer accent-primary-500"
                      />
                    </div>
                  </div>
                </motion.div>
              ) : (
                <div className="space-y-6 pb-4">
                  {messages.map((msg, idx) => (
                    <MessageBubble
                      key={idx}
                      message={msg}
                      onToggleShortlist={handleToggleShortlist}
                      shortlistedItems={shortlistedItems}
                      onFollowUp={handleSend}
                    />
                  ))}
                  {isTyping && <TypingIndicator />}
                </div>
              )}
            </AnimatePresence>
          </div>

          {/* Input Area */}
          <div className="px-4 sm:px-6 py-4 border-t border-white/30 dark:border-neutral-700/50 bg-white/40 dark:bg-neutral-800/40 backdrop-blur-xl flex-shrink-0 z-10">
            <div className="flex items-center gap-3">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Describe your perfect outfit"
                  className="w-full bg-white/70 dark:bg-neutral-700/70 backdrop-blur-sm border border-neutral-200 dark:border-neutral-600 rounded-none py-4 px-5 text-sm text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-500 focus:bg-white dark:focus:bg-neutral-700 focus:border-primary-300 dark:focus:border-primary-500 outline-none transition-all"
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleSend()}
                disabled={!input.trim()}
                className={`h-12 w-12 rounded-none transition-all flex items-center justify-center flex-shrink-0 ${
                  input.trim()
                    ? 'bg-gradient-to-br from-primary-500 to-primary-600 text-white shadow-lg shadow-primary-500/25 hover:from-primary-600 hover:to-primary-700'
                    : 'bg-neutral-200 dark:bg-neutral-700 text-neutral-400 dark:text-neutral-500 cursor-not-allowed'
                }`}
              >
                <Send className="w-5 h-5" />
              </motion.button>
            </div>
          </div>
        </div>

        {/* Shortlist Sidebar */}
        <AnimatePresence>
          {showShortlist && (
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: '320px', opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="bg-white/80 dark:bg-neutral-800/80 backdrop-blur-xl border-l border-neutral-200 dark:border-neutral-700 flex-shrink-0 overflow-hidden"
            >
              <div className="h-full flex flex-col">
                <div className="p-4 border-b border-neutral-200 dark:border-neutral-700 flex items-center justify-between">
                  <h3 className="font-bold text-neutral-900 dark:text-white flex items-center gap-2">
                    <Heart className="w-5 h-5 text-primary-500" />
                    Shortlist
                  </h3>
                  <button
                    onClick={() => setShowShortlist(false)}
                    className="p-1.5 rounded-none hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
                  >
                    <X className="w-5 h-5 text-neutral-500 dark:text-neutral-400" />
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto p-4">
                  {shortlistedItems.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-center text-neutral-500 dark:text-neutral-400 space-y-2">
                      <Heart className="w-12 h-12 opacity-30" />
                      <p className="text-sm">No items shortlisted yet</p>
                      <p className="text-xs">Click the heart icon on items to save them here</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {shortlistedItems.map((item) => (
                        <div
                          key={item.id}
                          className="flex gap-3 p-3 bg-neutral-50 dark:bg-neutral-700/50 rounded-none border border-neutral-200 dark:border-neutral-600"
                        >
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-16 h-20 object-cover rounded-none"
                          />
                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-semibold text-neutral-900 dark:text-white line-clamp-2">
                              {item.name}
                            </h4>
                            <p className="text-primary-500 font-bold text-sm mt-1">{item.price}</p>
                          </div>
                          <button
                            onClick={() => handleToggleShortlist(item)}
                            className="self-start p-1.5 rounded-none hover:bg-neutral-200 dark:hover:bg-neutral-600 transition-colors"
                          >
                            <X className="w-4 h-4 text-neutral-500 dark:text-neutral-400" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {shortlistedItems.length >= 2 && (
                  <div className="p-4 border-t border-neutral-200 dark:border-neutral-700">
                    <button className="w-full bg-gradient-to-br from-primary-500 to-primary-600 text-white py-3 rounded-none font-bold text-sm hover:from-primary-600 hover:to-primary-700 transition-all shadow-md">
                      Compare {shortlistedItems.length} Items
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ChatBox;