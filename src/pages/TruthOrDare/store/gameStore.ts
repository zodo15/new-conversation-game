import create from 'zustand';
import { GameState, GameActions, Question, Player, QuestionCategory, QuestionType } from '../types';
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

  addPlayer: (name) => set((state) => ({
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

  removePlayer: (id) => set((state) => ({
    players: state.players.filter((p) => p.id !== id),
  })),

  setCurrentQuestion: (question) => set({ currentQuestion: question }),

  setSelectedCategory: (category) => set({ selectedCategory: category }),

  setQuestionType: (type) => set({ questionType: type }),

  addCustomQuestion: (question) => set((state) => ({
    customQuestions: [...state.customQuestions, { ...question, id: uuidv4() }],
  })),

  addUsedQuestionId: (id) => set((state) => ({
    usedQuestionIds: new Set([...state.usedQuestionIds, id]),
  })),

  clearUsedQuestionIds: () => set({ usedQuestionIds: new Set() }),

  updateScore: (playerId, points) => set((state) => ({
    players: state.players.map((p) =>
      p.id === playerId ? { ...p, score: p.score + points } : p
    ),
  })),

  incrementCategoryCount: (playerId, category, completed) => set((state) => ({
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

  setCurrentPlayerIndex: (index) => set({ currentPlayerIndex: index }),

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

  setShowAddQuestion: (show) => set({ showAddQuestion: show }),

  skipQuestion: (question) => set((state) => {
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
}));

// Default questions
const defaultQuestions: Question[] = [
  // Mild Truth Questions
  { id: 't1', text: "What's the most embarrassing song you love to listen to?", type: 'mild', category: 'truth' },
  { id: 't2', text: "What's the longest you've gone without showering?", type: 'mild', category: 'truth' },
  { id: 't3', text: "What's your biggest pet peeve?", type: 'mild', category: 'truth' },
  
  // Spicy Truth Questions
  { id: 't4', text: "What's the biggest lie you've ever told?", type: 'spicy', category: 'truth' },
  { id: 't5', text: "What's your biggest regret?", type: 'spicy', category: 'truth' },
  { id: 't6', text: "What's the most trouble you've ever been in?", type: 'spicy', category: 'truth' },
  
  // Extreme Truth Questions
  { id: 't7', text: "What's your deepest secret that you've never told anyone?", type: 'extreme', category: 'truth' },
  { id: 't8', text: "What's the worst thing you've ever done?", type: 'extreme', category: 'truth' },
  
  // Mild Dare Questions
  { id: 'd1', text: "Do your best impression of a celebrity", type: 'mild', category: 'dare' },
  { id: 'd2', text: "Speak in an accent for the next three rounds", type: 'mild', category: 'dare' },
  { id: 'd3', text: "Do 10 jumping jacks", type: 'mild', category: 'dare' },
  
  // Spicy Dare Questions
  { id: 'd4', text: "Call a friend and sing them a song", type: 'spicy', category: 'dare' },
  { id: 'd5', text: "Post an embarrassing selfie on social media", type: 'spicy', category: 'dare' },
  { id: 'd6', text: "Let another player post anything they want on your social media", type: 'spicy', category: 'dare' },
  
  // Extreme Dare Questions
  { id: 'd7', text: "Let the group give you a makeover with whatever they can find", type: 'extreme', category: 'dare' },
  { id: 'd8', text: "Eat a spoonful of the spiciest condiment available", type: 'extreme', category: 'dare' }
];