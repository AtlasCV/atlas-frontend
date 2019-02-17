import * as actionTypes from "../constants/actionTypes";
import { createAction } from "./helpers";
import { Applicant } from "../types";

export const loadApplicantsRequest = () =>
  createAction(actionTypes.LOAD_APPLICANTS_REQUEST);

export const loadApplicantsSuccess = (applicants: Applicant[]) =>
  createAction(actionTypes.LOAD_APPLICANTS_SUCCESS, { applicants });

export const applicantAjaxFailure = (reason: string) =>
  createAction(
    actionTypes.APPLICANT_AJAX_FAILURE,
    { error: new Error(reason) },
    true
  );
