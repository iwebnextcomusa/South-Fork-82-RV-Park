import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, User, Sparkles, Phone, Compass } from 'lucide-react';
import { ChatMessage } from '../types';
import { PARK_INFO } from '../data/parkData';

export const ChatbotWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      sender: 'bot',
      text: "Howdy! I'm Barnaby, your virtual host at South Fork 82 RV Park in Blossom, TX. Ask me about rates, 30/50 amp hookups, pet rules, or local East Texas fishing spots!",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const suggestedPrompts = [
    "What are your monthly rates?",
    "Do you have 30 and 50 amp sites?",
    "Are pets allowed?",
    "How far is Pat Mayse Lake?",
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen, isLoading]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || inputValue;
    if (!text.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      sender: 'user',
      text: text.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text.trim() }),
      });

      const data = await response.json();
      const botReplyText = data.reply || "Thanks for reaching out! For immediate assistance, please call us directly at (903) 703-8591.";

      const botMessage: ChatMessage = {
        sender: 'bot',
        text: botReplyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage: ChatMessage = {
        sender: 'bot',
        text: "We're experiencing a brief connection delay. Please feel free to call us at (903) 703-8591 or email fox261@southfork82rvpark.com!",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Floating Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          id="open-chatbot-btn"
          aria-label="Open AI Assistant Chat"
          className="group flex items-center gap-2.5 bg-[#2D4636] hover:bg-[#7C5E43] text-[#FDFCF8] px-5 py-3.5 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-105 border border-white/20"
        >
          <div className="relative">
            <MessageSquare className="w-5 h-5 text-[#C5A072]" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full animate-ping" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-500 rounded-full" />
          </div>
          <span className="font-serif italic font-normal text-sm tracking-wide hidden sm:inline text-white">
            Park AI Assistant
          </span>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="bg-[#FDFCF8] text-[#2D4636] w-[90vw] sm:w-[380px] h-[520px] rounded-[2rem] shadow-2xl flex flex-col border border-[#2D4636]/15 overflow-hidden animate-fadeIn">
          
          {/* Header */}
          <div className="bg-[#2D4636] text-[#FDFCF8] p-4 flex items-center justify-between border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#7C5E43] flex items-center justify-center text-[#FDFCF8]">
                <Bot className="w-5 h-5 text-[#C5A072]" />
              </div>
              <div>
                <h3 className="font-serif italic text-base flex items-center gap-1.5 text-white">
                  Barnaby <Sparkles className="w-3.5 h-3.5 text-[#C5A072]" />
                </h3>
                <p className="text-[10px] text-[#C5A072] uppercase tracking-widest font-semibold">South Fork 82 Virtual Concierge</p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              id="close-chatbot-btn"
              className="p-1.5 text-[#E1EAF0] hover:text-white rounded-full hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-[#FDFCF8]">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'bot' && (
                  <div className="w-7 h-7 rounded-full bg-[#2D4636] text-[#C5A072] flex items-center justify-center shrink-0 mt-1">
                    <Compass className="w-4 h-4" />
                  </div>
                )}

                <div
                  className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed shadow-sm ${
                    msg.sender === 'user'
                      ? 'bg-[#7C5E43] text-white rounded-br-none'
                      : 'bg-[#F4F2EA] text-[#2D4636] border border-[#2D4636]/10 rounded-bl-none'
                  }`}
                >
                  <p className="whitespace-pre-line">{msg.text}</p>
                  <span
                    className={`block text-[9px] mt-1 ${
                      msg.sender === 'user' ? 'text-white/70 text-right' : 'text-[#2D4636]/60'
                    }`}
                  >
                    {msg.timestamp}
                  </span>
                </div>

                {msg.sender === 'user' && (
                  <div className="w-7 h-7 rounded-full bg-[#7C5E43] text-white flex items-center justify-center shrink-0 mt-1">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            ))}

            {/* Typing Indicator */}
            {isLoading && (
              <div className="flex gap-2.5 items-center">
                <div className="w-7 h-7 rounded-full bg-[#2D4636] text-[#C5A072] flex items-center justify-center">
                  <Compass className="w-4 h-4 animate-spin" />
                </div>
                <div className="bg-[#F4F2EA] px-4 py-2.5 rounded-2xl rounded-bl-none text-xs text-[#2D4636]/70 flex items-center gap-1.5 border border-[#2D4636]/10">
                  <span>Barnaby is typing</span>
                  <span className="w-1.5 h-1.5 bg-[#7C5E43] rounded-full animate-bounce" />
                  <span className="w-1.5 h-1.5 bg-[#7C5E43] rounded-full animate-bounce delay-150" />
                  <span className="w-1.5 h-1.5 bg-[#7C5E43] rounded-full animate-bounce delay-300" />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Suggested Quick Prompts */}
          {messages.length < 3 && (
            <div className="px-3 py-2 bg-[#F4F2EA] border-t border-b border-[#2D4636]/10 flex flex-wrap gap-1.5">
              {suggestedPrompts.map((prompt, i) => (
                <button
                  key={i}
                  onClick={() => handleSendMessage(prompt)}
                  className="text-[10px] uppercase tracking-wider font-semibold bg-white hover:bg-[#2D4636] hover:text-white text-[#2D4636] border border-[#2D4636]/20 px-3 py-1 rounded-full transition-colors"
                >
                  {prompt}
                </button>
              ))}
            </div>
          )}

          {/* Quick Direct Call Bar */}
          <div className="bg-[#E1EAF0]/40 px-3 py-1.5 flex items-center justify-between text-xs text-[#2D4636]">
            <span className="font-medium text-[11px]">Need immediate booking?</span>
            <a
              href={`tel:${PARK_INFO.phoneRaw}`}
              className="flex items-center gap-1 text-[#7C5E43] font-bold hover:underline text-[11px]"
            >
              <Phone className="w-3 h-3" /> {PARK_INFO.phone}
            </a>
          </div>

          {/* Input Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-3 bg-[#FDFCF8] border-t border-[#2D4636]/10 flex items-center gap-2"
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Type your question..."
              className="flex-1 bg-[#F4F2EA] border border-[#2D4636]/10 rounded-full px-4 py-2 text-xs focus:outline-none focus:border-[#2D4636]"
              id="chatbot-input-field"
            />
            <button
              type="submit"
              disabled={isLoading || !inputValue.trim()}
              id="send-chat-btn"
              className="bg-[#2D4636] hover:bg-[#7C5E43] disabled:bg-gray-300 text-white p-2.5 rounded-full transition-colors shrink-0"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>
      )}
    </div>
  );
};
