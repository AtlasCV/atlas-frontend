import { Action } from "./";
import { ANSWER_QUESTION } from "../../constants/actionTypes";

export type AnswerQuestion = Action<
  typeof ANSWER_QUESTION,
  { score: number },
  {}
>;
