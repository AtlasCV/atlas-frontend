import { Observable } from "rxjs/Rx";
import { AxiosResponse, AxiosError } from "axios";
import { AnyAction } from "redux";
import { Epic } from "redux-observable";
import { AppState } from "../reducers";
import { Dependencies } from "../init";
import endpoint from "../constants/endpoint";
import { getMeSuccess, authAjaxFailure } from "../actions/auth";
import * as actionTypes from "../constants/actionTypes";
import * as types from "../types";
import { User } from "../types";

type GetMeEpic = Epic<AnyAction, AppState, Dependencies>;
export const getMeEpic: GetMeEpic = (action$, store, { ajax }) =>
  action$.ofType(actionTypes.GET_ME_REQUEST).mergeMap(() =>
    ajax({
      method: "GET",
      url: endpoint.me,
      headers: {
        Authorization: store.getState().auth.token || ""
      }
    })
      .map(
        ({ data: { result } }: AxiosResponse<types.AxiosResponseData<User>>) =>
          getMeSuccess(result)
      )
      .catch((err: AxiosError) =>
        Observable.of(
          authAjaxFailure(
            !err.response ? err.message : err.response.data.message
          )
        )
      )
  );

export default [getMeEpic];
