import { motion } from 'framer-motion';

interface ChoiceCardProps {
  option: string;
  percentage?: number;
  onClick: () => void;
  disabled?: boolean;
  selected?: boolean;
  isAnswer?: boolean;
}

export const ChoiceCard = ({
  option,
  percentage,
  onClick,
  disabled,
  selected,
  isAnswer,
}: ChoiceCardProps) => {
  return (
    <motion.button
      whileHover={!disabled ? { scale: 1.05 } : {}}
      whileTap={!disabled ? { scale: 0.95 } : {}}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      className={`
        relative w-full p-6 rounded-xl text-left z-10
        ${selected ? 'bg-gradient-to-br from-purple-600 to-pink-600 ring-2 ring-purple-400 ring-offset-2 ring-offset-gray-900' : 'bg-gradient-to-br from-purple-600/20 to-pink-600/20'}
        ${disabled ? 'cursor-default' : 'cursor-pointer'}
        transition-all duration-300
      `}
      disabled={disabled}
    >
      <div className="relative z-10">
        <p className="text-xl font-semibold text-white mb-2">{option}</p>
        {percentage !== undefined && (
          <div className="text-cyan-400 font-bold">{percentage}%</div>
        )}
      </div>
      {selected && (
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="absolute right-4 top-4"
        >
          <div className="text-green-400 text-lg">✓</div>
        </motion.div>
      )}
    </motion.button>
  );
};