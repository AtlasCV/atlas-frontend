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
  addSkillsToApplicantSuccess,
  removeSkillFromApplicantRequest,
  removeSkillFromApplicantSuccess
} from "../actions/skills";
import * as actionTypes from "../constants/actionTypes";
import * as types from "../types";
import { Skill } from "../types";
import { getMeRequest } from "../actions/auth";

type LoadSkillsEpic = Epic<AnyAction, AppState, Dependencies>;
export const loadSkillsEpic: LoadSkillsEpic = (action$, store, { ajax }) =>
  action$
    .ofType(actionTypes.LOAD_SKILLS_REQUEST)
    .mergeMap((action: ReturnType<typeof loadSkillsRequest>) =>
      ajax({
        method: "GET",
        url: endpoint.skills
      })
        .map(
          ({
            data: { result }
          }: AxiosResponse<types.AxiosResponseData<Skill[]>>) =>
            loadSkillsSuccess(result)
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
    .ofType(actionTypes.ADD_SKILLS_TO_APPLICANT_REQUEST)
    .mergeMap(
      ({
        payload: { skill, applicantId }
      }: ReturnType<typeof addSkillsToApplicantRequest>) =>
        ajax({
          method: "POST",
          url: `${endpoint.applicants}/${applicantId}/skills`,
          headers: {
            "content-type": "application/json"
          },
          data: {
            skill
          }
        })
          .mergeMap(
            ({
              data: { result }
            }: AxiosResponse<types.AxiosResponseData<Skill[]>>) => [
              addSkillsToApplicantSuccess(result),
              getMeRequest()
            ]
          )
          .catch((err: AxiosError) =>
            Observable.of(
              skillAjaxFailure(
                !err.response ? err.message : err.response.data.message
              )
            )
          )
    );

type RemoveSkillFromApplicantEpic = Epic<AnyAction, AppState, Dependencies>;
export const removeSkillFromApplicantEpic: RemoveSkillFromApplicantEpic = (
  action$,
  store,
  { ajax }
) =>
  action$
    .ofType(actionTypes.REMOVE_SKILL_FROM_APPLICANT_REQUEST)
    .mergeMap(
      ({
        payload: { skillId, applicantId }
      }: ReturnType<typeof removeSkillFromApplicantRequest>) =>
        ajax({
          method: "DELETE",
          url: `${endpoint.applicants}/${applicantId}/skills`,
          headers: {
            "content-type": "application/json"
          },
          data: {
            skillId
          }
        })
          .mergeMap((res: AxiosResponse<types.AxiosResponseData<{}>>) => [
            removeSkillFromApplicantSuccess(skillId),
            getMeRequest()
          ])
          .catch((err: AxiosError) =>
            Observable.of(
              skillAjaxFailure(
                !err.response ? err.message : err.response.data.message
              )
            )
          )
    );

export default [
  loadSkillsEpic,
  addSkillsToApplicantEpic,
  removeSkillFromApplicantEpic
];
