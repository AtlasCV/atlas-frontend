import * as actionTypes from "../constants/actionTypes";
import { PersonalityEvaluator } from "../types";
import { createAction } from "./helpers";

export const answerQuestion = (index: number, score: number) =>
  createAction(actionTypes.ANSWER_QUESTION, {
    index,
    score
  });

export const nextQuestionSet = () =>
  createAction(actionTypes.NEXT_QUESTION_SET);

export const previousQuestionSet = () =>
  createAction(actionTypes.PREVIOUS_QUESTION_SET);

export const calculateResults = () =>
  createAction(actionTypes.CALCULATE_RESULTS);

export const startEvaluatorRequest = () =>
  createAction(actionTypes.START_EVALUATOR_REQUEST);

export const loadEvaluatorRequest = (uuid: string) =>
  createAction(actionTypes.LOAD_EVALUATOR_REQUEST, { uuid });

export const loadEvaluatorSuccess = (
  personalityEvaluator: PersonalityEvaluator
) => createAction(actionTypes.LOAD_EVALUATOR_SUCCESS, { personalityEvaluator });

export const questionAjaxFailure = (reason: string) =>
  createAction(
    actionTypes.QUESTION_AJAX_FAILURE,
    { error: new Error(reason) },
    true
  );
