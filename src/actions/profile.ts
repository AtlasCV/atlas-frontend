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

export const loadApplicantSuccess = (user: types.User) =>
  createAction(actionTypes.LOAD_APPLICANT_SUCCESS, { user }, false);

export const profileAjaxFailure = (reason: string) =>
  createAction(
    actionTypes.PROFILE_AJAX_FAILURE,
    { error: new Error(reason) },
    true
  );
