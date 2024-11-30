import create from 'zustand';
import { Question, Player, GameMode } from '../types/game';

export interface GameState {
  players: Player[];
  currentPlayerIndex: number;
  currentQuestion: Question | null;
  gameStarted: boolean;
  mode: GameMode;
  chaosMode: boolean;
  timer: number;
  votes: Record<string, Array<{ playerId: string; choice: 'optionA' | 'optionB' }>>;
  showChaosMasterWheel: boolean;
  showAddQuestion: boolean;
  showSettings: boolean;
  customQuestions: Question[];
  usedQuestionIds: string[];
}

export interface GameStore extends GameState {
  // Player Management
  addPlayer: (name: string) => void;
  removePlayer: (id: string) => void;
  setCurrentPlayerIndex: (index: number) => void;
  updateScore: (playerId: string, points: number) => void;
  updateStreak: (playerId: string) => void;

  // Question Management
  setCurrentQuestion: (question: Question | null) => void;
  getRandomQuestion: () => Question | null;
  addCustomQuestion: (question: Question) => void;
  addUsedQuestionId: (id: string) => void;

  // Game State Management
  startGame: () => void;
  resetGame: () => void;
  setMode: (mode: GameMode) => void;
  nextPlayer: () => void;

  // Voting System
  addVote: (playerId: string, choice: 'optionA' | 'optionB') => void;
  clearVotes: () => void;

  // UI State Management
  setShowChaosMasterWheel: (show: boolean) => void;
  setShowAddQuestion: (show: boolean) => void;
  setShowSettings: (show: boolean) => void;

  // Reactions System
  addReaction: (fromPlayerId: string, toPlayerId: string, reaction: string) => void;
  getReactions: (playerId: string) => { given: string[]; received: string[] };
}

const initialState: GameState = {
  players: [],
  currentPlayerIndex: 0,
  currentQuestion: null,
  gameStarted: false,
  mode: 'classic',
  chaosMode: false,
  timer: 30,
  votes: {},
  showChaosMasterWheel: false,
  showAddQuestion: false,
  showSettings: false,
  customQuestions: [],
  usedQuestionIds: []
};

export const useGameStore = create<GameStore>((set, get) => ({
  ...initialState,

  // Player Management
  addPlayer: (name) =>
    set((state) => ({
      players: [
        ...state.players,
        {
          id: Date.now().toString(),
          name,
          score: 0,
          streak: 0,
          truthCount: 0,
          dareCount: 0,
          wouldYouRatherCount: 0,
          reactions: {
            given: {},
            received: {}
          }
        }
      ]
    })),

  removePlayer: (id) =>
    set((state) => ({
      players: state.players.filter((p) => p.id !== id)
    })),

  setCurrentPlayerIndex: (index) =>
    set({ currentPlayerIndex: index }),

  updateScore: (playerId, points) =>
    set((state) => ({
      players: state.players.map((p) =>
        p.id === playerId ? { ...p, score: p.score + points } : p
      )
    })),

  updateStreak: (playerId) =>
    set((state) => ({
      players: state.players.map((p) =>
        p.id === playerId ? { ...p, streak: (p.streak || 0) + 1 } : p
      )
    })),

  // Question Management
  setCurrentQuestion: (question) =>
    set({ currentQuestion: question }),

  getRandomQuestion: () => {
    const state = get();
    const availableQuestions = state.customQuestions.filter(
      (q) => !state.usedQuestionIds.includes(q.id)
    );
    if (availableQuestions.length === 0) return null;
    const randomIndex = Math.floor(Math.random() * availableQuestions.length);
    return availableQuestions[randomIndex];
  },

  addCustomQuestion: (question) =>
    set((state) => ({
      customQuestions: [...state.customQuestions, question]
    })),

  addUsedQuestionId: (id) =>
    set((state) => ({
      usedQuestionIds: [...state.usedQuestionIds, id]
    })),

  // Game State Management
  startGame: () => set({ gameStarted: true }),
  resetGame: () => set(initialState),
  setMode: (mode) => set({ mode }),
  nextPlayer: () =>
    set((state) => ({
      currentPlayerIndex:
        (state.currentPlayerIndex + 1) % state.players.length
    })),

  // Voting System
  addVote: (playerId, choice) =>
    set((state) => {
      const questionId = state.currentQuestion?.id;
      if (!questionId) return state;

      const currentVotes = state.votes[questionId] || [];
      const updatedVotes = [
        ...currentVotes.filter((v) => v.playerId !== playerId),
        { playerId, choice }
      ];

      return {
        votes: {
          ...state.votes,
          [questionId]: updatedVotes
        }
      };
    }),

  clearVotes: () =>
    set((state) => ({
      votes: {}
    })),

  // UI State Management
  setShowChaosMasterWheel: (show) =>
    set({ showChaosMasterWheel: show }),
  setShowAddQuestion: (show) =>
    set({ showAddQuestion: show }),
  setShowSettings: (show) =>
    set({ showSettings: show }),

  // Reactions System
  addReaction: (fromPlayerId, toPlayerId, reaction) =>
    set((state) => ({
      players: state.players.map((p) => {
        if (p.id === fromPlayerId) {
          return {
            ...p,
            reactions: {
              ...p.reactions,
              given: {
                ...p.reactions?.given,
                [toPlayerId]: [
                  ...(p.reactions?.given[toPlayerId] || []),
                  reaction
                ]
              }
            }
          };
        }
        if (p.id === toPlayerId) {
          return {
            ...p,
            reactions: {
              ...p.reactions,
              received: {
                ...p.reactions?.received,
                [fromPlayerId]: [
                  ...(p.reactions?.received[fromPlayerId] || []),
                  reaction
                ]
              }
            }
          };
        }
        return p;
      })
    })),

  getReactions: (playerId) => {
    const state = get();
    const player = state.players.find((p) => p.id === playerId);
    return {
      given: Object.values(player?.reactions?.given || {}).flat(),
      received: Object.values(player?.reactions?.received || {}).flat()
    };
  }
}));