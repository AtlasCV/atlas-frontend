import * as actionTypes from "../constants/actionTypes";
import { createAction } from "./helpers";
import { User } from "../types";

export const getMeRequest = () => createAction(actionTypes.GET_ME_REQUEST);

export const getMeSuccess = (user: User) =>
  createAction(actionTypes.GET_ME_SUCCESS, { user });

export const authAjaxFailure = (reason: string) =>
  createAction(actionTypes.AUTH_AJAX_FAILURE, { reason }, true);
