import * as actionTypes from "../constants/actionTypes";
import * as types from "../types";
import { createAction } from "./helpers";

export const createApplicantRequest = (
  applicantFormProps: types.CreateApplicantFormProps,
  nextPage?: string
) =>
  createAction(
    actionTypes.CREATE_APPLICANT_REQUEST,
    { applicantFormProps, nextPage },
    false
  );

export const updateApplicantRequest = (
  applicantId: number,
  applicantFormProps: types.UpdateApplicantFormProps,
  nextPage?: string
) =>
  createAction(
    actionTypes.UPDATE_APPLICANT_REQUEST,
    { applicantFormProps, applicantId, nextPage },
    false
  );

export const loadApplicantSuccess = ({
  user,
  token
}: {
  user: types.User;
  token: string;
}) => createAction(actionTypes.LOAD_APPLICANT_SUCCESS, { user, token }, false);

export const createEducationExperienceRequest = (
  applicantId: number,
  educationExperience: types.EducationExperience
) =>
  createAction(actionTypes.CREATE_EDUCATION_EXPERIENCE_REQUEST, {
    educationExperience,
    applicantId
  });

export const createEducationExperienceSuccess = (
  educationExperience: types.EducationExperience
) =>
  createAction(actionTypes.CREATE_EDUCATION_EXPERIENCE_SUCCESS, {
    educationExperience
  });

export const deleteEducationExperienceRequest = (
  educationId: number,
  applicantId: number,
) =>
  createAction(actionTypes.DELETE_EDUCATION_EXPERIENCE_REQUEST, {
    educationId,
    applicantId
  });

export const deleteEducationExperienceSuccess = (
  educationId: number
) => createAction(actionTypes.DELETE_EDUCATION_EXPERIENCE_SUCCESS, { educationId });

export const createJobExperienceRequest = (
  applicantId: number,
  jobExperience: types.JobExperience
) =>
  createAction(actionTypes.CREATE_JOB_EXPERIENCE_REQUEST, {
    jobExperience,
    applicantId
  });

export const createJobExperienceSuccess = (
  jobExperience: types.JobExperience
) => createAction(actionTypes.CREATE_JOB_EXPERIENCE_SUCCESS, { jobExperience });

export const deleteJobExperienceRequest = (
  jobExperienceId: number,
  applicantId: number,
) =>
  createAction(actionTypes.DELETE_JOB_EXPERIENCE_REQUEST, {
    jobExperienceId,
    applicantId
  });

export const deleteJobExperienceSuccess = (
  jobExperienceId: number
) => createAction(actionTypes.DELETE_JOB_EXPERIENCE_SUCCESS, { jobExperienceId });

export const addProfilePictureRequest = (image: string, applicantId: number) => 
  createAction(actionTypes.ADD_PROFILE_PICTURE_REQUEST, { image, applicantId });

export const addProfilePictureSuccess = (imageLink: string) => 
  createAction(actionTypes.ADD_PROFILE_PICTURE_SUCCESS, { imageLink });

export const profileAjaxFailure = (reason: string) =>
  createAction(
    actionTypes.PROFILE_AJAX_FAILURE,
    { error: new Error(reason) },
    true
  );
  