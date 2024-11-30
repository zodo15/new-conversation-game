import React from 'react';
import { motion } from 'framer-motion';
import { useGameStore } from '../store/gameStore';

export const AgeVerification = () => {
  const setAgeVerified = useGameStore((state) => state.setAgeVerified);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black/90 flex items-center justify-center z-50"
    >
      <div className="bg-gray-900 p-8 rounded-lg border-2 border-purple-500 shadow-[0_0_20px_rgba(147,51,234,0.5)]">
        <h2 className="text-2xl text-purple-400 mb-6 font-bold text-center">
          Age Verification Required
        </h2>
        <p className="text-gray-300 mb-6">
          This content is intended for adults aged 21 and older.
        </p>
        <div className="flex gap-4">
          <button
            onClick={() => setAgeVerified(true)}
            className="px-6 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 
                     transition-all duration-300 shadow-[0_0_10px_rgba(147,51,234,0.5)]
                     hover:shadow-[0_0_20px_rgba(147,51,234,0.7)]"
          >
            I am 21+
          </button>
          <a
            href="https://www.google.com"
            className="px-6 py-2 bg-gray-700 text-white rounded hover:bg-gray-600 transition-all duration-300"
          >
            Exit
          </a>
        </div>
      </div>
    </motion.div>
  );
};