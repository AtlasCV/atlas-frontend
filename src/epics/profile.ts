import { Observable } from "rxjs/Rx";
import { AxiosResponse, AxiosError } from "axios";
import { AnyAction } from "redux";
import { Epic } from "redux-observable";
import { AppState } from "../reducers";
import { Dependencies } from "../init";
import endpoint from "../constants/endpoint";
import * as actions from "../actions/profile";
import * as actionTypes from "../constants/actionTypes";
import { push } from "react-router-redux";

type CreateOrUpdateApplicantEpic = Epic<AnyAction, AppState, Dependencies>;
export const createOrUpdateApplicantEpic: CreateOrUpdateApplicantEpic = (
  action$,
  store,
  { ajax }
) =>
  action$
    .ofType(
      actionTypes.CREATE_APPLICANT_REQUEST,
      actionTypes.UPDATE_APPLICANT_REQUEST
    )
    .mergeMap(({ payload: { applicantFormProps, applicantId, nextPage } }) =>
      ajax({
        method: applicantId ? "PUT" : "POST",
        url: `${endpoint.applicants}/${applicantId ? applicantId : ""}`,
        headers: { "content-type": "application/json" },
        data: applicantFormProps
      })
        .concatMap(({ data: { result, token } }: AxiosResponse) => {
          if (nextPage) {
            if (token) {
              localStorage.setItem("accessToken", token);
            }
            return [actions.loadApplicantSuccess(result), push(nextPage)];
          } else {
            return [actions.loadApplicantSuccess(result)];
          }
        })
        .catch((err: AxiosError) =>
          Observable.of(
            actions.profileAjaxFailure(
              !err.response ? err.message : err.response.data.message
            )
          )
        )
    );

type CreateEducationExperience = Epic<AnyAction, AppState, Dependencies>;
const createEducationExperience: CreateEducationExperience = (
  action$,
  store,
  { ajax }
) =>
  action$
    .ofType(actionTypes.CREATE_EDUCATION_EXPERIENCE_REQUEST)
    .mergeMap(({ payload: { educationExperience, applicantId } }) => {
      console.log(educationExperience, applicantId);
      return ajax({
        method: "POST",
        url: `${endpoint.applicants}/${applicantId}/education`,
        headers: { "content-type": "application/json" },
        data: educationExperience
      })
        .map(response =>
          actions.createEducationExperienceSuccess(
            response.data.educationExperience
          )
        )
        .catch((err: AxiosError) =>
          Observable.of(
            actions.profileAjaxFailure(
              !err.response ? err.message : err.response.data.message
            )
          )
        );
    });

type CreateJobExperience = Epic<AnyAction, AppState, Dependencies>;
const createJobExperience: CreateJobExperience = (action$, store, { ajax }) =>
  action$
    .ofType(actionTypes.CREATE_JOB_EXPERIENCE_REQUEST)
    .mergeMap(({ payload: { jobExperience, applicantId } }) => {
      return ajax({
        method: "POST",
        url: `${endpoint.applicants}/${applicantId}/jobExperience`,
        headers: { "content-type": "application/json" },
        data: jobExperience
      })
        .map(response =>
          actions.createJobExperienceSuccess(response.data.jobExperience)
        )
        .catch((err: AxiosError) =>
          Observable.of(
            actions.profileAjaxFailure(
              !err.response ? err.message : err.response.data.message
            )
          )
        );
    });

export default [
  createOrUpdateApplicantEpic,
  createEducationExperience,
  createJobExperience
];
