import { Reducer } from "redux";
import * as actions from "../actions/certifications";
import * as actionTypes from "../constants/actionTypes";
import { ActionUnion } from "../actions/helpers";
import { Certification } from "../types";

type Action = ActionUnion<typeof actions>;

export type CertificationState = {
  list: Array<Certification>;
  fetchingCertifications: boolean;
  savingCertifications: boolean;
  savedCertifications: boolean;
  error?: Error;
};

export const INITIAL_CERTIFICATION_STATE: CertificationState = {
  list: [],
  fetchingCertifications: false,
  savingCertifications: false,
  savedCertifications: false
};

const loadCertificationsRequest = (state: CertificationState) => ({
  ...state,
  fetchingCertifications: true
});

const loadCertificationsSuccess = (
  state: CertificationState,
  { payload: { certifications } }: ReturnType<typeof actions.loadCertificationsSuccess>
) => ({
  ...state,
  list: certifications,
  fetchingCertifications: false
});

const certificationAjaxFailure = (
  state: CertificationState,
  { payload: { error } }: ReturnType<typeof actions.certificationAjaxFailure>
) => ({
  ...state,
  error,
  fetchingCertifications: false
});

const addCertificationsToApplicantRequest = (
  state: CertificationState,
  action: ReturnType<typeof actions.addCertificationsToApplicantRequest>
) => ({
  ...state,
  savingCertifications: true,
  savedCertifications: false
});

const addCertificationsToApplicantSuccess = (
  state: CertificationState,
  action: ReturnType<typeof actions.addCertificationsToApplicantSuccess>
) => ({
  ...state,
  savingCertifications: false,
  savedCertifications: true
});

const removeCertificationFromApplicantRequest = (
  state: CertificationState,
  action: ReturnType<typeof actions.removeCertificationFromApplicantRequest>
) => ({
  ...state,
  savingCertifications: true,
  savedCertifications: false
});

const removeCertificationFromApplicantSuccess = (
  state: CertificationState,
  action: ReturnType<typeof actions.removeCertificationFromApplicantSuccess>
) => ({
  ...state,
  savingCertifications: false,
  savedCertifications: true
});

const certificationReducer: Reducer<CertificationState> = (
  state = INITIAL_CERTIFICATION_STATE,
  action: Action
) => {
  switch (action.type) {
    case actionTypes.LOAD_CERTIFICATIONS_REQUEST:
      return loadCertificationsRequest(state);
    case actionTypes.LOAD_CERTIFICATIONS_SUCCESS:
      return loadCertificationsSuccess(state, action);
    case actionTypes.CERTIFICATION_AJAX_FAILURE:
      return certificationAjaxFailure(state, action);
    case actionTypes.ADD_CERTIFICATIONS_TO_APPLICANT_REQUEST:
      return addCertificationsToApplicantRequest(state, action);
    case actionTypes.ADD_CERTIFICATIONS_TO_APPLICANT_SUCCESS:
      return addCertificationsToApplicantSuccess(state, action);
    case actionTypes.REMOVE_CERTIFICATION_FROM_APPLICANT_REQUEST:
      return removeCertificationFromApplicantRequest(state, action);
    case actionTypes.REMOVE_CERTIFICATION_FROM_APPLICANT_SUCCESS:
      return removeCertificationFromApplicantSuccess(state, action);
    default:
      return state;
  }
};

export default certificationReducer;
