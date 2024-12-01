export interface ChaosChallenge {
  category: 'VOICES' | 'ACTIONS' | 'EMOTIONS' | 'STYLES';
  challenge: string;
  difficulty: 1 | 2 | 3;
  description?: string;
}

export const chaosChallenges: ChaosChallenge[] = [
  {
    category: 'VOICES',
    challenge: 'Answer in Batman voice',
    difficulty: 2,
    description: 'Channel your inner Dark Knight'
  },
  {
    category: 'VOICES',
    challenge: 'Speak like a pirate',
    difficulty: 1,
    description: 'Yarr matey!'
  },
  {
    category: 'ACTIONS',
    challenge: 'Do 5 jumping jacks before answering',
    difficulty: 1
  },
  {
    category: 'ACTIONS',
    challenge: 'Answer while doing the moonwalk',
    difficulty: 3
  },
  {
    category: 'EMOTIONS',
    challenge: 'Answer while crying dramatically',
    difficulty: 2
  },
  {
    category: 'EMOTIONS',
    challenge: 'Respond as if terrified',
    difficulty: 1
  },
  {
    category: 'STYLES',
    challenge: 'Answer in rhyme',
    difficulty: 2
  },
  {
    category: 'STYLES',
    challenge: 'Answer as a news reporter',
    difficulty: 1
  }
]; 