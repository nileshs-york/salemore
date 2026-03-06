import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

export default function Popup() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      const hasSeen = localStorage.getItem('hasSeenCandyPopup');
      if (!hasSeen) {
        setIsOpen(true);
      }
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const closePopup = () => {
    setIsOpen(false);
    localStorage.setItem('hasSeenCandyPopup', 'true');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-pink-500/30 backdrop-blur-sm">
          <motion.div
            initial={{ scale: 0.8, opacity: 0, rotate: -5 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            exit={{ scale: 0.8, opacity: 0, rotate: 5 }}
            className="relative w-full max-w-sm bg-white rounded-[2rem] overflow-hidden shadow-2xl border-4 border-pink-200"
          >
            <button
              onClick={closePopup}
              className="absolute top-4 right-4 p-2 bg-pink-100 rounded-full hover:bg-pink-200 transition-colors z-10"
            >
              <X className="w-5 h-5 text-pink-600" />
            </button>
            
            <div className="bg-gradient-to-br from-pink-300 to-purple-400 h-32 flex items-center justify-center">
              <span className="text-7xl animate-bounce">🍭</span>
            </div>
            
            <div className="p-8 text-center">
              <h2 className="text-3xl font-black text-pink-600 mb-4 tracking-tight">
                Welcome, Sweet Tooth!
              </h2>
              <p className="text-slate-700 leading-relaxed mb-6 font-medium">
                Welcome to Salemore! We are thrilled to welcome visitors from the R Exhibition in New Delhi. 🍬✨
              </p>
              <button
                onClick={closePopup}
                className="w-full py-4 bg-pink-500 text-white font-black rounded-2xl shadow-lg shadow-pink-500/30 hover:scale-[1.02] transition-transform text-lg"
              >
                Sweet! Let’s Explore Connect
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
