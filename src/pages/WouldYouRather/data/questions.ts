import { Question, GameMode } from '../types';

const classicQuestions: Question[] = [
  {
    id: '1',
    question: "Would you rather be able to fly or be invisible?",
    optionA: "Fly through the skies",
    optionB: "Become invisible at will",
    mode: 'classic' as GameMode
  },
  {
    id: '2',
    question: "Would you rather live in a big city or a small town?",
    optionA: "Bustling big city life",
    optionB: "Peaceful small town living",
    mode: 'classic' as GameMode
  },
  {
    id: '3',
    question: "Would you rather have the ability to speak all languages or play all musical instruments?",
    optionA: "Master all languages",
    optionB: "Master all instruments",
    mode: 'classic' as GameMode
  },
  {
    id: '4',
    question: "Would you rather travel 100 years into the past or future?",
    optionA: "Visit the past",
    optionB: "Explore the future",
    mode: 'classic' as GameMode
  },
  {
    id: '5',
    question: "Would you rather be able to read minds or predict the future?",
    optionA: "Read everyone's thoughts",
    optionB: "See future events",
    mode: 'classic' as GameMode
  },
  {
    id: '6',
    question: "Would you rather have unlimited food or unlimited travel?",
    optionA: "Never pay for food again",
    optionB: "Travel anywhere for free",
    mode: 'classic' as GameMode
  },
  {
    id: '7',
    question: "Would you rather be the funniest or the smartest person in the room?",
    optionA: "Make everyone laugh",
    optionB: "Know all the answers",
    mode: 'classic' as GameMode
  },
  {
    id: '8',
    question: "Would you rather have a rewind or pause button for your life?",
    optionA: "Undo past mistakes",
    optionB: "Freeze perfect moments",
    mode: 'classic' as GameMode
  },
  {
    id: '9',
    question: "Would you rather be a famous actor or a successful CEO?",
    optionA: "Hollywood stardom",
    optionB: "Business leadership",
    mode: 'classic' as GameMode
  },
  {
    id: '10',
    question: "Would you rather have a dragon or a unicorn as a pet?",
    optionA: "Powerful dragon companion",
    optionB: "Magical unicorn friend",
    mode: 'classic' as GameMode
  },
  {
    id: '11',
    question: "Would you rather be able to breathe underwater or survive in space?",
    optionA: "Explore ocean depths",
    optionB: "Travel through space",
    mode: 'classic' as GameMode
  },
  {
    id: '12',
    question: "Would you rather have unlimited books or unlimited movies?",
    optionA: "Endless reading material",
    optionB: "Infinite film collection",
    mode: 'classic' as GameMode
  },
  {
    id: '13',
    question: "Would you rather be the best player on a losing team or the worst player on a winning team?",
    optionA: "Star of underdogs",
    optionB: "Part of champions",
    mode: 'classic' as GameMode
  },
  {
    id: '14',
    question: "Would you rather have the power to heal or the power to protect?",
    optionA: "Cure any illness",
    optionB: "Prevent any harm",
    mode: 'classic' as GameMode
  },
  {
    id: '15',
    question: "Would you rather live in a treehouse or an underwater house?",
    optionA: "Forest canopy home",
    optionB: "Submarine dwelling",
    mode: 'classic' as GameMode
  }
];

const spicyQuestions: Question[] = [
  {
    id: 's1',
    optionA: "Accidentally call out your ex's name during sex",
    optionB: "Have your partner call out their ex's name",
    mode: 'spicy' as GameMode
  },
  {
    id: 's2',
    optionA: "Only be able to sleep with your worst enemy",
    optionB: "Never have sex again",
    mode: 'spicy' as GameMode
  },
  {
    id: 's3',
    optionA: "Have your search history made public",
    optionB: "Have a live stream of you having sex leaked online",
    mode: 'spicy' as GameMode
  },
  {
    id: 's4',
    optionA: "Date someone into extreme BDSM",
    optionB: "Date someone completely vanilla",
    mode: 'spicy' as GameMode
  },
  {
    id: 's5',
    optionA: "Never orgasm again",
    optionB: "Never let your partner orgasm again",
    mode: 'spicy' as GameMode
  },
  {
    id: 's6',
    optionA: "Have a threesome with your boss and their spouse",
    optionB: "Have a threesome with your ex and their new partner",
    mode: 'spicy' as GameMode
  },
  {
    id: 's7',
    optionA: "Sleep with someone who smells bad but is incredible in bed",
    optionB: "Sleep with someone gorgeous but terrible in bed",
    mode: 'spicy' as GameMode
  },
  {
    id: 's8',
    optionA: "Have a one-night stand with your best friend's partner",
    optionB: "Let your partner have a one-night stand with your best friend",
    mode: 'spicy' as GameMode
  },
  {
    id: 's9',
    optionA: "Walk in on your parents making an adult film",
    optionB: "Have them find one of yours",
    mode: 'spicy' as GameMode
  },
  {
    id: 's10',
    optionA: "Be forced to moan loudly during every conversation",
    optionB: "Grunt like you're lifting weights every time you sit down",
    mode: 'spicy' as GameMode
  },
  {
    id: 's11',
    optionA: "Only be able to dirty talk in baby voice",
    optionB: "Only be able to dirty talk while using embarrassing slang",
    mode: 'spicy' as GameMode
  },
  {
    id: 's12',
    optionA: "Sleep with someone who never showers",
    optionB: "Sleep with someone who refuses to shave or groom anywhere",
    mode: 'spicy' as GameMode
  },
  {
    id: 's13',
    optionA: "Have your partner read all your DMs",
    optionB: "Have your boss read all your DMs",
    mode: 'spicy' as GameMode
  },
  {
    id: 's14',
    optionA: "Have one intense, unforgettable sexual encounter that ruins your current relationship",
    optionB: "Never have great sex again",
    mode: 'spicy' as GameMode
  },
  {
    id: 's15',
    optionA: "Give a presentation on your sex life to your entire family",
    optionB: "Have a stranger live-tweet your most recent sexual experience",
    mode: 'spicy' as GameMode
  },
  {
    id: 's16',
    optionA: "Lose all feeling below the waist",
    optionB: "Only be able to climax once every five years",
    mode: 'spicy' as GameMode
  },
  {
    id: 's17',
    optionA: "Accidentally send a nude to your boss",
    optionB: "Accidentally send a nude to a family group chat",
    mode: 'spicy' as GameMode
  },
  {
    id: 's18',
    optionA: "Always have to be completely silent during sex",
    optionB: "Always scream at the top of your lungs during sex",
    mode: 'spicy' as GameMode
  },
  {
    id: 's19',
    optionA: "Walk around naked in front of your coworkers for an hour",
    optionB: "Be naked in front of your in-laws for an hour",
    mode: 'spicy' as GameMode
  },
  {
    id: 's20',
    optionA: "Have your partner rate you a 4/10 in bed but love you",
    optionB: "Have your partner rate you a 10/10 in bed but secretly dislike you",
    mode: 'spicy' as GameMode
  }
];

const friendQuestions: Question[] = [
  {
    id: 'f1',
    question: "Would you rather be best friends with someone who always tells you the brutal truth or someone who always tells white lies to protect your feelings?",
    optionA: "Brutally honest friend",
    optionB: "Kind but not always truthful friend",
    mode: 'friend' as GameMode
  },
  {
    id: 'f2',
    question: "Would you rather have one best friend for life or a new close friend every year?",
    optionA: "Lifelong best friend",
    optionB: "New close friend annually",
    mode: 'friend' as GameMode
  },
  {
    id: 'f3',
    question: "Would you rather your friend spoil every movie for you or always be late to every meetup?",
    optionA: "Movie spoiler friend",
    optionB: "Always late friend",
    mode: 'friend' as GameMode
  },
  {
    id: 'f4',
    question: "Would you rather have a friend who borrows but never returns things or one who always forgets your birthday?",
    optionA: "Never returns borrowed items",
    optionB: "Forgets your birthday",
    mode: 'friend' as GameMode
  },
  {
    id: 'f5',
    question: "Would you rather have a friend who's always up for adventure or one who's always there for emotional support?",
    optionA: "Adventure buddy",
    optionB: "Emotional support friend",
    mode: 'friend' as GameMode
  },
  {
    id: 'f6',
    question: "Would you rather have a friend who's super successful but humble or average but brags about everything?",
    optionA: "Successful and humble",
    optionB: "Average but boastful",
    mode: 'friend' as GameMode
  },
  {
    id: 'f7',
    question: "Would you rather have a friend who always wants to go out or one who always wants to stay in?",
    optionA: "Always wants to party",
    optionB: "Always wants to chill at home",
    mode: 'friend' as GameMode
  },
  {
    id: 'f8',
    question: "Would you rather have a friend who copies everything you do or one who always does the opposite?",
    optionA: "Copies everything",
    optionB: "Always contradicts",
    mode: 'friend' as GameMode
  },
  {
    id: 'f9',
    question: "Would you rather have a friend who's always early to everything or one who's perfectly on time but stressed?",
    optionA: "Always early and relaxed",
    optionB: "On time but stressed",
    mode: 'friend' as GameMode
  },
  {
    id: 'f10',
    question: "Would you rather have a friend who never remembers your conversations or one who remembers every embarrassing detail?",
    optionA: "Forgets everything",
    optionB: "Remembers all embarrassing moments",
    mode: 'friend' as GameMode
  },
  {
    id: 'f11',
    question: "Would you rather have a friend who always wants to split the bill exactly or one who never wants to pay?",
    optionA: "Exact bill splitter",
    optionB: "Never wants to pay",
    mode: 'friend' as GameMode
  },
  {
    id: 'f12',
    question: "Would you rather have a friend who's always competing with you or one who's completely uncompetitive?",
    optionA: "Always competing",
    optionB: "Never competitive",
    mode: 'friend' as GameMode
  },
  {
    id: 'f13',
    question: "Would you rather have a friend who's always trying to change you or one who never challenges you to grow?",
    optionA: "Always pushing for change",
    optionB: "Never challenges growth",
    mode: 'friend' as GameMode
  },
  {
    id: 'f14',
    question: "Would you rather have a friend who only talks about themselves or one who never shares anything personal?",
    optionA: "Only talks about themselves",
    optionB: "Never shares personal info",
    mode: 'friend' as GameMode
  },
  {
    id: 'f15',
    question: "Would you rather have a friend who's always starting drama or one who avoids all conflict?",
    optionA: "Drama starter",
    optionB: "Conflict avoider",
    mode: 'friend' as GameMode
  }
];

export const getQuestionsByMode = (mode: string): Question[] => {
  switch (mode) {
    case 'classic':
      return classicQuestions;
    case 'spicy':
      return spicyQuestions;
    case 'friend':
      return friendQuestions;
    case 'random':
      const allQuestions = [...classicQuestions, ...spicyQuestions, ...friendQuestions];
      return allQuestions.sort(() => Math.random() - 0.5);
    default:
      return classicQuestions;
  }
};