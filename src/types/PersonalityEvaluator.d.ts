export interface PersonalityEvaluator {
  uuid: string;
  answers: number[];
  currentQuestionIndex: number;
  scoreSignature: string;
  completed: boolean;
}
