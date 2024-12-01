import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ChaosMasterProps {
  players: string[];
  onComplete: (selectedPlayer: string) => void;
  onClose: () => void;
  onBack: () => void;
}

const colors = [
  'bg-gradient-to-r from-[#FF0000] to-[#FF3333]', // Bright Red
  'bg-gradient-to-r from-[#00FF00] to-[#33FF33]', // Bright Green
  'bg-gradient-to-r from-[#0000FF] to-[#3333FF]', // Bright Blue
  'bg-gradient-to-r from-[#FFFF00] to-[#FFFF33]', // Bright Yellow
  'bg-gradient-to-r from-[#FF00FF] to-[#FF33FF]', // Bright Magenta
  'bg-gradient-to-r from-[#00FFFF] to-[#33FFFF]', // Bright Cyan
  'bg-gradient-to-r from-[#FF8800] to-[#FFAA33]', // Bright Orange
  'bg-gradient-to-r from-[#AA00FF] to-[#CC33FF]'  // Bright Purple
];

export const ChaosMasterWheel: React.FC<ChaosMasterProps> = ({ players, onComplete, onClose }) => {
  const [spinning, setSpinning] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState<string | null>(null);
  const [rotationAngle, setRotationAngle] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      spinWheel();
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const spinWheel = useCallback(() => {
    if (spinning) return;
    
    setSpinning(true);
    const numberOfSpins = 5 + Math.floor(Math.random() * 5);
    const extraDegrees = Math.floor(Math.random() * 360);
    const totalRotation = numberOfSpins * 360 + extraDegrees;
    
    const finalAngle = extraDegrees;
    const sectionSize = 360 / players.length;
    const selectedIndex = Math.floor(((360 - finalAngle) % 360) / sectionSize);
    
    setRotationAngle(totalRotation);
    
    setTimeout(() => {
      setSpinning(false);
      const finalPlayer = players[selectedIndex];
      setSelectedPlayer(finalPlayer);
      onComplete(finalPlayer);
    }, 3000);
  }, [spinning, players, onComplete]);

  const sections = players.map((player, index) => {
    const angle = (index * 360) / players.length;
    const sectionAngle = 360 / players.length;
    const color = colors[index % colors.length];
    
    return (
      <div
        key={player}
        className="absolute w-full h-full origin-center"
        style={{
          transform: `rotate(${angle}deg)`,
        }}
      >
        <div
          className={`absolute inset-0 ${color} opacity-90`}
          style={{
            clipPath: 'polygon(0 0, 50% 0, 50% 100%, 0% 100%)',
          }}
        >
          <div 
            className="absolute whitespace-nowrap text-white font-extrabold text-xl"
            style={{
              left: '25%',
              top: '50%',
              transform: `rotate(${-angle + (180/players.length)}deg)`,
              transformOrigin: 'left center',
              textShadow: '2px 2px 4px rgba(0, 0, 0, 0.75)',
              letterSpacing: '0.05em'
            }}
          >
            {player}
          </div>
        </div>
      </div>
    );
  });

  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      exit={{ scale: 0 }}
      className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50"
    >
      <div className="bg-gradient-to-br from-purple-900 to-indigo-900 p-8 rounded-2xl shadow-2xl max-w-md w-full">
        <div className="relative w-64 h-64 mx-auto">
          <motion.div
            className="w-full h-full rounded-full relative overflow-hidden border-4 border-white/20"
            style={{
              transform: `rotate(${rotationAngle}deg)`,
              transition: spinning ? 'transform 4s cubic-bezier(0.2, 1, 0.3, 1)' : 'none'
            }}
          >
            {sections}
          </motion.div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-2 h-8 bg-white transform -translate-y-1/2" />
          </div>
        </div>
        {selectedPlayer && (
          <div className="mt-6 text-center">
            <span className="text-2xl font-bold text-white bg-purple-800/80 px-4 py-2 rounded-lg shadow-lg">
              {selectedPlayer} is the Chaos Master!
            </span>
          </div>
        )}
      </div>
    </motion.div>
  );
};