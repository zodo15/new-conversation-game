import { Question, QuestionCategory, QuestionType } from '../types/game';

export const categories: QuestionCategory[] = [
  'spicy',
  'funny',
  'deep',
  'social',
  'physical',
  'creative'
] as const;

const createQuestion = (
  text: string, 
  category: QuestionCategory, 
  type: QuestionType,
  id: number
): Question => ({
  id,
  content: text,
  category,
  type,
  options: ['', ''], // Default empty options for T/D questions
});

export const truthQuestions: Question[] = [
  // Deep Questions
  createQuestion("What's a secret you've never told anyone, even your best friend?", 'deep', 'truth', 1),
  createQuestion("If you could relive one moment from your past, what would it be and why?", 'deep', 'truth', 2),
  createQuestion("Who in your life has hurt you the most, and have you forgiven them?", 'deep', 'truth', 3),
  createQuestion("If your future self could send you one sentence, what would you want it to say?", 'deep', 'truth', 4),
  createQuestion("What's the one thing about yourself that you wish more people understood?", 'deep', 'truth', 5),
  createQuestion("Have you ever had a dream that changed your perspective on life?", 'deep', 'truth', 6),
  createQuestion("What's your biggest fear about growing up?", 'deep', 'truth', 7),
  createQuestion("What's the hardest goodbye you've ever had to say?", 'deep', 'truth', 8),
  createQuestion("If you could erase one memory, would you do it? If yes, which one?", 'deep', 'truth', 9),
  createQuestion("Have you ever pretended to be someone you're not to impress others?", 'deep', 'truth', 10),
  createQuestion("What's the biggest lie you've ever told, and do you regret it?", 'deep', 'truth', 11),
  createQuestion("Who do you secretly envy and why?", 'deep', 'truth', 12),
  createQuestion("Have you ever felt truly alone in a room full of people? What did it feel like?", 'deep', 'truth', 13),
  createQuestion("If you could fix one mistake you made in a relationship, what would it be?", 'deep', 'truth', 14),
  createQuestion("What's the darkest thought you've ever had?", 'deep', 'truth', 15),

  // Funny Questions
  createQuestion("What's the weirdest thing you've ever Googled?", 'funny', 'truth', 16),
  createQuestion("If animals could talk, which one would be the rudest and why?", 'funny', 'truth', 17),
  createQuestion("What's the most ridiculous thing you've ever done to impress a crush?", 'funny', 'truth', 18),
  createQuestion("Have you ever walked into the wrong bathroom? What happened?", 'funny', 'truth', 19),
  createQuestion("If your pet could talk, what's the first thing they'd roast you about?", 'funny', 'truth', 20),
  createQuestion("What's the dumbest way you've ever injured yourself?", 'funny', 'truth', 21),
  createQuestion("If your life were a meme, which one would it be?", 'funny', 'truth', 22),
  createQuestion("What's your most embarrassing childhood memory?", 'funny', 'truth', 23),
  createQuestion("Have you ever sent a text to the wrong person? What did it say?", 'funny', 'truth', 24),
  createQuestion("What's the weirdest thing you've ever eaten and actually enjoyed?", 'funny', 'truth', 25),
  createQuestion("If you had to marry a fictional character, who would it be?", 'funny', 'truth', 26),
  createQuestion("What's the most ridiculous thing you believed as a kid?", 'funny', 'truth', 27),
  createQuestion("What's the most embarrassing song on your playlist?", 'funny', 'truth', 28),
  createQuestion("What's the craziest rumor you've heard about yourself?", 'funny', 'truth', 29),
  createQuestion("What's a secret talent you have that's absolutely useless?", 'funny', 'truth', 30),

  // Spicy Questions
  createQuestion("Who was your first crush, and do they know about it?", 'spicy', 'truth', 31),
  createQuestion("Have you ever had a crush on a friend's significant other?", 'spicy', 'truth', 32),
  createQuestion("What's the most scandalous thing you've ever done in public?", 'spicy', 'truth', 33),
  createQuestion("If you had to kiss someone in this room, who would it be?", 'spicy', 'truth', 34),
  createQuestion("Have you ever sent a risky text to someone? Did they reply?", 'spicy', 'truth', 35),
  createQuestion("What's the most intimate secret you've ever shared with someone?", 'spicy', 'truth', 36),
  createQuestion("Who's the most attractive person you've ever met in real life?", 'spicy', 'truth', 37),
  createQuestion("Have you ever pretended to like someone to get something you wanted?", 'spicy', 'truth', 38),
  createQuestion("Have you ever cheated or been cheated on in a relationship?", 'spicy', 'truth', 39),
  createQuestion("What's your weirdest turn-on?", 'spicy', 'truth', 40),
  createQuestion("What's the most embarrassing thing you've done while trying to flirt?", 'spicy', 'truth', 41),
  createQuestion("Have you ever been caught checking someone out? What happened?", 'spicy', 'truth', 42),
  createQuestion("What's a fantasy you've had that you'd never admit to anyone?", 'spicy', 'truth', 43),
  createQuestion("Who is your ultimate celebrity crush?", 'spicy', 'truth', 44),
  createQuestion("Have you ever wanted to date someone but didn't because of a friend?", 'spicy', 'truth', 45),
  createQuestion("What's your most embarrassing dating app story?", 'spicy', 'truth', 46),
  createQuestion("What's the most scandalous thing you've done in public?", 'spicy', 'truth', 47),
  createQuestion("What's your biggest turn-off that you're afraid to tell people?", 'spicy', 'truth', 48),
];

export const dareQuestions: Question[] = [
  // Social Dares
  createQuestion("Post the third picture in your camera roll with no caption", 'social', 'dare', 101),
  createQuestion("Send a 'Hey, I miss you' text to the last person you ghosted", 'social', 'dare', 102),
  createQuestion("Call your crush and ask them for homework help", 'social', 'dare', 103),
  createQuestion("Put your status as 'Feeling lonely, DM me for hugs' for an hour", 'social', 'dare', 104),
  createQuestion("Like the last 15 posts of your ex on Instagram", 'social', 'dare', 105),
  createQuestion("Send an 'I need to tell you something important' text to a random number", 'social', 'dare', 106),
  createQuestion("Take a selfie making the ugliest face possible and send it to your group chat", 'social', 'dare', 107),
  createQuestion("Go live on social media and sing the chorus of your favorite song", 'social', 'dare', 108),
  createQuestion("Message someone 'I know what you did' and don't reply for 10 minutes", 'social', 'dare', 109),
  createQuestion("Follow the first 5 people suggested to you on Instagram", 'social', 'dare', 110),

  // Physical Dares
  createQuestion("Do a TikTok dance in front of everyone", 'physical', 'dare', 111),
  createQuestion("Hold a plank for 1 minute while everyone counts out loud", 'physical', 'dare', 112),
  createQuestion("Spin around 20 times and then try to walk in a straight line", 'physical', 'dare', 113),
  createQuestion("Pretend to be a cat for the next 5 minutes", 'physical', 'dare', 114),
  createQuestion("Do your best impersonation of someone in the room", 'physical', 'dare', 115),
  createQuestion("Balance an object on your head and walk across the room", 'physical', 'dare', 116),
  createQuestion("Speak in an accent for the next 3 rounds", 'physical', 'dare', 117),
  createQuestion("Try to lick your elbow for 30 seconds", 'physical', 'dare', 118),
  createQuestion("Let someone draw a mustache on your face with eyeliner", 'physical', 'dare', 119),
  createQuestion("Run outside and yell 'I love you!' at the top of your lungs", 'physical', 'dare', 120),

  // Creative Dares
  createQuestion("Draw a self-portrait with your non-dominant hand in under a minute", 'creative', 'dare', 121),
  createQuestion("Invent a new dance move and teach it to everyone", 'creative', 'dare', 122),
  createQuestion("Write and perform a haiku about someone in the room", 'creative', 'dare', 123),
  createQuestion("Make up a song about pizza and sing it", 'creative', 'dare', 124),
  createQuestion("Build a hat out of random objects in the room", 'creative', 'dare', 125),
  createQuestion("Write a short poem confessing your love for an inanimate object", 'creative', 'dare', 126),
  createQuestion("Invent a new word and use it in three sentences", 'creative', 'dare', 127),
  createQuestion("Create a handshake with someone and demonstrate it", 'creative', 'dare', 128),
  createQuestion("Draw a picture of your crush using only stick figures", 'creative', 'dare', 129),
  createQuestion("Make a funny video pretending to be a famous influencer", 'creative', 'dare', 130),
  createQuestion("Draw a portrait of the person to your left in 30 seconds", 'creative', 'dare', 131),
  createQuestion("Make up a 30-second rap about your day", 'creative', 'dare', 132),
  createQuestion("Create a new TikTok dance move and demonstrate it", 'creative', 'dare', 133),
  createQuestion("Do 10 push-ups right now", 'physical', 'dare', 134),
  createQuestion("Hold a plank for 1 minute", 'physical', 'dare', 135),
  createQuestion("Do your best dance move right now", 'physical', 'dare', 136),
];

export const allQuestions: Question[] = [...truthQuestions, ...dareQuestions];