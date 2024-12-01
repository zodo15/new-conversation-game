import create from 'zustand';
import { GameState, GameMode, Question, Player } from '../types';
import { v4 as uuidv4 } from 'uuid';

const initialState: GameState = {
  mode: GameMode.NONE,
  gameStarted: false,
  players: [],
  currentPlayerIndex: 0,
  currentQuestion: null,
  votes: [],
  showChaosMasterWheel: false,
  showAddQuestion: false,
  usedQuestionIds: new Set(),
  customQuestions: [],
  streak: null,
};

export const useGameStore = create<GameState & {
  setMode: (mode: GameMode) => void;
  startGame: () => void;
  resetGame: () => void;
  addPlayer: (name: string) => void;
  removePlayer: (id: string) => void;
  setCurrentQuestion: (question: Question | null) => void;
  addVote: (playerId: string, choice: 'option1' | 'option2') => void;
  clearVotes: () => void;
  updateScore: (playerId: string, points: number) => void;
  setShowChaosMasterWheel: (show: boolean) => void;
  setShowAddQuestion: (show: boolean) => void;
  addCustomQuestion: (question: Question) => void;
  addUsedQuestionId: (id: string) => void;
  setCurrentPlayerIndex: (index: number) => void;
  updateStreak: (playerId: string, choice: 'option1' | 'option2') => void;
  getRandomQuestion: (mode: GameMode) => Question | null;
}>((set, get) => ({
  ...initialState,

  setMode: (mode) => set({ mode }),

  startGame: () => set({ gameStarted: true }),

  resetGame: () => set(initialState),

  addPlayer: (name) => set((state) => ({
    players: [
      ...state.players,
      {
        id: uuidv4(),
        name,
        score: 0,
        choices: [],
        streakCount: 0,
        lastChoice: null,
      },
    ],
  })),

  removePlayer: (id) => set((state) => ({
    players: state.players.filter((p) => p.id !== id),
  })),

  setCurrentQuestion: (question) => set({ currentQuestion: question }),

  addVote: (playerId, choice) => set((state) => {
    const newVotes = [...state.votes, { playerId, choice }];
    const player = state.players.find(p => p.id === playerId);
    
    if (player && state.currentQuestion) {
      const updatedPlayers = state.players.map(p => {
        if (p.id === playerId) {
          const newStreakCount = p.lastChoice === choice ? p.streakCount + 1 : 1;
          return {
            ...p,
            choices: [...p.choices, { questionId: state.currentQuestion!.id, choice }],
            streakCount: newStreakCount,
            lastChoice: choice,
          };
        }
        return p;
      });

      const updatedPlayer = updatedPlayers.find(p => p.id === playerId)!;
      const newStreak = !state.streak || updatedPlayer.streakCount > state.streak.count
        ? { playerId, count: updatedPlayer.streakCount }
        : state.streak;

      return {
        votes: newVotes,
        players: updatedPlayers,
        streak: newStreak,
      };
    }

    return { votes: newVotes };
  }),

  clearVotes: () => set({ votes: [] }),

  updateScore: (playerId, points) => set((state) => ({
    players: state.players.map((p) =>
      p.id === playerId ? { ...p, score: p.score + points } : p
    ),
  })),

  setShowChaosMasterWheel: (show) => set({ showChaosMasterWheel: show }),

  setShowAddQuestion: (show) => set({ showAddQuestion: show }),

  addCustomQuestion: (question) => set((state) => ({
    customQuestions: [...state.customQuestions, { ...question, id: uuidv4() }],
  })),

  addUsedQuestionId: (id) => set((state) => ({
    usedQuestionIds: new Set([...state.usedQuestionIds, id]),
  })),

  setCurrentPlayerIndex: (index) => set({ currentPlayerIndex: index }),

  updateStreak: (playerId, choice) => set((state) => {
    const updatedPlayers = state.players.map(p => {
      if (p.id === playerId) {
        const newStreakCount = p.lastChoice === choice ? p.streakCount + 1 : 1;
        return {
          ...p,
          streakCount: newStreakCount,
          lastChoice: choice,
        };
      }
      return p;
    });

    const updatedPlayer = updatedPlayers.find(p => p.id === playerId)!;
    const newStreak = !state.streak || updatedPlayer.streakCount > state.streak.count
      ? { playerId, count: updatedPlayer.streakCount }
      : state.streak;

    return {
      players: updatedPlayers,
      streak: newStreak,
    };
  }),

  getRandomQuestion: (mode) => {
    const state = get();
    const questions = [...state.customQuestions];
    const unusedQuestions = questions.filter(q => !state.usedQuestionIds.has(q.id));
    if (unusedQuestions.length === 0) return null;
    
    const randomIndex = Math.floor(Math.random() * unusedQuestions.length);
    return unusedQuestions[randomIndex];
  },
}));
