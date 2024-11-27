import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { SparklesIcon, CubeIcon, XMarkIcon } from '@heroicons/react/24/outline';
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
        <SparklesIcon className="w-5 h-5" />
        Chaos
      </motion.button>

      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-0 flex items-center justify-center p-4 bg-black/50"
          >
            <motion.div
              className="bg-gray-800 p-6 rounded-xl max-w-md w-full shadow-xl"
              initial={{ y: 20 }}
              animate={{ y: 0 }}
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Chaos Challenge</h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="p-1 hover:bg-gray-700 rounded-full transition-colors"
                >
                  <XMarkIcon className="w-6 h-6" />
                </button>
              </div>

              {currentChallenge && (
                <div className="space-y-4">
                  <p className="text-lg">{currentChallenge.description}</p>
                  <div className="flex justify-end gap-2">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleReroll}
                      className="px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors flex items-center gap-2"
                    >
                      <CubeIcon className="w-5 h-5" />
                      Reroll
                    </motion.button>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};