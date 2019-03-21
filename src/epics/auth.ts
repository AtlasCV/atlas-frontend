import { Observable } from "rxjs/Rx";
import { AxiosResponse, AxiosError } from "axios";
import { AnyAction } from "redux";
import { Epic } from "redux-observable";
import { AppState } from "../reducers";
import { Dependencies } from "../init";
import endpoint from "../constants/endpoint";
import {
  getMeSuccess,
  loginSuccess,
  authAjaxFailure,
  getMeRequest,
  logoutSuccess
} from "../actions/auth";
import * as actionTypes from "../constants/actionTypes";
import * as types from "../types";
import { User } from "../types";
import { push } from "react-router-redux";

type GetMeEpic = Epic<AnyAction, AppState, Dependencies>;
export const getMeEpic: GetMeEpic = (action$, store, { ajax }) =>
  action$.ofType(actionTypes.GET_ME_REQUEST).mergeMap(() =>
    ajax({
      method: "GET",
      url: endpoint.me,
      headers: {
        Authorization: store.getState().auth.token
      }
    })
      .concatMap(
        ({
          data: { result }
        }: AxiosResponse<types.AxiosResponseData<User>>) => {
            return [
              getMeSuccess(result),
            ];
        }
      )
      .catch((err: AxiosError) =>
        Observable.of(
          authAjaxFailure(
            !err.response ? err.message : err.response.data.message
          )
        )
      )
  );

type LoginEpic = Epic<AnyAction, AppState, Dependencies>;
export const loginEpic: LoginEpic = (action$, store, { ajax }) =>
  action$
    .ofType(actionTypes.LOGIN_REQUEST)
    .mergeMap(({ payload: { email, password } }) =>
      ajax({
        method: "POST",
        url: endpoint.login,
        data: {
          email,
          password
        }
      })
        .concatMap(
          ({
            data: { result }
          }: AxiosResponse<
            types.AxiosResponseData<{ token: string; user: User }>
          >) => {
            localStorage.setItem('accessToken', result.token);
            return [
            loginSuccess(result), 
            getMeRequest(), 
            push(
              result.user.Applicant.signupComplete 
              ? '/my-profile' 
              : `/onboarding/signup/${result.user.Applicant.currentPageOfSignup}`
            )];
          }
        )
        .catch((err: AxiosError) =>
          Observable.of(
            authAjaxFailure(
              !err.response ? err.message : err.response.data.message
            )
          )
        )
    );

type LogoutEpic = Epic<AnyAction, AppState, Dependencies>;
export const logoutEpic: LogoutEpic = (action$, store, { ajax }) =>
  action$
    .ofType(actionTypes.LOGOUT_REQUEST)
    .mergeMap(() => {
      localStorage.clear();
      return [logoutSuccess(), push('/')];
    });

export default [getMeEpic, loginEpic, logoutEpic];
