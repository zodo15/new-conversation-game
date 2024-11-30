import { useState, useCallback } from 'react';
import { gameContent } from '../data/gameContent';
import { Question, QuestionType, QuestionCategory } from '../types/game';

export function useGameQuestions() {
  const [customQuestions, setCustomQuestions] = useState<Question[]>([]);

  const addCustomQuestion = useCallback((question: Question) => {
    setCustomQuestions(prev => [...prev, question]);
  }, []);

  const getRandomQuestion = useCallback((type: QuestionType, category: QuestionCategory, currentPlayer: string): Question | null => {
    // Get default questions from gameContent
    const defaultQuestions = (gameContent[type][category] || []).map(content => ({
      content,
      type,
      category,
      isCustom: false
    }));

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

    const randomIndex = Math.floor(Math.random() * allQuestions.length);
    return allQuestions[randomIndex];
  }, [customQuestions]);

  return {
    customQuestions,
    addCustomQuestion,
    getRandomQuestion
  };
}