import { Question, QuestionCategory } from '../types/game';

export const categories: QuestionCategory[] = [
  'spicy',
  'funny',
  'deep',
  'social',
  'physical',
  'creative'
];

export interface Question {
  id?: string;
  option1?: string;
  option2?: string;
  type?: 'truth' | 'dare';
  text?: string;
  category: QuestionCategory;
  plotTwist?: string;
}

export const questions: Question[] = [
  // Party Time
  {
    id: 'party1',
    option1: "Dance like nobody's watching at every red light",
    option2: "Sing karaoke in public every time you hear music",
    category: 'spicy',
    plotTwist: "Plot twist: You've become a viral sensation!"
  },
  {
    id: 'party2',
    option1: "Be the world's greatest DJ but can only play at children's parties",
    option2: "Be a legendary bartender but all drinks taste like fruit punch",
    category: 'funny',
    plotTwist: "Plot twist: The kids start requesting techno remixes of nursery rhymes!"
  },
  // Dating Drama
  {
    id: 'dating1',
    option1: "Have all your exes become best friends",
    option2: "Have your parents critique all your dates in real-time",
    category: 'deep',
    plotTwist: "Plot twist: They start a support group and write a book about you!"
  },
  // Life Regrets
  {
    id: 'regret1',
    option1: "Relive your most embarrassing moment once a month",
    option2: "Have everyone know your browser history",
    category: 'social',
    plotTwist: "Plot twist: It becomes a national holiday!"
  },
  // Social Chaos
  {
    id: 'chaos1',
    option1: "Speak only in movie quotes for a year",
    option2: "Laugh uncontrollably at bad news",
    category: 'physical',
    plotTwist: "Plot twist: You become a motivational speaker!"
  },
  // Truth Questions
  {
    type: 'truth',
    text: "What's the most embarrassing thing you've ever done in front of a crush?",
    category: 'spicy'
  },
  {
    type: 'truth',
    text: "What's the biggest lie you've ever told your parents?",
    category: 'deep'
  },
  {
    type: 'truth',
    text: "What's your most ridiculous childhood memory?",
    category: 'funny'
  },
  // Dare Questions
  {
    type: 'dare',
    text: "Do 10 push-ups right now",
    category: 'physical'
  },
  {
    type: 'dare',
    text: "Dance to a song of the group's choice",
    category: 'physical'
  },
  {
    type: 'dare',
    text: "Do your best impression of another player",
    category: 'social'
  },
  {
    type: 'dare',
    text: "Create a short rap about the person to your left",
    category: 'creative'
  },
  {
    type: 'dare',
    text: "Do jumping jacks for 30 seconds",
    category: 'physical'
  }
];