import { Observable } from "rxjs/Rx";
import { AxiosResponse, AxiosError } from "axios";
import { AnyAction } from "redux";
import { Epic } from "redux-observable";
import { AppState } from "../reducers";
import { Dependencies } from "../init";
import endpoint from "../constants/endpoint";
import {
  loadIndustriesSuccess,
  industryAjaxFailure
} from "../actions/industries";
import * as actionTypes from "../constants/actionTypes";
import * as types from "../types";

type LoadIndustrieEpic = Epic<AnyAction, AppState, Dependencies>;
export const loadIndustriesEpic: LoadIndustrieEpic = (
  action$,
  store,
  { ajax }
) =>
  action$.ofType(actionTypes.LOAD_INDUSTRIES_REQUEST).mergeMap(() =>
    ajax({
      method: "GET",
      url: endpoint.industries
    })
      .map(
        ({
          data: { result }
        }: AxiosResponse<types.AxiosResponseData<types.Industry[]>>) =>
          loadIndustriesSuccess(result)
      )
      .catch((err: AxiosError) =>
        Observable.of(
          industryAjaxFailure(
            !err.response ? err.message : err.response.data.message
          )
        )
      )
  );

export default [loadIndustriesEpic];
