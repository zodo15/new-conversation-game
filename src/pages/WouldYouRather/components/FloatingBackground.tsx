import { motion } from 'framer-motion';
import {
  SparklesIcon,
  QuestionMarkCircleIcon,
  HeartIcon,
  StarIcon,
  LightBulbIcon,
  FireIcon,
  MoonIcon,
  SunIcon
} from '@heroicons/react/24/outline';

interface FloatingIconProps {
  icon: React.ElementType;
  className?: string;
  delay?: number;
  size?: 'sm' | 'md' | 'lg';
  color?: string;
}

const FloatingIcon = ({ 
  icon: Icon, 
  className = "", 
  delay = 0,
  size = 'md',
  color = 'purple'
}: FloatingIconProps) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  };

  const colorClasses = {
    purple: 'text-purple-400',
    pink: 'text-pink-400',
    blue: 'text-blue-400',
    indigo: 'text-indigo-400'
  };

  return (
    <motion.div
      initial={{ y: 0, opacity: 0.4 }}
      animate={{ 
        y: [-15, 15, -15],
        rotate: [-8, 8, -8],
        opacity: [0.4, 0.6, 0.4]
      }}
      transition={{ 
        duration: 6,
        repeat: Infinity,
        delay,
        ease: "easeInOut"
      }}
      className={`absolute ${sizeClasses[size]} ${colorClasses[color]} ${className}`}
    >
      <Icon className="w-full h-full" />
    </motion.div>
  );
};

const GlowingOrb = ({ className = "", delay = 0 }) => (
  <motion.div
    initial={{ scale: 0.8, opacity: 0.4 }}
    animate={{ 
      scale: [0.8, 1.2, 0.8],
      opacity: [0.4, 0.6, 0.4]
    }}
    transition={{ 
      duration: 4,
      repeat: Infinity,
      delay,
      ease: "easeInOut"
    }}
    className={`absolute w-32 h-32 rounded-full bg-gradient-to-r from-purple-500/30 to-pink-500/30 blur-xl ${className}`}
  />
);

const FloatingBackground = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      <FloatingIcon icon={SparklesIcon} className="top-1/4 left-1/4" delay={0} color="purple" />
      <FloatingIcon icon={HeartIcon} className="top-1/3 right-1/4" delay={1} color="pink" />
      <FloatingIcon icon={StarIcon} className="bottom-1/4 left-1/3" delay={2} color="indigo" />
      <FloatingIcon icon={QuestionMarkCircleIcon} className="top-1/2 right-1/3" delay={3} color="blue" />
      <FloatingIcon icon={LightBulbIcon} className="bottom-1/3 right-1/4" delay={4} color="purple" />
      <FloatingIcon icon={FireIcon} className="top-1/3 left-1/3" delay={5} color="pink" />
      <FloatingIcon icon={MoonIcon} className="bottom-1/4 right-1/3" delay={6} color="indigo" />
      <FloatingIcon icon={SunIcon} className="top-1/4 right-1/4" delay={7} color="blue" />
      
      <GlowingOrb className="top-1/4 left-1/4" delay={0} />
      <GlowingOrb className="bottom-1/4 right-1/4" delay={2} />
      <GlowingOrb className="top-1/2 right-1/3" delay={4} />
    </div>
  );
};

export default FloatingBackground;
