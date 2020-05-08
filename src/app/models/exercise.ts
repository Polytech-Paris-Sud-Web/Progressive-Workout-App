export enum Difficulty {
  EASY = 'easy',
  MEDIUM = 'medium',
  HARD = 'hard',
}

export interface Exercise {
  name: string;
  difficulty: Difficulty;
}
