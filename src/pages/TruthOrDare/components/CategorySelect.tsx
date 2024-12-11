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
  const setCategory = useGameStore((state: { setCategory: any; }) => state.setCategory);
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
      className="grid grid-cols-2 gap-6 p-8 max-w-4xl mx-auto"
    >
      {categories.map((category) => (
        <motion.button
          key={category}
          variants={item}
          whileHover={{ 
            scale: 1.05,
            boxShadow: '0 0 30px rgba(147,51,234,0.5)'
          }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            playSelect();
            setCategory(category);
          }}
          onMouseEnter={() => playHover()}
          className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-xl
                   border-2 border-purple-500/50 hover:border-purple-500
                   shadow-[0_0_15px_rgba(147,51,234,0.3)]
                   transition-all duration-300 flex flex-col items-center justify-center
                   min-h-[200px] group"
        >
          <div className="text-purple-400 group-hover:text-purple-300 transition-colors">
            {categoryIcons[category]}
          </div>
          <h3 className="text-2xl text-purple-400 group-hover:text-purple-300 font-bold text-center">
            {category}
          </h3>
        </motion.button>
      ))}
    </motion.div>
  );
};

export default CategorySelect;