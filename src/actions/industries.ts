import * as actionTypes from "../constants/actionTypes";
import { Industry } from "../types";
import { createAction } from "./helpers";

export const loadIndustriesRequest = () =>
  createAction(actionTypes.LOAD_INDUSTRIES_REQUEST);

export const loadIndustriesSuccess = (industries: Industry[]) =>
  createAction(actionTypes.LOAD_INDUSTRIES_SUCCESS, { industries });

export const industryAjaxFailure = (reason: string) =>
  createAction(
    actionTypes.INDUSTRY_AJAX_FAILURE,
    { error: new Error(reason) },
    true
  );
