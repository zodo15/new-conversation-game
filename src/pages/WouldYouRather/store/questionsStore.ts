import { create } from 'zustand';
import { Question } from '../types';

interface QuestionsStore {
  questions: Question[];
  addQuestion: (question: Question) => void;
  getQuestionsByMode: (mode: string) => Question[];
  removeQuestion: (id: string) => void;
  updateQuestion: (id: string, updatedQuestion: Question) => void;
}

const defaultQuestions: Question[] = [
  {
    id: '1',
    optionA: 'Live in a world where everyone knows your thoughts',
    optionB: 'Live in a world where you can read everyone else\'s thoughts',
    mode: 'classic',
  },
  {
    id: '2',
    optionA: 'Have the ability to fly',
    optionB: 'Have the ability to be invisible',
    mode: 'classic',
  },
  {
    id: '3',
    optionA: 'Tell your crush your true feelings',
    optionB: 'Keep it a secret forever',
    mode: 'spicy',
    consequences: {
      A: 'You must actually tell your crush how you feel',
      B: 'You can never tell them, even if they ask',
    },
  },
  {
    id: '4',
    optionA: 'Share an embarrassing story',
    optionB: 'Do 20 push-ups',
    mode: 'friends',
  },
  {
    id: '5',
    optionA: 'Switch bodies with your best friend for a day',
    optionB: 'Switch minds with your worst enemy for an hour',
    mode: 'chaos',
    consequences: {
      A: 'You must act like your best friend for the next round',
      B: 'You lose all your points',
    },
  },
];

export const useQuestionsStore = create<QuestionsStore>((set, get) => ({
  questions: defaultQuestions,

  addQuestion: (question: Question) =>
    set((state) => ({
      questions: [...state.questions, question],
    })),

  getQuestionsByMode: (mode: string) =>
    get().questions.filter((q) => q.mode === mode),

  removeQuestion: (id: string) =>
    set((state) => ({
      questions: state.questions.filter((q) => q.id !== id),
    })),

  updateQuestion: (id: string, updatedQuestion: Question) =>
    set((state) => ({
      questions: state.questions.map((q) =>
        q.id === id ? updatedQuestion : q
      ),
    })),
}));
