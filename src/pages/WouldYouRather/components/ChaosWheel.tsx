import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from '@phosphor-icons/react';
import { toast, Toast } from 'react-hot-toast';

interface ChaosWheelProps {
  onClose: () => void;
  onSpin: (action: string) => void;
}

const chaosActions = [
  "Stutter while answering",
  "Answer in a British accent",
  "Answer while doing jumping jacks",
  "Answer in a whisper",
  "Answer like a robot",
  "Answer while dancing",
  "Answer in slow motion",
  "Answer like a news reporter",
  "Answer while impersonating another player",
  "Answer in a singing voice"
];

export const ChaosWheel: React.FC<ChaosWheelProps> = ({ onClose, onSpin }) => {
  const [rotation, setRotation] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);

  const handleSpin = () => {
    if (isSpinning) return;
    
    setIsSpinning(true);
    const spins = 5; // Number of full rotations
    const randomDegrees = Math.random() * 360;
    const totalRotation = spins * 360 + randomDegrees;
    
    setRotation(totalRotation);

    // Calculate which action was landed on
    setTimeout(() => {
      const finalDegree = randomDegrees;
      const sectionSize = 360 / chaosActions.length;
      const actionIndex = Math.floor(finalDegree / sectionSize);
      const selectedAction = chaosActions[actionIndex];
      
      toast.success(`Chaos Challenge: ${selectedAction}`, {
        duration: 3000,
        icon: '🎲'
      } as Toast);
      
      onSpin(selectedAction);
      setIsSpinning(false);
    }, 3000);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 p-8 rounded-2xl shadow-xl max-w-2xl w-full mx-4 relative">
        <button
          onClick={onClose}
          className="absolute top-4 left-4 p-2 hover:bg-white/20 rounded-full transition-colors"
        >
          <ArrowLeft className="w-6 h-6 text-white" />
        </button>

        <h2 className="text-3xl font-bold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-[#E4A1FF] to-[#FF9CEE]">
          Chaos Wheel
        </h2>

        <div className="relative w-64 h-64 mx-auto mb-8">
          <motion.div
            className="absolute inset-0 rounded-full border-4 border-[#E4A1FF] overflow-hidden"
            style={{
              transform: `rotate(${rotation}deg)`,
              transition: isSpinning ? 'transform 3s cubic-bezier(0.4, 0, 0.2, 1)' : undefined
            }}
          >
            {chaosActions.map((action, index) => {
              const angle = (360 / chaosActions.length) * index;
              return (
                <div
                  key={index}
                  className="absolute w-full h-0.5 bg-[#E4A1FF] origin-left"
                  style={{ transform: `rotate(${angle}deg)` }}
                />
              );
            })}
          </motion.div>
          <div className="absolute -right-2 top-1/2 w-4 h-4 bg-[#FF9CEE] transform -translate-y-1/2 rotate-45" />
        </div>

        <button
          onClick={handleSpin}
          disabled={isSpinning}
          className={`w-full py-4 rounded-xl font-semibold text-white transition-all ${
            isSpinning
              ? 'bg-gray-500 cursor-not-allowed'
              : 'bg-gradient-to-r from-[#E4A1FF] to-[#FF9CEE] hover:from-[#D880FF] hover:to-[#FF80E5]'
          }`}
        >
          {isSpinning ? 'Spinning...' : 'Spin the Wheel!'}
        </button>
      </div>
    </div>
  );
};
