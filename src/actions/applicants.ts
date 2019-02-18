import * as actionTypes from "../constants/actionTypes";
import { createAction } from "./helpers";
import { Applicant } from "../types";

export const loadApplicantsRequest = () =>
  createAction(actionTypes.LOAD_APPLICANTS_REQUEST);

export const loadApplicantsSuccess = (applicants: Applicant[]) =>
  createAction(actionTypes.LOAD_APPLICANTS_SUCCESS, { applicants });

export const loadApplicantDetailRequest = (applicantId: number) =>
  createAction(actionTypes.LOAD_APPLICANT_DETAIL_REQUEST, { applicantId });

export const loadApplicantDetailSuccess = (applicant: Applicant) =>
  createAction(actionTypes.LOAD_APPLICANT_DETAIL_SUCCESS, { applicant });

export const applicantAjaxFailure = (reason: string) =>
  createAction(
    actionTypes.APPLICANT_AJAX_FAILURE,
    { error: new Error(reason) },
    true
  );
