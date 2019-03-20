import { Observable, Observer } from "rxjs/Rx";
import { AxiosResponse, AxiosError } from "axios";
import { AnyAction } from "redux";
import { Epic } from "redux-observable";
import { push } from "react-router-redux";
import { AppState } from "../reducers";
import { Dependencies } from "../init";
import endpoint from "../constants/endpoint";
import * as actions from "../actions/profile";
import * as actionTypes from "../constants/actionTypes";
import S3 from '../config/aws';
import { v1 } from 'uuid';

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
        headers: { "Content-Type": "application/json" },
        data: applicantFormProps
      })
        .concatMap(({ data: { result } }: AxiosResponse) => {
          if (nextPage) {
            if (result.token) {
              localStorage.setItem("accessToken", result.token);
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
      return ajax({
        method: "POST",
        url: `${endpoint.applicants}/${applicantId}/education`,
        headers: { "content-type": "application/json" },
        data: educationExperience
      })
        .map(response =>
          actions.createEducationExperienceSuccess(response.data.result)
        )
        .catch((err: AxiosError) =>
          Observable.of(
            actions.profileAjaxFailure(
              !err.response ? err.message : err.response.data.message
            )
          )
        );
    });

type DeleteEducationExperience = Epic<AnyAction, AppState, Dependencies>;
const deleteEducationExperience: DeleteEducationExperience = (action$, store, { ajax }) =>
  action$
    .ofType(actionTypes.DELETE_EDUCATION_EXPERIENCE_REQUEST)
    .mergeMap(({ payload: { educationId, applicantId } }) => {
      return ajax({
        method: "DELETE",
        url: `${endpoint.applicants}/${applicantId}/education`,
        headers: { "content-type": "application/json" },
        data: {educationId}
      })
        .map(response =>
          actions.deleteEducationExperienceSuccess(educationId)
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
          actions.createJobExperienceSuccess(response.data.result)
        )
        .catch((err: AxiosError) =>
          Observable.of(
            actions.profileAjaxFailure(
              !err.response ? err.message : err.response.data.message
            )
          )
        );
    });

type DeleteJobExperience = Epic<AnyAction, AppState, Dependencies>;
const deleteJobExperience: DeleteJobExperience = (action$, store, { ajax }) =>
  action$
    .ofType(actionTypes.DELETE_JOB_EXPERIENCE_REQUEST)
    .mergeMap(({ payload: { jobExperienceId, applicantId } }) => {
      return ajax({
        method: "DELETE",
        url: `${endpoint.applicants}/${applicantId}/jobExperience`,
        headers: { "content-type": "application/json" },
        data: {jobExperienceId}
      })
        .map(response =>
          actions.deleteJobExperienceSuccess(jobExperienceId)
        )
        .catch((err: AxiosError) =>
          Observable.of(
            actions.profileAjaxFailure(
              !err.response ? err.message : err.response.data.message
            )
          )
        );
    });

type AddProfilePicture = Epic<AnyAction, AppState, Dependencies>;
const addProfilePicture: AddProfilePicture = (action$, store, { ajax }) =>
  action$
    .ofType(actionTypes.ADD_PROFILE_PICTURE_REQUEST)
    .mergeMap(({ payload: { image: file, applicantId } }) => {
      const fileName = v1() + '-' + file.name;  
      const configObject = {
        Key: fileName,
        Body: file,
        ACL: 'public-read',
        Bucket: 'atlas-profile-pictures',
        ContentType: 'image/png',
      };

      return Observable.create((observer: Observer<any>) => {
        S3.upload(configObject, (err: Error, data: any) => {
          if (err) {
            observer.next(actions.profileAjaxFailure(err.message));
          } else {
            observer.next(actions.updateApplicantRequest(applicantId, {
              profileImgUrl: (data as any).Location,
            }));
          }
        });
      });
    });

export default [
  createOrUpdateApplicantEpic,
  createEducationExperience,
  deleteEducationExperience,
  createJobExperience,
  deleteJobExperience,
  addProfilePicture
];
