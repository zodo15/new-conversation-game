import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { SparklesIcon, HeartIcon } from '@heroicons/react/24/outline';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export const MainMenu: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center p-4">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="max-w-4xl w-full space-y-8"
      >
        <motion.div variants={item} className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Party Games
          </h1>
          <p className="text-xl text-white/80">
            Choose your game and start the fun!
          </p>
        </motion.div>

        <motion.div
          variants={item}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <Link
            to="/would-you-rather"
            className="group relative block bg-black/20 backdrop-blur-sm rounded-xl p-8 hover:bg-black/30 transition-all duration-300"
          >
            <div className="flex items-center space-x-4">
              <SparklesIcon className="h-8 w-8 text-yellow-400" />
              <div>
                <h2 className="text-2xl font-semibold text-white">
                  Would You Rather
                </h2>
                <p className="text-white/70">
                  Make impossible choices in this classic party game
                </p>
              </div>
            </div>
          </Link>

          <Link
            to="/truth-or-dare"
            className="group relative block bg-black/20 backdrop-blur-sm rounded-xl p-8 hover:bg-black/30 transition-all duration-300"
          >
            <div className="flex items-center space-x-4">
              <HeartIcon className="h-8 w-8 text-pink-400" />
              <div>
                <h2 className="text-2xl font-semibold text-white">
                  Truth or Dare
                </h2>
                <p className="text-white/70">
                  Challenge your friends with truths and dares
                </p>
              </div>
            </div>
          </Link>
        </motion.div>

        <motion.div variants={item} className="text-center">
          <p className="text-sm text-white/60">
            More games coming soon! Stay tuned.
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};
