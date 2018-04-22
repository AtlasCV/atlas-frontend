import { Reducer } from "redux";
import * as actions from "../actions/skills";
import * as actionTypes from "../constants/actionTypes";
import { ActionUnion } from "../actions/helpers";

type Action = ActionUnion<typeof actions>;

export type SkillState = {
  list: Array<{ id: number; name: string }>;
  fetchingSkills: boolean;
  error?: Error;
};

const INITIAL_SKILL_STATE: SkillState = {
  list: [{ id: 0, name: "" }],
  fetchingSkills: false
};

const loadSkillsRequest = (state: SkillState) => ({
  ...state,
  fetchingSkills: true
});

const loadSkillsSuccess = (
  state: SkillState,
  { payload: { industries } }: ReturnType<typeof actions.loadSkillsSuccess>
) => ({
  ...state,
  list: industries,
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
  fetchingSkills: true
});

const addSkillsToApplicantSuccess = (
  state: SkillState,
  action: ReturnType<typeof actions.addSkillsToApplicantSuccess>
) => ({
  ...state,
  fetchingSkills: false
});

const skillReducer: Reducer<SkillState> = (
  state = INITIAL_SKILL_STATE,
  action: Action
) => {
  switch (action.type) {
    case actionTypes.LOAD_INDUSTRIES_REQUEST:
      return loadSkillsRequest(state);
    case actionTypes.LOAD_INDUSTRIES_SUCCESS:
      return loadSkillsSuccess(state, action);
    case actionTypes.INDUSTRY_AJAX_FAILURE:
      return skillAjaxFailure(state, action);
    case actionTypes.ADD_INDUSTRIES_TO_APPLICANT_REQUEST:
      return addSkillsToApplicantRequest(state, action);
    case actionTypes.ADD_INDUSTRIES_TO_APPLICANT_SUCCESS:
      return addSkillsToApplicantSuccess(state, action);
    default:
      return state;
  }
};

export default skillReducer;
