import { motion } from 'framer-motion';
import { FaLaugh, FaAngry, FaSurprise, FaSadTear, FaHeart } from 'react-icons/fa';
import { useGameStore } from '../store/gameStore';

interface ReactionsProps {
  questionId: string;
}

export const Reactions = ({ questionId }: ReactionsProps) => {
  const { addReaction, reactions } = useGameStore();
  
  const reactionIcons = [
    { icon: <FaLaugh />, type: 'laugh' },
    { icon: <FaAngry />, type: 'angry' },
    { icon: <FaSurprise />, type: 'surprise' },
    { icon: <FaSadTear />, type: 'sad' },
    { icon: <FaHeart />, type: 'love' },
  ];

  return (
    <div className="flex gap-2 mt-4">
      {reactionIcons.map(({ icon, type }) => (
        <motion.button
          key={type}
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => addReaction(questionId, type)}
          className="text-purple-400 text-xl hover:text-purple-300"
        >
          {icon}
          <span className="ml-1 text-sm">
            {reactions[questionId]?.[type] || 0}
          </span>
        </motion.button>
      ))}
    </div>
  );
};