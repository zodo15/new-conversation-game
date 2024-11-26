import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Sparkles, X, Dice6 } from 'lucide-react';
import { ChaosChallenge, chaosChallenges } from '../data/chaosData';

interface ChaosButtonProps {
  isChaosMaster: boolean;
}

export const ChaosButton = ({ isChaosMaster }: ChaosButtonProps) => {
  const [showModal, setShowModal] = useState(false);
  const [currentChallenge, setCurrentChallenge] = useState<ChaosChallenge | null>(null);

  const getRandomChallenge = () => {
    const randomIndex = Math.floor(Math.random() * chaosChallenges.length);
    return chaosChallenges[randomIndex];
  };

  const handleChaosClick = () => {
    if (!isChaosMaster) return;
    setCurrentChallenge(getRandomChallenge());
    setShowModal(true);
  };

  const handleReroll = () => {
    setCurrentChallenge(getRandomChallenge());
  };

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`
          fixed bottom-8 right-8 
          px-6 py-3 
          rounded-full
          font-bold text-lg
          flex items-center gap-2
          ${isChaosMaster 
            ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white cursor-pointer chaos-pulse' 
            : 'bg-gray-700 text-gray-400 cursor-not-allowed'}
        `}
        onClick={handleChaosClick}
        disabled={!isChaosMaster}
      >
        <Sparkles className="w-5 h-5" />
        Chaos
      </motion.button>

      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="absolute inset-0 bg-black/80"
              onClick={() => setShowModal(false)}
            />
            <motion.div
              className="relative bg-gray-800 rounded-xl p-6 max-w-md w-full"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="mb-4">
                <span className={`
                  px-3 py-1 rounded-full text-sm font-semibold
                  ${currentChallenge?.category === 'VOICES' && 'bg-blue-500/20 text-blue-400'}
                  ${currentChallenge?.category === 'ACTIONS' && 'bg-green-500/20 text-green-400'}
                  ${currentChallenge?.category === 'EMOTIONS' && 'bg-purple-500/20 text-purple-400'}
                  ${currentChallenge?.category === 'STYLES' && 'bg-yellow-500/20 text-yellow-400'}
                `}>
                  {currentChallenge?.category}
                </span>
              </div>

              <h3 className="text-2xl font-bold mb-2">
                {currentChallenge?.challenge}
              </h3>

              {currentChallenge?.description && (
                <p className="text-gray-400 mb-4">
                  {currentChallenge.description}
                </p>
              )}

              <div className="flex justify-between items-center mt-6">
                <div className="flex gap-1">
                  {[...Array(currentChallenge?.difficulty)].map((_, i) => (
                    <span key={i} className="text-yellow-400">⭐</span>
                  ))}
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleReroll}
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg text-white font-semibold"
                >
                  <Dice6 className="w-4 h-4" />
                  Reroll
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}; 