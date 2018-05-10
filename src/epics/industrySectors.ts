import { Observable } from "rxjs/Rx";
import { AxiosResponse, AxiosError } from "axios";
import { AnyAction } from "redux";
import { Epic } from "redux-observable";
import { AppState } from "../reducers";
import { Dependencies } from "../init";
import endpoint from "../constants/endpoint";
import {
  loadIndustrySectorsRequest,
  loadIndustrySectorsSuccess,
  industrySectorAjaxFailure,
  addIndustrySectorsToApplicantRequest,
  addIndustrySectorsToApplicantSuccess,
  removeIndustrySectorFromApplicantRequest,
  removeIndustrySectorFromApplicantSuccess
} from "../actions/industrySectors";
import * as actionTypes from "../constants/actionTypes";
import * as types from "../types";
import { IndustrySector } from "../types";
import { getMeRequest } from "../actions/auth";

type LoadIndustrySectorsEpic = Epic<AnyAction, AppState, Dependencies>;
export const loadIndustrySectorsEpic: LoadIndustrySectorsEpic = (
  action$,
  store,
  { ajax }
) =>
  action$
    .ofType(actionTypes.LOAD_INDUSTRY_SECTORS_REQUEST)
    .mergeMap(
      ({
        payload: { industryId }
      }: ReturnType<typeof loadIndustrySectorsRequest>) =>
        ajax({
          method: "GET",
          url: `${endpoint.industrySectors}`
        })
          .map(
            ({
              data: { result }
            }: AxiosResponse<types.AxiosResponseData<IndustrySector[]>>) =>
              loadIndustrySectorsSuccess(result)
          )
          .catch((err: AxiosError) =>
            Observable.of(
              industrySectorAjaxFailure(
                !err.response ? err.message : err.response.data.message
              )
            )
          )
    );

type AddIndustrySectorsToApplicantEpic = Epic<
  AnyAction,
  AppState,
  Dependencies
>;
export const addIndustrySectorsToApplicantEpic: AddIndustrySectorsToApplicantEpic = (
  action$,
  store,
  { ajax }
) =>
  action$
    .ofType(actionTypes.ADD_INDUSTRY_SECTORS_TO_APPLICANT_REQUEST)
    .mergeMap(
      ({
        payload: { industrySector, applicantId }
      }: ReturnType<typeof addIndustrySectorsToApplicantRequest>) =>
        ajax({
          method: "POST",
          url: `${endpoint.applicants}/${applicantId}/industrySectors`,
          headers: {
            "content-type": "application/json"
          },
          data: {
            industrySector
          }
        })
          .mergeMap(
            ({
              data: { result }
            }: AxiosResponse<types.AxiosResponseData<IndustrySector[]>>) => [
              addIndustrySectorsToApplicantSuccess(result),
              getMeRequest()
            ]
          )
          .catch((err: AxiosError) =>
            Observable.of(
              industrySectorAjaxFailure(
                !err.response ? err.message : err.response.data.message
              )
            )
          )
    );

type RemoveIndustrySectorFromApplicantEpic = Epic<
  AnyAction,
  AppState,
  Dependencies
>;
export const removeIndustrySectorFromApplicantEpic: RemoveIndustrySectorFromApplicantEpic = (
  action$,
  store,
  { ajax }
) =>
  action$
    .ofType(actionTypes.REMOVE_INDUSTRY_SECTOR_FROM_APPLICANT_REQUEST)
    .mergeMap(
      ({
        payload: { industrySectorId, applicantId }
      }: ReturnType<typeof removeIndustrySectorFromApplicantRequest>) =>
        ajax({
          method: "DELETE",
          url: `${endpoint.applicants}/${applicantId}/industrySectors`,
          headers: {
            "content-type": "application/json"
          },
          data: {
            industrySectorId
          }
        })
          .mergeMap((res: AxiosResponse<types.AxiosResponseData<{}>>) => [
            removeIndustrySectorFromApplicantSuccess(industrySectorId),
            getMeRequest()
          ])
          .catch((err: AxiosError) =>
            Observable.of(
              industrySectorAjaxFailure(
                !err.response ? err.message : err.response.data.message
              )
            )
          )
    );

export default [
  loadIndustrySectorsEpic,
  addIndustrySectorsToApplicantEpic,
  removeIndustrySectorFromApplicantEpic
];
