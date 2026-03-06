import { motion, AnimatePresence } from 'motion/react';
import { useEffect, useState } from 'react';

export default function Loader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: 'blur(20px)' }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] bg-white flex items-center justify-center overflow-hidden"
        >
          {/* Background Glows */}
          <div className="absolute inset-0">
            <motion.div
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-golden rounded-full blur-[120px]"
            />
          </div>
          <motion.div
            initial={{ scale: 0.8, opacity: 0, filter: 'blur(10px)' }}
            animate={{ 
              scale: [0.8, 1.1, 1], 
              opacity: 1, 
              filter: ['blur(10px)', 'blur(0px)', 'blur(0px)'] 
            }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="relative z-10 flex flex-col items-center"
          >
            <div className="w-24 h-24 bg-brand-golden rounded-[2rem] flex items-center justify-center shadow-[0_0_50px_rgba(153,27,27,0.5)] mb-8">
              <span className="text-white font-display font-black text-5xl">$</span>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-center"
            >
              <h2 className="text-4xl font-display font-black text-brand-primary tracking-tighter mb-2">SALEMORE</h2>
              <div className="h-1 w-full bg-brand-primary/10 rounded-full overflow-hidden">
                <motion.div
                  initial={{ x: '-100%' }}
                  animate={{ x: '100%' }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                  className="h-full w-1/2 bg-brand-golden"
                />
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
