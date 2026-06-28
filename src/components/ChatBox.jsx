import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MessageBubble from './MessageBubble';
import TypingIndicator from './TypingIndicator';
import { fashionRecommendations } from '../data/mockResponses';

const GlassyBubbles = () => {
  const bubbles = [
    { size: 55, x: '8%',  delay: 0,   duration: 14, color: 'rgba(255, 63, 108, 0.10)' },
    { size: 80, x: '22%', delay: 2,   duration: 18, color: 'rgba(168, 130, 255, 0.08)' },
    { size: 35, x: '40%', delay: 1,   duration: 11, color: 'rgba(255, 200, 100, 0.10)' },
    { size: 100, x: '58%', delay: 3.5, duration: 20, color: 'rgba(255, 63, 108, 0.07)' },
    { size: 45, x: '72%', delay: 1.5, duration: 13, color: 'rgba(120, 180, 255, 0.09)' },
    { size: 65, x: '88%', delay: 4,   duration: 16, color: 'rgba(168, 130, 255, 0.07)' },
    { size: 40, x: '15%', delay: 5,   duration: 12, color: 'rgba(255, 200, 100, 0.08)' },
    { size: 50, x: '50%', delay: 6,   duration: 15, color: 'rgba(120, 180, 255, 0.07)' },
    { size: 70, x: '35%', delay: 7,   duration: 17, color: 'rgba(255, 63, 108, 0.06)' },
    { size: 30, x: '80%', delay: 2.5, duration: 10, color: 'rgba(168, 130, 255, 0.10)' },
  ];

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {bubbles.map((b, i) => (
        <motion.div
          key={i}
          initial={{ y: '115%', scale: 0.6, opacity: 0 }}
          animate={{
            y: '-15%',
            x: [
              `calc(${b.x} - 20px)`,
              `calc(${b.x} + 30px)`,
              `calc(${b.x} - 10px)`,
              `calc(${b.x} + 15px)`,
              b.x
            ],
            scale: [0.6, 1.0, 0.85, 1.1, 0.9],
            opacity: [0, 0.6, 0.45, 0.7, 0]
          }}
          transition={{
            duration: b.duration,
            repeat: Infinity,
            delay: b.delay,
            ease: 'linear'
          }}
          style={{
            width: b.size,
            height: b.size,
            left: b.x,
            background: `radial-gradient(circle at 35% 25%, ${b.color.replace(/[\d.]+\)$/, '0.35)')}, ${b.color} 50%, transparent 75%)`,
            border: '1px solid rgba(255, 255, 255, 0.45)',
            boxShadow: `inset 0 -4px 12px rgba(255, 255, 255, 0.5), inset 0 4px 8px rgba(255, 255, 255, 0.3), 0 4px 20px ${b.color}`,
            backdropFilter: 'blur(2px)',
          }}
          className="absolute rounded-full"
        />
      ))}
    </div>
  );
};

const ChatBox = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
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
        content: "That sounds like a great occasion! Based on your request, I've curated a premium look for you.",
        recommendations: [],
        stylingTip: ""
      };

      const lowerContent = messageContent.toLowerCase();
      if (lowerContent.includes('farewell')) {
        const data = fashionRecommendations.find(r => r.category === 'Farewell');
        aiResponse.recommendations = data.outfit;
        aiResponse.stylingTip = data.stylingTip;
        aiResponse.content = "For your farewell, you want something sophisticated yet memorable. Here's a curated satin ensemble that's trending right now:";
      } else if (lowerContent.includes('interview')) {
        const data = fashionRecommendations.find(r => r.category === 'Interview');
        aiResponse.recommendations = data.outfit;
        aiResponse.stylingTip = data.stylingTip;
        aiResponse.content = "A professional first impression is key. I recommend this clean, minimalist corporate look:";
      } else {
        aiResponse.content = "I'm currently specialized in Farewell and Interview looks for this demo, but generally, I'd suggest something elegant! Would you like to see a Farewell or Interview look?";
      }

      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="glass-panel rounded-3xl overflow-hidden flex flex-col h-[650px] max-w-[1000px] mx-auto w-full relative">
      {/* Animated Glassy Bubbles Background */}
      <GlassyBubbles />

      {/* Chat Header */}
      <div className="px-6 py-4 border-b border-white/30 bg-white/40 backdrop-blur-xl flex items-center justify-between flex-shrink-0 z-10">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <div>
            <h3 className="text-sm font-bold text-textPrimary leading-none">StyleMate AI Assistant</h3>
            <p className="text-[10px] text-textSecondary mt-1 font-medium">Active styling session</p>
          </div>
        </div>
        {messages.length > 0 && (
          <button 
            onClick={() => setMessages([])}
            className="text-xs font-bold text-textSecondary hover:text-primary transition-colors px-3 py-1.5 rounded-xl hover:bg-white/40 uppercase tracking-wider text-[10px]"
          >
            Clear Chat
          </button>
        )}
      </div>

      {/* Chat Messages / Empty State */}
      <div 
        ref={messagesContainerRef}
        className="flex-1 overflow-y-auto px-6 py-6 space-y-6 scroll-smooth bg-transparent z-10"
      >
        <AnimatePresence>
          {messages.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="h-full flex flex-col items-center justify-center text-center max-w-sm mx-auto space-y-6 py-8"
            >
              <div className="w-14 h-14 glass-panel-strong rounded-[20px] flex items-center justify-center z-10">
                <span className="text-primary text-xl font-extrabold tracking-tight">SM</span>
              </div>
              <div>
                <h3 className="text-base font-bold text-textPrimary">Your Personal AI Stylist</h3>
                <p className="text-xs text-textSecondary mt-2 leading-relaxed">
                  Describe the outfit or aesthetic you are looking for. Click a quick starter below to begin styling.
                </p>
              </div>
              
              <div className="w-full space-y-2">
                <button 
                  onClick={() => handleSend("Style a Farewell Outfit")}
                  className="w-full glass-panel-subtle text-left px-5 py-3 rounded-2xl text-xs font-semibold text-textPrimary hover:bg-white/50 hover:shadow-sm transition-all"
                >
                  Style a Farewell Outfit
                </button>
                <button 
                  onClick={() => handleSend("Style an Interview Look")}
                  className="w-full glass-panel-subtle text-left px-5 py-3 rounded-2xl text-xs font-semibold text-textPrimary hover:bg-white/50 hover:shadow-sm transition-all"
                >
                  Style an Interview Look
                </button>
              </div>
            </motion.div>
          ) : (
            <div className="space-y-6">
              {messages.map((msg, index) => (
                <MessageBubble key={index} message={msg} />
              ))}
              {isTyping && <TypingIndicator />}
            </div>
          )}
        </AnimatePresence>
      </div>

      {/* Input Area */}
      <div className="px-6 py-4 border-t border-white/30 bg-white/40 backdrop-blur-xl flex-shrink-0 z-10">
        <div className="flex items-center gap-3">
          <div className="relative flex-1">
            <input 
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Describe the occasion, color preferences, or budget..."
              className="w-full bg-white/50 backdrop-blur-sm border border-white/40 rounded-2xl py-4 px-6 text-sm focus:bg-white/70 focus:border-primary/30 focus:ring-1 focus:ring-primary/10 outline-none transition-all shadow-[inset_0_1px_0_rgba(255,255,255,0.6)]"
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleSend()}
            disabled={!input.trim()}
            className={`h-12 px-6 rounded-2xl text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center flex-shrink-0
              ${input.trim() ? 'bg-primary text-white shadow-md shadow-primary/25 hover:bg-opacity-95' : 'bg-white/40 text-gray-400 cursor-not-allowed border border-white/40'}`}
          >
            Send
          </motion.button>
        </div>
        <p className="text-[9px] text-textSecondary text-center mt-3 uppercase tracking-[0.24em] font-bold opacity-50">
          Powered by StyleMate Generative AI
        </p>
      </div>
    </div>
  );
};

export default ChatBox;
