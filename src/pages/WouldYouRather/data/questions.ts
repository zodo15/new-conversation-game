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

// All questions combined in one array
export const allQuestions: Question[] = [
  // Classic questions
  {
    id: 1,
    option1: "Have all your thoughts broadcast on a billboard",
    option2: "Have access to everyone else's thoughts",
    votesA: 4231,
    votesB: 5769,
    type: 'classic'
  },
  {
    id: 2,
    option1: "Be famous for something embarrassing",
    option2: "Never be known for anything",
    votesA: 6142,
    votesB: 3858,
    type: 'classic'
  },
  {
    id: 3,
    option1: "Have taste buds in your armpits",
    option2: "Have eyes in the back of your head",
    votesA: 2314,
    votesB: 7686,
    type: 'classic'
  },
  {
    id: 4,
    option1: "Always have to speak in rhymes",
    option2: "Sing everything you say",
    votesA: 5523,
    votesB: 4477,
    type: 'classic'
  },
  // Spicy questions
  {
    id: 5,
    option1: "Accidentally call out your ex's name during sex",
    option2: "Have your partner call out their ex's name",
    votesA: 0,
    votesB: 0,
    type: 'spicy'
  },
  {
    id: 6,
    option1: "Only be able to sleep with your worst enemy",
    option2: "Never have sex again",
    votesA: 0,
    votesB: 0,
    type: 'spicy'
  },
  {
    id: 7,
    option1: "Have your search history made public",
    option2: "Have a live stream of you having sex leaked online",
    votesA: 0,
    votesB: 0,
    type: 'spicy'
  },
  {
    id: 8,
    option1: "Date someone into extreme BDSM",
    option2: "Date someone completely vanilla",
    votesA: 0,
    votesB: 0,
    type: 'spicy'
  },
  {
    id: 9,
    option1: "Never orgasm again",
    option2: "Never let your partner orgasm again",
    votesA: 0,
    votesB: 0,
    type: 'spicy'
  },
  {
    id: 10,
    option1: "Have a threesome with your boss and their spouse",
    option2: "Have a threesome with your ex and their new partner",
    votesA: 0,
    votesB: 0,
    type: 'spicy'
  },
  {
    id: 11,
    option1: "Sleep with someone who smells bad but is incredible in bed",
    option2: "Sleep with someone gorgeous but terrible in bed",
    votesA: 0,
    votesB: 0,
    type: 'spicy'
  },
  {
    id: 12,
    option1: "Have a one-night stand with your best friend's partner",
    option2: "Let your partner have a one-night stand with your best friend",
    votesA: 0,
    votesB: 0,
    type: 'spicy'
  },
  {
    id: 13,
    option1: "Walk in on your parents making an adult film",
    option2: "Have them find one of yours",
    votesA: 0,
    votesB: 0,
    type: 'spicy'
  },
  {
    id: 14,
    option1: "Be forced to moan loudly during every conversation",
    option2: "Grunt like you're lifting weights every time you sit down",
    votesA: 0,
    votesB: 0,
    type: 'spicy'
  },
  {
    id: 15,
    option1: "Only be able to dirty talk in baby voice",
    option2: "Only be able to dirty talk while using embarrassing slang",
    votesA: 0,
    votesB: 0,
    type: 'spicy'
  },
  {
    id: 16,
    option1: "Sleep with someone who never showers",
    option2: "Sleep with someone who refuses to shave or groom anywhere",
    votesA: 0,
    votesB: 0,
    type: 'spicy'
  },
  {
    id: 17,
    option1: "Have your partner read all your DMs",
    option2: "Have your boss read all your DMs",
    votesA: 0,
    votesB: 0,
    type: 'spicy'
  },
  {
    id: 18,
    option1: "Have one intense, unforgettable sexual encounter that ruins your current relationship",
    option2: "Never have great sex again",
    votesA: 0,
    votesB: 0,
    type: 'spicy'
  },
  {
    id: 19,
    option1: "Give a presentation on your sex life to your entire family",
    option2: "Have a stranger live-tweet your most recent sexual experience",
    votesA: 0,
    votesB: 0,
    type: 'spicy'
  },
  {
    id: 20,
    option1: "Lose all feeling below the waist",
    option2: "Only be able to climax once every five years",
    votesA: 0,
    votesB: 0,
    type: 'spicy'
  },
  {
    id: 21,
    option1: "Accidentally send a nude to your boss",
    option2: "Accidentally send a nude to a family group chat",
    votesA: 0,
    votesB: 0,
    type: 'spicy'
  },
  {
    id: 22,
    option1: "Always have to be completely silent during sex",
    option2: "Always scream at the top of your lungs during sex",
    votesA: 0,
    votesB: 0,
    type: 'spicy'
  },
  {
    id: 23,
    option1: "Walk around naked in front of your coworkers for an hour",
    option2: "Be naked in front of your in-laws for an hour",
    votesA: 0,
    votesB: 0,
    type: 'spicy'
  },
  {
    id: 24,
    option1: "Have your partner rate you a 4/10 in bed but love you",
    option2: "Have your partner rate you a 10/10 in bed but secretly dislike you",
    votesA: 0,
    votesB: 0,
    type: 'spicy'
  },
  {
    id: 25,
    option1: "Be forced to share all your intimate details with your friend group",
    option2: "Never talk about your love life again",
    votesA: 0,
    votesB: 0,
    type: 'spicy'
  },
  {
    id: 26,
    option1: "Only date people who are extremely clingy",
    option2: "Only date people who completely ignore you",
    votesA: 0,
    votesB: 0,
    type: 'spicy'
  },
  {
    id: 27,
    option1: "Always have sex in total darkness",
    option2: "Always have sex with the lights on and mirrors everywhere",
    votesA: 0,
    votesB: 0,
    type: 'spicy'
  },
  {
    id: 28,
    option1: "Have a partner with a super strange kink you hate",
    option2: "Have a partner who never wants to try anything new",
    votesA: 0,
    votesB: 0,
    type: 'spicy'
  },
  {
    id: 29,
    option1: "Never be allowed to masturbate again",
    option2: "Never have sex again",
    votesA: 0,
    votesB: 0,
    type: 'spicy'
  },
  {
    id: 30,
    option1: "Get caught hooking up in public",
    option2: "Catch your parents hooking up in public",
    votesA: 0,
    votesB: 0,
    type: 'spicy'
  },
  {
    id: 31,
    option1: "Only date people who loudly overshare your sex life",
    option2: "Only date people who keep you a secret",
    votesA: 0,
    votesB: 0,
    type: 'spicy'
  },
  {
    id: 32,
    option1: "Accidentally send a sext to your boss",
    option2: "Receive a sext from your boss",
    votesA: 0,
    votesB: 0,
    type: 'spicy'
  },
  {
    id: 33,
    option1: "Only have wild, one-night stands",
    option2: "Be in a passionless marriage",
    votesA: 0,
    votesB: 0,
    type: 'spicy'
  },
  {
    id: 34,
    option1: "Never watch porn again",
    option2: "Never be able to fantasize again",
    votesA: 0,
    votesB: 0,
    type: 'spicy'
  },
  {
    id: 35,
    option1: "Have sex in a room full of mirrors",
    option2: "Have sex in complete pitch blackness",
    votesA: 0,
    votesB: 0,
    type: 'spicy'
  },
  {
    id: 36,
    option1: "Only be able to watch one porn video for the rest of your life",
    option2: "Never watch porn again",
    votesA: 0,
    votesB: 0,
    type: 'spicy'
  },
  {
    id: 37,
    option1: "Listen to the same cheesy song during every sexual encounter",
    option2: "Have no music but an awkward narrator describing everything",
    votesA: 0,
    votesB: 0,
    type: 'spicy'
  },
  {
    id: 38,
    option1: "Have sex with someone who talks the entire time",
    option2: "Have sex with someone who doesn't say a single word",
    votesA: 0,
    votesB: 0,
    type: 'spicy'
  },
  {
    id: 39,
    option1: "Be stuck in a dry spell for a year",
    option2: "Sleep with someone truly repulsive once a week for a year",
    votesA: 0,
    votesB: 0,
    type: 'spicy'
  },
  {
    id: 40,
    option1: "Have your partner confess they cheated but swear they'll never do it again",
    option2: "Never find out but they cheat one more time",
    votesA: 0,
    votesB: 0,
    type: 'spicy'
  }
];

// Function to get questions based on mode
export const getQuestions = (mode: GameMode, shuffle: boolean = true): Question[] => {
  const filteredQuestions = allQuestions.filter(q => {
    switch (mode) {
      case 'classic':
        return q.type === 'classic';
      case 'spicy':
        return q.type === 'spicy';
      case 'friends':
        return q.type === 'friends';
      default:
        return true;
    }
  });

  return shuffle ? shuffleArray(filteredQuestions) : filteredQuestions;
};

// Function specifically for friend game modes - always shuffled
export const getFriendGameQuestions = (): Question[] => {
  return shuffleArray(allQuestions.filter(q => q.type === 'friends'));
};

// Function to get a random subset of questions
export const getRandomQuestions = (count: number): Question[] => {
  return shuffleArray(allQuestions).slice(0, count);
};