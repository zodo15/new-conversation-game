import React, { useState } from 'react';
import PlayerInput from './components/PlayerInput';
import GameBoard from './components/GameBoard';
import { motion } from 'framer-motion';
import { Sparkles, Zap, Brain, Users, Dumbbell, Palette } from 'lucide-react';
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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 text-white relative overflow-hidden">
      <Toaster position="top-center" />
      <ConfettiComponent />
      
      <FloatingIcon icon={Sparkles} className="top-20 left-20" delay={0} />
      <FloatingIcon icon={Zap} className="top-40 right-40" delay={1} />
      <FloatingIcon icon={Brain} className="bottom-40 left-40" delay={2} />
      <FloatingIcon icon={Users} className="top-60 right-60" delay={3} />
      <FloatingIcon icon={Dumbbell} className="bottom-60 left-60" delay={4} />
      <FloatingIcon icon={Palette} className="top-80 right-80" delay={5} />

      <div className="max-w-4xl mx-auto p-8">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onBack}
          className="mb-8 px-4 py-2 flex items-center gap-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
        >
          Back to Menu
        </motion.button>

        {!gameStarted ? (
          <PlayerInput
            players={players}
            setPlayers={setPlayers}
            onStart={startGame}
          />
        ) : (
          <GameBoard
            players={players}
            onEndGame={resetGame}
          />
        )}
      </div>
      <FeedbackButton />
    </div>
  );
};

export default TruthOrDare;