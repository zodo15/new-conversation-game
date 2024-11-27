import { useCallback } from 'react';
import { Question, QuestionType, QuestionCategory } from '../types/game';
import { questions } from '../data/questions';

export const useGameQuestions = () => {
  const getRandomQuestion = useCallback((type: QuestionType, category: QuestionCategory): Question | null => {
    const filteredQuestions = questions.filter(q => q.type === type && q.category === category);
    
    if (filteredQuestions.length === 0) {
      return null;
    }

    const randomIndex = Math.floor(Math.random() * filteredQuestions.length);
    return filteredQuestions[randomIndex];
  }, []);

  return {
    getRandomQuestion
  };
};