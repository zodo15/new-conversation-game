import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { PlayCircle, PauseCircle } from 'lucide-react';

interface TimerProps {
  duration: number;
  onComplete: () => void;
}

export const Timer: React.FC<TimerProps> = ({ duration, onComplete }) => {
  const [timeLeft, setTimeLeft] = useState(duration);
  const [isRunning, setIsRunning] = useState(true);

  useEffect(() => {
    if (!isRunning) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          onComplete();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isRunning, onComplete]);

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="flex items-center gap-3 bg-white/10 px-4 py-2 rounded-lg cursor-pointer"
      onClick={toggleTimer}
    >
      {isRunning ? (
        <PauseCircle className="w-5 h-5 text-yellow-400" />
      ) : (
        <PlayCircle className="w-5 h-5 text-green-400" />
      )}
      <span className="font-mono text-lg font-semibold text-white">
        {formatTime(timeLeft)}
      </span>
    </motion.div>
  );
};