import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MessageBubble from './MessageBubble';
import TypingIndicator from './TypingIndicator';
import { fashionRecommendations, occasionPresets } from '../data/mockResponses';

const ChatBox = ({ darkMode, toggleDarkMode }) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [shortlistedItems, setShortlistedItems] = useState([]);
  const [showShortlist, setShowShortlist] = useState(false);
  const [activeOccasion, setActiveOccasion] = useState(occasionPresets[0]?.category || 'Farewell');
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
      <div className="px-6 py-4 border-b border-white/6 bg-slate-900/95 flex items-center justify-between flex-shrink-0 z-10">
        <div className="flex items-center gap-3">
          <div>
            <p className="text-sm font-semibold tracking-[0.14em] uppercase text-white">StyleMate AI</p>
            <p className="text-[11px] text-white/50 uppercase tracking-[0.28em] mt-1">Online</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowShortlist(!showShortlist)}
            className="px-3 py-2 rounded-lg bg-white/5 text-xs font-semibold uppercase tracking-[0.2em] text-white/75 border border-white/8 hover:bg-white/10 transition-all"
          >
            Saved {shortlistedItems.length > 0 ? `(${shortlistedItems.length})` : ''}
          </button>
          <button
            onClick={() => setMessages([])}
            className="px-3 py-2 rounded-lg bg-primary-500 text-xs font-semibold uppercase tracking-[0.2em] text-white shadow-[0_10px_24px_rgba(244,114,182,0.22)] hover:bg-primary-400 transition-all"
          >
            New Chat
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Chat Messages */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <div
            ref={messagesContainerRef}
            className="flex-1 overflow-y-auto px-4 sm:px-6 py-4 space-y-5 scroll-smooth bg-transparent z-10"
          >
            <AnimatePresence>
              {messages.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  className="h-full flex flex-col items-center justify-center text-center w-full max-w-none space-y-5 py-6"
                >
                  <div className="w-full glass-panel-subtle border border-white/6 rounded-lg px-4 py-3">
                    <div className="grid grid-cols-7 gap-2 w-full">
                      {occasionPresets.map((preset, idx) => (
                        <motion.button
                          key={idx}
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => {
                            setActiveOccasion(preset.category);
                            handleSend(`Style a ${preset.category} outfit`);
                          }}
                          className={`w-full px-2 py-2 rounded-lg text-[10px] sm:text-xs font-semibold transition-all border whitespace-nowrap min-w-0 text-center ${
                            activeOccasion === preset.category
                              ? 'bg-primary-500 text-white border-primary-400/20 shadow-[0_10px_24px_rgba(244,114,182,0.25)]'
                              : 'bg-slate-900/80 text-white/75 border-white/8 hover:bg-slate-800 hover:text-white'
                          }`}
                        >
                          {preset.label}
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-display-serif text-4xl sm:text-5xl font-semibold tracking-tight text-white leading-none">
                      Discover Your Style
                    </h3>
                    <p className="mx-auto mt-3 max-w-2xl text-sm sm:text-base text-white/58 leading-7">
                      Tell me about the occasion, preferred style, and budget, and I'll curate outfits tailored just for you.
                    </p>
                  </div>

                  {/* Budget Slider */}
                  <div className="w-full glass-panel-subtle rounded-lg p-5 border border-white/6">
                    <div className="flex items-center justify-between gap-4 mb-4">
                      <div>
                        <p className="text-[10px] uppercase tracking-[0.28em] text-white/45">Budget Range</p>
                        <p className="mt-1 text-sm text-white/65">Set your preferred price window</p>
                      </div>
                      <span className="text-sm font-semibold text-primary-400">
                        ₹{minBudget.toLocaleString()} - ₹{maxBudget.toLocaleString()}
                      </span>
                    </div>
                    <div className="space-y-3">
                      <input
                        type="range"
                        min="0"
                        max="20000"
                        step="500"
                        value={minBudget}
                        onChange={(e) => setMinBudget(Number(e.target.value))}
                        className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-primary-500"
                      />
                      <input
                        type="range"
                        min="0"
                        max="20000"
                        step="500"
                        value={maxBudget}
                        onChange={(e) => setMaxBudget(Number(e.target.value))}
                        className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-primary-500"
                      />
                    </div>
                  </div>
                </motion.div>
              ) : (
                <div className="space-y-5 pb-4">
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
          <div className="px-4 sm:px-6 pb-4 -mt-2 flex-shrink-0 z-20">
            <div className="flex items-center gap-3 bg-slate-900/95 border border-white/6 rounded-lg px-3 sm:px-4 py-3.5 shadow-[0_14px_30px_rgba(0,0,0,0.24)]">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Describe your perfect outfit"
                  className="w-full bg-white/4 border border-white/8 rounded-lg py-4 px-5 text-sm text-white placeholder-white/35 focus:bg-white/6 focus:border-primary-400/35 outline-none transition-all"
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleSend()}
                disabled={!input.trim()}
                className={`h-14 w-14 rounded-lg transition-all flex items-center justify-center flex-shrink-0 text-xs font-semibold uppercase tracking-[0.18em] ${
                  input.trim()
                    ? 'bg-primary-500 text-white shadow-[0_10px_24px_rgba(244,114,182,0.25)] hover:bg-primary-400'
                    : 'bg-white/5 text-white/30 cursor-not-allowed border border-white/6'
                }`}
              >
                Send
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
              className="bg-slate-900/96 border-l border-white/6 flex-shrink-0 overflow-hidden"
            >
              <div className="h-full flex flex-col">
                <div className="p-4 border-b border-white/6 flex items-center justify-between">
                  <h3 className="font-semibold text-white uppercase tracking-[0.22em] text-xs">
                    Shortlist
                  </h3>
                  <button
                    onClick={() => setShowShortlist(false)}
                    className="px-3 py-2 rounded-lg text-xs font-semibold uppercase tracking-[0.18em] text-white/70 bg-white/5 hover:bg-white/10 transition-colors"
                  >
                    Close
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto p-4">
                  {shortlistedItems.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-center text-white/45 space-y-2">
                      <p className="text-sm">No items shortlisted yet</p>
                      <p className="text-xs">Save items to compare them here</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {shortlistedItems.map((item) => (
                        <div
                          key={item.id}
                          className="flex gap-3 p-3 bg-white/4 rounded-lg border border-white/6"
                        >
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-16 h-20 object-cover rounded-lg"
                          />
                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-semibold text-white line-clamp-2">
                              {item.name}
                            </h4>
                            <p className="text-primary-400 font-bold text-sm mt-1">{item.price}</p>
                          </div>
                          <button
                            onClick={() => handleToggleShortlist(item)}
                            className="self-start px-3 py-2 rounded-lg text-xs font-semibold uppercase tracking-[0.16em] text-white/65 bg-white/5 hover:bg-white/10 transition-colors"
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {shortlistedItems.length >= 2 && (
                  <div className="p-4 border-t border-white/6">
                    <button className="w-full bg-primary-500 text-white py-3 rounded-lg font-semibold text-sm hover:bg-primary-400 transition-all shadow-[0_10px_24px_rgba(244,114,182,0.22)]">
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