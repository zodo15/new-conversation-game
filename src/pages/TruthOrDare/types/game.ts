export type QuestionType = 'truth' | 'dare' | 'would-you-rather';

export type QuestionCategory = 'mild' | 'spicy' | 'extreme';

export interface Question {
  id: string;
  text: string;
  type: QuestionType;
  category: QuestionCategory;
  optionA?: string;
  optionB?: string;
  mode?: string;
  custom?: boolean;
}

export interface Player {
  id: string;
  name: string;
  score: number;
  streak: number;
  choices: {
    truth: number;
    dare: number;
    'would-you-rather': number;
  };
  reactions: {
    given: { [key: string]: string[] };
    received: { [key: string]: string[] };
  };
}

export interface GameState {
  players: Player[];
  currentPlayerIndex: number;
  currentQuestion: Question | null;
  gameStarted: boolean;
  mode: string;
  chaosMode: boolean;
  chaosMaster?: string;
  timer: number;
  votes?: Record<string, 'optionA' | 'optionB'>;
  selectedOption?: string;
}

export interface GameStore extends GameState {
  addPlayer: (name: string) => void;
  removePlayer: (id: string) => void;
  startGame: () => void;
  setMode: (mode: string) => void;
  setCurrentQuestion: (question: Question | null) => void;
  nextPlayer: () => void;
  addVote: (playerId: string, choice: 'optionA' | 'optionB') => void;
  updateScore: (playerId: string, points: number) => void;
  updateStreak: (playerId: string) => void;
  clearVotes: () => void;
  resetGame: () => void;
  addReaction: (fromPlayerId: string, toPlayerId: string, reaction: string) => void;
  getRandomQuestion: () => Question | null;
  addUsedQuestionId: (id: string) => void;
  setCurrentPlayerIndex: (index: number) => void;
  setShowChaosMasterWheel: (show: boolean) => void;
  setShowAddQuestion: (show: boolean) => void;
  showChaosMasterWheel: boolean;
  showAddQuestion: boolean;
}