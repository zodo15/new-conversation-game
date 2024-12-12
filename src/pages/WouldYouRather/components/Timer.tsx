import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { FaClock, FaPlay, FaPause } from "react-icons/fa6";

interface TimerProps {
  duration: number;
  onComplete?: () => void;
  key?: number;
}

export const Timer = ({ duration, onComplete, key }: TimerProps) => {
  const [timeLeft, setTimeLeft] = useState(duration);
  const [isRunning, setIsRunning] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current!);
            setIsRunning(false);
            onComplete?.();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isRunning, timeLeft, onComplete]);

  const handleClick = () => {
    if (timeLeft === 0) {
      // Reset timer if it's finished
      setTimeLeft(duration);
      setIsRunning(true);
    } else {
      // Toggle timer if it's running or paused
      setIsRunning(!isRunning);
    }
  };

  const progress = (timeLeft / duration) * 100;

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleClick}
      className="relative flex items-center justify-center bg-white/10 rounded-lg p-2 sm:p-3 hover:bg-white/20 transition-colors group"
    >
      <div className="absolute inset-0.5 rounded-lg overflow-hidden">
        <div
          className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-1000 ease-linear origin-left"
          style={{
            transform: `scaleX(${progress / 100})`,
            opacity: 0.2
          }}
        />
      </div>

      <div className="flex items-center gap-2">
        <FaClock className="w-4 h-4 sm:w-5 sm:h-5" />
        <span className="font-mono text-sm sm:text-base">
          {Math.floor(timeLeft / 60).toString().padStart(2, '0')}:
          {(timeLeft % 60).toString().padStart(2, '0')}
        </span>
        {isRunning ? (
          <FaPause className="w-3 h-3 sm:w-4 sm:h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
        ) : (
          <FaPlay className="w-3 h-3 sm:w-4 sm:h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
        )}
      </div>
    </motion.button>
  );
};
