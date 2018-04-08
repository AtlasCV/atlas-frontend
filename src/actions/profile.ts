import * as Actions from "./types";
import * as actionTypes from "../constants/actionTypes";
import * as types from "../types";

export const createApplicantRequest = (
  applicantFormProps: types.CreateApplicantFormProps
): Actions.CreateApplicantRequest => ({
  type: actionTypes.CREATE_APPLICANT_REQUEST,
  payload: { applicantFormProps },
  error: false
});

export const updateApplicantRequest = (
  applicantId: number,
  applicantFormProps: types.UpdateApplicantFormProps
): Actions.UpdateApplicantRequest => ({
  type: actionTypes.UPDATE_APPLICANT_REQUEST,
  payload: { applicantFormProps, applicantId },
  error: false
});

export const loadApplicantSuccess = (
  applicant: types.Applicant
): Actions.LoadApplicantSuccess => ({
  type: actionTypes.LOAD_APPLICANT_SUCCESS,
  payload: { applicant },
  error: false
});

export const profileAjaxFailure = (
  reason: string
): Actions.ProfileAjaxFailure => ({
  type: actionTypes.PROFILE_AJAX_FAILURE,
  payload: { error: new Error(reason) },
  error: true
});
