import { Observable } from "rxjs/Rx";
import { AxiosResponse, AxiosError } from "axios";
import { AnyAction } from "redux";
import { Epic } from "redux-observable";
import { AppState } from "../reducers";
import { Dependencies } from "../init";
import endpoint from "../constants/endpoint";
import {
  loadCertificationsRequest,
  loadCertificationsSuccess,
  certificationAjaxFailure,
  addCertificationsToApplicantRequest,
  addCertificationsToApplicantSuccess,
  removeCertificationFromApplicantRequest,
  removeCertificationFromApplicantSuccess
} from "../actions/certifications";
import * as actionTypes from "../constants/actionTypes";
import * as types from "../types";
import { Certification } from "../types";
import { getMeRequest } from "../actions/auth";

type LoadCertificationsEpic = Epic<AnyAction, AppState, Dependencies>;
export const loadCertificationsEpic: LoadCertificationsEpic = (action$, store, { ajax }) =>
  action$
    .ofType(actionTypes.LOAD_CERTIFICATIONS_REQUEST)
    .mergeMap((action: ReturnType<typeof loadCertificationsRequest>) =>
      ajax({
        method: "GET",
        url: endpoint.certifications
      })
        .map(
          ({
            data: { result }
          }: AxiosResponse<types.AxiosResponseData<Certification[]>>) =>
            loadCertificationsSuccess(result)
        )
        .catch((err: AxiosError) =>
          Observable.of(
            certificationAjaxFailure(
              !err.response ? err.message : err.response.data.message
            )
          )
        )
    );

type AddCertificationsToApplicantEpic = Epic<AnyAction, AppState, Dependencies>;
export const addCertificationsToApplicantEpic: AddCertificationsToApplicantEpic = (
  action$,
  store,
  { ajax }
) =>
  action$
    .ofType(actionTypes.ADD_CERTIFICATIONS_TO_APPLICANT_REQUEST)
    .mergeMap(
      ({
        payload: { certification, applicantId }
      }: ReturnType<typeof addCertificationsToApplicantRequest>) =>
        ajax({
          method: "POST",
          url: `${endpoint.applicants}/${applicantId}/certifications`,
          headers: {
            "content-type": "application/json"
          },
          data: {
            certification
          }
        })
          .mergeMap(
            ({
              data: { result }
            }: AxiosResponse<types.AxiosResponseData<Certification[]>>) => [
              addCertificationsToApplicantSuccess(result),
              getMeRequest()
            ]
          )
          .catch((err: AxiosError) =>
            Observable.of(
              certificationAjaxFailure(
                !err.response ? err.message : err.response.data.message
              )
            )
          )
    );

type RemoveCertificationFromApplicantEpic = Epic<AnyAction, AppState, Dependencies>;
export const removeCertificationFromApplicantEpic: RemoveCertificationFromApplicantEpic = (
  action$,
  store,
  { ajax }
) =>
  action$
    .ofType(actionTypes.REMOVE_CERTIFICATION_FROM_APPLICANT_REQUEST)
    .mergeMap(
      ({
        payload: { certificationId, applicantId }
      }: ReturnType<typeof removeCertificationFromApplicantRequest>) =>
        ajax({
          method: "DELETE",
          url: `${endpoint.applicants}/${applicantId}/certifications`,
          headers: {
            "content-type": "application/json"
          },
          data: {
            certificationId
          }
        })
          .mergeMap((res: AxiosResponse<types.AxiosResponseData<{}>>) => [
            removeCertificationFromApplicantSuccess(certificationId),
            getMeRequest()
          ])
          .catch((err: AxiosError) =>
            Observable.of(
              certificationAjaxFailure(
                !err.response ? err.message : err.response.data.message
              )
            )
          )
    );

export default [
  loadCertificationsEpic,
  addCertificationsToApplicantEpic,
  removeCertificationFromApplicantEpic
];
