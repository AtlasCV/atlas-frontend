import { Reducer } from "redux";
import { Industry } from "../types";
import * as actions from "../actions/industries";
import * as actionTypes from "../constants/actionTypes";
import { ActionUnion } from "../actions/helpers";

type Action = ActionUnion<typeof actions>;

export type IndustryState = {
  list: Industry[];
  fetchingIndustries: boolean;
  error?: Error;
};

const INITIAL_INDUSTRY_STATE: IndustryState = {
  list: [{ id: 0, name: "" }],
  fetchingIndustries: false
};

const loadIndustriesRequest = (state: IndustryState) => ({
  ...state,
  fetchingIndustries: true
});

const loadIndustriesSuccess = (
  state: IndustryState,
  { payload: { industries } }: ReturnType<typeof actions.loadIndustriesSuccess>
) => ({
  ...state,
  list: industries,
  fetchingIndustries: false
});

const industryAjaxFailure = (
  state: IndustryState,
  { payload: { error } }: ReturnType<typeof actions.industryAjaxFailure>
) => ({
  ...state,
  error,
  fetchingIndustries: false
});

const addIndustriesToApplicantRequest = (
  state: IndustryState,
  action: ReturnType<typeof actions.addIndustriesToApplicantRequest>
) => ({
  ...state,
  fetchingIndustries: true
});

const addIndustriesToApplicantSuccess = (
  state: IndustryState,
  action: ReturnType<typeof actions.addIndustriesToApplicantSuccess>
) => ({
  ...state,
  fetchingIndustries: false
});

const industryReducer: Reducer<IndustryState> = (
  state = INITIAL_INDUSTRY_STATE,
  action: Action
) => {
  switch (action.type) {
    case actionTypes.LOAD_INDUSTRIES_REQUEST:
      return loadIndustriesRequest(state);
    case actionTypes.LOAD_INDUSTRIES_SUCCESS:
      return loadIndustriesSuccess(state, action);
    case actionTypes.INDUSTRY_AJAX_FAILURE:
      return industryAjaxFailure(state, action);
    case actionTypes.ADD_INDUSTRIES_TO_APPLICANT_REQUEST:
      return addIndustriesToApplicantRequest(state, action);
    case actionTypes.ADD_INDUSTRIES_TO_APPLICANT_SUCCESS:
      return addIndustriesToApplicantSuccess(state, action);
    default:
      return state;
  }
};

export default industryReducer;
