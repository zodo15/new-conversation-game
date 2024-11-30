import { useState, useCallback, useEffect } from 'react';
import Confetti from 'react-confetti';

const useConfetti = () => {
  const [isConfettiActive, setIsConfettiActive] = useState(false);
  const [windowDimensions, setWindowDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const startConfetti = useCallback(() => {
    setIsConfettiActive(true);
    setTimeout(() => setIsConfettiActive(false), 5000);
  }, []);

  const ConfettiComponent = useCallback(() => (
    isConfettiActive ? (
      <Confetti
        width={windowDimensions.width}
        height={windowDimensions.height}
        recycle={false}
        numberOfPieces={200}
        gravity={0.3}
      />
    ) : null
  ), [isConfettiActive, windowDimensions]);

  return {
    startConfetti,
    ConfettiComponent,
  };
};

export default useConfetti;