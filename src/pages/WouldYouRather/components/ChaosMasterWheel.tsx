import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ChaosMasterProps {
  players: string[];
  onComplete: (selectedPlayer: string) => void;
  onEffect?: (effect: string) => void;
  onAction?: () => void;
  onClose: () => void;
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
    
    setRotationAngle(prev => prev + totalRotation);
    
    setTimeout(() => {
      setSpinning(false);
      const finalPlayer = players[selectedIndex];
      setSelectedPlayer(finalPlayer);
      onComplete(finalPlayer);
    }, 3000);
  }, [spinning, players, onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div className="bg-gradient-to-br from-[#4A1D6A] via-[#2E0F45] to-[#1A0527] p-8 rounded-xl shadow-2xl max-w-md w-full mx-4 relative">
          <button
            onClick={onBack}
            className="absolute top-4 left-4 p-2 hover:bg-white/10 rounded-full transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>

          <h2 className="text-2xl font-bold text-center mb-6 bg-gradient-to-r from-[#E4A1FF] to-[#FF9CEE] text-transparent bg-clip-text">
            Selecting Chaos Master...
          </h2>

          <div className="relative aspect-square mb-6">
            {/* Pointer triangle */}
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[15px] border-l-transparent border-r-[15px] border-r-transparent border-b-[30px] border-b-[#E4A1FF] z-20" />
            
            <motion.div
              className="absolute inset-0"
              style={{ 
                rotate: rotationAngle,
                transition: spinning ? 'all 3s cubic-bezier(0.2, 1, 0.3, 1)' : 'none'
              }}
            >
              <svg viewBox="0 0 100 100" className="w-full h-full">
                {players.map((player, index) => {
                  const angle = (index * 360) / players.length;
                  const nextAngle = ((index + 1) * 360) / players.length;
                  
                  // Calculate segment path
                  const startAngle = (angle * Math.PI) / 180;
                  const endAngle = (nextAngle * Math.PI) / 180;
                  
                  const x1 = 50 + 50 * Math.cos(startAngle);
                  const y1 = 50 + 50 * Math.sin(startAngle);
                  const x2 = 50 + 50 * Math.cos(endAngle);
                  const y2 = 50 + 50 * Math.sin(endAngle);
                  
                  const largeArc = nextAngle - angle <= 180 ? 0 : 1;
                  
                  // Calculate star position
                  const midAngle = (angle + nextAngle) / 2;
                  const midRad = (midAngle * Math.PI) / 180;
                  const starX = 50 + 35 * Math.cos(midRad);
                  const starY = 50 + 35 * Math.sin(midRad);
                  
                  return (
                    <g key={index}>
                      {/* Segment */}
                      <path
                        d={`M 50 50 L ${x1} ${y1} A 50 50 0 ${largeArc} 1 ${x2} ${y2} Z`}
                        fill={COLORS[index % COLORS.length]}
                        className="stroke-white/20 stroke-2"
                      />
                      {/* Star */}
                      <path
                        d="M 0,-4 L 0.9,-1.2 L 4,0 L 0.9,1.2 L 0,4 L -0.9,1.2 L -4,0 L -0.9,-1.2 Z"
                        fill="white"
                        transform={`translate(${starX} ${starY}) scale(1.5)`}
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
    </AnimatePresence>
  );
};