import { Reducer } from "redux";
import { User } from "../types";
import * as profileActions from "../actions/profile";
import * as authActions from "../actions/auth";
import * as actionTypes from "../constants/actionTypes";
import { ActionUnion } from "../actions/helpers";

type Action = ActionUnion<typeof profileActions | typeof authActions>;

export type ProfileState = {
  info: User;
  fetchingApplicant: boolean;
  error?: Error;
};

const PROFILE_INITIAL_STATE: ProfileState = {
  info: {
    id: 0,
    firstName: "",
    lastName: "",
    email: "",
    activated: false,
    userType: "",
    applicant: {
      id: 0,
      personalityEvaluation: {
        uuid: "",
        answers: [],
        currentQuestionIndex: 0,
        scoreSignature: "",
        completed: false
      }
    }
  },

  fetchingApplicant: false
};

const createApplicantRequest = (
  state: ProfileState,
  action: ReturnType<typeof profileActions.createApplicantRequest>
) => ({
  ...state,
  fetchingApplicant: true
});

const updateApplicantRequest = (
  state: ProfileState,
  action: ReturnType<typeof profileActions.updateApplicantRequest>
) => ({
  ...state,
  fetchingApplicant: true
});

const loadApplicantSuccess = (
  state: ProfileState,
  { payload: { user } }: ReturnType<typeof profileActions.loadApplicantSuccess>
) => ({
  ...state,
  info: user,
  fetchingApplicant: false
});

const profileAjaxFailure = (
  state: ProfileState,
  { payload: { error } }: ReturnType<typeof profileActions.profileAjaxFailure>
) => ({
  ...state,
  error,
  fetchingApplicant: false
});

const getMeSuccess = (
  state: ProfileState,
  { payload: { user } }: ReturnType<typeof authActions.getMeSuccess>
) => ({
  ...state,
  info: user
});

const profileReducer: Reducer<ProfileState> = (
  state = PROFILE_INITIAL_STATE,
  action: Action
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
    case actionTypes.GET_ME_SUCCESS:
      return getMeSuccess(state, action);
    default:
      return state;
  }
};

export default profileReducer;
