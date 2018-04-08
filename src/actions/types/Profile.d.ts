import { Action } from "./";
import * as actionTypes from "../../constants/actionTypes";
import * as Types from "../../types";

export type CreateApplicantRequest = Action<
  typeof actionTypes.CREATE_APPLICANT_REQUEST,
  { applicantFormProps: Types.CreateApplicantFormProps }
>;

export type UpdateApplicantRequest = Action<
  typeof actionTypes.UPDATE_APPLICANT_REQUEST,
  { applicantFormProps: Types.UpdateApplicantFormProps; applicantId: number }
>;

export type LoadApplicantSuccess = Action<
  typeof actionTypes.LOAD_APPLICANT_SUCCESS,
  { applicant: Types.Applicant }
>;

export type ProfileAjaxFailure = Action<
  typeof actionTypes.PROFILE_AJAX_FAILURE,
  { error: Error }
>;

export type ProfileActions =
  | CreateApplicantRequest
  | UpdateApplicantRequest
  | LoadApplicantSuccess
  | ProfileAjaxFailure;
