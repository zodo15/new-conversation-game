import type { FC } from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface GameCardProps {
  title: string;
  description: string;
  onClick: () => void;
  className?: string;
  icon?: LucideIcon;
  questionType: string;
}

export const GameCard: FC<GameCardProps> = ({
  title,
  description,
  onClick,
  className = '',
  icon: Icon,
  questionType
}) => {
  return (
    <motion.button
      whileHover={{ scale: 1.05, y: -5 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`relative p-6 rounded-xl text-left transition-all duration-300 backdrop-blur-sm ${className}`}
    >
      {Icon && (
        <div className="absolute top-4 right-4">
          <Icon className="w-6 h-6 text-white/40" />
        </div>
      )}
      <h3 className="text-xl font-semibold mb-2 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
        {title}
      </h3>
      <p className="text-white/80 text-sm">{description}</p>
      <motion.div
        className="absolute inset-0 rounded-xl bg-white/5"
        whileHover={{ opacity: 1 }}
        initial={{ opacity: 0 }}
      />
    </motion.button>
  );
};