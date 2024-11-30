import { create } from 'zustand';
import { Question, GameMode } from '../types';
import { v4 as uuidv4 } from 'uuid';

interface QuestionsState {
  questions: Question[];
  currentQuestion: Question | null;
  usedQuestionIds: Set<string>;
}

interface QuestionsStore extends QuestionsState {
  addQuestion: (question: Question) => void;
  getQuestionsByMode: (mode: GameMode) => Question[];
  getQuestionById: (id: string) => Question | undefined;
  updateQuestion: (id: string, updatedQuestion: Partial<Question>) => void;
}

const sampleQuestions: Question[] = [
  {
    id: uuidv4(),
    optionA: 'Have the ability to fly',
    optionB: 'Have the ability to read minds',
    mode: GameMode.CLASSIC,
    category: 'Superpowers',
  },
  {
    id: uuidv4(),
    optionA: 'Live in a world without music',
    optionB: 'Live in a world without movies',
    mode: GameMode.CLASSIC,
    category: 'Lifestyle',
  },
  {
    id: uuidv4(),
    optionA: 'Always speak your mind',
    optionB: 'Never speak again',
    mode: GameMode.SPICY,
    category: 'Social',
    consequences: {
      optionA: 'You might hurt people\'s feelings but they\'ll always know where they stand',
      optionB: 'You\'ll have to find new ways to communicate',
    },
  },
  {
    id: uuidv4(),
    optionA: 'Fight 100 duck-sized horses',
    optionB: 'Fight 1 horse-sized duck',
    mode: GameMode.EXTREME,
    category: 'Combat',
    consequences: {
      optionA: 'They\'ll attack in waves but are individually weak',
      optionB: 'One powerful opponent but predictable attacks',
    },
  },
];

const initialState: QuestionsState = {
  questions: sampleQuestions,
  currentQuestion: null,
  usedQuestionIds: new Set(),
};

export const useQuestionsStore = create<QuestionsStore>((set, get) => ({
  ...initialState,

  addQuestion: (question: Question) => {
    set((state: QuestionsState) => ({
      questions: [...state.questions, { ...question, id: uuidv4() }],
    }));
  },

  getQuestionsByMode: (mode: GameMode) => {
    const state = get();
    return state.questions.filter((q) => q.mode === mode);
  },

  getQuestionById: (id: string) => {
    const state = get();
    return state.questions.find((q) => q.id === id);
  },

  updateQuestion: (id: string, updatedQuestion: Partial<Question>) => {
    set((state: QuestionsState) => ({
      questions: state.questions.map((q) =>
        q.id === id ? { ...q, ...updatedQuestion } : q
      ),
    }));
  },
}));
