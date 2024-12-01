import { create } from 'zustand';
import { Question, Player, GameMode } from '../types/game';

interface GameState {
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

const useGameStore = create<GameState>((set, get) => ({
  players: [],
  currentPlayerIndex: 0,
  currentQuestion: null,
  gameStarted: false,
  mode: 'normal',
  chaosMode: false,
  timer: 30,
  votes: {},
  showChaosMasterWheel: false,
  showAddQuestion: false,
  showSettings: false,
  customQuestions: [],
  usedQuestionIds: [],

  // Player Management
  addPlayer: (name: string) => {
    const newPlayer: Player = {
      id: Math.random().toString(36).substring(7),
      name,
      score: 0,
      streak: 0,
      reactions: {
        given: {},
        received: {},
      },
    };

    set((state) => ({
      players: [...state.players, newPlayer],
    }));
  },

  removePlayer: (id: string) =>
    set((state) => ({
      players: state.players.filter((p) => p.id !== id),
    })),

  setCurrentPlayerIndex: (index: number) =>
    set({ currentPlayerIndex: index }),

  updateScore: (playerId: string, points: number) =>
    set((state) => ({
      players: state.players.map((p) =>
        p.id === playerId ? { ...p, score: p.score + points } : p
      ),
    })),

  updateStreak: (playerId: string) =>
    set((state) => ({
      players: state.players.map((p) =>
        p.id === playerId ? { ...p, streak: (p.streak || 0) + 1 } : p
      ),
    })),

  // Question Management
  setCurrentQuestion: (question: Question | null) =>
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

  addCustomQuestion: (question: Question) =>
    set((state) => ({
      customQuestions: [...state.customQuestions, question],
    })),

  addUsedQuestionId: (id: string) =>
    set((state) => ({
      usedQuestionIds: [...state.usedQuestionIds, id],
    })),

  // Game State Management
  startGame: () => set({ gameStarted: true }),
  resetGame: () => set({ gameStarted: false, currentPlayerIndex: 0, currentQuestion: null }),
  setMode: (mode: GameMode) => set({ mode }),

  nextPlayer: () =>
    set((state) => ({
      currentPlayerIndex:
        (state.currentPlayerIndex + 1) % state.players.length,
    })),

  // Voting System
  addVote: (playerId: string, choice: 'optionA' | 'optionB') => {
    const state = get();
    const currentQuestionId = state.currentQuestion?.id;

    if (!currentQuestionId) return;

    const currentVotes = state.votes[currentQuestionId] || [];
    const hasVoted = currentVotes.some((v) => v.playerId === playerId);

    if (hasVoted) return;

    set((state) => ({
      votes: {
        ...state.votes,
        [currentQuestionId]: [
          ...(state.votes[currentQuestionId] || []),
          { playerId, choice },
        ],
      },
    }));
  },

  clearVotes: () =>
    set((state) => ({
      votes: {},
    })),

  // UI State Management
  setShowChaosMasterWheel: (show: boolean) =>
    set({ showChaosMasterWheel: show }),

  setShowAddQuestion: (show: boolean) =>
    set({ showAddQuestion: show }),

  setShowSettings: (show: boolean) =>
    set({ showSettings: show }),

  // Reactions System
  addReaction: (fromPlayerId: string, toPlayerId: string, reaction: string) => {
    set((state) => {
      const players = state.players.map((player) => {
        if (player.id === fromPlayerId) {
          return {
            ...player,
            reactions: {
              ...player.reactions,
              given: {
                ...player.reactions.given,
                [toPlayerId]: [
                  ...(player.reactions.given[toPlayerId] || []),
                  reaction,
                ],
              },
            },
          };
        }
        if (player.id === toPlayerId) {
          return {
            ...player,
            reactions: {
              ...player.reactions,
              received: {
                ...player.reactions.received,
                [fromPlayerId]: [
                  ...(player.reactions.received[fromPlayerId] || []),
                  reaction,
                ],
              },
            },
          };
        }
        return player;
      });

      return { players };
    });
  },

  getReactions: (playerId: string) => {
    const state = get();
    const player = state.players.find((p) => p.id === playerId);
    if (!player) return {};

    return player.reactions.received;
  },
}));

export default useGameStore;