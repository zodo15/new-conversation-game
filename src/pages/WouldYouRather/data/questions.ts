import { GameMode, Question } from '../store/gameStore';

const classicQuestions: Question[] = [
  {
    id: '1',
    optionA: "Fly through the skies",
    optionB: "Become invisible at will",
    type: 'classic'
  },
  {
    id: '2',
    optionA: "Bustling big city life",
    optionB: "Peaceful small town living",
    type: 'classic'
  },
  {
    id: '3',
    optionA: "Master all languages",
    optionB: "Master all instruments",
    type: 'classic'
  },  
  {
    id: '4',
    optionA: "Visit the past",
    optionB: "Explore the future",
    type: 'classic'
  },
  {
    id: '5',
    optionA: "Read everyone's thoughts",
    optionB: "See future events",
    type: 'classic'
  },
  {
    id: '6',
    optionA: "Never pay for food again",
    optionB: "Travel anywhere for free",
    type: 'classic'
  },
  {
    id: '7',
    optionA: "Make everyone laugh",
    optionB: "Know all the answers",
    type: 'classic'
  },
  {
    id: '8',
    optionA: "Undo past mistakes",
    optionB: "Freeze perfect moments",
    type: 'classic'
  },
  {
    id: '9',
    optionA: "Hollywood stardom",
    optionB: "Business leadership",
    type: 'classic'
  },
  {
    id: '10',
    optionA: "Powerful dragon companion",
    optionB: "Magical unicorn friend",
    type: 'classic'
  },
  {
    id: '11',
    optionA: "Explore ocean depths",
    optionB: "Travel through space",
    type: 'classic'
  },
  {
    id: '12',
    optionA: "Endless reading material",
    optionB: "Infinite film collection",
    type: 'classic'
  },
  {
    id: '13',
    optionA: "Star of underdogs",
    optionB: "Part of champions",
    type: 'classic'
  },
  {
    id: '14',
    optionA: "Cure any illness",
    optionB: "Prevent any harm",
    type: 'classic'
  },
  {
    id: '15',
    optionA: "Forest canopy home",
    optionB: "Submarine dwelling",
    type: 'classic'
  }
];

const spicyQuestions: Question[] = [
  {
    id: 's1',
    optionA: "Accidentally call out your ex's name during sex",
    optionB: "Have your partner call out their ex's name",
    type: 'spicy'
  },
  {
    id: 's2',
    optionA: "Only be able to sleep with your worst enemy",
    optionB: "Never have sex again",
    type: 'spicy'
  },
  {
    id: 's3',
    optionA: "Have your search history made public",
    optionB: "Have a live stream of you having sex leaked online",
    type: 'spicy'
  },
  {
    id: 's4',
    optionA: "Date someone into extreme BDSM",
    optionB: "Date someone completely vanilla",
    type: 'spicy'
  },
  {
    id: 's5',
    optionA: "Never orgasm again",
    optionB: "Never let your partner orgasm again",
    type: 'spicy'
  },
  {
    id: 's6',
    optionA: "Have a threesome with your boss and their spouse",
    optionB: "Have a threesome with your ex and their new partner",
    type: 'spicy'
  },
  {
    id: 's7',
    optionA: "Sleep with someone who smells bad but is incredible in bed",
    optionB: "Sleep with someone gorgeous but terrible in bed",
    type: 'spicy'
  },
  {
    id: 's8',
    optionA: "Have a one-night stand with your best friend's partner",
    optionB: "Let your partner have a one-night stand with your best friend",
    type: 'spicy'
  },
  {
    id: 's9',
    optionA: "Walk in on your parents making an adult film",
    optionB: "Have them find one of yours",
    type: 'spicy'
  },
  {
    id: 's10',
    optionA: "Be forced to moan loudly during every conversation",
    optionB: "Grunt like you're lifting weights every time you sit down",
    type: 'spicy'
  },
  {
    id: 's11',
    optionA: "Only be able to dirty talk in baby voice",
    optionB: "Only be able to dirty talk while using embarrassing slang",
    type: 'spicy'
  },
  {
    id: 's12',
    optionA: "Sleep with someone who never showers",
    optionB: "Sleep with someone who refuses to shave or groom anywhere",
    type: 'spicy'
  },
  {
    id: 's13',
    optionA: "Have your partner read all your DMs",
    optionB: "Have your boss read all your DMs",
    type: 'spicy'
  },
  {
    id: 's14',
    optionA: "Have one intense, unforgettable sexual encounter that ruins your current relationship",
    optionB: "Never have great sex again",
    type: 'spicy'
  },
  {
    id: 's15',
    optionA: "Give a presentation on your sex life to your entire family",
    optionB: "Have a stranger live-tweet your most recent sexual experience",
    type: 'spicy'
  },
  {
    id: 's16',
    optionA: "Lose all feeling below the waist",
    optionB: "Only be able to climax once every five years",
    type: 'spicy'
  },
  {
    id: 's17',
    optionA: "Accidentally send a nude to your boss",
    optionB: "Accidentally send a nude to a family group chat",
    type: 'spicy'
  },
  {
    id: 's18',
    optionA: "Always have to be completely silent during sex",
    optionB: "Always scream at the top of your lungs during sex",
    type: 'spicy'
  },
  {
    id: 's19',
    optionA: "Walk around naked in front of your coworkers for an hour",
    optionB: "Be naked in front of your in-laws for an hour",
    type: 'spicy'
  },
  {
    id: 's20',
    optionA: "Have your partner rate you a 4/10 in bed but love you",
    optionB: "Have your partner rate you a 10/10 in bed but secretly dislike you",
    type: 'spicy'
  }
];

const friendQuestions: Question[] = [
  {
    id: 'f1',
    optionA: "Accidentally call out your ex's name during sex",
    optionB: "Have your partner call out their ex's name",
    type: 'friend'
  },
  {
    id: 'f2',
    optionA: "Only be able to sleep with your worst enemy",
    optionB: "Never have sex again",
    type: 'friend'
  },
  {
    id: 'f3',
    optionA: "Have your search history made public",
    optionB: "Have a live stream of you having sex leaked online",
    type: 'friend'
  },
  {
    id: 'f4',
    optionA: "Date someone into extreme BDSM",
    optionB: "Date someone completely vanilla",
    type: 'friend'
  },
  {
    id: 'f5',
    optionA: "Never orgasm again",
    optionB: "Never let your partner orgasm again",
    type: 'friend'
  },
  {
    id: 'f6',
    optionA: "Have a threesome with your boss and their spouse",
    optionB: "Have a threesome with your ex and their new partner",
    type: 'friend'
  },
  {
    id: 'f7',
    optionA: "Sleep with someone who smells bad but is incredible in bed",
    optionB: "Sleep with someone gorgeous but terrible in bed",
    type: 'friend'
  },
  {
    id: 'f8',
    optionA: "Have a one-night stand with your best friend's partner",
    optionB: "Let your partner have a one-night stand with your best friend",
    type: 'friend'
  },
  {
    id: 'f9',
    optionA: "Walk in on your parents making an adult film",
    optionB: "Have them find one of yours",
    type: 'friend'
  },
  {
    id: 'f10',
    optionA: "Be forced to moan loudly during every conversation",
    optionB: "Grunt like you're lifting weights every time you sit down",
    type: 'friend'
  },
  {
    id: 'f11',
    optionA: "Only be able to dirty talk in baby voice",
    optionB: "Only be able to dirty talk while using embarrassing slang",
    type: 'friend'
  },
  {
    id: 'f12',
    optionA: "Sleep with someone who never showers",
    optionB: "Sleep with someone who refuses to shave or groom anywhere",
    type: 'friend'
  },
  {
    id: 'f13',
    optionA: "Have your partner read all your DMs",
    optionB: "Have your boss read all your DMs",
    type: 'friend'
  },
  {
    id: 'f14',
    optionA: "Have one intense, unforgettable sexual encounter that ruins your current relationship",
    optionB: "Never have great sex again",
    type: 'friend'
  },
  {
    id: 'f15',
    optionA: "Give a presentation on your sex life to your entire family",
    optionB: "Have a stranger live-tweet your most recent sexual experience",
    type: 'friend'
  },
  {
    id: 'f16',
    optionA: "Lose all feeling below the waist",
    optionB: "Only be able to climax once every five years",
    type: 'friend'
  },
  {
    id: 'f17',
    optionA: "Accidentally send a nude to your boss",
    optionB: "Accidentally send a nude to a family group chat",
    type: 'friend'
  },
  {
    id: 'f18',
    optionA: "Always have to be completely silent during sex",
    optionB: "Always scream at the top of your lungs during sex",
    type: 'friend'
  },
  {
    id: 'f19',
    optionA: "Walk around naked in front of your coworkers for an hour",
    optionB: "Be naked in front of your in-laws for an hour",
    type: 'friend'
  },
  {
    id: 'f20',
    optionA: "Have your partner rate you a 4/10 in bed but love you",
    optionB: "Have your partner rate you a 10/10 in bed but secretly dislike you",
    type: 'friend'
  },
  {
    id: 'f21',
    optionA: "Fly through the skies",
    optionB: "Become invisible at will",
    type: 'friend'
  },
  {
    id: 'f22',
    optionA: "Bustling big city life",
    optionB: "Peaceful small town living",
    type: 'friend'
  },
  {
    id: 'f23',
    optionA: "Master all languages",
    optionB: "Master all instruments",
    type: 'friend'
  },  
  {
    id: 'f24',
    optionA: "Visit the past",
    optionB: "Explore the future",
    type: 'friend'
  },
  {
    id: 'f25',
    optionA: "Read everyone's thoughts",
    optionB: "See future events",
    type: 'friend'
  },
  {
    id: 'f26',
    optionA: "Never pay for food again",
    optionB: "Travel anywhere for free",
    type: 'friend'
  },
  {
    id: 'f27',
    optionA: "Make everyone laugh",
    optionB: "Know all the answers",
    type: 'friend'
  },
  {
    id: 'f28',
    optionA: "Undo past mistakes",
    optionB: "Freeze perfect moments",
    type: 'friend'
  },
  {
    id: 'f29',
    optionA: "Hollywood stardom",
    optionB: "Business leadership",
    type: 'friend'
  },
  {
    id: 'f30',
    optionA: "Powerful dragon companion",
    optionB: "Magical unicorn friend",
    type: 'friend'
  },
  {
    id: 'f31',
    optionA: "Explore ocean depths",
    optionB: "Travel through space",
    type: 'friend'
  },
  {
    id: 'f32',
    optionA: "Endless reading material",
    optionB: "Infinite film collection",
    type: 'friend'
  },
  {
    id: 'f33',
    optionA: "Star of underdogs",
    optionB: "Part of champions",
    type: 'friend'
  },
  {
    id: 'f34',
    optionA: "Cure any illness",
    optionB: "Prevent any harm",
    type: 'friend'
  },
  {
    id: 'f35',
    optionA: "Forest canopy home",
    optionB: "Submarine dwelling",
    type: 'friend'
  }
];

const chaosQuestions: Question[] = [
  {
    id: 'c1',
    optionA: "Chaotic superpowers",
    optionB: "Predictable superpowers",
    type: 'chaos'
  },
  {
    id: 'c2',
    optionA: "Random teleportation",
    optionB: "Random size changes",
    type: 'chaos'
  }
];

const questions: Question[] = [
  ...classicQuestions,
  ...spicyQuestions,
  ...friendQuestions,
  ...chaosQuestions
];

export const getQuestionsByMode = (mode: GameMode): Question[] => {
  if (mode === GameMode.FRIEND) {
    // For friend mode, return all non-spicy questions
    return questions.filter(q => q.type !== 'spicy');
  }
  
  if (mode === GameMode.CHAOS) {
    // For chaos mode, return chaos questions first, then all others
    const chaosQuestions = questions.filter(q => q.type === 'chaos');
    const otherQuestions = questions.filter(q => q.type !== 'chaos');
    return [...chaosQuestions, ...otherQuestions];
  }

  if (mode === GameMode.RANDOM) {
    // For random mode, return all questions
    return questions;
  }
  
  // For classic and spicy modes, return questions of that type
  return questions.filter(q => q.type === mode);
};