import { Reducer } from "redux";
import * as actions from "../actions/applicants";
import * as actionTypes from "../constants/actionTypes";
import { ActionUnion } from "../actions/helpers";
import { Applicant } from "../types";

type Action = ActionUnion<typeof actions>;

export type ApplicantState = {
  list: Array<Applicant>;
  detail: Applicant;
  fetchingApplicants: boolean;
  error?: Error;
};

export const INITIAL_APPLICANT_STATE: ApplicantState = {
  list: [],
  detail: { 
    id: 0,
    Industries: [],
    EducationExperiences: [],
    JobExperiences: [],
    ApplicantSkills: [],
    ApplicantIndustrySectors: [], 
    Certifications: [] 
  },
  fetchingApplicants: false,
};

const loadApplicantsRequest = (state: ApplicantState) => ({
  ...state,
  fetchingApplicants: true
});

const loadApplicantsSuccess = (
  state: ApplicantState,
  { payload: { applicants } }: ReturnType<typeof actions.loadApplicantsSuccess>
) => ({
  ...state,
  list: applicants,
  fetchingApplicants: false
});

const loadApplicantDetailRequest = (state: ApplicantState) => ({
  ...state,
  fetchingApplicants: true
});

const loadApplicantDetailSuccess = (
  state: ApplicantState,
  { payload: { applicant } }: ReturnType<typeof actions.loadApplicantDetailSuccess>
) => ({
  ...state,
  detail: applicant,
  fetchingApplicants: false
});

const applicantAjaxFailure = (
  state: ApplicantState,
  { payload: { error } }: ReturnType<typeof actions.applicantAjaxFailure>
) => ({
  ...state,
  error,
  fetchingApplicants: false
});

const applicantReducer: Reducer<ApplicantState> = (
  state = INITIAL_APPLICANT_STATE,
  action: Action
) => {
  switch (action.type) {
    case actionTypes.LOAD_APPLICANTS_REQUEST:
      return loadApplicantsRequest(state);
    case actionTypes.LOAD_APPLICANTS_SUCCESS:
      return loadApplicantsSuccess(state, action);
    case actionTypes.LOAD_APPLICANT_DETAIL_REQUEST:
      return loadApplicantDetailRequest(state);
    case actionTypes.LOAD_APPLICANT_DETAIL_SUCCESS:
      return loadApplicantDetailSuccess(state, action);
    case actionTypes.APPLICANT_AJAX_FAILURE:
      return applicantAjaxFailure(state, action);
    default:
      return state;
  }
};

export default applicantReducer;
