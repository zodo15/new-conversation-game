import { motion } from 'framer-motion';
import { FaBomb } from 'react-icons/fa';

interface PlotTwistProps {
  twist: string;
  onClose: () => void;
}

export const PlotTwist = ({ twist, onClose }: PlotTwistProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.8, y: 50 }}
        className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-xl
                 border-2 border-red-500 shadow-[0_0_30px_rgba(239,68,68,0.5)]
                 max-w-md w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 mb-6">
          <FaBomb className="text-3xl text-red-400" />
          <h3 className="text-3xl font-bold text-red-400">Plot Twist!</h3>
        </div>
        <p className="text-white text-xl leading-relaxed">{twist}</p>
        <button
          onClick={onClose}
          className="mt-6 w-full py-3 bg-red-500/20 hover:bg-red-500/30
                   text-red-400 rounded-lg transition-colors duration-300"
        >
          Mind = Blown 
        </button>
      </motion.div>
    </motion.div>
  );
};