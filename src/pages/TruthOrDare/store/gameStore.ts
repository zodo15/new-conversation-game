import { create } from 'zustand';
import { Question } from '../types/game';
import { v4 as uuidv4 } from 'uuid';

interface GameState {
  players: string[];
  currentPlayer: string | null;
  currentQuestion: Question | null;
  selectedCategory: string | null;
  selectedType: string | null;
  votes: Record<string, { option1: number; option2: number }>;
  reactions: Record<string, Record<string, number>>;
  lastSkippedQuestion: Question | null;
  showResults: boolean;
  chaosMode: boolean;
  timerMode: boolean;
  isAgeVerified: boolean;
  usedQuestions: Set<number>;
  customQuestions: Question[];
}

type GameStore = GameState & {
  setCurrentPlayer: (player: string | null) => void;
  addReaction: (questionId: string, reaction: string) => void;
  addPlayer: (name: string) => void;
  removePlayer: (name: string) => void;
  setCurrentQuestion: (question: Question | null) => void;
  setSelectedCategory: (category: string | null) => void;
  setQuestionType: (type: string | null) => void;
  addCustomQuestion: (question: Question) => void;
  addVote: (id: string, option: 1 | 2) => void;
  setShowResults: (show: boolean) => void;
  skipQuestion: (question: Question) => void;
  toggleChaosMode: () => void;
  toggleTimerMode: () => void;
  setAgeVerified: (verified: boolean) => void;
  startGame: () => void;
  resetGame: () => void;
  setShowAddQuestion: (show: boolean) => void;
  incrementCategoryCount: (playerId: string, category: 'truth' | 'dare', completed: boolean) => void;
  setCurrentPlayerIndex: (index: number) => void;
  updateScore: (playerId: string, points: number) => void;
  addUsedQuestionId: (id: string) => void;
  clearUsedQuestionIds: () => void;
};

const initialState: GameState = {
  players: [],
  currentPlayer: null,
  currentQuestion: null,
  selectedCategory: null,
  selectedType: null,
  votes: {},
  reactions: {},
  lastSkippedQuestion: null,
  showResults: false,
  chaosMode: false,
  timerMode: false,
  isAgeVerified: false,
  usedQuestions: new Set(),
  customQuestions: []
};

export const useGameStore = create<GameStore>((set, get) => ({
  ...initialState,

  setCurrentPlayer: (player: string | null) => set({ currentPlayer: player }),

  addReaction: (questionId: string, reaction: string) => 
    set((state: GameState) => {
      const currentReactions = state.reactions[questionId] || {};
      return {
        reactions: {
          ...state.reactions,
          [questionId]: {
            ...currentReactions,
            [reaction]: (currentReactions[reaction] || 0) + 1
          }
        }
      };
    }),

  addPlayer: (name: string) => set((state: GameState) => ({
    players: [...state.players, name]
  })),

  removePlayer: (name: string) => set((state: GameState) => ({
    players: state.players.filter(p => p !== name)
  })),

  setCurrentQuestion: (question: Question | null) => set({ currentQuestion: question }),

  setSelectedCategory: (category: string | null) => set({ selectedCategory: category }),

  setQuestionType: (type: string | null) => set({ selectedType: type }),

  addCustomQuestion: (question: Question) => set((state: GameState) => ({
    customQuestions: [...state.customQuestions, { ...question, id: uuidv4() }]
  })),

  addVote: (id: string, option: 1 | 2) => set((state: GameState) => {
    const currentVotes = state.votes[id] || { option1: 0, option2: 0 };
    return {
      votes: {
        ...state.votes,
        [id]: {
          option1: option === 1 ? currentVotes.option1 + 1 : currentVotes.option1,
          option2: option === 2 ? currentVotes.option2 + 1 : currentVotes.option2
        }
      }
    };
  }),

  setShowResults: (show: boolean) => set({ showResults: show }),

  skipQuestion: (question: Question) => set((state: GameState) => ({
    lastSkippedQuestion: question,
    players: state.players.map(p => p)
  })),

  toggleChaosMode: () => set((state: GameState) => ({ chaosMode: !state.chaosMode })),

  toggleTimerMode: () => set((state: GameState) => ({ timerMode: !state.timerMode })),

  setAgeVerified: (verified: boolean) => set({ isAgeVerified: verified }),

  startGame: () => set({ 
    gameStarted: true,
    roundCount: 0,
    currentPlayerIndex: 0,
    usedQuestions: new Set()
  }),

  resetGame: () => set({
    ...initialState,
    customQuestions: get().customQuestions // Preserve custom questions
  }),

  setShowAddQuestion: (show: boolean) => set({ showAddQuestion: show }),

  incrementCategoryCount: (playerId: string, category: 'truth' | 'dare', completed: boolean) => set((state: GameState) => ({
    players: state.players.map((p) => {
      if (p === playerId) {
        const updates: Partial<string> = {
          [category === 'truth' ? 'truthCount' : 'dareCount']: 
            (state.players.find(player => player === playerId)?.[category === 'truth' ? 'truthCount' : 'dareCount'] || 0) + 1,
        };
        
        if (completed) {
          updates.completedCount = (state.players.find(player => player === playerId)?.completedCount || 0) + 1;
        } else {
          updates.skippedCount = (state.players.find(player => player === playerId)?.skippedCount || 0) + 1;
        }
        
        updates.lastCategory = category;
        
        return { ...p, ...updates };
      }
      return p;
    }),
  })),

  setCurrentPlayerIndex: (index: number) => set({ currentPlayerIndex: index }),

  updateScore: (playerId: string, points: number) => set((state: GameState) => ({
    players: state.players.map((p) =>
      p === playerId ? { ...p, score: (state.players.find(player => player === playerId)?.score || 0) + points } : p
    ),
  })),

  addUsedQuestionId: (id: string) => set((state: GameState) => ({
    usedQuestions: new Set([...state.usedQuestions, id]),
  })),

  clearUsedQuestionIds: () => set({ usedQuestions: new Set() }),
}));