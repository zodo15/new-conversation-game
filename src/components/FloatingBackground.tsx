import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Dumbbell, Palette, Users } from 'lucide-react';

interface FloatingIconProps {
  icon: React.ElementType;
  className?: string;
  delay?: number;
}

const FloatingIcon = ({ icon: Icon, className = "", delay = 0 }: FloatingIconProps) => (
  <motion.div
    initial={{ y: 0 }}
    animate={{ 
      y: [-10, 10, -10],
      rotate: [-5, 5, -5]
    }}
    transition={{ 
      duration: 4,
      repeat: Infinity,
      delay 
    }}
    className={`absolute opacity-20 ${className}`}
  >
    <Icon className="w-12 h-12 text-white" />
  </motion.div>
);

export const FloatingBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 animate-gradient-xy" />
      <div className="absolute inset-0">
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={i}
            className="absolute animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 10}s`,
            }}
          >
            <div
              className="w-4 h-4 bg-white bg-opacity-10 rounded-full"
              style={{
                filter: 'blur(1px)',
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
