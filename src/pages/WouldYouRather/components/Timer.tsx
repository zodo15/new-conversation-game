import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Play, Pause } from 'lucide-react';
import { TimerProps } from '../types';

export const Timer: React.FC<TimerProps> = ({ duration, onComplete }) => {
  const [timeLeft, setTimeLeft] = useState(duration);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (timeLeft === 0) {
      onComplete();
      return;
    }

    if (!isPaused) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => Math.max(0, prev - 1));
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [timeLeft, isPaused, onComplete]);

  const togglePause = () => {
    setIsPaused(!isPaused);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed bottom-4 right-4 bg-white rounded-lg shadow-lg p-4 flex items-center space-x-4"
    >
      <button
        onClick={togglePause}
        className="p-2 rounded-full hover:bg-gray-100 transition-colors"
      >
        {isPaused ? <Play className="w-6 h-6" /> : <Pause className="w-6 h-6" />}
      </button>
      <div className="text-2xl font-bold">{timeLeft}s</div>
    </motion.div>
  );
};