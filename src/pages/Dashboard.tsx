import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaDice, FaQuestion } from 'react-icons/fa';

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
    <div className="container mx-auto px-4 py-8">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl md:text-6xl font-bold text-white text-center mb-12"
      >
        Party Games Dashboard
      </motion.h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {games.map((game) => (
          <Link key={game.path} to={game.path}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="flex items-center mb-4 text-purple-600">
                {game.icon}
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                {game.title}
              </h2>
              <p className="text-gray-600">{game.description}</p>
            </motion.div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;