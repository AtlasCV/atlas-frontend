import * as actionTypes from "../constants/actionTypes";
import { createAction } from "./helpers";

export const loadSkillsRequest = () =>
  createAction(actionTypes.LOAD_SKILLS_REQUEST);

export const loadSkillsSuccess = (
  skills: Array<{ id: number; name: string }>
) => createAction(actionTypes.LOAD_SKILLS_SUCCESS, { skills });

export const addSkillsToApplicantRequest = (
  applicantId: number,
  skillIds: number[]
) =>
  createAction(actionTypes.ADD_SKILLS_TO_APPLICANT_REQUEST, {
    applicantId,
    skillIds
  });

export const addSkillsToApplicantSuccess = (
  skills: Array<{ id: number; name: string }>
) =>
  createAction(actionTypes.ADD_SKILLS_TO_APPLICANT_SUCCESS, {
    skills
  });

export const skillAjaxFailure = (reason: string) =>
  createAction(
    actionTypes.SKILL_AJAX_FAILURE,
    { error: new Error(reason) },
    true
  );
