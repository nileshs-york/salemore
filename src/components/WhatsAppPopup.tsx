import { useState } from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function WhatsAppPopup() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="absolute bottom-20 right-0 w-80 bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100"
          >
            <div className="bg-[#25D366] p-4 text-white flex justify-between items-center">
              <div>
                <h3 className="font-bold text-lg">Start a Conversation</h3>
                <p className="text-xs opacity-90">The team typically replies in a few minutes.</p>
              </div>
              <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 p-1 rounded-full">
                <X size={20} />
              </button>
            </div>
            <div className="p-4">
              <p className="text-sm text-gray-600 mb-4">Hi! Click one of our member below to chat on WhatsApp</p>
              <a
                href="https://wa.me/919537546363?text=Hi%20Salemore%20support%2C%20I%20visited%20your%20website.%20I%20want%20to%20inquire%20about%20the%20products."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <div className="w-10 h-10 bg-[#25D366] rounded-full flex items-center justify-center text-white">
                  <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                    <path d="M12.031 6.173c-3.21 0-5.823 2.613-5.823 5.823 0 1.026.268 2.03.778 2.912l-.825 3.01 3.08-.808c.85.464 1.805.708 2.77.708h.004c3.21 0 5.823-2.613 5.823-5.823 0-3.21-2.613-5.823-5.823-5.823zm0 10.672h-.003c-.85 0-1.684-.228-2.41-.658l-.173-.103-1.794.47.478-1.748-.113-.182c-.475-.765-.726-1.644-.726-2.544 0-2.69 2.188-4.878 4.878-4.878 2.69 0 4.878 2.188 4.878 4.878 0 2.69-2.188 4.878-4.878 4.878zm2.668-3.654c-.146-.073-.863-.426-.997-.474-.134-.048-.231-.073-.328.073-.097.146-.376.474-.461.571-.085.097-.17.109-.316.036-.146-.073-.616-.227-1.173-.724-.433-.385-.725-.86-.81-1.005-.085-.146-.009-.225.064-.298.066-.065.146-.17.219-.255.073-.085.097-.146.146-.243.048-.097.024-.182-.012-.255-.036-.073-.328-.79-.45-1.081-.118-.283-.24-.245-.328-.249-.085-.004-.183-.005-.28-.005-.097 0-.255.036-.388.182-.133.146-.51.498-.51 1.215 0 .717.522 1.41.595 1.507.073.097 1.03 1.572 2.496 2.204.348.15.62.24.833.307.35.111.669.095.921-.058.281-.17.863-.353.984-.694.121-.341.121-.633.085-.694-.036-.061-.133-.097-.279-.17z" />
                  </svg>
                </div>
                <div>
                  <p className="font-bold text-sm text-gray-900">SaleMore</p>
                  <p className="text-xs text-gray-500">Sales Team</p>
                </div>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-all"
      >
        <svg viewBox="0 0 24 24" width="40" height="40" fill="currentColor">
          <path d="M12.031 6.173c-3.21 0-5.823 2.613-5.823 5.823 0 1.026.268 2.03.778 2.912l-.825 3.01 3.08-.808c.85.464 1.805.708 2.77.708h.004c3.21 0 5.823-2.613 5.823-5.823 0-3.21-2.613-5.823-5.823-5.823zm0 10.672h-.003c-.85 0-1.684-.228-2.41-.658l-.173-.103-1.794.47.478-1.748-.113-.182c-.475-.765-.726-1.644-.726-2.544 0-2.69 2.188-4.878 4.878-4.878 2.69 0 4.878 2.188 4.878 4.878 0 2.69-2.188 4.878-4.878 4.878zm2.668-3.654c-.146-.073-.863-.426-.997-.474-.134-.048-.231-.073-.328.073-.097.146-.376.474-.461.571-.085.097-.17.109-.316.036-.146-.073-.616-.227-1.173-.724-.433-.385-.725-.86-.81-1.005-.085-.146-.009-.225.064-.298.066-.065.146-.17.219-.255.073-.085.097-.146.146-.243.048-.097.024-.182-.012-.255-.036-.073-.328-.79-.45-1.081-.118-.283-.24-.245-.328-.249-.085-.004-.183-.005-.28-.005-.097 0-.255.036-.388.182-.133.146-.51.498-.51 1.215 0 .717.522 1.41.595 1.507.073.097 1.03 1.572 2.496 2.204.348.15.62.24.833.307.35.111.669.095.921-.058.281-.17.863-.353.984-.694.121-.341.121-.633.085-.694-.036-.061-.133-.097-.279-.17z" />
        </svg>
      </button>
    </div>
  );
}
