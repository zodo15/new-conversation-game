import { motion } from 'framer-motion';
import {
  SparklesIcon,
  QuestionMarkCircleIcon,
  HeartIcon,
  StarIcon,
  LightBulbIcon
} from '@heroicons/react/24/outline';

interface FloatingIconProps {
  icon: React.ElementType;
  className?: string;
  delay?: number;
}

const FloatingIcon = ({ icon: Icon, className = "", delay = 0 }: FloatingIconProps) => (
  <motion.div
    initial={{ y: 0 }}
    animate={{ 
      y: [-10, 10, -10],
      rotate: [-5, 5, -5]
    }}
    transition={{ 
      duration: 4,
      repeat: Infinity,
      delay 
    }}
    className={`absolute opacity-20 ${className}`}
  >
    <Icon className="w-12 h-12" />
  </motion.div>
);

export const FloatingBackground = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      <FloatingIcon icon={SparklesIcon} className="top-20 left-[10%]" delay={0} />
      <FloatingIcon icon={QuestionMarkCircleIcon} className="top-40 right-[15%]" delay={1} />
      <FloatingIcon icon={HeartIcon} className="bottom-20 left-[20%]" delay={2} />
      <FloatingIcon icon={StarIcon} className="top-60 left-1/2" delay={1.5} />
      <FloatingIcon icon={LightBulbIcon} className="bottom-40 right-[25%]" delay={3} />
      <FloatingIcon icon={SparklesIcon} className="top-32 left-[30%]" delay={2.5} />
      <FloatingIcon icon={StarIcon} className="bottom-32 right-[10%]" delay={1.8} />
      <FloatingIcon icon={HeartIcon} className="top-80 right-[30%]" delay={0.5} />
    </div>
  );
};
