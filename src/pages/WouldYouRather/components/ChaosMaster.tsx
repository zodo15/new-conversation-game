import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap } from 'lucide-react';
import { ChaosMasterProps } from '../types';

export const ChaosMaster: React.FC<ChaosMasterProps> = ({
  isActive,
  onChaosEvent,
  timeInterval = 30000, // Default 30 seconds
}) => {
  const [timeUntilNextEvent, setTimeUntilNextEvent] = useState(timeInterval);
  const [isEventActive, setIsEventActive] = useState(false);

  useEffect(() => {
    if (!isActive) return;

    const timer = setInterval(() => {
      setTimeUntilNextEvent((prev) => {
        if (prev <= 0) {
          // Trigger chaos event
          setIsEventActive(true);
          onChaosEvent();
          setTimeout(() => setIsEventActive(false), 2000);
          return timeInterval;
        }
        return prev - 1000;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isActive, timeInterval, onChaosEvent]);

  const progress = (timeUntilNextEvent / timeInterval) * 100;

  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed bottom-4 right-4 flex items-center gap-4"
        >
          <div className="relative w-12 h-12">
            <svg className="transform -rotate-90 w-full h-full">
              <circle
                cx="24"
                cy="24"
                r="20"
                stroke="#e2e8f0"
                strokeWidth="4"
                fill="none"
              />
              <circle
                cx="24"
                cy="24"
                r="20"
                stroke="#eab308"
                strokeWidth="4"
                fill="none"
                strokeDasharray={`${2 * Math.PI * 20}`}
                strokeDashoffset={`${((100 - progress) / 100) * (2 * Math.PI * 20)}`}
                className="transition-all duration-1000 ease-linear"
              />
            </svg>
            <motion.div
              animate={isEventActive ? {
                scale: [1, 1.2, 1],
                rotate: [0, 360],
              } : {}}
              className="absolute inset-0 flex items-center justify-center"
            >
              <Zap
                className={`w-6 h-6 ${
                  isEventActive ? 'text-yellow-400' : 'text-yellow-500'
                }`}
              />
            </motion.div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
            <div className="text-sm font-medium text-white">
              Chaos Mode Active
            </div>
            <div className="text-xs text-white/60">
              Next event in {Math.ceil(timeUntilNextEvent / 1000)}s
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
