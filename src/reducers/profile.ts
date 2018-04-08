import { Reducer } from "redux";
import { Applicant } from "../types";
import * as Actions from "../actions/types";
import * as actionTypes from "../constants/actionTypes";

export type ProfileState = {
  info: Applicant;
  fetchingApplicant: boolean;
  error?: Error;
};

const PROFILE_INITIAL_STATE: ProfileState = {
  info: {
    id: 0,
    user: {
      id: 0,
      firstName: "",
      lastName: "",
      email: "",
      activated: false,
      userType: ""
    },
    personalityEvaluation: {
      uuid: "",
      answers: [],
      currentQuestionIndex: 0,
      scoreSignature: "",
      completed: false
    }
  },
  fetchingApplicant: false
};

const createApplicantRequest = (
  state: ProfileState,
  action: Actions.CreateApplicantRequest
) => ({
  ...state,
  fetchingApplicant: true
});

const updateApplicantRequest = (
  state: ProfileState,
  action: Actions.UpdateApplicantRequest
) => ({
  ...state,
  fetchingApplicant: true
});

const loadApplicantSuccess = (
  state: ProfileState,
  { payload: { applicant } }: Actions.LoadApplicantSuccess
) => ({
  ...state,
  info: applicant,
  fetchingApplicant: false
});

const profileAjaxFailure = (
  state: ProfileState,
  { payload: { error } }: Actions.ProfileAjaxFailure
) => ({
  ...state,
  error,
  fetchingApplicant: false
});

const profileReducer: Reducer<ProfileState> = (
  state = PROFILE_INITIAL_STATE,
  action: Actions.ProfileActions
) => {
  switch (action.type) {
    case actionTypes.CREATE_APPLICANT_REQUEST:
      return createApplicantRequest(state, action);
    case actionTypes.UPDATE_APPLICANT_REQUEST:
      return updateApplicantRequest(state, action);
    case actionTypes.LOAD_APPLICANT_SUCCESS:
      return loadApplicantSuccess(state, action);
    case actionTypes.PROFILE_AJAX_FAILURE:
      return profileAjaxFailure(state, action);
    default:
      return state;
  }
};

export default profileReducer;
