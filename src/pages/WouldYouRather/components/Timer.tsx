import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';
import { TimerProps } from '../types';

export const Timer: React.FC<TimerProps> = ({ duration, onComplete }) => {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    if (timeLeft === 0) {
      onComplete?.();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => Math.max(0, prev - 1));
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, onComplete]);

  useEffect(() => {
    setTimeLeft(duration);
  }, [duration]);

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center justify-center gap-2"
    >
      <Clock className="w-5 h-5 text-white/80" />
      <div className="text-xl font-medium">{timeLeft}s</div>
    </motion.div>
  );
};