import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Timer as TimerIcon, RotateCcw } from 'lucide-react';

export interface TimerProps {
  duration: number;
  onComplete: () => void;
}

export const Timer: React.FC<TimerProps> = ({ duration, onComplete }) => {
  const [timeLeft, setTimeLeft] = useState(duration);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    if (!isActive || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsActive(false);
          onComplete();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isActive, timeLeft, onComplete]);

  const resetTimer = () => {
    setTimeLeft(duration);
    setIsActive(true);
  };

  const progress = (timeLeft / duration) * 100;

  return (
    <div className="relative flex items-center gap-2">
      <motion.div
        className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white font-bold"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 10 }}
      >
        {timeLeft}
      </motion.div>
      {!isActive && (
        <button
          onClick={resetTimer}
          className="p-2 hover:bg-white/20 rounded-full transition-colors"
        >
          <RotateCcw className="w-5 h-5" />
        </button>
      )}
    </div>
  );
};