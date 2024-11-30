import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface GameCardProps {
  title: string;
  description: string;
  onClick: () => void;
  questionType?: 'classic' | 'spicy' | 'all';
}

export const GameCard: React.FC<GameCardProps> = ({
  title,
  description,
  onClick,
  questionType = 'all'
}) => {
  const getGradientClass = () => {
    switch (questionType) {
      case 'classic':
        return 'from-purple-600/20 to-pink-600/20';
      case 'spicy':
        return 'from-red-600/20 to-orange-600/20';
      default:
        return 'from-blue-600/20 to-cyan-600/20';
    }
  };

  const getTextGradient = () => {
    switch (questionType) {
      case 'classic':
        return 'from-purple-400 to-pink-400';
      case 'spicy':
        return 'from-red-400 to-orange-400';
      default:
        return 'from-blue-400 to-cyan-400';
    }
  };

  const gradientClass = getGradientClass();
  const textGradient = getTextGradient();

  return (
    <motion.div
      className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${gradientClass} p-6 group z-10`}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${gradientClass} opacity-0 group-hover:opacity-100 transition-opacity`} />
      <div className="mb-4">
        <h3 className={`text-2xl font-bold bg-gradient-to-r ${textGradient} bg-clip-text text-transparent`}>
          {title}
        </h3>
      </div>
      <p className="text-gray-300 mb-4">{description}</p>
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onClick}
        className={`flex items-center font-semibold z-20 relative text-${questionType === 'spicy' ? 'orange' : questionType === 'classic' ? 'pink' : 'cyan'}-400`}
      >
        Play Now <ArrowRight className="ml-2 w-4 h-4" />
      </motion.button>
    </motion.div>
  );
};