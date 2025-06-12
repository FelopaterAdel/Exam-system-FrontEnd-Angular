import { IQuestion } from "./Iquestion";

export interface IExamResult {
  id: string;
  title: string;
  score: number;
  totalQuestions: number;
  percentage: number;
  passed: boolean;
  submittedAt: Date;
  timeTaken?: string;
  questions?: IQuestion[];
}