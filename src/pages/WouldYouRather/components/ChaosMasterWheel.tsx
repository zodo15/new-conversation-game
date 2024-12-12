import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ChaosMasterProps {
  players: string[];
  onComplete: (selectedPlayer: string, selectedIndex: number) => void;
  onBack: () => void;
}

const COLORS = [
  '#FF4B4B',  // Red
  '#4169E1',  // Blue
  '#32CD32',  // Green
  '#FFD700',  // Yellow
  '#FF1493',  // Pink
  '#9400D3',  // Purple
  '#FF8C00',  // Orange
  '#00CED1',  // Cyan
];

export const ChaosMasterWheel: React.FC<ChaosMasterProps> = ({
  players,
  onComplete,
  onBack
}) => {
  const [spinning, setSpinning] = useState(false);
  const [rotationAngle, setRotationAngle] = useState(0);
  const [lastSelectedPlayer, setLastSelectedPlayer] = useState<string | null>(null);

  const spinWheel = useCallback(() => {
    if (spinning || players.length === 0) return;
    
    setSpinning(true);
    
    // Filter out the last selected player
    let availablePlayers = players;
    if (lastSelectedPlayer && players.length > 1) {
      availablePlayers = players.filter(player => player !== lastSelectedPlayer);
    }
    
    // Select a random player from available players
    const selectedPlayerIndex = Math.floor(Math.random() * availablePlayers.length);
    const selectedPlayer = availablePlayers[selectedPlayerIndex];
    const actualIndex = players.indexOf(selectedPlayer);
    
    // Calculate rotation to land on the selected player
    const segmentSize = 360 / players.length;
    // Adjust rotation to account for the pointer at top (270 degrees)
    const targetRotation = 270 - (actualIndex * segmentSize);
    const spins = 5 + Math.floor(Math.random() * 3); // 5-7 full spins
    const totalRotation = (spins * 360) + targetRotation;
    
    setRotationAngle(prev => prev + totalRotation);
    
    // Wait for animation to complete before updating game state
    setTimeout(() => {
      setSpinning(false);
      setLastSelectedPlayer(selectedPlayer);
      const finalIndex = players.indexOf(selectedPlayer);
      onComplete(selectedPlayer, finalIndex);
    }, 4000);
  }, [spinning, players, lastSelectedPlayer, onComplete]);

  useEffect(() => {
    const timer = setTimeout(() => {
      spinWheel();
    }, 500);
    return () => clearTimeout(timer);
  }, [spinWheel]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
      >
        <div className="bg-gray-900 rounded-xl p-6 max-w-lg w-full space-y-6 relative">
          <div className="text-center space-y-4">
            <h2 className="text-2xl font-bold">Chaos Master Selection</h2>
            <p className="text-white/70">Spin the wheel to select the Chaos Master!</p>
          </div>

          <div className="relative w-full aspect-square max-w-md mx-auto">
            {/* Pointer */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-4 w-0 h-0 border-l-[15px] border-l-transparent border-r-[15px] border-r-transparent border-b-[30px] border-b-white z-10" />

            {/* Wheel */}
            <motion.div
              className="w-full h-full rounded-full relative overflow-hidden"
              style={{
                rotate: rotationAngle,
                transition: spinning ? 'all 4s cubic-bezier(0.2, 0, 0.2, 1)' : 'none'
              }}
            >
              {players.map((player, index) => {
                const segmentSize = 360 / players.length;
                const rotation = index * segmentSize;
                const color = COLORS[index % COLORS.length];

                return (
                  <div
                    key={index}
                    className="absolute w-full h-full origin-center"
                    style={{
                      transform: `rotate(${rotation}deg)`,
                      clipPath: `polygon(0 0, 50% 0, 50% 100%, 0 100%)`
                    }}
                  >
                    <div
                      className="absolute w-full h-full"
                      style={{ backgroundColor: color }}
                    >
                      <div
                        className="absolute left-2 top-1/2 -translate-y-1/2 text-white font-semibold text-sm sm:text-base whitespace-nowrap transform -rotate-90 origin-left"
                      >
                        {player}
                      </div>
                    </div>
                  </div>
                );
              })}
            </motion.div>
          </div>

          <div className="flex justify-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onBack}
              disabled={spinning}
              className="px-6 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Back
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={spinWheel}
              disabled={spinning}
              className="px-6 py-2 bg-purple-500 rounded-lg hover:bg-purple-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {spinning ? 'Spinning...' : 'Spin'}
            </motion.button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};