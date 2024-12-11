import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import useSound from 'use-sound';

interface TimerProps {
  onTimeout: () => void;
  isActive: boolean;
}

const Timer = ({ onTimeout, isActive }: TimerProps) => {
  const [timeLeft, setTimeLeft] = useState(30);
  const [playTick] = useSound('/tick.mp3', { volume: 0.3 });
  const [playAlarm] = useSound('/alarm.mp3', { volume: 0.5 });

  useEffect(() => {
    if (!isActive) return;

    const interval = setInterval(() => {
      setTimeLeft((time) => {
        if (time <= 1) {
          playAlarm();
          onTimeout();
          return 30;
        }
        if (time <= 5) playTick();
        return time - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isActive, onTimeout, playTick, playAlarm]);

  const color = timeLeft <= 5 ? 'red' : timeLeft <= 10 ? 'yellow' : 'purple';

  return (
    <motion.div
      animate={{
        scale: timeLeft <= 5 ? [1, 1.1, 1] : 1,
      }}
      transition={{ duration: 0.5 }}
      className={`fixed top-4 right-4 bg-gradient-to-br
                ${color === 'red' ? 'from-red-900/80 to-red-800/60 border-red-500' :
                  color === 'yellow' ? 'from-yellow-900/80 to-yellow-800/60 border-yellow-500' :
                  'from-purple-900/80 to-purple-800/60 border-purple-500'}
                p-6 rounded-full border-2 backdrop-blur-sm
                shadow-[0_0_20px_rgba(147,51,234,0.3)]`}
    >
      <span className={`text-3xl font-bold
                     ${color === 'red' ? 'text-red-400' :
                       color === 'yellow' ? 'text-yellow-400' :
                       'text-purple-400'}`}>
        {timeLeft}
      </span>
    </motion.div>
  );
};

export default Timer;