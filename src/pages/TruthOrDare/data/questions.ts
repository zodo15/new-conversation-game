import { Question, QuestionType, QuestionCategory } from '../types/game';
import { v4 as uuidv4 } from 'uuid';

const createQuestion = (
  text: string,
  type: QuestionType,
  category: QuestionCategory,
  options?: { optionA?: string; optionB?: string },
  mode?: string
): Question => ({
  id: uuidv4(),
  text,
  type,
  category,
  ...(options || {}),
  ...(mode ? { mode } : {}),
});

export const questions: Question[] = [
  // Mild Truth Questions
  createQuestion('What is your biggest pet peeve?', 'truth', 'mild'),
  createQuestion('What is your favorite childhood memory?', 'truth', 'mild'),
  createQuestion('If you could have any superpower, what would it be?', 'truth', 'mild'),
  createQuestion('What is your dream vacation destination?', 'truth', 'mild'),
  createQuestion('What is your favorite food?', 'truth', 'mild'),

  // Spicy Truth Questions
  createQuestion('What is your biggest regret?', 'truth', 'spicy'),
  createQuestion('What is your most embarrassing moment?', 'truth', 'spicy'),
  createQuestion('What is your biggest fear?', 'truth', 'spicy'),
  createQuestion('What is your most controversial opinion?', 'truth', 'spicy'),
  createQuestion('What is your biggest secret?', 'truth', 'spicy'),

  // Extreme Truth Questions
  createQuestion('What is the most illegal thing you have ever done?', 'truth', 'extreme'),
  createQuestion('What is your deepest darkest secret?', 'truth', 'extreme'),
  createQuestion('What is your biggest lie?', 'truth', 'extreme'),
  createQuestion('What is your most embarrassing crush?', 'truth', 'extreme'),
  createQuestion('What is your most awkward date?', 'truth', 'extreme'),

  // Mild Dare Questions
  createQuestion('Do 10 jumping jacks', 'dare', 'mild'),
  createQuestion('Sing your favorite song', 'dare', 'mild'),
  createQuestion('Tell a joke', 'dare', 'mild'),
  createQuestion('Do your best impression of someone in the room', 'dare', 'mild'),
  createQuestion('Dance for 30 seconds', 'dare', 'mild'),

  // Spicy Dare Questions
  createQuestion('Call your crush and confess your feelings', 'dare', 'spicy'),
  createQuestion('Let someone post anything they want on your social media', 'dare', 'spicy'),
  createQuestion('Eat a spoonful of hot sauce', 'dare', 'spicy'),
  createQuestion('Let someone give you a makeover', 'dare', 'spicy'),
  createQuestion('Do 20 pushups', 'dare', 'spicy'),

  // Extreme Dare Questions
  createQuestion('Let someone shave part of your head', 'dare', 'extreme'),
  createQuestion('Eat a raw egg', 'dare', 'extreme'),
  createQuestion('Let someone wax your leg', 'dare', 'extreme'),
  createQuestion('Get a tattoo', 'dare', 'extreme'),
  createQuestion('Pierce your ear', 'dare', 'extreme'),

  // Would You Rather Questions
  createQuestion(
    'Would you rather...',
    'would-you-rather',
    'mild',
    {
      optionA: 'be able to read minds',
      optionB: 'be able to see the future'
    }
  ),
  createQuestion(
    'Would you rather...',
    'would-you-rather',
    'mild',
    {
      optionA: 'have unlimited money',
      optionB: 'have unlimited time'
    }
  ),
  createQuestion(
    'Would you rather...',
    'would-you-rather',
    'spicy',
    {
      optionA: 'never be able to use social media again',
      optionB: 'never be able to watch TV/movies again'
    }
  ),
  createQuestion(
    'Would you rather...',
    'would-you-rather',
    'extreme',
    {
      optionA: 'live in a world with no music',
      optionB: 'live in a world with no colors'
    }
  ),
];