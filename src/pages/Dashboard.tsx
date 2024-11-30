import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaDice, FaQuestion } from 'react-icons/fa';
import { FeedbackButton } from '../components/FeedbackButton';

interface GameCard {
  title: string;
  description: string;
  path: string;
  icon: React.ReactNode;
}

const Dashboard: React.FC = () => {
  const games: GameCard[] = [
    {
      title: 'Truth or Dare',
      description: 'The classic party game with a modern twist!',
      path: '/truth-or-dare',
      icon: <FaDice className="w-12 h-12" />,
    },
    {
      title: 'Would You Rather',
      description: 'Make impossible choices and see what others would pick!',
      path: '/would-you-rather',
      icon: <FaQuestion className="w-12 h-12" />,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 to-black relative">
      <div className="container mx-auto px-4 py-8">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-bold text-white text-center mb-16"
        >
          Conversation Games
        </motion.h1>

        <div className="flex flex-col items-center justify-center space-y-8 max-w-md mx-auto">
          {games.map((game, index) => (
            <motion.div
              key={game.path}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="w-full"
            >
              <Link to={game.path} className="block w-full">
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-white border-opacity-20"
                >
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div className="text-purple-400">
                      {game.icon}
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-white mb-2">
                        {game.title}
                      </h2>
                      <p className="text-gray-300">
                        {game.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
      <FeedbackButton />
    </div>
  );
};

export default Dashboard;