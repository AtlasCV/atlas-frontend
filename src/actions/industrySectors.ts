import * as actionTypes from "../constants/actionTypes";
import { createAction } from "./helpers";
import { IndustrySector } from "../types";

export const loadIndustrySectorsRequest = (industryId: number) =>
  createAction(actionTypes.LOAD_INDUSTRY_SECTORS_REQUEST, { industryId });

export const loadIndustrySectorsSuccess = (industrySectors: IndustrySector[]) =>
  createAction(actionTypes.LOAD_INDUSTRY_SECTORS_SUCCESS, { industrySectors });

export const addIndustrySectorsToApplicantRequest = (
  applicantId: number,
  industrySector: { id: number; yearsExperience: string }
) =>
  createAction(actionTypes.ADD_INDUSTRY_SECTORS_TO_APPLICANT_REQUEST, {
    applicantId,
    industrySector
  });

export const addIndustrySectorsToApplicantSuccess = (
  industrySectors: IndustrySector[]
) =>
  createAction(actionTypes.ADD_INDUSTRY_SECTORS_TO_APPLICANT_SUCCESS, {
    industrySectors
  });

export const removeIndustrySectorFromApplicantRequest = (
  applicantId: number,
  industrySectorId: number
) =>
  createAction(actionTypes.REMOVE_INDUSTRY_SECTOR_FROM_APPLICANT_REQUEST, {
    applicantId,
    industrySectorId
  });

export const removeIndustrySectorFromApplicantSuccess = (
  industrySectorId: number
) =>
  createAction(actionTypes.REMOVE_INDUSTRY_SECTOR_FROM_APPLICANT_SUCCESS, {
    industrySectorId
  });

export const industrySectorAjaxFailure = (reason: string) =>
  createAction(
    actionTypes.INDUSTRY_SECTOR_AJAX_FAILURE,
    { error: new Error(reason) },
    true
  );
