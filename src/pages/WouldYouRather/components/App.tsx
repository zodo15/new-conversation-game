// External dependencies
import React from 'react';
import { motion } from 'framer-motion';

import { FiShuffle,  FiArrowLeft, FiX, FiSkipForward, FiZap, FiPlus } from 'react-icons/fi';

import { Toaster, toast } from 'react-hot-toast';

// Game logic and types
import { useGameStore, GameMode, Question } from '../store/gameStore';
import { getQuestionsByMode } from '../data/questions';

// Components
import { Timer } from './Timer';
import { FloatingBackground } from './FloatingBackground';
import { ChaosMasterWheel } from './ChaosMasterWheel';
import { AddQuestionModal } from './AddQuestionModal';
import { FeedbackButton } from '../../../components/FeedbackButton';

interface GameState {
  gameStarted: boolean;
  currentQuestion: Question | null;
  players: string[];
  currentPlayerIndex: number;
  mode: GameMode;
  chaosMode: boolean;
  chaosMaster?: string;
  timer: number;
}

export default function App({ onBack }: { onBack: () => void }) {
  const gameStore = useGameStore();
  const [gameState, setGameState] = React.useState<GameState>({
    gameStarted: false,
    currentQuestion: null,
    players: [],
    currentPlayerIndex: 0,
    mode: GameMode.NONE,
    chaosMode: false,
    timer: 30,
  });

  const [showPlayerInput, setShowPlayerInput] = React.useState(false);
  const [showChaosWheel, setShowChaosWheel] = React.useState(false);
  const [timerDuration, setTimerDuration] = React.useState(30);
  const [showAddQuestion, setShowAddQuestion] = React.useState(false);

  React.useEffect(() => {
    if (gameState.mode !== GameMode.NONE && !gameState.currentQuestion) {
      const questions = getQuestionsByMode(gameState.mode);
      if (questions.length > 0) {
        setGameState(prev => ({
          ...prev,
          currentQuestion: questions[Math.floor(Math.random() * questions.length)]
        }));
      }
    }
  }, [gameState.mode]);

  const handleOptionSelect = (choice: 'option1' | 'option2') => {
    if (!gameState.currentQuestion) return;
    
    const currentPlayer = gameState.players[gameState.currentPlayerIndex];
    gameStore.addVote(currentPlayer, choice);
    
    // Move to next question
    nextQuestion();
  };

  const handleChaosWheelComplete = (selectedPlayer: string) => {
    setGameState(prev => ({
      ...prev,
      chaosMaster: selectedPlayer,
      gameStarted: true,
      currentQuestion: getQuestionsByMode(prev.mode)[0]
    }));
    setShowChaosWheel(false);
    toast.success(`${selectedPlayer} is now the Chaos Master!`, {
      duration: 3000,
      icon: '👑'
    });
  };

  const handleChaosEffect = (effect: string) => {
    toast.success(`Chaos Effect: ${effect}`, {
      duration: 5000,
      icon: '🌪️'
    });
  };

  const handleChaosAction = () => {
    const randomAction = chaosActions[Math.floor(Math.random() * chaosActions.length)];
    toast.success(`Chaos Action: ${randomAction}`, {
      duration: 5000,
      icon: '🎭'
    });
  };

  const chaosActions = [
    "Stutter while answering",
    "Answer in a British accent",
    "Answer while doing jumping jacks",
    "Answer in a whisper",
    "Answer like a robot",
    "Answer while dancing",
    "Answer in slow motion",
    "Answer like a news reporter",
    "Answer while impersonating another player",
    "Answer in a singing voice",
    "Answer while acting shy",
    "Answer like a superhero",
    "Answer while being dramatic",
    "Answer in reverse order",
    "Answer while being extremely excited"
  ];

  const GAME_MODES = [GameMode.CLASSIC, GameMode.SPICY, GameMode.FRIEND, GameMode.RANDOM];

  const startGame = () => {
    setShowChaosWheel(true);
  };

  const handleAddPlayer = () => {
    if (!playerInput.trim()) {
      toast.error('Please enter a player name');
      return;
    }
    if (gameState.players.includes(playerInput.trim())) {
      toast.error('Player already exists');
      return;
    }
    setGameState(prev => ({
      ...prev,
      players: [...prev.players, playerInput.trim()]
    }));
    setPlayerInput('');
    toast.success(`Added ${playerInput}!`);
  };

  const handleRemovePlayer = (index: number) => {
    setGameState(prev => ({
      ...prev,
      players: prev.players.filter((_, i) => i !== index)
    }));
  };

  const handleModeSelect = (mode: GameMode) => {
    const questions = getQuestionsByMode(mode);
    if (questions.length === 0) {
      toast.error('No questions available for this mode');
      return;
    }

    setGameState(prev => ({
      ...prev,
      mode: mode,
      players: mode === GameMode.FRIEND ? [] : ['Player 1'],
      currentQuestion: questions[Math.floor(Math.random() * questions.length)],
      gameStarted: mode !== GameMode.FRIEND,
      chaosMode: mode === GameMode.FRIEND
    }));

    if (mode === GameMode.FRIEND) {
      setShowPlayerInput(true);
    } else {
      toast.success(`Selected ${mode} mode!`, {
        duration: 2000,
      });
    }
  };

  const nextQuestion = () => {
    const questions = getQuestionsByMode(gameState.mode);
    if (!questions || questions.length === 0) {
      toast.error('No questions available');
      return;
    }

    const nextIndex = Math.floor(Math.random() * questions.length);
    setGameState(prev => ({
      ...prev,
      currentQuestion: questions[nextIndex],
      timer: timerDuration // Reset timer to initial duration
    }));
  };

  const skipQuestion = () => {
    const questions = getQuestionsByMode(gameState.mode);
    if (!questions || questions.length === 0) {
      toast.error('No questions available');
      return;
    }

    const nextIndex = Math.floor(Math.random() * questions.length);
    setGameState(prev => ({
      ...prev,
      currentQuestion: questions[nextIndex],
      timer: timerDuration // Reset timer when skipping
    }));
  };

  const startNewRound = () => {
    setShowChaosWheel(true);
  };

  const handleAddQuestion = (question: { id: string; option1: string; option2: string; type: 'custom' }) => {
    setGameState(prev => ({
      ...prev,
      currentQuestion: {
        id: question.id,
        optionA: question.option1,
        optionB: question.option2,
        type: question.type
      }
    }));
    setShowAddQuestion(false);
    toast.success('Question added successfully!');
  };

  const handleBack = () => {
    if (gameState.mode === GameMode.NONE) {
      onBack();
    } else {
      setGameState({
        gameStarted: false,
        currentQuestion: null,
        players: [],
        currentPlayerIndex: 0,
        mode: GameMode.NONE,
        timer: 30,
        chaosMode: false
      });
      setShowPlayerInput(false);
      setShowChaosWheel(false);
    }
  };

  const [playerInput, setPlayerInput] = React.useState('');

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 text-white relative overflow-hidden">
      <Toaster position="top-center" />
      <FloatingBackground />
      {showAddQuestion && (
        <AddQuestionModal
          onClose={() => setShowAddQuestion(false)}
          onAdd={handleAddQuestion}
        />
      )}
      <div className="relative z-10 max-w-4xl mx-auto">
        <button
          onClick={handleBack}
          className="absolute top-4 left-4 p-2 hover:bg-white/20 rounded-full transition-colors bg-white/10"
        >
          <FiArrowLeft className="w-6 h-6 text-white" />
        </button>

        {gameState.gameStarted && !showChaosWheel && gameState.currentQuestion ? (
          <div className="space-y-8 max-w-2xl mx-auto mt-12">
            <div className="flex justify-between items-start">
              <div>
                {gameState.mode === GameMode.FRIEND && gameState.players.length > 0 && (
                  <div className="text-2xl font-bold bg-gradient-to-r from-[#E4A1FF] to-[#FF9CEE] text-transparent bg-clip-text">
                    {gameState.players[gameState.currentPlayerIndex]}'s Turn
                  </div>
                )}
              </div>
              <div className="flex flex-col items-end gap-4">
                <Timer 
                  duration={timerDuration} 
                  onDurationChange={(newDuration) => setTimerDuration(newDuration)}
                  onComplete={() => {
                    // Handle timer completion
                    nextQuestion();
                  }}
                />
                {gameState.mode === GameMode.FRIEND && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={startNewRound}
                    className="px-6 py-3 bg-white/10 backdrop-blur-sm rounded-lg hover:bg-white/20 transition-all flex items-center gap-2"
                  >
                    <FiShuffle className="w-5 h-5" />
                    Next Round
                  </motion.button>
                )}
              </div>
            </div>
            
            <div className="space-y-6">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full p-6 text-left rounded-xl bg-white/5 hover:bg-white/10 transition-colors relative group overflow-hidden"
                onClick={() => handleOptionSelect('option1')}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transform -skew-x-12 group-hover:animate-shine" />
                <span className="text-xl">{gameState.currentQuestion.optionA}</span>
              </motion.button>

              <div className="text-3xl font-extrabold text-center bg-gradient-to-r from-[#E4A1FF] to-[#FF9CEE] text-transparent bg-clip-text">
                OR
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full p-6 text-left rounded-xl bg-white/5 hover:bg-white/10 transition-colors relative group overflow-hidden"
                onClick={() => handleOptionSelect('option2')}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transform -skew-x-12 group-hover:animate-shine" />
                <span className="text-xl">{gameState.currentQuestion.optionB}</span>
              </motion.button>
            </div>

            <div className="flex justify-center gap-4 mt-8">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={skipQuestion}
                className="px-6 py-3 bg-white/10 backdrop-blur-sm rounded-lg hover:bg-white/20 transition-colors flex items-center gap-2"
              >
                <FiSkipForward className="w-5 h-5" />
                Skip
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowAddQuestion(true)}
                className="px-6 py-3 bg-white/10 backdrop-blur-sm rounded-lg hover:bg-white/20 transition-colors flex items-center gap-2"
              >
                <FiPlus className="w-5 h-5" />
                Add Question
              </motion.button>
            </div>
          </div>
        ) : (
          <div className="mt-12">
            {!gameState.mode ? (
              /* Mode Selection */
              <div className="space-y-6">
                <h1 className="text-5xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-[#E4A1FF] to-[#FF9CEE]">
                  Would You Rather
                </h1>
                <div className="grid grid-cols-1 gap-6 max-w-lg mx-auto mt-8">
                  {GAME_MODES.map((mode) => (
                    <motion.button
                      key={mode}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleModeSelect(mode)}
                      className="relative overflow-hidden p-6 bg-white/10 backdrop-blur-sm rounded-xl transition-all shadow-lg group"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transform -skew-x-12 group-hover:animate-shine" />
                      <span className="text-xl font-bold bg-gradient-to-r from-[#E4A1FF] to-[#FF9CEE] text-transparent bg-clip-text">
                        {mode === GameMode.RANDOM ? 'Random Mix' : `${mode} Mode`}
                      </span>
                    </motion.button>
                  ))}
                </div>
              </div>
            ) : showPlayerInput ? (
              /* Player Input */
              <div className="space-y-6 max-w-lg mx-auto">
                <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-[#E4A1FF] to-[#FF9CEE] text-transparent bg-clip-text">
                  Add Players
                </h2>
                <div className="space-y-4">
                  {gameState.players.map((player, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-white/10 backdrop-blur-sm rounded-lg"
                    >
                      <span className="font-semibold">{player}</span>
                      <button
                        onClick={() => handleRemovePlayer(index)}
                        className="p-1 hover:bg-white/10 rounded-full transition-colors"
                      >
                        <FiX className="w-5 h-5" />
                      </button>
                    </div>
                  ))}

                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={playerInput}
                      onChange={(e) => setPlayerInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleAddPlayer()}
                      placeholder="Enter player name"
                      className="flex-1 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E4A1FF]"
                    />
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleAddPlayer}
                      className="px-4 py-2 bg-gradient-to-r from-[#E4A1FF] to-[#FF9CEE] rounded-lg hover:from-[#D880FF] hover:to-[#FF80E5] transition-all"
                    >
                      Add
                    </motion.button>
                  </div>
                </div>

                {gameState.players.length >= 2 && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={startGame}
                    className="w-full px-6 py-3 bg-gradient-to-r from-[#E4A1FF] to-[#FF9CEE] rounded-lg hover:from-[#D880FF] hover:to-[#FF80E5] transition-all shadow-lg font-semibold"
                  >
                    Start Game
                  </motion.button>
                )}
              </div>
            ) : null}
          </div>
        )}

        {showChaosWheel && (
          <ChaosMasterWheel 
            players={gameState.players}
            onComplete={handleChaosWheelComplete}
            onEffect={handleChaosEffect}
            onAction={handleChaosAction}
            onClose={() => setShowChaosWheel(false)}
            onBack={handleBack}
          />
        )}

        {gameState.chaosMode && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleChaosAction}
            className="mt-4 px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg flex items-center gap-2 transition-colors"
          >
            <FiZap className="w-5 h-5" />
            <span>Trigger Chaos Effect</span>
          </motion.button>
        )}
      </div>
      <FeedbackButton />
    </div>
  );
}