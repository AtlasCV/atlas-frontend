import * as Actions from "./types";
import {
  ANSWER_QUESTION,
  NEXT_QUESTION_SET,
  PREVIOUS_QUESTION_SET,
  CALCULATE_RESULTS
} from "../constants/actionTypes";

export const answerQuestion = (
  index: number,
  score: number
): Actions.AnswerQuestion => ({
  type: ANSWER_QUESTION,
  payload: {
    index,
    score
  },
  error: false
});

export const nextQuestionSet = (): Actions.NextQuestionSet => ({
  type: NEXT_QUESTION_SET,
  payload: {},
  error: false
});

export const previousQuestionSet = (): Actions.PreviousQuestionSet => ({
  type: PREVIOUS_QUESTION_SET,
  payload: {},
  error: false
});

export const calculateResults = (score: number): Actions.CalculateResults => ({
  type: CALCULATE_RESULTS,
  payload: {},
  error: false
});
