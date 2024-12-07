import { motion } from 'framer-motion';

import { useState, useEffect, useRef } from 'react';

import { FaClock, FaPlay, FaPause } from "react-icons/fa6";



interface TimerProps {

  duration: number;

  key?: number;

}



export const Timer = ({ duration, key }: TimerProps) => {

  const [timeLeft, setTimeLeft] = useState(duration);

  const [isRunning, setIsRunning] = useState(false);

  const timerRef = useRef<NodeJS.Timeout | null>(null);



  useEffect(() => {

    if (isRunning && timeLeft > 0) {

      timerRef.current = setInterval(() => {

        setTimeLeft((prev) => {

          if (prev <= 1) {

            clearInterval(timerRef.current!);

            setIsRunning(false);

            return 0;

          }

          return prev - 1;

        });

      }, 1000);

    }



    return () => {

      if (timerRef.current) {

        clearInterval(timerRef.current);

      }

    };

  }, [isRunning]);



  const handleClick = () => {

    if (timeLeft === 0) {

      // Reset timer if it's finished

      setTimeLeft(duration);

      setIsRunning(true);

    } else {

      // Toggle timer if it's running or paused

      setIsRunning(!isRunning);

    }

  };



  const progress = (timeLeft / duration) * 100;



  return (

    <motion.button 

      className="absolute top-4 right-4 flex items-center gap-2 group"

      initial={{ y: -20, opacity: 0 }}

      animate={{ y: 0, opacity: 1 }}

      key={key}

      onClick={handleClick}

      whileHover={{ scale: 1.05 }}

      whileTap={{ scale: 0.95 }}

    >

      <div className="relative w-12 h-12">

        <svg className="w-12 h-12 transform -rotate-90">

          <circle

            cx="24"

            cy="24"

            r="20"

            stroke="currentColor"

            strokeWidth="4"

            fill="none"

            className="text-gray-700"

          />

          <circle

            cx="24"

            cy="24"

            r="20"

            stroke="currentColor"

            strokeWidth="4"

            fill="none"

            strokeDasharray={`${2 * Math.PI * 20}`}

            strokeDashoffset={`${2 * Math.PI * 20 * (1 - progress / 100)}`}

            className={`

              transition-all duration-1000 ease-linear

              ${timeLeft <= 5 ? 'text-red-500' : 'text-purple-500'}

            `}

          />

        </svg>

        <div className="absolute inset-0 flex items-center justify-center">

          <span className="text-lg font-bold">{timeLeft}</span>

        </div>

        

        {/* Play/Pause overlay on hover */}

        <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">

          {isRunning ? (

            <FaPause className="w-5 h-5" />

          ) : (

            <FaPlay className="w-5 h-5" />

          )}

        </div>

      </div>

      <FaClock className={`w-5 h-5 ${isRunning ? 'text-purple-400' : 'text-gray-400'}`} />

    </motion.button>

  );

}; 
