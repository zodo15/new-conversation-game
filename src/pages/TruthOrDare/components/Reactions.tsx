import React from 'react';
import { motion } from 'framer-motion';
import { useGameStore } from '../store/gameStore';
import { Smiley, Heart, ThumbsUp, Fire, Star } from '@phosphor-icons/react';

interface ReactionsProps {
  questionId: string;
}

export const Reactions: React.FC<ReactionsProps> = ({ questionId }) => {
  const { addReaction, getReactions } = useGameStore();

  const reactions = [
    { icon: Smiley, type: 'laugh', label: 'Funny' },
    { icon: Heart, type: 'love', label: 'Love it' },
    { icon: ThumbsUp, type: 'like', label: 'Like' },
    { icon: Fire, type: 'fire', label: 'Hot' },
    { icon: Star, type: 'star', label: 'Amazing' },
  ];

  const questionReactions = getReactions(questionId);

  return (
    <div className="flex flex-wrap gap-4 justify-center">
      {reactions.map(({ icon: Icon, type, label }) => {
        const count = questionReactions[type] || 0;
        const hasReacted = count > 0;

        return (
          <motion.button
            key={type}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => addReaction(questionId, type)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full transition-colors ${
              hasReacted
                ? 'bg-purple-600 text-white'
                : 'bg-white/10 hover:bg-white/20 text-white/80'
            }`}
          >
            <Icon weight={hasReacted ? 'fill' : 'regular'} className="w-4 h-4" />
            <span className="text-sm">{count}</span>
          </motion.button>
        );
      })}
    </div>
  );
};