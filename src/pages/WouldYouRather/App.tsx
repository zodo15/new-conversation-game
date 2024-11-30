import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, X, SkipForward, Zap, Plus, Shuffle } from '@phosphor-icons/react';
import { Toaster, toast } from 'react-hot-toast';
import { Question } from './types';
import { getQuestionsByMode } from './data/questions';
import { FloatingBackground } from './components/FloatingBackground';
import { Timer } from './components/Timer';
import { ChaosMasterWheel } from './components/ChaosMasterWheel';
import { AddQuestionModal } from './components/AddQuestionModal';
import { FeedbackButton } from '../../components/FeedbackButton';

interface GameState {
  gameStarted: boolean;
  currentQuestion: Question | null;
  players: string[];
  currentPlayerIndex: number;
  mode: string;
  chaosMode: boolean;
  chaosMaster?: string;
  timer: number;
  votes?: Record<string, number>;
  selectedOption?: string;
}

const App = ({ onBack }: { onBack: () => void }) => {
  const [gameState, setGameState] = useState<GameState>({
    gameStarted: false,
    currentQuestion: null,
    players: [],
    currentPlayerIndex: 0,
    mode: '',
    chaosMode: false,
    timer: 30,
    votes: {},
  });

  const [playerInput, setPlayerInput] = useState('');
  const [showPlayerInput, setShowPlayerInput] = useState(false);
  const [showChaosWheel, setShowChaosWheel] = useState(false);
  const [timerDuration, setTimerDuration] = useState(30);
  const [showAddQuestion, setShowAddQuestion] = useState(false);

  const GAME_MODES = ['classic', 'spicy', 'friend', 'random'];

  const handleDurationChange = (newDuration: number) => {
    setTimerDuration(newDuration);
  };

  const startGame = () => {
    if (gameState.players.length < 2) {
      toast.error('Add at least 2 players to start!');
      return;
    }

    const questions = getQuestionsByMode(gameState.mode);
    if (!questions.length) {
      toast.error('No questions available for this mode!');
      return;
    }

    const firstQuestion = questions[Math.floor(Math.random() * questions.length)];
    setGameState(prev => ({
      ...prev,
      gameStarted: true,
      currentQuestion: firstQuestion,
      currentPlayerIndex: 0,
      votes: {},
      selectedOption: undefined
    }));
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

  const handleModeSelect = (mode: string) => {
    const questions = getQuestionsByMode(mode);
    if (questions.length === 0) {
      toast.error('No questions available for this mode');
      return;
    }

    setGameState(prev => ({
      ...prev,
      mode: mode,
      players: mode === 'friend' ? [] : ['Player 1'],
      currentQuestion: questions[Math.floor(Math.random() * questions.length)],
      gameStarted: mode !== 'friend',
      chaosMode: mode === 'friend'
    }));

    if (mode === 'friend') {
      setShowPlayerInput(true);
    } else {
      toast.success(`Selected ${mode} mode!`, {
        duration: 2000,
      });
    }
  };

  const handleOptionSelect = (option: 'A' | 'B') => {
    if (!gameState.currentQuestion) return;

    if (option === 'A') {
      handleChoice('optionA');
    } else {
      handleChoice('optionB');
    }
  };

  const handleChoice = (choice: 'optionA' | 'optionB') => {
    if (!gameState.currentQuestion) return;

    setGameState(prev => ({
      ...prev,
      votes: {
        ...prev.votes,
        [choice]: (prev.votes?.[choice] || 0) + 1
      },
      selectedOption: choice
    }));

    setTimeout(() => {
      nextQuestion();
    }, 1500);
  };

  const nextQuestion = () => {
    const questions = getQuestionsByMode(gameState.mode);
    if (!questions || questions.length === 0) {
      toast.error('No questions available');
      return;
    }

    const nextIndex = Math.floor(Math.random() * questions.length);
    const nextPlayerIndex = (gameState.currentPlayerIndex + 1) % gameState.players.length;
    
    setGameState(prev => ({
      ...prev,
      currentQuestion: questions[nextIndex],
      currentPlayerIndex: nextPlayerIndex,
      timer: timerDuration,
      votes: {},
      selectedOption: undefined
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
    if (gameState.mode === '') {
      onBack();
    } else {
      setGameState({
        gameStarted: false,
        currentQuestion: null,
        players: [],
        currentPlayerIndex: 0,
        mode: '',
        timer: 30,
      });
      setShowPlayerInput(false);
      setShowChaosWheel(false);
    }
  };

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
          <ArrowLeft className="w-6 h-6 text-white" />
        </button>

        {gameState.gameStarted && !showChaosWheel && gameState.currentQuestion ? (
          <div className="space-y-8 max-w-2xl mx-auto mt-12">
            <div className="flex justify-between items-start">
              <div>
                {gameState.mode === 'friend' && gameState.players.length > 0 && (
                  <div className="text-2xl font-bold bg-gradient-to-r from-[#E4A1FF] to-[#FF9CEE] text-transparent bg-clip-text">
                    {gameState.players[gameState.currentPlayerIndex]}'s Turn
                  </div>
                )}
              </div>
              <div className="flex flex-col items-end gap-4">
                <Timer
                  duration={timerDuration}
                  onDurationChange={handleDurationChange}
                />
                {gameState.mode === 'friend' && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => toast.success('Chaos Challenge!', {
                      icon: '⚡',
                      duration: 4000
                    })}
                    className="px-4 py-2 bg-gradient-to-r from-[#E4A1FF] to-[#FF9CEE] rounded-lg hover:from-[#D880FF] hover:to-[#FF80E5] transition-all flex items-center gap-2 text-sm"
                  >
                    <Zap className="w-4 h-4" />
                    Chaos!
                  </motion.button>
                )}
              </div>
            </div>

            <div className="text-3xl font-bold text-center bg-gradient-to-r from-[#E4A1FF] to-[#FF9CEE] text-transparent bg-clip-text mb-8">
              Would you rather...
            </div>

            <div className="flex flex-col gap-8">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleChoice('optionA')}
                className="w-full p-8 bg-white/10 backdrop-blur-sm rounded-xl hover:bg-white/20 transition-all text-xl text-center shadow-lg relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transform -skew-x-12 group-hover:animate-shine" />
                <span className="relative z-10 font-semibold">{gameState.currentQuestion.optionA}</span>
              </motion.button>

              <div className="text-3xl font-extrabold text-center bg-gradient-to-r from-[#E4A1FF] to-[#FF9CEE] text-transparent bg-clip-text">
                OR
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleChoice('optionB')}
                className="w-full p-8 bg-white/10 backdrop-blur-sm rounded-xl hover:bg-white/20 transition-all text-xl text-center shadow-lg relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transform -skew-x-12 group-hover:animate-shine" />
                <span className="relative z-10 font-semibold">{gameState.currentQuestion.optionB}</span>
              </motion.button>
            </div>

            <div className="flex justify-center gap-4 mt-8">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={skipQuestion}
                className="px-6 py-3 bg-white/10 backdrop-blur-sm rounded-lg hover:bg-white/20 transition-all flex items-center gap-2"
              >
                <SkipForward className="w-5 h-5" />
                Skip
              </motion.button>

              {gameState.mode === 'friend' && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={startGame}
                  className="px-6 py-3 bg-white/10 backdrop-blur-sm rounded-lg hover:bg-white/20 transition-all flex items-center gap-2"
                >
                  <Shuffle className="w-5 h-5" />
                  Next Round
                </motion.button>
              )}

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowAddQuestion(true)}
                className="px-6 py-3 bg-white/10 backdrop-blur-sm rounded-lg hover:bg-white/20 transition-all flex items-center gap-2"
              >
                <Plus className="w-5 h-5" />
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
                        {mode === 'random' ? 'Random Mix' : `${mode} Mode`}
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
                        <X className="w-5 h-5" />
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
            onComplete={(selectedPlayer) => {
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
            }}
            onClose={() => setShowChaosWheel(false)}
            onBack={handleBack}
          />
        )}
      </div>
      <FeedbackButton />
    </div>
  );
};

export default App;