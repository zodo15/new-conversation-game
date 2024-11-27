export enum GameMode {
  NONE = 'none',
  CLASSIC = 'classic',
  SPICY = 'spicy',
  FRIENDS = 'friends',
  OFFLINE = 'offline'
}

export interface Question {
  id: string;
  option1: string;
  option2: string;
  type: 'classic' | 'spicy' | 'custom';
  votes?: {
    option1: number;
    option2: number;
  };
}

export interface CustomQuestion extends Question {
  createdAt: string;
}

export interface GameState {
  mode: GameMode;
  currentQuestion?: Question;
  players: string[];
  currentPlayerIndex: number;
  chaosMaster?: string;
  customQuestions: CustomQuestion[];
  usedQuestionIds: Set<string>;
  votes: {
    [playerId: string]: 'option1' | 'option2';
  };
  showChaosMasterWheel: boolean;
  isTimerRunning: boolean;
  showAddQuestion: boolean;
}

export interface GameActions {
  setMode: (mode: GameMode) => void;
  setCurrentQuestion: (question: Question | undefined) => void;
  setPlayers: (players: string[]) => void;
  setCurrentPlayerIndex: (index: number) => void;
  setChaosMaster: (player: string | undefined) => void;
  addCustomQuestion: (question: CustomQuestion) => void;
  addUsedQuestionId: (id: string) => void;
  clearUsedQuestionIds: () => void;
  addVote: (playerId: string, choice: 'option1' | 'option2') => void;
  clearVotes: () => void;
  setShowChaosMasterWheel: (show: boolean) => void;
  resetGame: () => void;
}
