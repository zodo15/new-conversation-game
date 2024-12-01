import { Question, GameMode } from '../types';
import { v4 as uuidv4 } from 'uuid';

export const questions: Question[] = [
  {
    id: uuidv4(),
    optionA: "Be able to read minds",
    optionB: "Be invisible at will",
    mode: 'classic',
  },
  {
    id: uuidv4(),
    optionA: "Live without music",
    optionB: "Live without movies",
    mode: 'classic',
  },
  {
    id: uuidv4(),
    optionA: "Have unlimited money",
    optionB: "Have unlimited knowledge",
    mode: 'classic',
  },
  {
    id: uuidv4(),
    optionA: "Never need to sleep",
    optionB: "Never need to eat",
    mode: 'classic',
  },
  {
    id: uuidv4(),
    optionA: "Be famous",
    optionB: "Be anonymous but rich",
    mode: 'classic',
  },
  // Spicy questions
  {
    id: uuidv4(),
    optionA: "Always tell the truth",
    optionB: "Always lie",
    mode: 'spicy',
    consequences: {
      optionA: "Everyone will know your secrets",
      optionB: "Nobody will ever trust you",
    },
  },
  {
    id: uuidv4(),
    optionA: "Live without social media",
    optionB: "Live without your phone",
    mode: 'spicy',
    consequences: {
      optionA: "You'll miss out on trends and connections",
      optionB: "You'll be less accessible to others",
    },
  },
  // Friend mode questions
  {
    id: uuidv4(),
    optionA: "Switch lives with your best friend",
    optionB: "Keep your current life",
    mode: 'friends',
  },
  {
    id: uuidv4(),
    optionA: "Have all your friends know your thoughts",
    optionB: "Know all your friends' thoughts",
    mode: 'friends',
  },
  // Chaos mode questions
  {
    id: uuidv4(),
    optionA: "Random superpowers every day",
    optionB: "One consistent superpower",
    mode: 'chaos',
    consequences: {
      optionA: "You never know what you'll get",
      optionB: "You might get stuck with something boring",
    },
  },
  {
    id: uuidv4(),
    optionA: "Everything you touch turns random colors",
    optionB: "Everything you say comes out as a song",
    mode: 'chaos',
    consequences: {
      optionA: "The world becomes your canvas",
      optionB: "Life becomes a musical",
    },
  },
];

export const getQuestionsByMode = (mode: GameMode): Question[] => {
  return questions.filter(q => q.mode === mode);
};