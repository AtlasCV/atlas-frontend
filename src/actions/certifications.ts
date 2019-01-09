import * as actionTypes from "../constants/actionTypes";
import { createAction } from "./helpers";
import { Certification } from "../types";

export const loadCertificationsRequest = () =>
  createAction(actionTypes.LOAD_CERTIFICATIONS_REQUEST);

export const loadCertificationsSuccess = (certifications: Certification[]) =>
  createAction(actionTypes.LOAD_CERTIFICATIONS_SUCCESS, { certifications });

export const addCertificationsToApplicantRequest = (
  applicantId: number,
  certification: { id: number }
) =>
  createAction(actionTypes.ADD_CERTIFICATIONS_TO_APPLICANT_REQUEST, {
    applicantId,
    certification
  });

export const addCertificationsToApplicantSuccess = (certifications: Certification[]) =>
  createAction(actionTypes.ADD_CERTIFICATIONS_TO_APPLICANT_SUCCESS, {
    certifications
  });

export const removeCertificationFromApplicantRequest = (
  applicantId: number,
  certificationId: number
) =>
  createAction(actionTypes.REMOVE_CERTIFICATION_FROM_APPLICANT_REQUEST, {
    applicantId,
    certificationId
  });

export const removeCertificationFromApplicantSuccess = (certificationId: number) =>
  createAction(actionTypes.REMOVE_CERTIFICATION_FROM_APPLICANT_SUCCESS, {
    certificationId
  });

export const certificationAjaxFailure = (reason: string) =>
  createAction(
    actionTypes.CERTIFICATION_AJAX_FAILURE,
    { error: new Error(reason) },
    true
  );
