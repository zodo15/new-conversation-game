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

  useEffect(() => {
    // Auto-spin on mount
    spinWheel();
  }, []);

  const spinWheel = () => {
    if (isSpinning) return;
    
    setIsSpinning(true);
    const spins = 5 + Math.floor(Math.random() * 3); // Random number of spins between 5-7
    const baseRotation = 360 * spins;
    const randomOffset = Math.random() * 360;
    const totalRotation = baseRotation + randomOffset;
    
    setRotation(prev => prev + totalRotation);

    setTimeout(() => {
      const normalizedRotation = totalRotation % 360;
      const segmentSize = 360 / players.length;
      const selectedIndex = Math.floor(normalizedRotation / segmentSize);
      const selectedPlayer = players[players.length - 1 - selectedIndex];
      
      setIsSpinning(false);
      toast.success(`${selectedPlayer} is now the Chaos Master!`, {
        icon: '',
        duration: 4000
      });
      onComplete(selectedPlayer);
    }, 3000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
    >
      <div className="bg-gradient-to-br from-[#4A1D6A] via-[#2E0F45] to-[#1A0527] p-8 rounded-xl shadow-2xl max-w-md w-full mx-4 relative">
        <button
          onClick={onBack}
          className="absolute top-4 left-4 p-2 hover:bg-white/10 rounded-full transition-colors"
        >
          <FaArrowLeft className="w-6 h-6" />
        </button>

        <h2 className="text-2xl font-bold text-center mb-6 bg-gradient-to-r from-[#E4A1FF] to-[#FF9CEE] text-transparent bg-clip-text">
          Selecting Chaos Master...
        </h2>

        <div className="relative aspect-square mb-6">
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[15px] border-l-transparent border-r-[15px] border-r-transparent border-b-[30px] border-b-[#E4A1FF] z-20" />
          
          <motion.div
            className="absolute inset-0"
            animate={{ rotate: rotation }}
            transition={{ duration: 3, ease: [0.11, 0.8, 0.33, 1] }}
          >
            <svg viewBox="0 0 100 100" className="w-full h-full">
              {players.map((player, index) => {
                const startAngle = (index * 360) / players.length;
                const endAngle = ((index + 1) * 360) / players.length;
                
                const startRad = (startAngle * Math.PI) / 180;
                const endRad = (endAngle * Math.PI) / 180;
                
                const x1 = 50 + 50 * Math.cos(startRad);
                const y1 = 50 + 50 * Math.sin(startRad);
                const x2 = 50 + 50 * Math.cos(endRad);
                const y2 = 50 + 50 * Math.sin(endRad);
                
                const largeArc = endAngle - startAngle <= 180 ? 0 : 1;
                
                const path = [
                  'M', 50, 50,
                  'L', x1, y1,
                  'A', 50, 50, 0, largeArc, 1, x2, y2,
                  'Z'
                ].join(' ');

                // Calculate star position
                const midAngle = (startAngle + endAngle) / 2;
                const midRad = (midAngle * Math.PI) / 180;
                const starX = 50 + 35 * Math.cos(midRad);
                const starY = 50 + 35 * Math.sin(midRad);
                
                return (
                  <g key={player}>
                    <path
                      d={path}
                      fill={COLORS[index % COLORS.length]}
                      className="stroke-white/20 stroke-2 transition-all hover:brightness-110"
                    />
                    {/* Add star */}
                    <path
                      d="M 0,-3 L 0.9,-0.9 L 3,0 L 0.9,0.9 L 0,3 L -0.9,0.9 L -3,0 L -0.9,-0.9 Z"
                      fill="white"
                      transform={`translate(${starX},${starY}) scale(2)`}
                      className="filter drop-shadow-md"
                    />
                  </g>
                );
              })}

              {/* Center circle */}
              <circle
                cx="50"
                cy="50"
                r="8"
                fill="#1A0527"
                stroke="white"
                strokeOpacity="0.3"
                strokeWidth="2"
              />
            </svg>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};
