import { Reducer } from "redux";
import * as authActions from "../actions/auth";
import * as profileActions from "../actions/profile";
import * as actionTypes from "../constants/actionTypes";
import { ActionUnion } from "../actions/helpers";

type Action = ActionUnion<typeof authActions & typeof profileActions>;

export type AuthState = {
  token: string;
  id: number;
  fetchingAuth: boolean;
  authenticated: boolean;
};

export const INITIAL_AUTH_STATE: AuthState = {
  token: window.localStorage.getItem("accessToken") || "",
  id: 0,
  fetchingAuth: false,
  authenticated: false
};

const getMeRequest = (state: AuthState) => ({
  ...state,
  fetchingAuth: true
});

const getMeSuccess = (
  state: AuthState,
  { payload: { user } }: ReturnType<typeof authActions.getMeSuccess>
) => ({
  ...state,
  id: user.id,
  fetchingAuth: false,
  authenticated: true
});

const loginRequest = (state: AuthState) => ({
  ...state,
  fetchingAuth: true
});

const loginSuccess = (
  state: AuthState,
  {
    payload: { token }
  }:
    | ReturnType<typeof authActions.loginSuccess>
    | ReturnType<typeof profileActions.loadApplicantSuccess>
) => ({
  ...state,
  fetchingAuth: false,
  authenticated: true,
  token: token || state.token
});

const authAjaxFailure = (
  state: AuthState,
  { error }: ReturnType<typeof authActions.authAjaxFailure>
) => ({
  ...state,
  error,
  authenticated: false,
  fetchingAuth: false
});

const authReducer: Reducer<AuthState> = (
  state = INITIAL_AUTH_STATE,
  action: Action
) => {
  switch (action.type) {
    case actionTypes.GET_ME_REQUEST:
      return getMeRequest(state);
    case actionTypes.GET_ME_SUCCESS:
      return getMeSuccess(state, action);
    case actionTypes.LOGIN_REQUEST:
      return loginRequest(state);
    case actionTypes.LOGIN_SUCCESS:
      return loginSuccess(state, action);
    case actionTypes.AUTH_AJAX_FAILURE:
      return authAjaxFailure(state, action);
    case actionTypes.LOAD_APPLICANT_SUCCESS:
      return loginSuccess(state, action);

    default:
      return state;
  }
};

export default authReducer;
