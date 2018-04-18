import { Observable } from "rxjs/Rx";
import { AxiosResponse, AxiosError } from "axios";
import { AnyAction } from "redux";
import { Epic } from "redux-observable";
import { AppState } from "../reducers";
import { Dependencies } from "../init";
import endpoint from "../constants/endpoint";
import {
  loadIndustriesRequest,
  loadIndustriesSuccess,
  industryAjaxFailure,
  addIndustriesToApplicantRequest,
  addIndustriesToApplicantSuccess
} from "../actions/industries";
import * as actionTypes from "../constants/actionTypes";
import * as types from "../types";

type LoadIndustriesEpic = Epic<AnyAction, AppState, Dependencies>;
export const loadIndustriesEpic: LoadIndustriesEpic = (
  action$,
  store,
  { ajax }
) =>
  action$
    .ofType(actionTypes.LOAD_INDUSTRIES_REQUEST)
    .mergeMap((action: ReturnType<typeof loadIndustriesRequest>) =>
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

type AddIndustriesToApplicantEpic = Epic<AnyAction, AppState, Dependencies>;
export const addIndustriesToApplicantEpic: AddIndustriesToApplicantEpic = (
  action$,
  store,
  { ajax }
) =>
  action$
    .ofType(actionTypes.ADD_INDUSTRIES_TO_APPLICANT_REQUEST)
    .mergeMap(
      ({
        payload: { industryIds, applicantId }
      }: ReturnType<typeof addIndustriesToApplicantRequest>) =>
        ajax({
          method: "POST",
          url: `${endpoint.applicants}/${applicantId}/industries`,
          headers: {
            "content-type": "application/json"
          },
          data: {
            industryIds
          }
        })
          .map(
            ({
              data: { result }
            }: AxiosResponse<types.AxiosResponseData<types.Industry[]>>) =>
              addIndustriesToApplicantSuccess(result)
          )
          .catch((err: AxiosError) =>
            Observable.of(
              industryAjaxFailure(
                !err.response ? err.message : err.response.data.message
              )
            )
          )
    );

export default [loadIndustriesEpic, addIndustriesToApplicantEpic];
