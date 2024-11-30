import { useState, useCallback } from 'react';
import { gameContent } from '../data/gameContent';
import { Question, QuestionType, QuestionCategory } from '../types/game';

export function useGameQuestions() {
  const [customQuestions, setCustomQuestions] = useState<Question[]>([]);

  const addCustomQuestion = useCallback((question: Question) => {
    setCustomQuestions(prev => [...prev, question]);
  }, []);

  const getRandomQuestion = useCallback((type: QuestionType, category: QuestionCategory): Question | null => {
    // Get default questions from gameContent
    const defaultQuestions = (gameContent[type] as Record<QuestionCategory, string[]>)[category]?.map((content: string) => ({
      id: Math.random(),
      content,
      type,
      category,
      options: ['Yes', 'No'] as [string, string],
      custom: false
    })) || [];

    // Get custom questions for this type and category
    const relevantCustomQuestions = customQuestions.filter(q => 
      q.type === type && 
      q.category === category
    );

    // Combine both pools
    const allQuestions = [...defaultQuestions, ...relevantCustomQuestions];

    if (allQuestions.length === 0) {
      return null;
    }

    // Return a random question
    return allQuestions[Math.floor(Math.random() * allQuestions.length)];
  }, [customQuestions]);

  return {
    customQuestions,
    addCustomQuestion,
    getRandomQuestion
  };
}