import React, { useState } from 'react';
import PlayerInput from './components/PlayerInput';
import { GameBoard } from './components/GameBoard';
import { motion } from 'framer-motion';
import { Sparkles, Users, Brain, Dumbbell, Palette } from '@phosphor-icons/react';
import useConfetti from './hooks/useConfetti';
import { Toaster } from 'react-hot-toast';
import { FeedbackButton } from '../../components/FeedbackButton';

interface Props {
  onBack: () => void;
}

const TruthOrDare: React.FC<Props> = ({ onBack }) => {
  const [players, setPlayers] = useState<string[]>([]);
  const [gameStarted, setGameStarted] = useState(false);
  const { startConfetti, ConfettiComponent } = useConfetti();

  const startGame = () => {
    if (players.length >= 2) {
      startConfetti();
      setGameStarted(true);
    }
  };

  const resetGame = () => {
    setGameStarted(false);
    setPlayers([]);
  };

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
      className={`absolute opacity-20 ${className}`}
    >
      <Icon className="w-12 h-12" />
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-purple-900 text-white relative overflow-hidden">
      <Toaster position="top-center" />
      <ConfettiComponent />
      <FeedbackButton className="absolute top-4 right-4" />

      {/* Floating Icons */}
      <FloatingIcon icon={Sparkles} className="top-20 left-20" />
      <FloatingIcon icon={Users} className="top-40 right-40" delay={1} />
      <FloatingIcon icon={Brain} className="bottom-40 left-40" delay={2} />
      <FloatingIcon icon={Dumbbell} className="bottom-20 right-20" delay={3} />
      <FloatingIcon icon={Palette} className="top-1/2 left-1/2" delay={4} />

      {gameStarted ? (
        <GameBoard onBack={resetGame} />
      ) : (
        <div className="container mx-auto px-4 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto"
          >
            <h1 className="text-4xl font-bold text-center mb-8">Truth or Dare</h1>
            <PlayerInput
              players={players}
              setPlayers={setPlayers}
              onStartGame={startGame}
              onBack={onBack}
            />
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default TruthOrDare;