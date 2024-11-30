import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { TimerProps } from '../types';

export const Timer: React.FC<TimerProps> = ({ duration, onDurationChange }) => {
  const [timeLeft, setTimeLeft] = useState(duration);
  const [isPaused, setIsPaused] = useState(false);

  const resetTimer = useCallback(() => {
    setTimeLeft(duration);
    setIsPaused(false);
  }, [duration]);

  useEffect(() => {
    if (!isPaused && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [timeLeft, isPaused]);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getColor = (time: number): string => {
    if (time > duration * 0.6) return 'text-green-400';
    if (time > duration * 0.3) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <div className="flex items-center gap-4">
      <motion.div
        initial={{ scale: 1 }}
        animate={{ scale: timeLeft <= 5 && timeLeft > 0 ? [1, 1.1, 1] : 1 }}
        transition={{ duration: 0.5, repeat: timeLeft <= 5 ? Infinity : 0 }}
        className={`font-mono text-2xl font-bold ${getColor(timeLeft)}`}
      >
        {formatTime(timeLeft)}
      </motion.div>

      <div className="flex gap-2">
        <button
          onClick={() => setIsPaused(!isPaused)}
          className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
        >
          {isPaused ? '▶️' : '⏸️'}
        </button>
        <button
          onClick={resetTimer}
          className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
        >
          🔄
        </button>
        <select
          value={duration}
          onChange={(e) => onDurationChange(Number(e.target.value))}
          className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
        >
          <option value={30}>30s</option>
          <option value={60}>1m</option>
          <option value={120}>2m</option>
          <option value={300}>5m</option>
        </select>
      </div>
    </div>
  );
};