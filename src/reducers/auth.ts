import { Reducer } from "redux";
import * as actions from "../actions/auth";
import * as actionTypes from "../constants/actionTypes";
import { ActionUnion } from "../actions/helpers";

type Action = ActionUnion<typeof actions>;

export type AuthState = {
  token: string;
  id: number;
  fetchingAuth: boolean;
  authenticated: boolean;
};

const INITIAL_AUTH_STATE: AuthState = {
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
  { payload: { user } }: ReturnType<typeof actions.getMeSuccess>
) => ({
  ...state,
  id: user.id,
  fetchingAuth: false,
  authenticated: true
});

const authAjaxFailure = (
  state: AuthState,
  { error }: ReturnType<typeof actions.authAjaxFailure>
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
    case actionTypes.AUTH_AJAX_FAILURE:
      return authAjaxFailure(state, action);
    default:
      return state;
  }
};

export default authReducer;
