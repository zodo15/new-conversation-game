import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import TruthOrDareApp from './pages/TruthOrDare/App';
import WouldYouRatherApp from './pages/WouldYouRather/App';
import { SparklesIcon, HeartIcon, StarIcon, BeakerIcon, BoltIcon } from '@heroicons/react/24/outline';
import { FeedbackButton } from './components/FeedbackButton';

const FloatingIcon = ({ icon: Icon, className = "", delay = 0 }: { icon: React.ElementType; className?: string; delay?: number }) => (
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

const GameCard = ({ title, to }: { title: string; to: string }) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    className="w-full"
  >
    <Link to={to}>
      <div className="p-6 bg-white/10 hover:bg-white/20 rounded-xl transition-all shadow-lg">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent text-center">
          {title}
        </h2>
      </div>
    </Link>
  </motion.div>
);

const Dashboard = () => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white p-4 overflow-hidden">
      <FloatingIcon icon={SparklesIcon} className="top-20 left-20" delay={0} />
      <FloatingIcon icon={BeakerIcon} className="top-40 right-20" delay={1} />
      <FloatingIcon icon={HeartIcon} className="bottom-20 left-40" delay={2} />
      <FloatingIcon icon={StarIcon} className="top-60 left-1/2" delay={1.5} />
      <FloatingIcon icon={BoltIcon} className="bottom-40 right-40" delay={3} />

      <div className="relative max-w-2xl mx-auto pt-12 px-4 z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Party Games
          </h1>
          <p className="text-xl text-white/80">Choose your adventure</p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="space-y-4"
        >
          <motion.div variants={item}>
            <GameCard
              title="Truth or Dare"
              to="/truth-or-dare"
            />
          </motion.div>

          <motion.div variants={item}>
            <GameCard
              title="Would You Rather"
              to="/would-you-rather"
            />
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-12 text-center text-white/60"
        >
          <p>More games coming soon!</p>
        </motion.div>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <div className="relative">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/truth-or-dare" element={<TruthOrDareApp />} />
          <Route path="/would-you-rather" element={<WouldYouRatherApp />} />
        </Routes>
        <FeedbackButton />
      </div>
    </Router>
  );
};

export default App;