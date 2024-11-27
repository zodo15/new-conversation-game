import { type Question as GameQuestion, QuestionCategory } from '../types/game';

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
  content?: string;
  category: QuestionCategory;
  plotTwist?: string;
}

export const questions: GameQuestion[] = [
  // Party Time
  {
    id: 'party1',
    content: "Would you rather...",
    type: 'truth',
    option1: "Dance like nobody's watching at every red light",
    option2: "Sing karaoke in public every time you hear music",
    category: 'spicy',
    plotTwist: "Plot twist: You've become a viral sensation!"
  },
  {
    id: 'party2',
    content: "Would you rather...",
    type: 'truth',
    option1: "Be the world's greatest DJ but can only play at children's parties",
    option2: "Be a legendary bartender but all drinks taste like fruit punch",
    category: 'funny',
    plotTwist: "Plot twist: The kids start requesting techno remixes of nursery rhymes!"
  },
  // Dating Drama
  {
    id: 'dating1',
    content: "Would you rather...",
    type: 'truth',
    option1: "Have all your exes become best friends",
    option2: "Have your parents critique all your dates in real-time",
    category: 'deep',
    plotTwist: "Plot twist: They start a support group and write a book about you!"
  },
  // Life Regrets
  {
    id: 'regret1',
    content: "Would you rather...",
    type: 'truth',
    option1: "Relive your most embarrassing moment once a month",
    option2: "Have everyone know your browser history",
    category: 'social',
    plotTwist: "Plot twist: It becomes a national holiday!"
  },
  // Social Chaos
  {
    id: 'chaos1',
    content: "Would you rather...",
    type: 'truth',
    option1: "Speak only in movie quotes for a year",
    option2: "Laugh uncontrollably at bad news",
    category: 'physical',
    plotTwist: "Plot twist: You become a motivational speaker!"
  },
  // Truth Questions
  {
    id: 'truth1',
    content: "What's the most embarrassing thing you've ever done in front of a crush?",
    type: 'truth',
    option1: "Share the story",
    option2: "Skip this question",
    category: 'spicy'
  },
  {
    id: 'truth2',
    content: "What's the biggest lie you've ever told your parents?",
    type: 'truth',
    option1: "Tell the truth",
    option2: "Skip this question",
    category: 'deep'
  },
  {
    id: 'truth3',
    content: "What's your most ridiculous childhood memory?",
    type: 'truth',
    option1: "Share the memory",
    option2: "Skip this question",
    category: 'funny'
  },
  // Dare Questions
  {
    id: 'dare1',
    content: "Do 10 push-ups right now",
    type: 'dare',
    option1: "Do it",
    option2: "Skip this dare",
    category: 'physical'
  },
  {
    id: 'dare2',
    content: "Dance to a song of the group's choice",
    type: 'dare',
    option1: "Dance now",
    option2: "Skip this dare",
    category: 'physical'
  },
  {
    id: 'dare3',
    content: "Do your best impression of another player",
    type: 'dare',
    option1: "Do the impression",
    option2: "Skip this dare",
    category: 'social'
  },
  {
    id: 'dare4',
    content: "Create a short rap about the person to your left",
    type: 'dare',
    option1: "Rap now",
    option2: "Skip this dare",
    category: 'creative'
  }
];