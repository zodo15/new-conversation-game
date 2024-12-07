import { Question, GameMode } from '../types';

const classicQuestions: Question[] = [
  {
    id: 1,
    question: "Would you rather be able to fly or be invisible?",
    optionA: "Fly through the skies",
    optionB: "Become invisible at will",
    mode: 'classic'
  },
  {
    id: 2,
    question: "Would you rather live in a big city or a small town?",
    optionA: "Bustling big city life",
    optionB: "Peaceful small town living",
    mode: 'classic'
  },
  {
    id: 3,
    question: "Would you rather have the ability to speak all languages or play all musical instruments?",
    optionA: "Master all languages",
    optionB: "Master all instruments",
    mode: 'classic'
  },  
  {
    id: 4,
    question: "Would you rather travel 100 years into the past or future?",
    optionA: "Visit the past",
    optionB: "Explore the future",
    mode: 'classic'
  },
  {
    id: 5,
    question: "Would you rather be able to read minds or predict the future?",
    optionA: "Read everyone's thoughts",
    optionB: "See future events",
    mode: 'classic'
  },
  {
    id: 6,
    question: "Would you rather have unlimited food or unlimited travel?",
    optionA: "Never pay for food again",
    optionB: "Travel anywhere for free",
    mode: 'classic'
  },
  {
    id: 7,
    question: "Would you rather be the funniest or the smartest person in the room?",
    optionA: "Make everyone laugh",
    optionB: "Know all the answers",
    mode: 'classic'
  },
  {
    id: 8,
    question: "Would you rather have a rewind or pause button for your life?",
    optionA: "Undo past mistakes",
    optionB: "Freeze perfect moments",
    mode: 'classic'
  },
  {
    id: 9,
    question: "Would you rather be a famous actor or a successful CEO?",
    optionA: "Hollywood stardom",
    optionB: "Business leadership",
    mode: 'classic'
  },
  {
    id: 10,
    question: "Would you rather have a dragon or a unicorn as a pet?",
    optionA: "Powerful dragon companion",
    optionB: "Magical unicorn friend",
    mode: 'classic'
  },
  {
    id: 11,
    question: "Would you rather be able to breathe underwater or survive in space?",
    optionA: "Explore ocean depths",
    optionB: "Travel through space",
    mode: 'classic'
  },
  {
    id: 12,
    question: "Would you rather have unlimited books or unlimited movies?",
    optionA: "Endless reading material",
    optionB: "Infinite film collection",
    mode: 'classic'
  },
  {
    id: 13,
    question: "Would you rather be the best player on a losing team or the worst player on a winning team?",
    optionA: "Star of underdogs",
    optionB: "Part of champions",
    mode: 'classic'
  },
  {
    id: 14,
    question: "Would you rather have the power to heal or the power to protect?",
    optionA: "Cure any illness",
    optionB: "Prevent any harm",
    mode: 'classic'
  },
  {
    id: 15,
    question: "Would you rather live in a treehouse or an underwater house?",
    optionA: "Forest canopy home",
    optionB: "Submarine dwelling",
    mode: 'classic'
  }
];

const spicyQuestions: Question[] = [
  {
    id: 's1',
    question: "Would you rather accidentally call out your ex's name during sex or have your partner call out their ex's name?",
    optionA: "Accidentally call out your ex's name during sex",
    optionB: "Have your partner call out their ex's name",
    mode: 'spicy'
  },
  {
    id: 's2',
    question: "Would you rather only be able to sleep with your worst enemy or never have sex again?",
    optionA: "Only be able to sleep with your worst enemy",
    optionB: "Never have sex again",
    mode: 'spicy'
  },
  {
    id: 's3',
    question: "Would you rather have your search history made public or have a live stream of you having sex leaked online?",
    optionA: "Have your search history made public",
    optionB: "Have a live stream of you having sex leaked online",
    mode: 'spicy'
  },
  {
    id: 's4',
    question: "Would you rather date someone into extreme BDSM or date someone completely vanilla?",
    optionA: "Date someone into extreme BDSM",
    optionB: "Date someone completely vanilla",
    mode: 'spicy'
  },
  {
    id: 's5',
    question: "Would you rather never orgasm again or never let your partner orgasm again?",
    optionA: "Never orgasm again",
    optionB: "Never let your partner orgasm again",
    mode: 'spicy'
  },
  {
    id: 's6',
    question: "Would you rather have a threesome with your boss and their spouse or have a threesome with your ex and their new partner?",
    optionA: "Have a threesome with your boss and their spouse",
    optionB: "Have a threesome with your ex and their new partner",
    mode: 'spicy'
  },
  {
    id: 's7',
    question: "Would you rather sleep with someone who smells bad but is incredible in bed or sleep with someone gorgeous but terrible in bed?",
    optionA: "Sleep with someone who smells bad but is incredible in bed",
    optionB: "Sleep with someone gorgeous but terrible in bed",
    mode: 'spicy'
  },
  {
    id: 's8',
    question: "Would you rather have a one-night stand with your best friend's partner or let your partner have a one-night stand with your best friend?",
    optionA: "Have a one-night stand with your best friend's partner",
    optionB: "Let your partner have a one-night stand with your best friend",
    mode: 'spicy'
  },
  {
    id: 's9',
    question: "Would you rather walk in on your parents making an adult film or have them find one of yours?",
    optionA: "Walk in on your parents making an adult film",
    optionB: "Have them find one of yours",
    mode: 'spicy'
  },
  {
    id: 's10',
    question: "Would you rather be forced to moan loudly during every conversation or grunt like you're lifting weights every time you sit down?",
    optionA: "Be forced to moan loudly during every conversation",
    optionB: "Grunt like you're lifting weights every time you sit down",
    mode: 'spicy'
  },
  {
    id: 's11',
    question: "Would you rather only be able to dirty talk in baby voice or only be able to dirty talk while using embarrassing slang?",
    optionA: "Only be able to dirty talk in baby voice",
    optionB: "Only be able to dirty talk while using embarrassing slang",
    mode: 'spicy'
  },
  {
    id: 's12',
    question: "Would you rather sleep with someone who never showers or sleep with someone who refuses to shave or groom anywhere?",
    optionA: "Sleep with someone who never showers",
    optionB: "Sleep with someone who refuses to shave or groom anywhere",
    mode: 'spicy'
  },
  {
    id: 's13',
    question: "Would you rather have your partner read all your DMs or have your boss read all your DMs?",
    optionA: "Have your partner read all your DMs",
    optionB: "Have your boss read all your DMs",
    mode: 'spicy'
  },
  {
    id: 's14',
    question: "Would you rather have one intense, unforgettable sexual encounter that ruins your current relationship or never have great sex again?",
    optionA: "Have one intense, unforgettable sexual encounter that ruins your current relationship",
    optionB: "Never have great sex again",
    mode: 'spicy'
  },
  {
    id: 's15',
    question: "Would you rather give a presentation on your sex life to your entire family or have a stranger live-tweet your most recent sexual experience?",
    optionA: "Give a presentation on your sex life to your entire family",
    optionB: "Have a stranger live-tweet your most recent sexual experience",
    mode: 'spicy'
  },
  {
    id: 's16',
    question: "Would you rather lose all feeling below the waist or only be able to climax once every five years?",
    optionA: "Lose all feeling below the waist",
    optionB: "Only be able to climax once every five years",
    mode: 'spicy'
  },
  {
    id: 's17',
    question: "Would you rather accidentally send a nude to your boss or accidentally send a nude to a family group chat?",
    optionA: "Accidentally send a nude to your boss",
    optionB: "Accidentally send a nude to a family group chat",
    mode: 'spicy'
  },
  {
    id: 's18',
    question: "Would you rather always have to be completely silent during sex or always scream at the top of your lungs during sex?",
    optionA: "Always have to be completely silent during sex",
    optionB: "Always scream at the top of your lungs during sex",
    mode: 'spicy'
  },
  {
    id: 's19',
    question: "Would you rather walk around naked in front of your coworkers for an hour or be naked in front of your in-laws for an hour?",
    optionA: "Walk around naked in front of your coworkers for an hour",
    optionB: "Be naked in front of your in-laws for an hour",
    mode: 'spicy'
  },
  {
    id: 's20',
    question: "Would you rather have your partner rate you a 4/10 in bed but love you or have your partner rate you a 10/10 in bed but secretly dislike you?",
    optionA: "Have your partner rate you a 4/10 in bed but love you",
    optionB: "Have your partner rate you a 10/10 in bed but secretly dislike you",
    mode: 'spicy'
  }
];

const friendQuestions: Question[] = [
  {
    id: 'f1',
    question: "Would you rather accidentally call out your ex's name during sex or have your partner call out their ex's name?",
    optionA: "Accidentally call out your ex's name during sex",
    optionB: "Have your partner call out their ex's name",
    mode: 'friend'
  },
  {
    id: 'f2',
    question: "Would you rather only be able to sleep with your worst enemy or never have sex again?",
    optionA: "Only be able to sleep with your worst enemy",
    optionB: "Never have sex again",
    mode: 'friend'
  },
  {
    id: 'f3',
    question: "Would you rather have your search history made public or have a live stream of you having sex leaked online?",
    optionA: "Have your search history made public",
    optionB: "Have a live stream of you having sex leaked online",
    mode: 'friend'
  },
  {
    id: 'f4',
    question: "Would you rather date someone into extreme BDSM or date someone completely vanilla?",
    optionA: "Date someone into extreme BDSM",
    optionB: "Date someone completely vanilla",
    mode: 'friend'
  },
  {
    id: 'f5',
    question: "Would you rather never orgasm again or never let your partner orgasm again?",
    optionA: "Never orgasm again",
    optionB: "Never let your partner orgasm again",
    mode: 'friend'
  },
  {
    id: 'f6',
    question: "Would you rather have a threesome with your boss and their spouse or have a threesome with your ex and their new partner?",
    optionA: "Have a threesome with your boss and their spouse",
    optionB: "Have a threesome with your ex and their new partner",
    mode: 'friend'
  },
  {
    id: 'f7',
    question: "Would you rather sleep with someone who smells bad but is incredible in bed or sleep with someone gorgeous but terrible in bed?",
    optionA: "Sleep with someone who smells bad but is incredible in bed",
    optionB: "Sleep with someone gorgeous but terrible in bed",
    mode: 'friend'
  },
  {
    id: 'f8',
    question: "Would you rather have a one-night stand with your best friend's partner or let your partner have a one-night stand with your best friend?",
    optionA: "Have a one-night stand with your best friend's partner",
    optionB: "Let your partner have a one-night stand with your best friend",
    mode: 'friend'
  },
  {
    id: 'f9',
    question: "Would you rather walk in on your parents making an adult film or have them find one of yours?",
    optionA: "Walk in on your parents making an adult film",
    optionB: "Have them find one of yours",
    mode: 'friend'
  },
  {
    id: 'f10',
    question: "Would you rather be forced to moan loudly during every conversation or grunt like you're lifting weights every time you sit down?",
    optionA: "Be forced to moan loudly during every conversation",
    optionB: "Grunt like you're lifting weights every time you sit down",
    mode: 'friend'
  },
  {
    id: 'f11',
    question: "Would you rather only be able to dirty talk in baby voice or only be able to dirty talk while using embarrassing slang?",
    optionA: "Only be able to dirty talk in baby voice",
    optionB: "Only be able to dirty talk while using embarrassing slang",
    mode: 'friend'
  },
  {
    id: 'f12',
    question: "Would you rather sleep with someone who never showers or sleep with someone who refuses to shave or groom anywhere?",
    optionA: "Sleep with someone who never showers",
    optionB: "Sleep with someone who refuses to shave or groom anywhere",
    mode: 'friend'
  },
  {
    id: 'f13',
    question: "Would you rather have your partner read all your DMs or have your boss read all your DMs?",
    optionA: "Have your partner read all your DMs",
    optionB: "Have your boss read all your DMs",
    mode: 'friend'
  },
  {
    id: 'f14',
    question: "Would you rather have one intense, unforgettable sexual encounter that ruins your current relationship or never have great sex again?",
    optionA: "Have one intense, unforgettable sexual encounter that ruins your current relationship",
    optionB: "Never have great sex again",
    mode: 'friend'
  },
  {
    id: 'f15',
    question: "Would you rather give a presentation on your sex life to your entire family or have a stranger live-tweet your most recent sexual experience?",
    optionA: "Give a presentation on your sex life to your entire family",
    optionB: "Have a stranger live-tweet your most recent sexual experience",
    mode: 'friend'
  },
  {
    id: 'f16',
    question: "Would you rather lose all feeling below the waist or only be able to climax once every five years?",
    optionA: "Lose all feeling below the waist",
    optionB: "Only be able to climax once every five years",
    mode: 'friend'
  },
  {
    id: 'f17',
    question: "Would you rather accidentally send a nude to your boss or accidentally send a nude to a family group chat?",
    optionA: "Accidentally send a nude to your boss",
    optionB: "Accidentally send a nude to a family group chat",
    mode: 'friend'
  },
  {
    id: 'f18',
    question: "Would you rather always have to be completely silent during sex or always scream at the top of your lungs during sex?",
    optionA: "Always have to be completely silent during sex",
    optionB: "Always scream at the top of your lungs during sex",
    mode: 'friend'
  },
  {
    id: 'f19',
    question: "Would you rather walk around naked in front of your coworkers for an hour or be naked in front of your in-laws for an hour?",
    optionA: "Walk around naked in front of your coworkers for an hour",
    optionB: "Be naked in front of your in-laws for an hour",
    mode: 'friend'
  },
  {
    id: 'f20',
    question: "Would you rather have your partner rate you a 4/10 in bed but love you or have your partner rate you a 10/10 in bed but secretly dislike you?",
    optionA: "Have your partner rate you a 4/10 in bed but love you",
    optionB: "Have your partner rate you a 10/10 in bed but secretly dislike you",
    mode: 'friend'
  },
  {
    id: 'f21',
    question: "Would you rather be able to fly or be invisible?",
    optionA: "Fly through the skies",
    optionB: "Become invisible at will",
    mode: 'friend'
  },
  {
    id: 'f22',
    question: "Would you rather live in a big city or a small town?",
    optionA: "Bustling big city life",
    optionB: "Peaceful small town living",
    mode: 'friend'
  },
  {
    id: 'f23',
    question: "Would you rather have the ability to speak all languages or play all musical instruments?",
    optionA: "Master all languages",
    optionB: "Master all instruments",
    mode: 'friend'
  },  
  {
    id: 'f24',
    question: "Would you rather travel 100 years into the past or future?",
    optionA: "Visit the past",
    optionB: "Explore the future",
    mode: 'friend'
  },
  {
    id: 'f25',
    question: "Would you rather be able to read minds or predict the future?",
    optionA: "Read everyone's thoughts",
    optionB: "See future events",
    mode: 'friend'
  },
  {
    id: 'f26',
    question: "Would you rather have unlimited food or unlimited travel?",
    optionA: "Never pay for food again",
    optionB: "Travel anywhere for free",
    mode: 'friend'
  },
  {
    id: 'f27',
    question: "Would you rather be the funniest or the smartest person in the room?",
    optionA: "Make everyone laugh",
    optionB: "Know all the answers",
    mode: 'friend'
  },
  {
    id: 'f28',
    question: "Would you rather have a rewind or pause button for your life?",
    optionA: "Undo past mistakes",
    optionB: "Freeze perfect moments",
    mode: 'friend'
  },
  {
    id: 'f29',
    question: "Would you rather be a famous actor or a successful CEO?",
    optionA: "Hollywood stardom",
    optionB: "Business leadership",
    mode: 'friend'
  },
  {
    id: 'f30',
    question: "Would you rather have a dragon or a unicorn as a pet?",
    optionA: "Powerful dragon companion",
    optionB: "Magical unicorn friend",
    mode: 'friend'
  },
  {
    id: 'f31',
    question: "Would you rather be able to breathe underwater or survive in space?",
    optionA: "Explore ocean depths",
    optionB: "Travel through space",
    mode: 'friend'
  },
  {
    id: 'f32',
    question: "Would you rather have unlimited books or unlimited movies?",
    optionA: "Endless reading material",
    optionB: "Infinite film collection",
    mode: 'friend'
  },
  {
    id: 'f33',
    question: "Would you rather be the best player on a losing team or the worst player on a winning team?",
    optionA: "Star of underdogs",
    optionB: "Part of champions",
    mode: 'friend'
  },
  {
    id: 'f34',
    question: "Would you rather have the power to heal or the power to protect?",
    optionA: "Cure any illness",
    optionB: "Prevent any harm",
    mode: 'friend'
  },
  {
    id: 'f35',
    question: "Would you rather live in a treehouse or an underwater house?",
    optionA: "Forest canopy home",
    optionB: "Submarine dwelling",
    mode: 'friend'
  }
];

export const questions = [...classicQuestions, ...spicyQuestions, ...friendQuestions];

export function getQuestionsByMode(mode: GameMode): Question[] {
  switch (mode) {
    case 'classic':
      return classicQuestions;
    case 'spicy':
      return spicyQuestions;
    case 'friend':
      return friendQuestions;
    case 'random':
      return questions;
    default:
      return classicQuestions;
  }
}