import { create } from 'zustand';
import { GameStore, Question, Player } from '../types/game';
import { v4 as uuidv4 } from 'uuid';
import { questions } from '../data/questions';

const createInitialPlayer = (name: string): Player => ({
  id: uuidv4(),
  name,
  score: 0,
  streak: 0,
  choices: {
    truth: 0,
    dare: 0,
    'would-you-rather': 0,
  },
  reactions: {
    given: {},
    received: {},
  },
});

export const useGameStore = create<GameStore>((set, get) => ({
  players: [],
  currentPlayerIndex: 0,
  currentQuestion: null,
  gameStarted: false,
  mode: 'classic',
  chaosMode: false,
  timer: 30,
  showChaosMasterWheel: false,
  showAddQuestion: false,
  votes: {},

  addPlayer: (name) => {
    set((state) => ({
      players: [...state.players, createInitialPlayer(name)],
    }));
  },

  removePlayer: (id) => {
    set((state) => ({
      players: state.players.filter((p) => p.id !== id),
    }));
  },

  startGame: () => {
    const state = get();
    if (state.players.length < 2) {
      // toast.error('Need at least 2 players to start');
      return;
    }
    set({ gameStarted: true });
  },

  setMode: (mode) => {
    set({ mode });
  },

  setCurrentQuestion: (question) => {
    set({ currentQuestion: question });
  },

  nextPlayer: () => {
    set((state) => ({
      currentPlayerIndex: (state.currentPlayerIndex + 1) % state.players.length,
    }));
  },

  addVote: (playerId, choice) => {
    set((state) => ({
      votes: { ...state.votes, [playerId]: choice },
    }));
  },

  updateScore: (playerId, points) => {
    set((state) => ({
      players: state.players.map((p) =>
        p.id === playerId ? { ...p, score: p.score + points } : p
      ),
    }));
  },

  updateStreak: (playerId) => {
    set((state) => ({
      players: state.players.map((p) =>
        p.id === playerId ? { ...p, streak: p.streak + 1 } : p
      ),
    }));
  },

  clearVotes: () => {
    set({ votes: {} });
  },

  resetGame: () => {
    set({
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
    });
  },

  addReaction: (fromPlayerId, toPlayerId, reaction) => {
    set((state) => {
      const players = state.players.map((p) => {
        if (p.id === fromPlayerId) {
          const given = { ...p.reactions.given };
          if (!given[toPlayerId]) given[toPlayerId] = [];
          given[toPlayerId].push(reaction);
          return { ...p, reactions: { ...p.reactions, given } };
        }
        if (p.id === toPlayerId) {
          const received = { ...p.reactions.received };
          if (!received[fromPlayerId]) received[fromPlayerId] = [];
          received[fromPlayerId].push(reaction);
          return { ...p, reactions: { ...p.reactions, received } };
        }
        return p;
      });
      return { players };
    });
  },

  getRandomQuestion: () => {
    const state = get();
    const availableQuestions = questions.filter(
      (q) => q.mode === state.mode || !q.mode
    );
    if (availableQuestions.length === 0) return null;
    const randomIndex = Math.floor(Math.random() * availableQuestions.length);
    return availableQuestions[randomIndex];
  },

  addUsedQuestionId: (id) => {
    // Implementation depends on how you want to track used questions
    // Could store in state or localStorage
  },

  setCurrentPlayerIndex: (index) => {
    set({ currentPlayerIndex: index });
  },

  setShowChaosMasterWheel: (show) => {
    set({ showChaosMasterWheel: show });
  },

  setShowAddQuestion: (show) => {
    set({ showAddQuestion: show });
  },
}));