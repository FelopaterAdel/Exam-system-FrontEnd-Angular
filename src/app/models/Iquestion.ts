
export interface IQuestion {
  _id: number;
  question: string;
  userAnswer: string;
  correctAnswer: string;
  isCorrect: boolean;
  options: string[];
}

 