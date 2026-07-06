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
  const [budgetValue, setBudgetValue] = useState(10000);
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
            <p className="text-sm font-semibold tracking-[0.14em] uppercase text-white">AI Workspace</p>
            <p className="text-[11px] text-white/50 uppercase tracking-[0.28em] mt-1">Online</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowShortlist(!showShortlist)}
            className="px-3 py-2 rounded-none bg-white/5 text-xs font-semibold uppercase tracking-[0.2em] text-white/75 border border-white/8 hover:bg-white/10 transition-all"
          >
            Saved {shortlistedItems.length > 0 ? `(${shortlistedItems.length})` : ''}
          </button>
          <button
            onClick={() => setMessages([])}
            className="px-3 py-2 rounded-none bg-primary-500 text-xs font-semibold uppercase tracking-[0.2em] text-white shadow-[0_10px_24px_rgba(244,114,182,0.22)] hover:bg-primary-400 transition-all"
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
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="h-full w-full max-w-none py-8 flex flex-col items-center justify-center"
                >
                  <div className="text-center w-full max-w-4xl px-4">
                    {/* Decorative element */}
                    <div className="mx-auto w-20 h-1 bg-gradient-to-r from-transparent via-primary-400 to-transparent mb-8 opacity-60"></div>
                    
                    <h3 className="font-display-serif text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-white leading-tight mb-4">
                      Ask StyleMate AI anything...
                    </h3>
                    <p className="mx-auto mt-4 max-w-2xl text-sm sm:text-base lg:text-lg text-white/60 leading-relaxed">
                      Need an outfit? Colour Matching? Accessories? I've got you.
                    </p>

                    {/* Budget Controls */}
                    <div className="mt-10 max-w-2xl mx-auto">
                      <div className="flex items-center justify-between gap-4 mb-3 px-1">
                        <p className="text-xs font-medium tracking-[0.3em] uppercase text-white/50">Budget Range</p>
                        <p className="text-sm font-semibold text-primary-400">
                          Up to ₹{budgetValue.toLocaleString()}
                        </p>
                      </div>

                      <input
                        type="range"
                        min="0"
                        max="50000"
                        step="500"
                        value={budgetValue}
                        onChange={(e) => setBudgetValue(Number(e.target.value))}
                        className="budget-range w-full"
                        aria-label="Budget range"
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
          <div className="px-4 sm:px-6 pb-6 pt-2 flex-shrink-0 z-20">
            <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-none px-5 sm:px-6 py-4 shadow-[0_10px_40px_rgba(0,0,0,0.15)] hover:shadow-[0_12px_45px_rgba(0,0,0,0.2)] transition-shadow duration-300">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Describe your perfect outfit..."
                  className="w-full bg-transparent border-0 py-2.5 px-0 text-base sm:text-lg text-white placeholder-white/40 focus:ring-0 outline-none transition-all"
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => handleSend()}
                disabled={!input.trim()}
                className={`h-12 w-auto px-6 sm:px-7 rounded-none transition-all flex items-center justify-center flex-shrink-0 text-sm sm:text-base font-semibold uppercase tracking-[0.16em] ${
                  input.trim()
                    ? 'bg-gradient-to-br from-primary-500 to-primary-600 text-white shadow-[0_6px_16px_rgba(244,114,182,0.3)] hover:from-primary-600 hover:to-primary-700 hover:shadow-[0_8px_20px_rgba(244,114,182,0.35)]'
                    : 'bg-white/10 text-white/40 cursor-not-allowed border border-white/10'
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
                    className="px-3 py-2 rounded-none text-xs font-semibold uppercase tracking-[0.18em] text-white/70 bg-white/5 hover:bg-white/10 transition-colors"
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
                          className="flex gap-3 p-3 bg-white/4 rounded-none border border-white/6"
                        >
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-16 h-20 object-cover rounded-none"
                          />
                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-semibold text-white line-clamp-2">
                              {item.name}
                            </h4>
                            <p className="text-primary-400 font-bold text-sm mt-1">{item.price}</p>
                          </div>
                          <button
                            onClick={() => handleToggleShortlist(item)}
                            className="self-start px-3 py-2 rounded-none text-xs font-semibold uppercase tracking-[0.16em] text-white/65 bg-white/5 hover:bg-white/10 transition-colors"
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
                    <button className="w-full bg-primary-500 text-white py-3 rounded-none font-semibold text-sm hover:bg-primary-400 transition-all shadow-[0_10px_24px_rgba(244,114,182,0.22)]">
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