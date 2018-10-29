import { Observable } from "rxjs/Rx";
import { replace, push } from "react-router-redux";
import { AxiosResponse, AxiosError } from "axios";
import { AnyAction } from "redux";
import { Epic } from "redux-observable";
import { AppState } from "../reducers";
import { Dependencies } from "../init";
import endpoint from "../constants/endpoint";
import {
  loadEvaluatorSuccess,
  questionAjaxFailure
} from "../actions/questions";
import * as actionTypes from "../constants/actionTypes";
import * as types from "../types";

type CreatePersonalityEvaluationEpic = Epic<AnyAction, AppState, Dependencies>;
export const createPersonalityEvaluationEpic: CreatePersonalityEvaluationEpic = (
  action$,
  store,
  { ajax }
) =>
  action$.ofType(actionTypes.START_EVALUATOR_REQUEST).mergeMap(({}) =>
    ajax({
      method: "POST",
      url: endpoint.personalityEvaluations,
      headers: {
        "Content-Type": "application/json"
      },
      data: {}
    })
      .concatMap(
        ({
          data: { result }
        }: AxiosResponse<
          types.AxiosResponseData<types.PersonalityEvaluator>
        >) => [
          loadEvaluatorSuccess(result),
          replace(`/onboarding/personality-evaluator/${result.uuid}`)
        ]
      )
      .catch((err: AxiosError) =>
        Observable.of(
          questionAjaxFailure(
            !err.response ? err.message : err.response.data.message
          )
        )
      )
  );

type LoadPersonalityEvaluationEpic = Epic<AnyAction, AppState, Dependencies>;
export const loadPersonalityEvaluationEpic: LoadPersonalityEvaluationEpic = (
  action$,
  store,
  { ajax }
) =>
  action$
    .ofType(actionTypes.LOAD_EVALUATOR_REQUEST)
    .mergeMap(({ payload: { uuid } }) =>
      ajax({
        method: "GET",
        url: `${endpoint.personalityEvaluations}/${uuid}`,
        headers: {
          "Content-Type": "application/json"
        }
      })
        .map(
          ({
            data: { result }
          }: AxiosResponse<
            types.AxiosResponseData<types.PersonalityEvaluator>
          >) => {
            if (!result) {
              return push("/onboarding/personality-evaluator");
            }
            return loadEvaluatorSuccess(result);
          }
        )
        .catch((err: AxiosError) =>
          Observable.of(
            questionAjaxFailure(
              !err.response ? err.message : err.response.data.message
            )
          )
        )
    );

type NextQuestionPageEpic = Epic<AnyAction, AppState, Dependencies>;
export const nextQuestionPageEpic: NextQuestionPageEpic = (
  action$,
  store,
  { ajax }
) =>
  action$
    .ofType(actionTypes.NEXT_QUESTION_SET, actionTypes.CALCULATE_RESULTS)
    .mergeMap(({ payload: {} }) => {
      const {
        questions: {
          currentQuestionIndex,
          questionList,
          uuid,
          evaluatorCompleted,
          finalScore: { scoreSignature }
        }
      } = store.getState();

      return ajax({
        method: "put",
        url: `${endpoint.personalityEvaluations}/${uuid}`,
        data: {
          currentQuestionIndex,
          scoreSignature,
          completed: evaluatorCompleted,
          answers: questionList
            .map(q => q.userResponse)
            .slice(currentQuestionIndex - 5, currentQuestionIndex)
        }
      })
        .map(({ data: { result } }: AxiosResponse) => {
          window.scrollTo(0, 0);
          return loadEvaluatorSuccess(result);
        })
        .catch((err: AxiosError) =>
          Observable.of(
            questionAjaxFailure(
              !err.response ? err.message : err.response.data.message
            )
          )
        );
    });

export default [
  createPersonalityEvaluationEpic,
  loadPersonalityEvaluationEpic,
  nextQuestionPageEpic
];
