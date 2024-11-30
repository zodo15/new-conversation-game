import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SparklesIcon, HeartIcon, StarIcon, BeakerIcon, BoltIcon } from '@heroicons/react/24/outline';
import TruthOrDare from './pages/TruthOrDare/App';
import WouldYouRather from './pages/WouldYouRather/App';
import { FeedbackButton } from './components/FeedbackButton';

type GameType = 'truth-or-dare' | 'would-you-rather' | null;

const App: React.FC = () => {
  const [selectedGame, setSelectedGame] = useState<GameType>(null);

  const FloatingIcon = ({ icon: Icon, className = "", delay = 0 }: { icon: React.ElementType; className?: string; delay?: number }) => (
    <motion.div
      initial={{ y: 0 }}
      animate={{ 
        y: [-10, 10, -10],
        rotate: [-5, 5, -5]
      }}
      transition={{ 
        duration: 4,
        repeat: Infinity,
        delay 
      }}
      className={`absolute text-white/40 ${className}`}
    >
      <Icon className="w-12 h-12" />
    </motion.div>
  );

  const GameCard = ({ title, onClick }: { title: string; onClick: () => void }) => (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="w-full max-w-md cursor-pointer"
      onClick={onClick}
    >
      <div className="p-8 bg-white/10 hover:bg-white/20 rounded-xl transition-all shadow-lg backdrop-blur-sm">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent text-center">
          {title}
        </h2>
      </div>
    </motion.div>
  );

  if (selectedGame === 'truth-or-dare') {
    return <TruthOrDare onBack={() => setSelectedGame(null)} />;
  }

  if (selectedGame === 'would-you-rather') {
    return <WouldYouRather onBack={() => setSelectedGame(null)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 relative overflow-hidden">
      <div className="container mx-auto px-4 py-12 relative z-10">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-bold text-center text-white mb-16"
        >
          Conversation Games
        </motion.h1>

        <div className="flex flex-col items-center space-y-8 max-w-md mx-auto mb-16">
          <GameCard
            title="Truth or Dare"
            onClick={() => setSelectedGame('truth-or-dare')}
          />
          <GameCard
            title="Would You Rather"
            onClick={() => setSelectedGame('would-you-rather')}
          />
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center text-white/70 text-lg font-semibold"
        >
          <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            More Games Coming Soon...
          </span>
        </motion.div>
      </div>

      <FloatingIcon icon={SparklesIcon} className="top-20 left-20" />
      <FloatingIcon icon={HeartIcon} className="top-40 right-20" delay={1} />
      <FloatingIcon icon={StarIcon} className="bottom-20 left-40" delay={2} />
      <FloatingIcon icon={BeakerIcon} className="top-1/2 right-1/3" delay={1.5} />
      <FloatingIcon icon={BoltIcon} className="bottom-40 right-40" delay={0.5} />
      
      <FeedbackButton />
    </div>
  );
};

export default App;