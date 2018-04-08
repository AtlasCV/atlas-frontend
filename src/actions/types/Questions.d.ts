import { Action } from "./";
import {
  ANSWER_QUESTION,
  NEXT_QUESTION_SET,
  PREVIOUS_QUESTION_SET,
  CALCULATE_RESULTS,
  START_EVALUATOR_REQUEST,
  LOAD_EVALUATOR_SUCCESS,
  LOAD_EVALUATOR_REQUEST,
  QUESTION_AJAX_FAILURE
} from "../../constants/actionTypes";
import * as types from "../../types";

export type AnswerQuestion = Action<
  typeof ANSWER_QUESTION,
  { score: number; index: number }
>;

// write evaluator to backend
export type StartEvaluatorRequest = Action<typeof START_EVALUATOR_REQUEST>;
export type LoadEvaluatorRequest = Action<
  typeof LOAD_EVALUATOR_REQUEST,
  { uuid: string }
>;
export type LoadEvaluatorSuccess = Action<
  typeof LOAD_EVALUATOR_SUCCESS,
  { personalityEvaluator: types.PersonalityEvaluator }
>;

export type QuestionAjaxFailure = Action<
  typeof QUESTION_AJAX_FAILURE,
  { error: Error }
>;

export type NextQuestionSet = Action<typeof NEXT_QUESTION_SET>;
export type PreviousQuestionSet = Action<typeof PREVIOUS_QUESTION_SET>;
export type CalculateResults = Action<typeof CALCULATE_RESULTS>;

export type QuestionActions =
  | AnswerQuestion
  | NextQuestionSet
  | PreviousQuestionSet
  | CalculateResults
  | StartEvaluatorRequest
  | LoadEvaluatorSuccess;
