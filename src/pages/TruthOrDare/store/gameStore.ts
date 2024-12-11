import create from 'zustand';
import { GameState, GameActions, Player, QuestionType, QuestionCategory } from '../types';
import { v4 as uuidv4 } from 'uuid';

const initialState: GameState = {
  players: [],
  currentPlayerIndex: 0,
  currentQuestion: null,
  selectedCategory: null,
  questionType: 'mild',
  customQuestions: [],
  usedQuestionIds: new Set(),
  gameStarted: false,
  roundCount: 0,
  showAddQuestion: false,
};

export const useGameStore = create<GameState & GameActions>((set, get) => ({
  ...initialState,

  addPlayer: (name: any) => set((state: { players: any; }) => ({
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
      },
    ],
  })),

  removePlayer: (id: any) => set((state: { players: any[]; }) => ({
    players: state.players.filter((p) => p.id !== id),
  })),

  setCurrentQuestion: (question: any) => set({ currentQuestion: question }),

  setSelectedCategory: (category: QuestionCategory | null) => set({ selectedCategory: category }),

  setQuestionType: (type: QuestionType) => set({ questionType: type }),

  selectCategory: (category: QuestionType) => set({ selectedCategory: category }),

  addCustomQuestion: (question: any) => set((state: { customQuestions: any; }) => ({
    customQuestions: [...state.customQuestions, { ...question, id: uuidv4() }],
  })),

  addUsedQuestionId: (id: any) => set((state: { usedQuestionIds: any; }) => ({
    usedQuestionIds: new Set([...state.usedQuestionIds, id]),
  })),

  clearUsedQuestionIds: () => set({ usedQuestionIds: new Set() }),

  updateScore: (playerId: any, points: any) => set((state: { players: any[]; }) => ({
    players: state.players.map((p) =>
      p.id === playerId ? { ...p, score: p.score + points } : p
    ),
  })),

  incrementCategoryCount: (playerId: string, category: QuestionType | undefined, completed: boolean) => set((state: { players: Player[]; }) => ({
    players: state.players.map((p) => {
      if (p.id === playerId) {
        const updates: Partial<Player> = {
          [category === 'truth' ? 'truthCount' : 'dareCount']: 
            p[category === 'truth' ? 'truthCount' : 'dareCount'] + 1,
        };
        
        if (completed) {
          updates.completedCount = p.completedCount + 1;
        } else {
          updates.skippedCount = p.skippedCount + 1;
        }
        
        updates.lastCategory = category;
        
        return { ...p, ...updates };
      }
      return p;
    }),
  })),

  setCurrentPlayerIndex: (index: any) => set({ currentPlayerIndex: index }),

  startGame: () => set({ 
    gameStarted: true,
    roundCount: 0,
    currentPlayerIndex: 0,
    usedQuestionIds: new Set()
  }),

  resetGame: () => set({
    ...initialState,
    customQuestions: get().customQuestions // Preserve custom questions
  }),

  setShowAddQuestion: (show: any) => set({ showAddQuestion: show }),

  skipQuestion: (question: any) => set((state: { players: any[]; currentPlayerIndex: string | number; }) => {
    const currentPlayer = state.players[state.currentPlayerIndex];
    if (!currentPlayer || !question) return state;

    return {
      lastSkippedQuestion: question,
      players: state.players.map(p => 
        p.id === currentPlayer.id
          ? { ...p, skippedCount: p.skippedCount + 1 }
          : p
      )
    };
  }),

  completeChallenge: () => {
    const state = get();
    const currentPlayer = state.players[state.currentPlayerIndex];
    if (currentPlayer && state.selectedCategory) {
      get().incrementCategoryCount(currentPlayer.id, state.selectedCategory as QuestionType, true);
    }
  },

  skipChallenge: () => {
    const state = get();
    const currentPlayer = state.players[state.currentPlayerIndex];
    if (currentPlayer && state.selectedCategory) {
      get().incrementCategoryCount(currentPlayer.id, state.selectedCategory as QuestionType, false);
    }
  },

  nextPlayer: () => set((state) => ({
    currentPlayerIndex: (state.currentPlayerIndex + 1) % state.players.length,
    selectedCategory: null,
    currentQuestion: null
  })),
}));

// Default questions
