import create from 'zustand';
import { Question, GameMode } from '../types';

interface QuestionsState {
  questions: Question[];
  addQuestion: (question: Question) => void;
  getQuestionsByMode: (mode: GameMode) => Question[];
  removeQuestion: (id: string) => void;
  editQuestion: (id: string, updatedQuestion: Partial<Question>) => void;
}

const defaultQuestions: Question[] = [
  {
    id: '1',
    option1: 'Have the ability to fly',
    option2: 'Have the ability to read minds',
    mode: GameMode.CLASSIC,
    category: 'Superpowers',
  },
  {
    id: '2',
    option1: 'Live in a world without music',
    option2: 'Live in a world without movies',
    mode: GameMode.CLASSIC,
    category: 'Lifestyle',
  },
  {
    id: '3',
    option1: 'Always speak your mind',
    option2: 'Never speak again',
    mode: GameMode.SPICY,
    category: 'Social',
    consequences: {
      option1: 'You might hurt people\'s feelings but they\'ll always know where they stand',
      option2: 'You\'ll have to find new ways to communicate',
    },
  },
  {
    id: '4',
    option1: 'Fight 100 duck-sized horses',
    option2: 'Fight 1 horse-sized duck',
    mode: GameMode.EXTREME,
    category: 'Combat',
    consequences: {
      option1: 'They\'ll attack in waves but are individually weak',
      option2: 'One powerful opponent but predictable attacks',
    },
  },
];

export const useQuestionsStore = create<QuestionsState>((set, get) => ({
  questions: defaultQuestions,

  addQuestion: (question) => set((state) => ({
    questions: [...state.questions, question],
  })),

  getQuestionsByMode: (mode) => {
    const { questions } = get();
    return questions.filter((q) => q.mode === mode);
  },

  removeQuestion: (id) => set((state) => ({
    questions: state.questions.filter((q) => q.id !== id),
  })),

  editQuestion: (id, updatedQuestion) => set((state) => ({
    questions: state.questions.map((q) =>
      q.id === id ? { ...q, ...updatedQuestion } : q
    ),
  })),
}));
