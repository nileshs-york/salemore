import { useEffect, useState } from 'react';
import { motion } from 'motion/react';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      
      const target = e.target as HTMLElement;
      setIsPointer(window.getComputedStyle(target).cursor === 'pointer');
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <motion.div
      className="custom-cursor hidden md:flex items-center justify-center"
      animate={{
        x: position.x,
        y: position.y,
        scale: isPointer ? 1.5 : 1,
      }}
      transition={{ type: 'spring', damping: 20, stiffness: 250, mass: 0.5 }}
    >
      <div className="w-8 h-8 bg-candy-pink rounded-full flex items-center justify-center shadow-lg border-2 border-white">
        <span className="text-[10px] font-bold text-white">🍬</span>
      </div>
    </motion.div>
  );
}
