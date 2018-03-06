import * as Actions from "./types";
import { ANSWER_QUESTION } from "../constants/actionTypes";

export const answerQuestion = (score: number): Actions.AnswerQuestion => ({
  type: ANSWER_QUESTION,
  payload: {
    score
  },
  error: false
});
