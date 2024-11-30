import { motion } from 'framer-motion';
import { Star } from '@phosphor-icons/react';

interface FloatingBackgroundProps {
  className?: string;
}

export const FloatingBackground: React.FC<FloatingBackgroundProps> = ({ className = '' }) => {
  return (
    <div className={`fixed inset-0 -z-10 overflow-hidden ${className}`}>
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
          }}
          animate={{
            x: [
              Math.random() * window.innerWidth,
              Math.random() * window.innerWidth,
              Math.random() * window.innerWidth,
            ],
            y: [
              Math.random() * window.innerHeight,
              Math.random() * window.innerHeight,
              Math.random() * window.innerHeight,
            ],
          }}
          transition={{
            duration: 20 + Math.random() * 10,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          <Star
            size={24}
            weight="fill"
            className="text-primary/20"
          />
        </motion.div>
      ))}
    </div>
  );
};
