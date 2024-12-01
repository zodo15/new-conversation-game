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
        ease: "easeInOut",
        delay 
      }}
      className={`absolute ${colorClasses[color as keyof typeof colorClasses]} ${className}`}
    >
      <Icon className={`${sizeClasses[size]} filter blur-[0.5px]`} />
    </motion.div>
  );
};

const GlowingOrb = ({ className = "", delay = 0 }) => (
  <motion.div
    initial={{ scale: 1, opacity: 0.15 }}
    animate={{ 
      scale: [1, 1.2, 1],
      opacity: [0.15, 0.25, 0.15]
    }}
    transition={{ 
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut",
      delay 
    }}
    className={`absolute rounded-full bg-gradient-to-r from-purple-500/30 to-pink-500/30 blur-xl ${className}`}
  />
);

export const FloatingBackground = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Glowing orbs in the background */}
      <GlowingOrb className="w-64 h-64 top-20 left-[10%]" delay={0} />
      <GlowingOrb className="w-96 h-96 bottom-40 right-[15%]" delay={2} />
      <GlowingOrb className="w-72 h-72 top-60 left-[60%]" delay={1} />

      {/* Floating icons */}
      <FloatingIcon icon={SparklesIcon} className="top-20 left-[10%]" size="lg" color="purple" delay={0} />
      <FloatingIcon icon={QuestionMarkCircleIcon} className="top-40 right-[15%]" color="pink" delay={1} />
      <FloatingIcon icon={HeartIcon} className="bottom-20 left-[20%]" size="sm" color="purple" delay={2} />
      <FloatingIcon icon={StarIcon} className="top-60 left-1/2" color="indigo" delay={1.5} />
      <FloatingIcon icon={LightBulbIcon} className="bottom-40 right-[25%]" size="lg" color="blue" delay={3} />
      <FloatingIcon icon={FireIcon} className="top-32 left-[30%]" size="sm" color="pink" delay={2.5} />
      <FloatingIcon icon={MoonIcon} className="bottom-32 right-[10%]" color="purple" delay={1.8} />
      <FloatingIcon icon={SunIcon} className="top-80 right-[30%]" size="lg" color="indigo" delay={0.5} />
      
      {/* Additional smaller decorative elements */}
      <FloatingIcon icon={StarIcon} className="top-1/4 left-[45%]" size="sm" color="pink" delay={2.2} />
      <FloatingIcon icon={SparklesIcon} className="bottom-1/4 right-[40%]" size="sm" color="blue" delay={1.3} />
      <FloatingIcon icon={HeartIcon} className="top-2/3 left-[25%]" size="sm" color="indigo" delay={2.8} />
    </div>
  );
};
