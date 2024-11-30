export interface Question {
  id: string;
  option1: string;
  option2: string;
  category: string;
  plotTwist?: string;
}

export const questions: Question[] = [
  // Party Time
  {
    id: 'party1',
    option1: 'Have the ability to start an epic party anywhere instantly',
    option2: 'Be able to recover from any hangover in 5 minutes',
    category: 'Party Time',
    plotTwist: 'Plot twist: The party follows you EVERYWHERE, even to important meetings!'
  },
  {
    id: 'party2',
    option1: 'Be the world's greatest DJ but can only play at children's parties',
    option2: 'Be a legendary bartender but all drinks taste like fruit punch',
    category: 'Party Time',
    plotTwist: 'Plot twist: The kids start requesting techno remixes of nursery rhymes!'
  },
  // Dating Drama
  {
    id: 'dating1',
    option1: 'Know everyone's true feelings but can't keep secrets',
    option2: 'Be irresistibly attractive but can't tell if people like your personality',
    category: 'Dating Drama',
    plotTwist: 'Plot twist: Your pet can suddenly talk and comments on all your dates!'
  },
  {
    id: 'dating2',
    option1: 'Have perfect first dates but terrible relationships',
    option2: 'Have awful first dates but amazing relationships',
    category: 'Dating Drama',
    plotTwist: 'Plot twist: Your dates are being secretly filmed for a reality show!'
  },
  // Life Regrets
  {
    id: 'regrets1',
    option1: 'Redo your worst decision but forget your best memory',
    option2: 'Keep all memories but live with your biggest mistake',
    category: 'Life Regrets',
    plotTwist: 'Plot twist: Your alternate self from that timeline wants to switch back!'
  },
  {
    id: 'regrets2',
    option1: 'Know exactly when you'll meet "the one" but not who they are',
    option2: 'Know who "the one" is but never when you'll meet them',
    category: 'Life Regrets',
    plotTwist: 'Plot twist: There are multiple "ones" and they all know about each other!'
  },
  // Social Chaos
  {
    id: 'social1',
    option1: 'Read everyone's DMs but they can read yours too',
    option2: 'Never have to explain yourself but no one believes your stories',
    category: 'Social Chaos',
    plotTwist: 'Plot twist: Your grandmother joins social media and becomes an influencer!'
  },
  {
    id: 'social2',
    option1: 'Be famous for something embarrassing but rich',
    option2: 'Be respected for something cool but struggling',
    category: 'Social Chaos',
    plotTwist: 'Plot twist: Your embarrassing moment becomes a global holiday!'
  }
];

export const categories = [
  'Party Time',
  'Dating Drama',
  'Life Regrets',
  'Social Chaos'
];