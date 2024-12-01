import { Question } from '../types';
import { v4 as uuidv4 } from 'uuid';

export const questions: Question[] = [
  {
    id: uuidv4(),
    optionA: "Be able to teleport anywhere",
    optionB: "Be able to read minds",
    type: "normal",
    mode: "classic"
  },
  {
    id: uuidv4(),
    optionA: "Live in a world without music",
    optionB: "Live in a world without movies",
    type: "normal",
    mode: "classic"
  },
  {
    id: uuidv4(),
    optionA: "Eat your favorite food for every meal",
    optionB: "Never be able to eat your favorite food again",
    type: "spicy",
    mode: "spicy",
    consequences: {
      A: "But it loses its taste after a month",
      B: "But you get to try a new amazing food every week"
    }
  },
  {
    id: uuidv4(),
    optionA: "Have a personal chef",
    optionB: "Have a personal masseuse",
    type: "friends",
    mode: "friends"
  },
  {
    id: uuidv4(),
    optionA: "Switch lives with your best friend",
    optionB: "Switch personalities with your best friend",
    type: "chaos",
    mode: "chaos",
    consequences: {
      A: "But they get to control your social media",
      B: "But they get to choose your outfits"
    }
  }
];

export const getQuestionsByMode = (mode: string): Question[] => {
  return questions.filter(q => q.mode === mode);
};