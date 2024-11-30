import { Question } from '../types';

const classicQuestions: Question[] = [
  {
    id: '1',
    optionA: "Fly through the skies",
    optionB: "Become invisible at will",
    mode: 'classic'
  },
  {
    id: '2',
    optionA: "Bustling big city life",
    optionB: "Peaceful small town living",
    mode: 'classic'
  },
  {
    id: '3',
    optionA: "Master all languages",
    optionB: "Master all instruments",
    mode: 'classic'
  },
  {
    id: '4',
    optionA: "Visit the past",
    optionB: "Explore the future",
    mode: 'classic'
  },
  {
    id: '5',
    optionA: "Read everyone's thoughts",
    optionB: "See future events",
    mode: 'classic'
  },
  {
    id: '6',
    optionA: "Never pay for food again",
    optionB: "Travel anywhere for free",
    mode: 'classic'
  },
  {
    id: '7',
    optionA: "Make everyone laugh",
    optionB: "Know all the answers",
    mode: 'classic'
  },
  {
    id: '8',
    optionA: "Undo past mistakes",
    optionB: "Freeze perfect moments",
    mode: 'classic'
  },
  {
    id: '9',
    optionA: "Hollywood stardom",
    optionB: "Business leadership",
    mode: 'classic'
  },
  {
    id: '10',
    optionA: "Powerful dragon companion",
    optionB: "Magical unicorn friend",
    mode: 'classic'
  },
  {
    id: '11',
    optionA: "Explore ocean depths",
    optionB: "Travel through space",
    mode: 'classic'
  },
  {
    id: '12',
    optionA: "Endless reading material",
    optionB: "Infinite film collection",
    mode: 'classic'
  },
  {
    id: '13',
    optionA: "Star of underdogs",
    optionB: "Part of champions",
    mode: 'classic'
  },
  {
    id: '14',
    optionA: "Cure any illness",
    optionB: "Prevent any harm",
    mode: 'classic'
  },
  {
    id: '15',
    optionA: "Forest canopy home",
    optionB: "Submarine dwelling",
    mode: 'classic'
  }
];

const spicyQuestions: Question[] = [
  {
    id: 's1',
    optionA: "Accidentally call out your ex's name during sex",
    optionB: "Have your partner call out their ex's name",
    mode: 'spicy'
  },
  {
    id: 's2',
    optionA: "Only be able to sleep with your worst enemy",
    optionB: "Never have sex again",
    mode: 'spicy'
  },
  {
    id: 's3',
    optionA: "Have your search history made public",
    optionB: "Have a live stream of you having sex leaked online",
    mode: 'spicy'
  },
  {
    id: 's4',
    optionA: "Date someone into extreme BDSM",
    optionB: "Date someone completely vanilla",
    mode: 'spicy'
  },
  {
    id: 's5',
    optionA: "Never orgasm again",
    optionB: "Never let your partner orgasm again",
    mode: 'spicy'
  },
  {
    id: 's6',
    optionA: "Have a threesome with your boss and their spouse",
    optionB: "Have a threesome with your ex and their new partner",
    mode: 'spicy'
  },
  {
    id: 's7',
    optionA: "Sleep with someone who smells bad but is incredible in bed",
    optionB: "Sleep with someone gorgeous but terrible in bed",
    mode: 'spicy'
  },
  {
    id: 's8',
    optionA: "Have a one-night stand with your best friend's partner",
    optionB: "Let your partner have a one-night stand with your best friend",
    mode: 'spicy'
  },
  {
    id: 's9',
    optionA: "Walk in on your parents making an adult film",
    optionB: "Have them find one of yours",
    mode: 'spicy'
  },
  {
    id: 's10',
    optionA: "Be forced to moan loudly during every conversation",
    optionB: "Grunt like you're lifting weights every time you sit down",
    mode: 'spicy'
  },
  {
    id: 's11',
    optionA: "Only be able to dirty talk in baby voice",
    optionB: "Only be able to dirty talk while using embarrassing slang",
    mode: 'spicy'
  },
  {
    id: 's12',
    optionA: "Sleep with someone who never showers",
    optionB: "Sleep with someone who refuses to shave or groom anywhere",
    mode: 'spicy'
  },
  {
    id: 's13',
    optionA: "Have your partner read all your DMs",
    optionB: "Have your boss read all your DMs",
    mode: 'spicy'
  },
  {
    id: 's14',
    optionA: "Have one intense, unforgettable sexual encounter that ruins your current relationship",
    optionB: "Never have great sex again",
    mode: 'spicy'
  },
  {
    id: 's15',
    optionA: "Give a presentation on your sex life to your entire family",
    optionB: "Have a stranger live-tweet your most recent sexual experience",
    mode: 'spicy'
  },
  {
    id: 's16',
    optionA: "Lose all feeling below the waist",
    optionB: "Only be able to climax once every five years",
    mode: 'spicy'
  },
  {
    id: 's17',
    optionA: "Accidentally send a nude to your boss",
    optionB: "Accidentally send a nude to a family group chat",
    mode: 'spicy'
  },
  {
    id: 's18',
    optionA: "Always have to be completely silent during sex",
    optionB: "Always scream at the top of your lungs during sex",
    mode: 'spicy'
  },
  {
    id: 's19',
    optionA: "Walk around naked in front of your coworkers for an hour",
    optionB: "Be naked in front of your in-laws for an hour",
    mode: 'spicy'
  },
  {
    id: 's20',
    optionA: "Have your partner rate you a 4/10 in bed but love you",
    optionB: "Have your partner rate you a 10/10 in bed but secretly dislike you",
    mode: 'spicy'
  }
];

const friendQuestions: Question[] = [
  {
    id: 'f1',
    optionA: "Brutally honest friend",
    optionB: "Kind but not always truthful friend",
    mode: 'friend'
  },
  {
    id: 'f2',
    optionA: "Lifelong best friend",
    optionB: "New close friend annually",
    mode: 'friend'
  },
  {
    id: 'f3',
    optionA: "Movie spoiler friend",
    optionB: "Always late friend",
    mode: 'friend'
  },
  {
    id: 'f4',
    optionA: "Never returns borrowed items",
    optionB: "Forgets your birthday",
    mode: 'friend'
  },
  {
    id: 'f5',
    optionA: "Adventure buddy",
    optionB: "Emotional support friend",
    mode: 'friend'
  },
  {
    id: 'f6',
    optionA: "Successful and humble",
    optionB: "Average but boastful",
    mode: 'friend'
  },
  {
    id: 'f7',
    optionA: "Always wants to party",
    optionB: "Always wants to chill at home",
    mode: 'friend'
  },
  {
    id: 'f8',
    optionA: "Copies everything",
    optionB: "Always contradicts",
    mode: 'friend'
  },
  {
    id: 'f9',
    optionA: "Always early and relaxed",
    optionB: "On time but stressed",
    mode: 'friend'
  },
  {
    id: 'f10',
    optionA: "Forgets everything",
    optionB: "Remembers all embarrassing moments",
    mode: 'friend'
  },
  {
    id: 'f11',
    optionA: "Exact bill splitter",
    optionB: "Never wants to pay",
    mode: 'friend'
  },
  {
    id: 'f12',
    optionA: "Always competing",
    optionB: "Never competitive",
    mode: 'friend'
  },
  {
    id: 'f13',
    optionA: "Always pushing for change",
    optionB: "Never challenges growth",
    mode: 'friend'
  },
  {
    id: 'f14',
    optionA: "Only talks about themselves",
    optionB: "Never shares personal info",
    mode: 'friend'
  },
  {
    id: 'f15',
    optionA: "Drama starter",
    optionB: "Conflict avoider",
    mode: 'friend'
  }
];

const allQuestions = [...classicQuestions, ...spicyQuestions, ...friendQuestions];

export const getQuestionsByMode = (mode: string): Question[] => {
  switch (mode) {
    case 'classic':
      return classicQuestions;
    case 'spicy':
      return spicyQuestions;
    case 'friend':
      return friendQuestions;
    case 'random':
      return allQuestions.sort(() => Math.random() - 0.5);
    default:
      return classicQuestions;
  }
};