import { create } from 'zustand';
import { Question, GameMode } from '../types';
import { questions as defaultQuestions } from '../data/questions';

interface QuestionsState {
  questions: Question[];
  addQuestion: (question: Question) => void;
  getQuestionsByMode: (mode: GameMode) => Question[];
  removeQuestion: (id: string | number) => void;
  editQuestion: (id: string | number, updatedQuestion: Partial<Question>) => void;
  resetToDefault: () => void;
}

export const useQuestionsStore = create<QuestionsState>((set, get) => ({
  questions: defaultQuestions,

  addQuestion: (question: Question) => set((state) => ({
    questions: [...state.questions, question],
  })),

  getQuestionsByMode: (mode: GameMode) => {
    const { questions } = get();
    return questions.filter((q) => q.mode === mode);
  },

  removeQuestion: (id: string | number) => set((state) => ({
    questions: state.questions.filter((q) => q.id !== id),
  })),

  editQuestion: (id: string | number, updatedQuestion: Partial<Question>) => set((state) => ({
    questions: state.questions.map((q) =>
      q.id === id ? { ...q, ...updatedQuestion } : q
    ),
  })),

  resetToDefault: () => set({ questions: defaultQuestions }),
}));
