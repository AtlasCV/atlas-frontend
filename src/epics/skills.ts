import { Observable } from "rxjs/Rx";
import { AxiosResponse, AxiosError } from "axios";
import { AnyAction } from "redux";
import { Epic } from "redux-observable";
import { AppState } from "../reducers";
import { Dependencies } from "../init";
import endpoint from "../constants/endpoint";
import {
  loadSkillsRequest,
  loadSkillsSuccess,
  skillAjaxFailure,
  addSkillsToApplicantRequest,
  addSkillsToApplicantSuccess
} from "../actions/skills";
import * as actionTypes from "../constants/actionTypes";
import * as types from "../types";

type LoadSkillsEpic = Epic<AnyAction, AppState, Dependencies>;
export const loadSkillsEpic: LoadSkillsEpic = (action$, store, { ajax }) =>
  action$
    .ofType(actionTypes.LOAD_INDUSTRIES_REQUEST)
    .mergeMap((action: ReturnType<typeof loadSkillsRequest>) =>
      ajax({
        method: "GET",
        url: endpoint.skills
      })
        .map(
          ({
            data: { result }
          }: AxiosResponse<
            types.AxiosResponseData<Array<{ id: number; name: string }>>
          >) => loadSkillsSuccess(result)
        )
        .catch((err: AxiosError) =>
          Observable.of(
            skillAjaxFailure(
              !err.response ? err.message : err.response.data.message
            )
          )
        )
    );

type AddSkillsToApplicantEpic = Epic<AnyAction, AppState, Dependencies>;
export const addSkillsToApplicantEpic: AddSkillsToApplicantEpic = (
  action$,
  store,
  { ajax }
) =>
  action$
    .ofType(actionTypes.ADD_INDUSTRIES_TO_APPLICANT_REQUEST)
    .mergeMap(
      ({
        payload: { skillIds, applicantId }
      }: ReturnType<typeof addSkillsToApplicantRequest>) =>
        ajax({
          method: "POST",
          url: `${endpoint.applicants}/${applicantId}/skills`,
          headers: {
            "content-type": "application/json"
          },
          data: {
            skillIds
          }
        })
          .map(
            ({
              data: { result }
            }: AxiosResponse<
              types.AxiosResponseData<Array<{ id: number; name: string }>>
            >) => addSkillsToApplicantSuccess(result)
          )
          .catch((err: AxiosError) =>
            Observable.of(
              skillAjaxFailure(
                !err.response ? err.message : err.response.data.message
              )
            )
          )
    );

export default [loadSkillsEpic, addSkillsToApplicantEpic];
