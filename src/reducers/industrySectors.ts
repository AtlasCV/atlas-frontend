import { Reducer } from "redux";
import * as actions from "../actions/industrySectors";
import * as actionTypes from "../constants/actionTypes";
import { ActionUnion } from "../actions/helpers";
import { IndustrySector } from "../types";

type Action = ActionUnion<typeof actions>;

export type IndustrySectorState = {
  list: Array<IndustrySector>;
  fetchingIndustrySectors: boolean;
  savingIndustrySectors: boolean;
  savedIndustrySectors: boolean;
  error?: Error;
};

export const INITIAL_INDUSTRY_SECTOR_STATE: IndustrySectorState = {
  list: [],
  fetchingIndustrySectors: false,
  savingIndustrySectors: false,
  savedIndustrySectors: false
};

const loadIndustrySectorsRequest = (state: IndustrySectorState) => ({
  ...state,
  fetchingIndustrySectors: true
});

const loadIndustrySectorsSuccess = (
  state: IndustrySectorState,
  {
    payload: { industrySectors }
  }: ReturnType<typeof actions.loadIndustrySectorsSuccess>
) => ({
  ...state,
  list: industrySectors,
  fetchingIndustrySectors: false
});

const industrySectorAjaxFailure = (
  state: IndustrySectorState,
  { payload: { error } }: ReturnType<typeof actions.industrySectorAjaxFailure>
) => ({
  ...state,
  error,
  fetchingIndustrySectors: false
});

const addIndustrySectorsToApplicantRequest = (
  state: IndustrySectorState,
  action: ReturnType<typeof actions.addIndustrySectorsToApplicantRequest>
) => ({
  ...state,
  savingIndustrySectors: true,
  savedIndustrySectors: false
});

const addIndustrySectorsToApplicantSuccess = (
  state: IndustrySectorState,
  action: ReturnType<typeof actions.addIndustrySectorsToApplicantSuccess>
) => ({
  ...state,
  savingIndustrySectors: false,
  savedIndustrySectors: true
});

const removeIndustrySectorFromApplicantRequest = (
  state: IndustrySectorState,
  action: ReturnType<typeof actions.removeIndustrySectorFromApplicantRequest>
) => ({
  ...state,
  savingIndustrySectors: true,
  savedIndustrySectors: false
});

const removeIndustrySectorFromApplicantSuccess = (
  state: IndustrySectorState,
  action: ReturnType<typeof actions.removeIndustrySectorFromApplicantSuccess>
) => ({
  ...state,
  savingIndustrySectors: false,
  savedIndustrySectors: true
});

const industrySectorReducer: Reducer<IndustrySectorState> = (
  state = INITIAL_INDUSTRY_SECTOR_STATE,
  action: Action
) => {
  switch (action.type) {
    case actionTypes.LOAD_INDUSTRY_SECTORS_REQUEST:
      return loadIndustrySectorsRequest(state);
    case actionTypes.LOAD_INDUSTRY_SECTORS_SUCCESS:
      return loadIndustrySectorsSuccess(state, action);
    case actionTypes.INDUSTRY_SECTOR_AJAX_FAILURE:
      return industrySectorAjaxFailure(state, action);
    case actionTypes.ADD_INDUSTRY_SECTORS_TO_APPLICANT_REQUEST:
      return addIndustrySectorsToApplicantRequest(state, action);
    case actionTypes.ADD_INDUSTRY_SECTORS_TO_APPLICANT_SUCCESS:
      return addIndustrySectorsToApplicantSuccess(state, action);
    case actionTypes.REMOVE_INDUSTRY_SECTOR_FROM_APPLICANT_REQUEST:
      return removeIndustrySectorFromApplicantRequest(state, action);
    case actionTypes.REMOVE_INDUSTRY_SECTOR_FROM_APPLICANT_SUCCESS:
      return removeIndustrySectorFromApplicantSuccess(state, action);
    default:
      return state;
  }
};

export default industrySectorReducer;
