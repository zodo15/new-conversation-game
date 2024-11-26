import { motion, AnimatePresence } from 'framer-motion';



import { useState, useEffect } from 'react';



import confetti from 'canvas-confetti';







interface ChaosMasterWheelProps {



  players: string[];



  onComplete: (chaosMaster: string) => void;



}







export const ChaosMasterWheel = ({ players, onComplete }: ChaosMasterWheelProps) => {



  const [spinning, setSpinning] = useState(true);



  const [selectedIndex, setSelectedIndex] = useState(0);



  const [showFinalAnimation, setShowFinalAnimation] = useState(false);



  const [rotationAngle, setRotationAngle] = useState(0);







  const colors = [



    '#FF4B4B',



    '#4169E1',



    '#32CD32',



    '#FFD700',



    '#FF1493',



    '#9400D3',



    '#FF8C00',



    '#00CED1',



  ];







  useEffect(() => {



    if (spinning) {



      const duration = 7000;



      const startTime = Date.now();



      const finalRotations = 12;



      const finalSelectedIndex = Math.floor(Math.random() * players.length);



      const finalAngle = (360 * finalRotations) + ((360 / players.length) * finalSelectedIndex);



      



      const animate = () => {



        const elapsed = Date.now() - startTime;



        const progress = Math.min(elapsed / duration, 1);



        



        const easeOut = (t: number) => {



          const c4 = (2 * Math.PI) / 3;



          return t === 1 ? 1 : 1 - Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * c4);



        };







        const currentRotation = finalAngle * easeOut(progress);



        setRotationAngle(currentRotation);



        



        const currentIndex = Math.floor((currentRotation % 360) / (360 / players.length));



        setSelectedIndex((players.length - currentIndex) % players.length);







        if (progress < 1) {



          requestAnimationFrame(animate);



        } else {



          setSpinning(false);



          setSelectedIndex(finalSelectedIndex);



          



          const shootConfetti = () => {



            confetti({



              particleCount: 150,



              spread: 100,



              origin: { y: 0.6 },



              colors: ['#FFD700', '#FFA500', '#FF69B4', '#4169E1'],



              ticks: 300,



            });



          };







          for (let i = 0; i < 3; i++) {



            setTimeout(shootConfetti, i * 300);



          }



          



          setShowFinalAnimation(true);



          setTimeout(() => {



            onComplete(players[finalSelectedIndex]);



          }, 3000);



        }



      };







      requestAnimationFrame(animate);



    }



  }, [spinning, players.length, onComplete, players]);







  return (



    <AnimatePresence>



      {!showFinalAnimation ? (



        <motion.div



          className="fixed inset-0 flex items-center justify-center bg-black/90 z-50"



          initial={{ opacity: 0 }}



          animate={{ opacity: 1 }}



          exit={{ opacity: 0 }}



        >



          <div className="relative w-[500px] h-[500px]">



            <div className="absolute inset-0 rounded-full border-[16px] border-gray-800 shadow-[0_0_30px_rgba(255,255,255,0.1)]" />



            



            <motion.div



              className="absolute inset-0"



              style={{ rotate: `${rotationAngle}deg` }}



              initial={{ scale: 0.9, opacity: 0 }}



              animate={{ scale: 1, opacity: 1 }}



              transition={{ duration: 0.5 }}



            >



              <svg viewBox="-200 -200 400 400" className="w-full h-full">



                <defs>



                  <filter id="glow">



                    <feGaussianBlur stdDeviation="3.5" result="coloredBlur"/>



                    <feMerge>



                      <feMergeNode in="coloredBlur"/>



                      <feMergeNode in="SourceGraphic"/>



                    </feMerge>



                  </filter>



                </defs>



                



                {players.map((player, index) => {



                  const angle = 360 / players.length;



                  const rotation = index * angle;



                  const colorIndex = index % colors.length;



                  



                  return (



                    <g key={index} transform={`rotate(${rotation})`}>



                      <path



                        d={`M 0 0 L ${180 * Math.cos(-angle/2 * Math.PI/180)} ${180 * Math.sin(-angle/2 * Math.PI/180)} A 180 180 0 0 1 ${180 * Math.cos(angle/2 * Math.PI/180)} ${180 * Math.sin(angle/2 * Math.PI/180)} Z`}



                        fill={colors[colorIndex]}



                        stroke="white"



                        strokeWidth="2"



                        filter="url(#glow)"



                      />



                    </g>



                  );



                })}



              </svg>



            </motion.div>







            <div className="absolute inset-0 flex items-center justify-center">



              <div className="w-20 h-20 rounded-full bg-gray-800 border-4 border-white z-20 shadow-[0_0_20px_rgba(255,255,255,0.2)]" />



            </div>







            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-10 h-20 z-30">



              <div className="w-0 h-0 



                border-l-[25px] border-l-transparent 



                border-r-[25px] border-r-transparent 



                border-b-[50px] border-red-500



                filter drop-shadow-[0_0_10px_rgba(255,0,0,0.5)]" 



              />



            </div>



          </div>



        </motion.div>



      ) : (



        <motion.div



          className="fixed inset-0 flex items-center justify-center bg-black/90 z-50"



          initial={{ opacity: 0 }}



          animate={{ opacity: 1 }}



          exit={{ opacity: 0 }}



        >



          <motion.div



            initial={{ scale: 0.5, opacity: 0 }}



            animate={{ scale: 1, opacity: 1 }}



            transition={{ type: "spring", duration: 0.5 }}



            className="text-center p-8 rounded-2xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm"



          >



            <motion.h2 



              initial={{ y: -20, opacity: 0 }}



              animate={{ y: 0, opacity: 1 }}



              className="text-3xl text-purple-400 mb-6"



            >



              The Chaos Master is...



            </motion.h2>



            <motion.div



              initial={{ y: 20, opacity: 0 }}



              animate={{ y: 0, opacity: 1 }}



              transition={{ delay: 0.5 }}



              className="text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 bg-clip-text text-transparent mb-4"



            >



              {players[selectedIndex]}



            </motion.div>



            <motion.div



              initial={{ scale: 0 }}



              animate={{ scale: 1 }}



              transition={{ delay: 1 }}



              className="mt-8 text-2xl bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent font-bold"



            >



              Let chaos reign! 🎭



            </motion.div>



          </motion.div>



        </motion.div>



      )}



    </AnimatePresence>



  );



}; 


































































































































