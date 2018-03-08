import { Action } from "./";
import {
  ANSWER_QUESTION,
  NEXT_QUESTION_SET,
  PREVIOUS_QUESTION_SET,
  CALCULATE_RESULTS
} from "../../constants/actionTypes";

export type AnswerQuestion = Action<
  typeof ANSWER_QUESTION,
  { score: number; index: number },
  {}
>;

export type NextQuestionSet = Action<typeof NEXT_QUESTION_SET, {}, {}>;
export type PreviousQuestionSet = Action<typeof PREVIOUS_QUESTION_SET, {}, {}>;
export type CalculateResults = Action<typeof CALCULATE_RESULTS, {}, {}>;

export type QuestionActions =
  | AnswerQuestion
  | NextQuestionSet
  | PreviousQuestionSet
  | CalculateResults;
