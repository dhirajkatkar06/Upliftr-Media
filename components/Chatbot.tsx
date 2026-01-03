
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getGeminiResponse } from '../services/gemini';

interface Message {
  role: 'user' | 'bot';
  text: string;
}

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'bot', text: 'Welcome to Upliftr. I’m here to help you elevate your brand. Would you like to book a consultation or hear about our services?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [enquiryBooked, setEnquiryBooked] = useState(false);
  
  const historyRef = useRef<any[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isOpen, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    // 🔒 Prevent duplicate booking after success
    if (enquiryBooked) {
      setMessages(prev => [
        ...prev,
        {
          role: 'bot',
          text: "You're most welcome 😊 Our team has your details and will reach out shortly. How can i assist you more?"
        }
      ]);
      setInput('');
      return;
    }

    const userMsg = input;
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await getGeminiResponse(userMsg, historyRef.current);
      
      // Update history for model context
      historyRef.current.push({ role: 'user', parts: [{ text: userMsg }] });

      if (response.functionCalls && response.functionCalls.length > 0) {
        for (const fc of response.functionCalls) {
          if (fc.name === 'bookEnquiry') {
            // "Save" to Drive - Simulated by logging and localStorage
            const leadData = fc.args;
            const currentLeads = JSON.parse(localStorage.getItem('upliftr_enquiries') || '[]');
            currentLeads.push({ ...leadData, timestamp: new Date().toISOString() });
            localStorage.setItem('upliftr_enquiries', JSON.stringify(currentLeads));

            // 🔹 NEW: Save to Google Sheet (ONLY ADDITION)
            fetch("/api/save-enquiry", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(leadData),
            }).catch(err => console.error("Google Sheet Error", err));
            
            // Show Success Notification
            setShowSuccess(true);
            setTimeout(() => setShowSuccess(false), 4000);
            setEnquiryBooked(true);

            const confirmation = `Perfect! I've booked your enquiry for ${leadData.fullName}. Our strategy team will review your ${leadData.projectType} request and reach out to ${leadData.email} within 24 hours.`;
            setMessages(prev => [...prev, { role: 'bot', text: confirmation }]);
            historyRef.current.push({ role: 'model', parts: [{ text: confirmation }] });
          }
        }
      } else {
        const botText = response.text || "I'm here to help. What else can I do for you?";
        setMessages(prev => [...prev, { role: 'bot', text: botText }]);
        historyRef.current.push({ role: 'model', parts: [{ text: botText }] });
      }
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'bot', text: "I hit a snag, but don't worry—you can also reach us directly at hello@upliftr.agency." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[120] flex flex-col items-end pointer-events-none">
      {/* Booking Success Toast */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="pointer-events-auto mb-4 bg-emerald-500 text-white px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-3 font-bold border border-emerald-400"
          >
            <i className="fa-solid fa-cloud-check text-xl"></i>
            Enquiry Booked!
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chatbot Interface */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20, originX: 1, originY: 1 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="pointer-events-auto mb-4 w-80 md:w-96 glass border border-slate-700 rounded-3xl shadow-2xl overflow-hidden flex flex-col h-[500px]"
          >
            <div className="p-5 bg-slate-900 border-b border-slate-800 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-2.5 h-2.5 rounded-full bg-cyan-500 animate-pulse"></div>
                <h3 className="font-heading font-bold text-lg text-white">Upliftr AI</h3>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white transition-colors">
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-5 space-y-4 custom-scrollbar bg-slate-950/30">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed ${
                    m.role === 'user' 
                    ? 'bg-cyan-600 text-white rounded-br-none shadow-lg' 
                    : 'bg-slate-800 text-slate-200 rounded-bl-none border border-slate-700/50'
                  }`}>
                    {m.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-slate-800 p-4 rounded-2xl rounded-bl-none border border-slate-700/50">
                    <div className="flex space-x-1.5">
                      <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-bounce"></div>
                      <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-bounce delay-100"></div>
                      <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-bounce delay-200"></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="p-4 bg-slate-900 border-t border-slate-800 flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Talk to our strategist..."
                className="flex-1 bg-slate-800 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-cyan-500 outline-none text-white transition-all placeholder:text-slate-500"
              />
              <button 
                onClick={handleSend}
                disabled={isLoading}
                className="bg-cyan-600 hover:bg-cyan-500 text-white w-12 h-12 rounded-xl flex items-center justify-center transition-all disabled:opacity-50 active:scale-90 shadow-lg shadow-cyan-600/20"
              >
                <i className="fa-solid fa-paper-plane"></i>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chatbot Trigger */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="pointer-events-auto w-14 h-14 bg-cyan-600 hover:bg-cyan-500 text-white rounded-full shadow-2xl flex items-center justify-center text-xl transition-all hover:scale-110 active:scale-90 z-10 border-4 border-slate-950"
      >
        <i className={`fa-solid ${isOpen ? 'fa-minus' : 'fa-comment-dots'} transition-transform duration-300`}></i>
      </button>
    </div>
  );
};

export default Chatbot;
