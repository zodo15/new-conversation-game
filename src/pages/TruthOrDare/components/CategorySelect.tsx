import { motion } from 'framer-motion';
import { categories } from '../data/questions';
import { QuestionCategory } from '../types/game';
import { useGameStore } from '../store/gameStore';
import useSound from 'use-sound';
import { FaFire, FaBrain, FaUsers, FaDumbbell, FaPalette } from 'react-icons/fa6';
import { FaLaugh } from 'react-icons/fa';

const categoryIcons: Record<QuestionCategory, React.ReactNode> = {
  'spicy': <FaFire className="text-3xl mb-2" />,
  'funny': <FaLaugh className="text-3xl mb-2" />,
  'deep': <FaBrain className="text-3xl mb-2" />,
  'social': <FaUsers className="text-3xl mb-2" />,
  'physical': <FaDumbbell className="text-3xl mb-2" />,
  'creative': <FaPalette className="text-3xl mb-2" />
};

const CategorySelect = () => {
  const { setSelectedCategory: setCategory } = useGameStore((state) => state);
  const [playHover] = useSound('/hover.mp3', { volume: 0.5 });
  const [playSelect] = useSound('/select.mp3', { volume: 0.5 });

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
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl mx-auto"
    >
      {categories.map((category) => (
        <motion.button
          key={category}
          variants={item}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            playSelect();
            setCategory(category);
          }}
          onMouseEnter={() => playHover()}
          className="flex flex-col items-center justify-center p-6 bg-white/10 backdrop-blur-sm rounded-xl hover:bg-white/20 transition-all"
        >
          {categoryIcons[category]}
          <span className="text-lg font-medium capitalize">{category}</span>
        </motion.button>
      ))}
    </motion.div>
  );
};

export default CategorySelect;