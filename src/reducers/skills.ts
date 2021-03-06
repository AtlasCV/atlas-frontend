import { Reducer } from "redux";
import * as actions from "../actions/skills";
import * as actionTypes from "../constants/actionTypes";
import { ActionUnion } from "../actions/helpers";
import { Skill } from "../types";

type Action = ActionUnion<typeof actions>;

export type SkillState = {
  list: Array<Skill>;
  fetchingSkills: boolean;
  savingSkills: boolean;
  savedSkills: boolean;
  error?: Error;
};

export const INITIAL_SKILL_STATE: SkillState = {
  list: [],
  fetchingSkills: false,
  savingSkills: false,
  savedSkills: false
};

const loadSkillsRequest = (state: SkillState) => ({
  ...state,
  fetchingSkills: true
});

const loadSkillsSuccess = (
  state: SkillState,
  { payload: { skills } }: ReturnType<typeof actions.loadSkillsSuccess>
) => ({
  ...state,
  list: skills,
  fetchingSkills: false
});

const skillAjaxFailure = (
  state: SkillState,
  { payload: { error } }: ReturnType<typeof actions.skillAjaxFailure>
) => ({
  ...state,
  error,
  fetchingSkills: false
});

const addSkillsToApplicantRequest = (
  state: SkillState,
  action: ReturnType<typeof actions.addSkillsToApplicantRequest>
) => ({
  ...state,
  savingSkills: true,
  savedSkills: false
});

const addSkillsToApplicantSuccess = (
  state: SkillState,
  action: ReturnType<typeof actions.addSkillsToApplicantSuccess>
) => ({
  ...state,
  savingSkills: false,
  savedSkills: true
});

const removeSkillFromApplicantRequest = (
  state: SkillState,
  action: ReturnType<typeof actions.removeSkillFromApplicantRequest>
) => ({
  ...state,
  savingSkills: true,
  savedSkills: false
});

const removeSkillFromApplicantSuccess = (
  state: SkillState,
  action: ReturnType<typeof actions.removeSkillFromApplicantSuccess>
) => ({
  ...state,
  savingSkills: false,
  savedSkills: true
});

const skillReducer: Reducer<SkillState> = (
  state = INITIAL_SKILL_STATE,
  action: Action
) => {
  switch (action.type) {
    case actionTypes.LOAD_SKILLS_REQUEST:
      return loadSkillsRequest(state);
    case actionTypes.LOAD_SKILLS_SUCCESS:
      return loadSkillsSuccess(state, action);
    case actionTypes.SKILL_AJAX_FAILURE:
      return skillAjaxFailure(state, action);
    case actionTypes.ADD_SKILLS_TO_APPLICANT_REQUEST:
      return addSkillsToApplicantRequest(state, action);
    case actionTypes.ADD_SKILLS_TO_APPLICANT_SUCCESS:
      return addSkillsToApplicantSuccess(state, action);
    case actionTypes.REMOVE_SKILL_FROM_APPLICANT_REQUEST:
      return removeSkillFromApplicantRequest(state, action);
    case actionTypes.REMOVE_SKILL_FROM_APPLICANT_SUCCESS:
      return removeSkillFromApplicantSuccess(state, action);
    default:
      return state;
  }
};

export default skillReducer;
