import React from 'react';
import PlayerInput from './components/PlayerInput';
import { GameBoard } from './components/GameBoard';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Zap, Brain, Users, Dumbbell, Palette, MoveLeft } from 'lucide-react';
import useConfetti from './hooks/useConfetti';
import { useNavigate } from 'react-router-dom';

interface FloatingIconProps {
  icon: React.ElementType;
  className?: string;
  delay?: number;
}

const TruthOrDareApp = () => {
  const [players, setPlayers] = React.useState<string[]>([]);
  const [gameStarted, setGameStarted] = React.useState(false);
  const { startConfetti, ConfettiComponent } = useConfetti();
  const navigate = useNavigate();

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

  const FloatingIcon = ({ icon: Icon, className = "", delay = 0 }: FloatingIconProps) => (
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
      <ConfettiComponent />
      
      {/* Floating Background Icons */}
      <FloatingIcon icon={Sparkles} className="top-20 left-[15%]" />
      <FloatingIcon icon={Zap} className="top-40 right-[20%]" delay={1} />
      <FloatingIcon icon={Brain} className="bottom-40 left-[25%]" delay={2} />
      <FloatingIcon icon={Users} className="top-60 right-[25%]" delay={1.5} />
      <FloatingIcon icon={Dumbbell} className="bottom-20 right-[15%]" delay={0.5} />
      <FloatingIcon icon={Palette} className="top-32 left-[30%]" delay={2.5} />

      {/* Animated Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 animate-gradient-xy"></div>

      <div className="container mx-auto px-4 py-8 relative">
        <AnimatePresence>
          <header className="text-center mb-12">
            <motion.h1
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text"
            >
              Truth or Dare
            </motion.h1>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-white/60 text-lg"
            >
              The classic party game with a modern twist
            </motion.p>
          </header>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/')}
            className="mb-6 px-6 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors font-semibold shadow-lg flex items-center gap-2 absolute top-4 left-4"
          >
            <MoveLeft className="w-5 h-5" />
            Back to Dashboard
          </motion.button>

          <main className="flex flex-col items-center justify-center">
            {!gameStarted ? (
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.4 }}
                className="w-full max-w-md"
              >
                <PlayerInput 
                  players={players} 
                  setPlayers={setPlayers} 
                  onStartGame={startGame}
                />
              </motion.div>
            ) : (
              <GameBoard 
                players={players} 
                onEndGame={resetGame}
              />
            )}
          </main>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default TruthOrDareApp;