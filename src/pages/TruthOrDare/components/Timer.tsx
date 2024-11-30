import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface TimerProps {
  duration: number;
}

export const Timer: React.FC<TimerProps> = ({ duration }) => {
  const [timeLeft, setTimeLeft] = useState(duration);
  const [isRunning, setIsRunning] = useState(true);

  useEffect(() => {
    if (!isRunning) return;

    const timer = setInterval(() => {
      setTimeLeft((time) => {
        if (time <= 1) {
          clearInterval(timer);
          setIsRunning(false);
          return 0;
        }
        return time - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isRunning]);

  const progress = (timeLeft / duration) * 100;

  return (
    <div className="relative w-24 h-24">
      <svg className="w-full h-full transform -rotate-90">
        <circle
          cx="48"
          cy="48"
          r="44"
          stroke="currentColor"
          strokeWidth="8"
          fill="transparent"
          className="text-white/10"
        />
        <motion.circle
          cx="48"
          cy="48"
          r="44"
          stroke="currentColor"
          strokeWidth="8"
          fill="transparent"
          strokeDasharray={276.46}
          strokeDashoffset={276.46 - (276.46 * progress) / 100}
          className="text-purple-500"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-2xl font-bold">{timeLeft}</span>
      </div>
    </div>
  );
};