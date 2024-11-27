import { Question } from '../types';

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
    option1: 'Be able to read minds',
    option2: 'Be able to turn invisible at will',
    type: 'classic'
  },
  {
    id: '2',
    option1: 'Live in a world without music',
    option2: 'Live in a world without movies',
    type: 'classic'
  },
  {
    id: '3',
    option1: 'Have unlimited money but no friends',
    option2: 'Have amazing friends but always be poor',
    type: 'classic'
  },
  {
    id: '4',
    option1: 'Be able to fly',
    option2: 'Be able to breathe underwater',
    type: 'classic'
  }
];

export const spicyQuestions: Question[] = [
  {
    id: '5',
    option1: 'Never be able to use social media again',
    option2: 'Never be able to watch streaming services again',
    type: 'spicy'
  },
  {
    id: '6',
    option1: 'Always have to speak your mind',
    option2: 'Never be able to speak again',
    type: 'spicy'
  },
  {
    id: '7',
    option1: 'Know how you will die',
    option2: 'Know when you will die',
    type: 'spicy'
  }
];

export const allQuestions = [...classicQuestions, ...spicyQuestions];

export const getQuestionsByMode = (mode: 'classic' | 'spicy'): Question[] => {
  switch (mode) {
    case 'classic':
      return classicQuestions;
    case 'spicy':
      return spicyQuestions;
    default:
      return [];
  }
};

export const getRandomQuestion = (type: 'classic' | 'spicy', usedIds: string[]): Question | undefined => {
  const questions = { classic: classicQuestions, spicy: spicyQuestions };
  const availableQuestions = questions[type].filter(q => !usedIds.includes(q.id));
  
  if (availableQuestions.length === 0) {
    return undefined;
  }
  
  const randomIndex = Math.floor(Math.random() * availableQuestions.length);
  return availableQuestions[randomIndex];
};