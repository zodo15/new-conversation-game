import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Timer as TimerIcon, RotateCw } from 'lucide-react';
import { TimerProps } from '../types';

interface TimerProps {
  duration: number;
  onComplete?: () => void;
}

const DURATION_OPTIONS = [5, 10, 15, 20, 25, 30];

export const Timer: React.FC<TimerProps> = ({ duration, onComplete }) => {
  const [timeLeft, setTimeLeft] = useState(duration);
  const [isRunning, setIsRunning] = useState(true);

  useEffect(() => {
    if (timeLeft <= 0) {
      onComplete?.();
      setIsRunning(false);
      return;
    }

    if (!isRunning) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsRunning(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, onComplete, isRunning]);

  const resetTimer = () => {
    setTimeLeft(duration);
    setIsRunning(true);
  };

  const handleDurationChange = () => {
    const currentIndex = DURATION_OPTIONS.indexOf(duration);
    const nextIndex = (currentIndex + 1) % DURATION_OPTIONS.length;
    const newDuration = DURATION_OPTIONS[nextIndex];
    setTimeLeft(newDuration);
  };

  const percentage = (timeLeft / duration) * 100;

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="relative flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg"
    >
      <div className="relative w-12 h-12">
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="24"
            cy="24"
            r="20"
            fill="none"
            stroke="rgba(255, 255, 255, 0.2)"
            strokeWidth="4"
          />
          <circle
            cx="24"
            cy="24"
            r="20"
            fill="none"
            stroke="white"
            strokeWidth="4"
            strokeDasharray={`${2 * Math.PI * 20}`}
            strokeDashoffset={`${((100 - percentage) / 100) * (2 * Math.PI * 20)}`}
            className="transition-all duration-1000 ease-linear"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-lg font-bold">{timeLeft}s</span>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={resetTimer}
          className="p-2 hover:bg-white/10 rounded-full transition-colors"
        >
          <RotateCw className="w-5 h-5" />
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleDurationChange}
          className="text-sm font-medium hover:bg-white/10 px-2 py-1 rounded transition-colors"
        >
          {duration}s
        </motion.button>
      </div>
    </motion.div>
  );
};