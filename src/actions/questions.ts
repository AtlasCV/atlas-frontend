import * as Actions from "./types";
import * as actionTypes from "../constants/actionTypes";
import { PersonalityEvaluator } from "../types";

export const answerQuestion = (
  index: number,
  score: number
): Actions.AnswerQuestion => ({
  type: actionTypes.ANSWER_QUESTION,
  payload: {
    index,
    score
  },
  error: false
});

export const nextQuestionSet = (): Actions.NextQuestionSet => ({
  type: actionTypes.NEXT_QUESTION_SET,
  payload: {},
  error: false
});

export const previousQuestionSet = (): Actions.PreviousQuestionSet => ({
  type: actionTypes.PREVIOUS_QUESTION_SET,
  payload: {},
  error: false
});

export const calculateResults = (score: number): Actions.CalculateResults => ({
  type: actionTypes.CALCULATE_RESULTS,
  payload: {},
  error: false
});

export const startEvaluatorRequest = (): Actions.StartEvaluatorRequest => ({
  type: actionTypes.START_EVALUATOR_REQUEST,
  payload: {},
  error: false
});

export const loadEvaluatorRequest = (
  uuid: string
): Actions.LoadEvaluatorRequest => ({
  type: actionTypes.LOAD_EVALUATOR_REQUEST,
  payload: { uuid },
  error: false
});

export const loadEvaluatorSuccess = (
  personalityEvaluator: PersonalityEvaluator
): Actions.LoadEvaluatorSuccess => ({
  type: actionTypes.LOAD_EVALUATOR_SUCCESS,
  payload: { personalityEvaluator },
  error: false
});

export const questionAjaxFailure = (
  reason: string
): Actions.QuestionAjaxFailure => ({
  type: actionTypes.QUESTION_AJAX_FAILURE,
  payload: { error: new Error(reason) },
  error: true
});
