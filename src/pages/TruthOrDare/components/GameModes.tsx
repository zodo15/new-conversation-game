import { motion } from 'framer-motion';
import { useGameStore } from '../store/gameStore';
import useSound from 'use-sound';
import { FaDice, FaBolt, FaClock, FaSkull } from 'react-icons/fa';

export const GameModes = () => {
  const { toggleChaosMode, toggleTimerMode } = useGameStore();
  const [playSelect] = useSound('/select.mp3', { volume: 0.5 });

  const modes = [
    { name: 'Normal Mode', chaos: false, timer: false, icon: <FaDice />, color: 'purple' },
    { name: 'Chaos Mode', chaos: true, timer: false, icon: <FaBolt />, color: 'yellow' },
    { name: 'Timer Mode', chaos: false, timer: true, icon: <FaClock />, color: 'blue' },
    { name: 'Ultimate Chaos', chaos: true, timer: true, icon: <FaSkull />, color: 'red' }
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { x: -20, opacity: 0 },
    show: { x: 0, opacity: 1 }
  };

  const handleModeSelect = (chaos: boolean, timer: boolean) => {
    playSelect();
    if (chaos) toggleChaosMode();
    if (timer) toggleTimerMode();
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show" 
      className="grid grid-cols-2 gap-4 max-w-4xl mx-auto px-8 mb-8"
    >
      {modes.map((mode) => (
        <motion.button
          key={mode.name}
          variants={item}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => handleModeSelect(mode.chaos, mode.timer)}
          className={`bg-gradient-to-r ${
            mode.color === 'purple' ? 'from-purple-900/50 to-purple-800/30 hover:from-purple-800/50 hover:to-purple-700/30' :
            mode.color === 'yellow' ? 'from-yellow-900/50 to-yellow-800/30 hover:from-yellow-800/50 hover:to-yellow-700/30' :
            mode.color === 'blue' ? 'from-blue-900/50 to-blue-800/30 hover:from-blue-800/50 hover:to-blue-700/30' :
            'from-red-900/50 to-red-800/30 hover:from-red-800/50 hover:to-red-700/30'
          } p-4 rounded-lg border border-gray-700 hover:border-gray-600
          shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-3`}
        >
          <span className={`text-xl ${
            mode.color === 'purple' ? 'text-purple-400' :
            mode.color === 'yellow' ? 'text-yellow-400' :
            mode.color === 'blue' ? 'text-blue-400' :
            'text-red-400'
          }`}>{mode.icon}</span>
          <span className="text-white font-bold">{mode.name}</span>
        </motion.button>
      ))}
    </motion.div>
  );
};