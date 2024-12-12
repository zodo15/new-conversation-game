import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaArrowLeft } from "react-icons/fa6";
import toast from 'react-hot-toast';

interface ChaosWheelProps {
  players: string[];
  onComplete: (selectedPlayer: string) => void;
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

export const ChaosWheel: React.FC<ChaosWheelProps> = ({ players, onComplete, onBack }) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [lastSelectedPlayer, setLastSelectedPlayer] = useState<string | null>(null);

  const spinWheel = () => {
    if (isSpinning || players.length === 0) return;
    
    setIsSpinning(true);
    const spins = 5 + Math.floor(Math.random() * 3); // Random number of spins between 5-7
    const baseRotation = 360 * spins;
    
    // Ensure we don't select the same player twice
    let availablePlayers = players.filter(player => player !== lastSelectedPlayer);
    if (availablePlayers.length === 0) {
      availablePlayers = players; // Reset if all players have been selected
    }
    
    // Calculate random offset to land on a new player
    const segmentSize = 360 / players.length;
    const selectedPlayerIndex = Math.floor(Math.random() * availablePlayers.length);
    const selectedPlayer = availablePlayers[selectedPlayerIndex];
    const playerIndex = players.indexOf(selectedPlayer);
    const randomOffset = (playerIndex * segmentSize) + (Math.random() * (segmentSize * 0.5));
    
    const totalRotation = baseRotation + randomOffset;
    setRotation(prev => prev + totalRotation);

    setTimeout(() => {
      setIsSpinning(false);
      setLastSelectedPlayer(selectedPlayer);
      toast.success(`${selectedPlayer} is now the Chaos Master!`, {
        icon: '🎲',
        duration: 2000
      });
      onComplete(selectedPlayer);
    }, 3000);
  };

  useEffect(() => {
    // Auto-spin on mount
    spinWheel();
  }, []);

  const segmentSize = 360 / players.length;

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] relative">
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={onBack}
        className="absolute top-4 left-4 text-white/80 hover:text-white flex items-center gap-2"
      >
        <FaArrowLeft />
        <span>Back</span>
      </motion.button>

      <div className="relative w-80 h-80">
        {/* Wheel */}
        <motion.div
          className="absolute inset-0 rounded-full overflow-hidden"
          style={{
            transformOrigin: 'center',
            rotate: `${rotation}deg`,
            transition: isSpinning ? 'all 3s cubic-bezier(0.3, 0, 0.2, 1)' : undefined
          }}
        >
          {players.map((player, index) => (
            <div
              key={index}
              className="absolute w-full h-full"
              style={{
                clipPath: 'polygon(50% 50%, 50% 0%, 100% 0%, 100% 100%)',
                transform: `rotate(${index * segmentSize}deg)`,
                backgroundColor: COLORS[index % COLORS.length],
              }}
            >
              <div
                className="absolute left-1/2 top-12 -translate-x-1/2 transform"
                style={{ transform: `translateX(-50%) rotate(${-90 - (index * segmentSize)}deg)` }}
              >
                <span className="text-white font-bold whitespace-nowrap text-lg">{player}</span>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Center point */}
        <div className="absolute top-1/2 left-1/2 w-6 h-6 -mt-3 -ml-3 bg-white rounded-full shadow-lg z-10" />

        {/* Pointer */}
        <div className="absolute -right-6 top-1/2 -mt-6 w-12 h-12 z-20">
          <div className="w-0 h-0 border-t-[24px] border-t-transparent border-l-[36px] border-l-white border-b-[24px] border-b-transparent" />
        </div>
      </div>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={spinWheel}
        disabled={isSpinning}
        className={`mt-8 px-8 py-3 rounded-xl font-bold text-white transition-colors ${
          isSpinning
            ? 'bg-gray-500 cursor-not-allowed'
            : 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600'
        }`}
      >
        {isSpinning ? 'Spinning...' : 'Spin Again'}
      </motion.button>
    </div>
  );
};

export default ChaosWheel;
