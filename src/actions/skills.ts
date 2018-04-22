import * as actionTypes from "../constants/actionTypes";
import { createAction } from "./helpers";

export const loadSkillsRequest = () =>
  createAction(actionTypes.LOAD_INDUSTRIES_REQUEST);

export const loadSkillsSuccess = (
  industries: Array<{ id: number; name: string }>
) => createAction(actionTypes.LOAD_INDUSTRIES_SUCCESS, { industries });

export const addSkillsToApplicantRequest = (
  applicantId: number,
  skillIds: number[]
) =>
  createAction(actionTypes.ADD_INDUSTRIES_TO_APPLICANT_REQUEST, {
    applicantId,
    skillIds
  });

export const addSkillsToApplicantSuccess = (
  industries: Array<{ id: number; name: string }>
) =>
  createAction(actionTypes.ADD_INDUSTRIES_TO_APPLICANT_SUCCESS, {
    industries
  });

export const skillAjaxFailure = (reason: string) =>
  createAction(
    actionTypes.INDUSTRY_AJAX_FAILURE,
    { error: new Error(reason) },
    true
  );
