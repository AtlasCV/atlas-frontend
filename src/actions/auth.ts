import * as actionTypes from "../constants/actionTypes";
import { createAction } from "./helpers";
import { User } from "../types";

export const getMeRequest = () => createAction(actionTypes.GET_ME_REQUEST);

export const getMeSuccess = (user: User) =>
  createAction(actionTypes.GET_ME_SUCCESS, { user });

export const loginRequest = (email: string, password: string) =>
  createAction(actionTypes.LOGIN_REQUEST, { email, password });

export const loginSuccess = ({ token, user }: { token: string; user: User }) =>
  createAction(actionTypes.LOGIN_SUCCESS, { token, user });

export const logoutRequest = () =>
  createAction(actionTypes.LOGOUT_REQUEST, {});

export const logoutSuccess = () =>
  createAction(actionTypes.LOGOUT_SUCCESS, {});

export const authAjaxFailure = (reason: string) =>
  createAction(actionTypes.AUTH_AJAX_FAILURE, { reason }, true);

export const clearError = () => createAction(actionTypes.CLEAR_ERROR, {});