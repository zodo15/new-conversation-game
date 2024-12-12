import create from 'zustand';
import { GameState, GameActions, Player, QuestionType, QuestionCategory, Question } from '../types';
import { v4 as uuidv4 } from 'uuid';

const initialState: GameState = {
  players: [],
  currentPlayerIndex: 0,
  currentQuestion: null,
  selectedCategory: null,
  questionType: 'mild',
  customQuestions: [],
  usedQuestionIds: new Set<string>(),
  gameStarted: false,
  roundCount: 0,
  showAddQuestion: false,
};

export const useGameStore = create<GameState & GameActions>((set, get) => ({
  ...initialState,

  addPlayer: (name: string) => set((state) => ({
    players: [
      ...state.players,
      {
        id: uuidv4(),
        name,
        score: 0,
        truthCount: 0,
        dareCount: 0,
        skippedCount: 0,
        completedCount: 0,
      } as Player,
    ],
  })),

  removePlayer: (id: string) => set((state) => ({
    players: state.players.filter((p) => p.id !== id),
  })),

  setCurrentQuestion: (question: Question | null) => set({ currentQuestion: question }),

  setSelectedCategory: (category: QuestionCategory | null) => set({ selectedCategory: category }),

  setQuestionType: (type: QuestionType) => set({ questionType: type }),

  selectCategory: (category: QuestionCategory) => set({ selectedCategory: category }),

  addCustomQuestion: (question: Question) => set((state) => ({
    customQuestions: [...state.customQuestions, { ...question, id: uuidv4() }],
  })),

  clearUsedQuestionIds: () => set({ usedQuestionIds: new Set<string>() }),

  updateScore: (playerId: string, points: number) => set((state) => ({
    players: state.players.map((p) =>
      p.id === playerId ? { ...p, score: p.score + points } : p
    ),
  })),

  incrementCategoryCount: (playerId: string, category: QuestionType | undefined, completed: boolean) => 
    set((state) => ({
      players: state.players.map((p) => {
        if (p.id !== playerId) return p;
        return {
          ...p,
          ...(completed
            ? { completedCount: p.completedCount + 1 }
            : { skippedCount: p.skippedCount + 1 }),
          ...(category === 'truth'
            ? { truthCount: p.truthCount + 1 }
            : category === 'dare'
            ? { dareCount: p.dareCount + 1 }
            : {}),
        };
      }),
    })),

  setCurrentPlayerIndex: (index: number) => set({ currentPlayerIndex: index }),

  startGame: () => set({ gameStarted: true }),

  resetGame: () => set({ ...initialState }),

  setShowAddQuestion: (show: boolean) => set({ showAddQuestion: show }),

  skipQuestion: (question: Question) => set((state) => ({
    usedQuestionIds: new Set([...state.usedQuestionIds, question.id]),
  })),

  completeChallenge: () => {
    const state = get();
    const currentPlayer = state.players[state.currentPlayerIndex];
    if (currentPlayer && state.currentQuestion) {
      state.incrementCategoryCount(currentPlayer.id, state.currentQuestion.type, true);
      state.updateScore(currentPlayer.id, 1);
      state.nextPlayer();
    }
  },

  skipChallenge: () => {
    const state = get();
    const currentPlayer = state.players[state.currentPlayerIndex];
    if (currentPlayer && state.currentQuestion) {
      state.incrementCategoryCount(currentPlayer.id, state.currentQuestion.type, false);
      state.nextPlayer();
    }
  },

  nextPlayer: () => set((state) => ({
    currentPlayerIndex: (state.currentPlayerIndex + 1) % state.players.length,
    roundCount: Math.floor((state.currentPlayerIndex + 1) / state.players.length),
  })),
}));
