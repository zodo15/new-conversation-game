// Helper function to shuffle array
export const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export type Question = {
  id: number;
  optionA: string;
  optionB: string;
  votesA: number;
  votesB: number;
  type?: 'classic' | 'spicy';
};

// All questions combined in one array
export const allQuestions: Question[] = [
  // Classic questions
  {
    id: 1,
    optionA: "Have all your thoughts broadcast on a billboard",
    optionB: "Have access to everyone else's thoughts",
    votesA: 4231,
    votesB: 5769,
    type: 'classic'
  },
  {
    id: 2,
    optionA: "Be famous for something embarrassing",
    optionB: "Never be known for anything",
    votesA: 6142,
    votesB: 3858,
    type: 'classic'
  },
  {
    id: 3,
    optionA: "Have taste buds in your armpits",
    optionB: "Have eyes in the back of your head",
    votesA: 2314,
    votesB: 7686,
    type: 'classic'
  },
  {
    id: 4,
    optionA: "Always have to speak in rhymes",
    optionB: "Sing everything you say",
    votesA: 5523,
    votesB: 4477,
    type: 'classic'
  },
  // Spicy questions
  {
    id: 5,
    optionA: "Accidentally call out your ex's name during sex",
    optionB: "Have your partner call out their ex's name",
    votesA: 0,
    votesB: 0,
    type: 'spicy'
  },
  {
    id: 6,
    optionA: "Only be able to sleep with your worst enemy",
    optionB: "Never have sex again",
    votesA: 0,
    votesB: 0,
    type: 'spicy'
  },
  {
    id: 7,
    optionA: "Have your search history made public",
    optionB: "Have a live stream of you having sex leaked online",
    votesA: 0,
    votesB: 0,
    type: 'spicy'
  },
  {
    id: 8,
    optionA: "Date someone into extreme BDSM",
    optionB: "Date someone completely vanilla",
    votesA: 0,
    votesB: 0,
    type: 'spicy'
  },
  {
    id: 9,
    optionA: "Never orgasm again",
    optionB: "Never let your partner orgasm again",
    votesA: 0,
    votesB: 0,
    type: 'spicy'
  },
  {
    id: 10,
    optionA: "Have a threesome with your boss and their spouse",
    optionB: "Have a threesome with your ex and their new partner",
    votesA: 0,
    votesB: 0,
    type: 'spicy'
  },
  {
    id: 11,
    optionA: "Sleep with someone who smells bad but is incredible in bed",
    optionB: "Sleep with someone gorgeous but terrible in bed",
    votesA: 0,
    votesB: 0,
    type: 'spicy'
  },
  {
    id: 12,
    optionA: "Have a one-night stand with your best friend's partner",
    optionB: "Let your partner have a one-night stand with your best friend",
    votesA: 0,
    votesB: 0,
    type: 'spicy'
  },
  {
    id: 13,
    optionA: "Walk in on your parents making an adult film",
    optionB: "Have them find one of yours",
    votesA: 0,
    votesB: 0,
    type: 'spicy'
  },
  {
    id: 14,
    optionA: "Be forced to moan loudly during every conversation",
    optionB: "Grunt like you're lifting weights every time you sit down",
    votesA: 0,
    votesB: 0,
    type: 'spicy'
  },
  {
    id: 15,
    optionA: "Only be able to dirty talk in baby voice",
    optionB: "Only be able to dirty talk while using embarrassing slang",
    votesA: 0,
    votesB: 0,
    type: 'spicy'
  },
  {
    id: 16,
    optionA: "Sleep with someone who never showers",
    optionB: "Sleep with someone who refuses to shave or groom anywhere",
    votesA: 0,
    votesB: 0,
    type: 'spicy'
  },
  {
    id: 17,
    optionA: "Have your partner read all your DMs",
    optionB: "Have your boss read all your DMs",
    votesA: 0,
    votesB: 0,
    type: 'spicy'
  },
  {
    id: 18,
    optionA: "Have one intense, unforgettable sexual encounter that ruins your current relationship",
    optionB: "Never have great sex again",
    votesA: 0,
    votesB: 0,
    type: 'spicy'
  },
  {
    id: 19,
    optionA: "Give a presentation on your sex life to your entire family",
    optionB: "Have a stranger live-tweet your most recent sexual experience",
    votesA: 0,
    votesB: 0,
    type: 'spicy'
  },
  {
    id: 20,
    optionA: "Lose all feeling below the waist",
    optionB: "Only be able to climax once every five years",
    votesA: 0,
    votesB: 0,
    type: 'spicy'
  },
  {
    id: 21,
    optionA: "Accidentally send a nude to your boss",
    optionB: "Accidentally send a nude to a family group chat",
    votesA: 0,
    votesB: 0,
    type: 'spicy'
  },
  {
    id: 22,
    optionA: "Always have to be completely silent during sex",
    optionB: "Always scream at the top of your lungs during sex",
    votesA: 0,
    votesB: 0,
    type: 'spicy'
  },
  {
    id: 23,
    optionA: "Walk around naked in front of your coworkers for an hour",
    optionB: "Be naked in front of your in-laws for an hour",
    votesA: 0,
    votesB: 0,
    type: 'spicy'
  },
  {
    id: 24,
    optionA: "Have your partner rate you a 4/10 in bed but love you",
    optionB: "Have your partner rate you a 10/10 in bed but secretly dislike you",
    votesA: 0,
    votesB: 0,
    type: 'spicy'
  },
  {
    id: 25,
    optionA: "Be forced to share all your intimate details with your friend group",
    optionB: "Never talk about your love life again",
    votesA: 0,
    votesB: 0,
    type: 'spicy'
  },
  {
    id: 26,
    optionA: "Only date people who are extremely clingy",
    optionB: "Only date people who completely ignore you",
    votesA: 0,
    votesB: 0,
    type: 'spicy'
  },
  {
    id: 27,
    optionA: "Always have sex in total darkness",
    optionB: "Always have sex with the lights on and mirrors everywhere",
    votesA: 0,
    votesB: 0,
    type: 'spicy'
  },
  {
    id: 28,
    optionA: "Have a partner with a super strange kink you hate",
    optionB: "Have a partner who never wants to try anything new",
    votesA: 0,
    votesB: 0,
    type: 'spicy'
  },
  {
    id: 29,
    optionA: "Never be allowed to masturbate again",
    optionB: "Never have sex again",
    votesA: 0,
    votesB: 0,
    type: 'spicy'
  },
  {
    id: 30,
    optionA: "Get caught hooking up in public",
    optionB: "Catch your parents hooking up in public",
    votesA: 0,
    votesB: 0,
    type: 'spicy'
  },
  {
    id: 31,
    optionA: "Only date people who loudly overshare your sex life",
    optionB: "Only date people who keep you a secret",
    votesA: 0,
    votesB: 0,
    type: 'spicy'
  },
  {
    id: 32,
    optionA: "Accidentally send a sext to your boss",
    optionB: "Receive a sext from your boss",
    votesA: 0,
    votesB: 0,
    type: 'spicy'
  },
  {
    id: 33,
    optionA: "Only have wild, one-night stands",
    optionB: "Be in a passionless marriage",
    votesA: 0,
    votesB: 0,
    type: 'spicy'
  },
  {
    id: 34,
    optionA: "Never watch porn again",
    optionB: "Never be able to fantasize again",
    votesA: 0,
    votesB: 0,
    type: 'spicy'
  },
  {
    id: 35,
    optionA: "Have sex in a room full of mirrors",
    optionB: "Have sex in complete pitch blackness",
    votesA: 0,
    votesB: 0,
    type: 'spicy'
  },
  {
    id: 36,
    optionA: "Only be able to watch one porn video for the rest of your life",
    optionB: "Never watch porn again",
    votesA: 0,
    votesB: 0,
    type: 'spicy'
  },
  {
    id: 37,
    optionA: "Listen to the same cheesy song during every sexual encounter",
    optionB: "Have no music but an awkward narrator describing everything",
    votesA: 0,
    votesB: 0,
    type: 'spicy'
  },
  {
    id: 38,
    optionA: "Have sex with someone who talks the entire time",
    optionB: "Have sex with someone who doesn't say a single word",
    votesA: 0,
    votesB: 0,
    type: 'spicy'
  },
  {
    id: 39,
    optionA: "Be stuck in a dry spell for a year",
    optionB: "Sleep with someone truly repulsive once a week for a year",
    votesA: 0,
    votesB: 0,
    type: 'spicy'
  },
  {
    id: 40,
    optionA: "Have your partner confess they cheated but swear they'll never do it again",
    optionB: "Never find out but they cheat one more time",
    votesA: 0,
    votesB: 0,
    type: 'spicy'
  }
];

export type GameMode = 'classic' | 'spicy' | 'friends';

// Function to get questions based on mode with optional filtering and shuffling
export const getQuestions = (
  mode: GameMode,
  shuffle: boolean = true
): Question[] => {
  let questions = [...allQuestions];
  
  // Filter by mode if needed
  if (mode === 'classic' || mode === 'spicy') {
    questions = questions.filter(q => q.type === mode);
  }
  
  // If no questions match the mode, return all questions
  if (questions.length === 0) {
    questions = [...allQuestions];
  }
  
  // Shuffle if requested
  return shuffle ? shuffleArray(questions) : questions;
};

// Function specifically for friend game modes - always shuffled
export const getFriendGameQuestions = (): Question[] => {
  return shuffleArray([...allQuestions]);
};

// Function to get a random subset of questions
export const getRandomQuestions = (count: number): Question[] => {
  const shuffled = shuffleArray([...allQuestions]);
  return shuffled.slice(0, Math.min(count, shuffled.length));
};