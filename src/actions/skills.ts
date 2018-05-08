import * as actionTypes from "../constants/actionTypes";
import { createAction } from "./helpers";
import { Skill } from "../types";

export const loadSkillsRequest = () =>
  createAction(actionTypes.LOAD_SKILLS_REQUEST);

export const loadSkillsSuccess = (skills: Skill[]) =>
  createAction(actionTypes.LOAD_SKILLS_SUCCESS, { skills });

export const addSkillsToApplicantRequest = (
  applicantId: number,
  skill: { id: number; yearsExperience: string }
) =>
  createAction(actionTypes.ADD_SKILLS_TO_APPLICANT_REQUEST, {
    applicantId,
    skill
  });

export const addSkillsToApplicantSuccess = (skills: Skill[]) =>
  createAction(actionTypes.ADD_SKILLS_TO_APPLICANT_SUCCESS, {
    skills
  });

export const removeSkillFromApplicantRequest = (
  applicantId: number,
  skillId: number
) =>
  createAction(actionTypes.REMOVE_SKILL_FROM_APPLICANT_REQUEST, {
    applicantId,
    skillId
  });

export const removeSkillFromApplicantSuccess = (skillId: number) =>
  createAction(actionTypes.REMOVE_SKILL_FROM_APPLICANT_SUCCESS, {
    skillId
  });

export const skillAjaxFailure = (reason: string) =>
  createAction(
    actionTypes.SKILL_AJAX_FAILURE,
    { error: new Error(reason) },
    true
  );
