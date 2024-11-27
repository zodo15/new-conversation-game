import type { FC } from 'react';
import { motion } from 'framer-motion';
import { ForwardRefExoticComponent, SVGProps, RefAttributes } from 'react';

interface GameCardProps {
  title: string;
  description: string;
  onClick: () => void;
  icon: ForwardRefExoticComponent<Omit<SVGProps<SVGSVGElement>, "ref"> & { title?: string | undefined; titleId?: string | undefined; } & RefAttributes<SVGSVGElement>>;
  className?: string;
}

export const GameCard: FC<GameCardProps> = ({
  title,
  description,
  onClick,
  icon: Icon,
  className = ''
}) => {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.05, y: -5 }}
      whileTap={{ scale: 0.95 }}
      className={`relative p-6 rounded-xl text-left transition-all duration-300 backdrop-blur-sm ${className}`}
    >
      <Icon className="w-6 h-6 text-white/40" />
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