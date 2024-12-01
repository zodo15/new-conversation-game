import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { ChaosMasterProps } from '../types';

const chaosEvents: string[] = [
  'Double Points',
  'Reverse Scoring',
  'Speed Round',
  'Skip Turn',
  'Switch Players'
];

export const ChaosMaster: React.FC<ChaosMasterProps> = ({
  isVisible,
  onClose,
  onComplete,
}) => {
  const [currentEvent, setCurrentEvent] = useState<string | null>(null);

  const handleEventSelect = (event: string) => {
    onComplete?.(event);
    onClose();
  };

  useEffect(() => {
    if (isVisible) {
      const event = chaosEvents[Math.floor(Math.random() * chaosEvents.length)];
      setCurrentEvent(event);
      onComplete?.(event);
    }
  }, [isVisible, onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-gradient-to-br from-purple-900 to-indigo-900 p-6 rounded-xl shadow-xl max-w-md w-full mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 mb-6">
              <Sparkles className="w-6 h-6 text-yellow-400" />
              <h2 className="text-2xl font-bold text-white">Chaos Master</h2>
            </div>

            <div className="space-y-3">
              {currentEvent && (
                <div className="text-xl mb-4">
                  Event: {currentEvent}
                </div>
              )}
              {chaosEvents.map((event) => (
                <motion.button
                  key={event}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleEventSelect(event)}
                  className="w-full p-4 bg-white/10 hover:bg-white/20 rounded-lg text-white text-left transition-colors"
                >
                  {event}
                </motion.button>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
