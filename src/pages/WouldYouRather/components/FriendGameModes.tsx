import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Users, Globe, Zap } from 'lucide-react';
import { GameMode } from '../types';

interface FriendGameModesProps {
  onSelectMode: (mode: GameMode) => void;
  onBack: () => void;
}

interface Mode {
  id: GameMode;
  name: string;
  description: string;
  icon: React.ComponentType<React.ComponentProps<any>>;
  color: string;
}

const modes: Mode[] = [
  {
    id: 'local' as GameMode,
    name: 'Local Play',
    description: 'Play with friends on the same device',
    icon: Users,
    color: 'from-green-500 to-green-600'
  },
  {
    id: 'online' as GameMode,
    name: 'Online Play',
    description: 'Play with friends over the internet',
    icon: Globe,
    color: 'from-blue-500 to-blue-600'
  },
  {
    id: 'party' as GameMode,
    name: 'Party Mode',
    description: 'Fast-paced party game with special rules',
    icon: Zap,
    color: 'from-purple-500 to-purple-600'
  }
];

export const FriendGameModes: React.FC<FriendGameModesProps> = ({
  onSelectMode,
  onBack
}) => {
  return (
    <div className="space-y-6">
      <motion.button
        onClick={onBack}
        className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <ArrowLeft className="w-5 h-5" />
        Back
      </motion.button>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {modes.map((mode) => {
          const Icon = mode.icon;
          return (
            <motion.button
              key={mode.id}
              onClick={() => onSelectMode(mode.id)}
              className={`p-6 rounded-xl bg-gradient-to-br ${mode.color} text-white shadow-lg hover:shadow-xl transition-shadow`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex flex-col items-center text-center gap-4">
                <div className="p-3 bg-white/10 rounded-lg">
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold">{mode.name}</h3>
                  <p className="text-sm text-white/80">{mode.description}</p>
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};