import { create } from 'zustand';
import { GameStore, Player, Question, GameMode, Vote } from '../types';
import { useQuestionsStore } from './questionsStore';
import { v4 as uuidv4 } from 'uuid';

const initialState = {
  mode: 'classic' as GameMode,
  players: [] as Player[],
  currentQuestion: undefined,
  votes: [] as Vote[],
  usedQuestionIds: [] as string[],
  currentPlayerIndex: 0,
  isGameStarted: false,
  timer: 30,
  questions: useQuestionsStore.getState().questions,
  chaosMode: false
};

export const useGameStore = create<GameStore>((set, get) => ({
  ...initialState,

  addPlayer: (name: string) => {
    set((state) => ({
      players: [
        ...state.players,
        {
          id: uuidv4(),
          name,
          score: 0,
          streak: 0,
          avatar: `https://api.dicebear.com/6.x/avataaars/svg?seed=${name}`,
        },
      ],
    }));
  },

  removePlayer: (id: string) => {
    set((state) => ({
      players: state.players.filter((p) => p.id !== id),
    }));
  },

  setMode: (mode: GameMode) => {
    set({ mode });
  },

  setQuestion: (question: Question) => {
    set((state) => ({
      currentQuestion: question,
      usedQuestionIds: [...state.usedQuestionIds, question.id]
    }));
  },

  addVote: (playerId: string, choice: 'A' | 'B') => {
    set((state) => ({
      votes: [
        ...state.votes,
        {
          playerId,
          choice,
          timestamp: Date.now()
        }
      ]
    }));
  },

  nextQuestion: () => {
    set((state) => {
      const availableQuestions = state.questions.filter(
        (q) => q.mode === state.mode && !state.usedQuestionIds.includes(q.id)
      );
      if (availableQuestions.length === 0) {
        return state;
      }
      const nextQuestion =
        availableQuestions[Math.floor(Math.random() * availableQuestions.length)];
      return {
        currentQuestion: nextQuestion,
        usedQuestionIds: [...state.usedQuestionIds, nextQuestion.id],
        votes: [],
        currentPlayerIndex: (state.currentPlayerIndex + 1) % state.players.length,
      };
    });
  },

  startGame: () => {
    set({ isGameStarted: true });
  },

  resetGame: () => {
    set(initialState);
  },

  setTimer: (duration: number) => {
    set({ timer: duration });
  },

  setCurrentPlayerIndex: (index: number) => {
    set({ currentPlayerIndex: index });
  }
}));
