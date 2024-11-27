import { Question, GameMode } from '../types';

// Helper function to shuffle array
export const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export const classicQuestions: Question[] = [
  {
    id: '1',
    option1: 'Be able to fly',
    option2: 'Be able to read minds',
    type: 'classic',
  },
  {
    id: '2',
    option1: 'Live in a house made of chocolate',
    option2: 'Live in a house made of cheese',
    type: 'classic',
  },
  {
    id: '3',
    option1: 'Have a pet dragon',
    option2: 'Have a pet unicorn',
    type: 'classic',
  },
  {
    id: '4',
    option1: 'Be able to talk to animals',
    option2: 'Be able to speak all human languages',
    type: 'classic',
  },
  {
    id: '5',
    option1: 'Have super strength',
    option2: 'Have super speed',
    type: 'classic',
  },
];

export const spicyQuestions: Question[] = [
  {
    id: '6',
    option1: 'Always tell the truth',
    option2: 'Always lie',
    type: 'spicy',
  },
  {
    id: '7',
    option1: 'Know how you will die',
    option2: 'Know when you will die',
    type: 'spicy',
  },
  {
    id: '8',
    option1: 'Be famous but lonely',
    option2: 'Be unknown but loved',
    type: 'spicy',
  },
  {
    id: '9',
    option1: 'Live one perfect day on repeat',
    option2: 'Live a normal life forward',
    type: 'spicy',
  },
  {
    id: '10',
    option1: 'Know all secrets of the universe',
    option2: 'Know all secrets of humanity',
    type: 'spicy',
  },
];

export const allQuestions = [...classicQuestions, ...spicyQuestions];

export const getQuestionsByMode = (mode: GameMode): Question[] => {
  switch (mode) {
    case GameMode.CLASSIC:
      return classicQuestions;
    case GameMode.SPICY:
      return spicyQuestions;
    case GameMode.FRIENDS:
    case GameMode.OFFLINE:
      return allQuestions;
    default:
      return [];
  }
};

export const getRandomQuestion = (mode: GameMode, usedIds: Set<string>): Question | undefined => {
  const questions = getQuestionsByMode(mode);
  const availableQuestions = questions.filter(q => !usedIds.has(q.id));
  return availableQuestions.length > 0 ? shuffleArray(availableQuestions)[0] : undefined;
};