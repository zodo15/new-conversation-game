import { create } from 'zustand';
import { GameMode, GameState, Player, Question, Vote } from '../types';
import { getQuestionsByMode } from '../data/questions';
import { v4 as uuidv4 } from 'uuid';

interface GameStore extends GameState {
  setGameMode: (mode: GameMode) => void;
  addPlayer: (player: Player) => void;
  removePlayer: (playerId: string) => void;
  setCurrentQuestion: (question: Question) => void;
  addVote: (vote: Vote) => void;
  setTimer: (duration: number) => void;
  toggleChaosMode: () => void;
  setChaosmaster: (playerId: string) => void;
  startGame: () => void;
  resetGame: () => void;
  updatePlayerScore: (playerId: string, points: number) => void;
  updatePlayerStreak: (playerId: string) => void;
  addUsedQuestionId: (id: string) => void;
  clearVotes: () => void;
  setShowChaosMasterWheel: (show: boolean) => void;
  setShowAddQuestion: (show: boolean) => void;
  addCustomQuestion: (question: Question) => void;
  setCurrentPlayerIndex: (index: number) => void;
  getRandomQuestion: (mode: GameMode) => Question | null;
}

const initialState: GameState = {
  mode: GameMode.NONE,
  gameStarted: false,
  players: [],
  currentPlayerIndex: 0,
  currentQuestion: null,
  votes: {},
  showChaosMasterWheel: false,
  showAddQuestion: false,
  usedQuestionIds: [],
  customQuestions: [],
  chaosMode: false,
  timer: 30,
  streak: null,
};

export const useGameStore = create<GameStore>((set, get) => ({
  ...initialState,

  setGameMode: (mode) =>
    set(() => ({
      mode,
      currentQuestion: getQuestionsByMode(mode)[0],
    })),

  addPlayer: (player) =>
    set((state) => ({
      players: [...state.players, player],
    })),

  removePlayer: (playerId) =>
    set((state) => ({
      players: state.players.filter((p) => p.id !== playerId),
    })),

  setCurrentQuestion: (question) =>
    set(() => ({
      currentQuestion: question,
    })),

  addVote: (vote) =>
    set((state) => ({
      votes: {
        ...state.votes,
        [vote.playerId]: vote,
      },
    })),

  setTimer: (duration) =>
    set(() => ({
      timer: duration,
    })),

  toggleChaosMode: () =>
    set((state) => ({
      chaosMode: !state.chaosMode,
    })),

  setChaosmaster: (playerId) =>
    set((state) => ({
      chaosMaster: playerId,
      players: state.players.map((p) => ({
        ...p,
        isChaosmaster: p.id === playerId,
      })),
    })),

  startGame: () =>
    set(() => ({
      gameStarted: true,
    })),

  resetGame: () => set(initialState),

  updatePlayerScore: (playerId, points) =>
    set((state) => ({
      players: state.players.map((p) =>
        p.id === playerId ? { ...p, score: p.score + points } : p
      ),
    })),

  updatePlayerStreak: (playerId) =>
    set((state) => ({
      players: state.players.map((p) =>
        p.id === playerId ? { ...p, streak: p.streak + 1 } : p
      ),
    })),

  addUsedQuestionId: (id) =>
    set((state) => ({
      usedQuestionIds: [...state.usedQuestionIds, id],
    })),

  clearVotes: () =>
    set(() => ({
      votes: {},
    })),

  setShowChaosMasterWheel: (show) =>
    set(() => ({
      showChaosMasterWheel: show,
    })),

  setShowAddQuestion: (show) =>
    set(() => ({
      showAddQuestion: show,
    })),

  addCustomQuestion: (question) =>
    set((state) => ({
      customQuestions: [...state.customQuestions, question],
    })),

  setCurrentPlayerIndex: (index) =>
    set(() => ({
      currentPlayerIndex: index,
    })),

  getRandomQuestion: (mode) => {
    const questions = getQuestionsByMode(mode);
    const availableQuestions = questions.filter(
      (q) => !get().usedQuestionIds.includes(q.id)
    );
    if (availableQuestions.length === 0) return null;
    const randomIndex = Math.floor(Math.random() * availableQuestions.length);
    return availableQuestions[randomIndex];
  },
}));
