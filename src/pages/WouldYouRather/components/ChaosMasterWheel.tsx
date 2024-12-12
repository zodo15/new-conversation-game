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
    }, 3000);
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
        className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div className="bg-gradient-to-br from-[#4A1D6A] via-[#2E0F45] to-[#1A0527] p-8 rounded-xl shadow-2xl max-w-md w-full mx-4 relative">
          <button
            onClick={onBack}
            className="absolute top-4 left-4 p-2 hover:bg-white/10 rounded-full transition-colors text-white"
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
                  const startAngle = ((angle - 90) * Math.PI) / 180; // Offset by 90 degrees
                  const endAngle = ((nextAngle - 90) * Math.PI) / 180; // Offset by 90 degrees
                  
                  const x1 = 50 + 50 * Math.cos(startAngle);
                  const y1 = 50 + 50 * Math.sin(startAngle);
                  const x2 = 50 + 50 * Math.cos(endAngle);
                  const y2 = 50 + 50 * Math.sin(endAngle);
                  
                  const largeArc = nextAngle - angle <= 180 ? 0 : 1;
                  
                  // Calculate text position (offset by 90 degrees)
                  const midAngle = ((angle + nextAngle) / 2 - 90) * Math.PI / 180;
                  const textX = 50 + 35 * Math.cos(midAngle);
                  const textY = 50 + 35 * Math.sin(midAngle);
                  
                  return (
                    <g key={index}>
                      {/* Segment */}
                      <path
                        d={`M 50 50 L ${x1} ${y1} A 50 50 0 ${largeArc} 1 ${x2} ${y2} Z`}
                        fill={COLORS[index % COLORS.length]}
                        className="stroke-white/20 stroke-2"
                      />
                      {/* Player Name */}
                      <text
                        x={textX}
                        y={textY}
                        fill="white"
                        fontSize="4"
                        fontWeight="bold"
                        textAnchor="middle"
                        dominantBaseline="middle"
                        transform={`rotate(${angle}, ${textX}, ${textY})`}
                      >
                        {player}
                      </text>
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