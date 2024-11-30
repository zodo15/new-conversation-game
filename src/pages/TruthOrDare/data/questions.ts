import { QuestionCategory } from '../types/game';

export const categories: QuestionCategory[] = [
  'spicy',
  'funny',
  'deep',
  'social',
  'physical',
  'creative'
];

interface CategorizedQuestion {
  id?: number;
  text: string;
  category: QuestionCategory;
  type?: 'truth' | 'dare';
  options?: [string, string];
}

export const truthQuestions: CategorizedQuestion[] = [
  // Deep Questions
  { text: "What's a secret you've never told anyone, even your best friend?", category: 'deep' },
  { text: "If you could relive one moment from your past, what would it be and why?", category: 'deep' },
  { text: "Who in your life has hurt you the most, and have you forgiven them?", category: 'deep' },
  { text: "If your future self could send you one sentence, what would you want it to say?", category: 'deep' },
  { text: "What's the one thing about yourself that you wish more people understood?", category: 'deep' },
  { text: "Have you ever had a dream that changed your perspective on life?", category: 'deep' },
  { text: "What's your biggest fear about growing up?", category: 'deep' },
  { text: "What's the hardest goodbye you've ever had to say?", category: 'deep' },
  { text: "If you could erase one memory, would you do it? If yes, which one?", category: 'deep' },
  { text: "Have you ever pretended to be someone you're not to impress others?", category: 'deep' },
  { text: "What's the biggest lie you've ever told, and do you regret it?", category: 'deep' },
  { text: "Who do you secretly envy and why?", category: 'deep' },
  { text: "Have you ever felt truly alone in a room full of people? What did it feel like?", category: 'deep' },
  { text: "If you could fix one mistake you made in a relationship, what would it be?", category: 'deep' },
  { text: "What's the darkest thought you've ever had?", category: 'deep' },

  // Funny Questions
  { text: "What's the weirdest thing you've ever Googled?", category: 'funny' },
  { text: "If animals could talk, which one would be the rudest and why?", category: 'funny' },
  { text: "What's the most ridiculous thing you've ever done to impress a crush?", category: 'funny' },
  { text: "Have you ever walked into the wrong bathroom? What happened?", category: 'funny' },
  { text: "If your pet could talk, what's the first thing they'd roast you about?", category: 'funny' },
  { text: "What's the dumbest way you've ever injured yourself?", category: 'funny' },
  { text: "If your life were a meme, which one would it be?", category: 'funny' },
  { text: "What's your most embarrassing childhood memory?", category: 'funny' },
  { text: "Have you ever sent a text to the wrong person? What did it say?", category: 'funny' },
  { text: "What's the weirdest thing you've ever eaten and actually enjoyed?", category: 'funny' },
  { text: "If you had to marry a fictional character, who would it be?", category: 'funny' },
  { text: "What's the most ridiculous thing you believed as a kid?", category: 'funny' },
  { text: "What's the most embarrassing song on your playlist?", category: 'funny' },
  { text: "What's the craziest rumor you've heard about yourself?", category: 'funny' },
  { text: "What's a secret talent you have that's absolutely useless?", category: 'funny' },

  // Spicy Questions
  { text: "Who was your first crush, and do they know about it?", category: 'spicy' },
  { text: "Have you ever had a crush on a friend's significant other?", category: 'spicy' },
  { text: "What's the most scandalous thing you've ever done in public?", category: 'spicy' },
  { text: "If you had to kiss someone in this room, who would it be?", category: 'spicy' },
  { text: "Have you ever sent a risky text to someone? Did they reply?", category: 'spicy' },
  { text: "What's the most intimate secret you've ever shared with someone?", category: 'spicy' },
  { text: "Who's the most attractive person you've ever met in real life?", category: 'spicy' },
  { text: "Have you ever pretended to like someone to get something you wanted?", category: 'spicy' },
  { text: "Have you ever cheated or been cheated on in a relationship?", category: 'spicy' },
  { text: "What's your weirdest turn-on?", category: 'spicy' },
  { text: "What's the most embarrassing thing you've done while trying to flirt?", category: 'spicy' },
  { text: "Have you ever been caught checking someone out? What happened?", category: 'spicy' },
  { text: "What's a fantasy you've had that you'd never admit to anyone?", category: 'spicy' },
  { text: "Who is your ultimate celebrity crush?", category: 'spicy' },
  { text: "Have you ever wanted to date someone but didn't because of a friend?", category: 'spicy' }
];

export const dareQuestions: CategorizedQuestion[] = [
  // Social Dares
  { text: "Post the third picture in your camera roll with no caption", category: 'social' },
  { text: "Send a 'Hey, I miss you' text to the last person you ghosted", category: 'social' },
  { text: "Call your crush and ask them for homework help", category: 'social' },
  { text: "Put your status as 'Feeling lonely, DM me for hugs' for an hour", category: 'social' },
  { text: "Like the last 15 posts of your ex on Instagram", category: 'social' },
  { text: "Send an 'I need to tell you something important' text to a random number", category: 'social' },
  { text: "Take a selfie making the ugliest face possible and send it to your group chat", category: 'social' },
  { text: "Go live on social media and sing the chorus of your favorite song", category: 'social' },
  { text: "Message someone 'I know what you did' and don't reply for 10 minutes", category: 'social' },
  { text: "Follow the first 5 people suggested to you on Instagram", category: 'social' },

  // Physical Dares
  { text: "Do a TikTok dance in front of everyone", category: 'physical' },
  { text: "Hold a plank for 1 minute while everyone counts out loud", category: 'physical' },
  { text: "Spin around 20 times and then try to walk in a straight line", category: 'physical' },
  { text: "Pretend to be a cat for the next 5 minutes", category: 'physical' },
  { text: "Do your best impersonation of someone in the room", category: 'physical' },
  { text: "Balance an object on your head and walk across the room", category: 'physical' },
  { text: "Speak in an accent for the next 3 rounds", category: 'physical' },
  { text: "Try to lick your elbow for 30 seconds", category: 'physical' },
  { text: "Let someone draw a mustache on your face with eyeliner", category: 'physical' },
  { text: "Run outside and yell 'I love you!' at the top of your lungs", category: 'physical' },

  // Creative Dares
  { text: "Draw a self-portrait with your non-dominant hand in under a minute", category: 'creative' },
  { text: "Invent a new dance move and teach it to everyone", category: 'creative' },
  { text: "Write and perform a haiku about someone in the room", category: 'creative' },
  { text: "Make up a song about pizza and sing it", category: 'creative' },
  { text: "Build a hat out of random objects in the room", category: 'creative' },
  { text: "Write a short poem confessing your love for an inanimate object", category: 'creative' },
  { text: "Invent a new word and use it in three sentences", category: 'creative' },
  { text: "Create a handshake with someone and demonstrate it", category: 'creative' },
  { text: "Draw a picture of your crush using only stick figures", category: 'creative' },
  { text: "Make a funny video pretending to be a famous influencer", category: 'creative' }
];

export const questions: CategorizedQuestion[] = [
  // Truth Questions
  ...truthQuestions.map((question, index) => ({
    type: 'truth',
    text: question.text,
    category: question.category,
    id: `truth${index}`,
  })),
  // Dare Questions
  ...dareQuestions.map((question, index) => ({
    type: 'dare',
    text: question.text,
    category: question.category,
    id: `dare${index}`,
  })),
];