import { Observable } from "rxjs/Rx";
import { AxiosResponse, AxiosError } from "axios";
import { AnyAction } from "redux";
import { Epic } from "redux-observable";
import { AppState } from "../reducers";
import { Dependencies } from "../init";
import endpoint from "../constants/endpoint";
import * as actions from "../actions/profile";
import * as actionTypes from "../constants/actionTypes";
import { push } from "react-router-redux";

type CreateOrUpdateApplicantEpic = Epic<AnyAction, AppState, Dependencies>;
export const createOrUpdateApplicantEpic: CreateOrUpdateApplicantEpic = (
  action$,
  store,
  { ajax }
) =>
  action$
    .ofType(
      actionTypes.CREATE_APPLICANT_REQUEST,
      actionTypes.UPDATE_APPLICANT_REQUEST
    )
    .mergeMap(({ payload: { applicantFormProps, applicantId, nextPage } }) =>
      ajax({
        method: applicantId ? "PUT" : "POST",
        url: `${endpoint.applicants}/${applicantId ? applicantId : ""}`,
        headers: { "content-type": "application/json" },
        data: applicantFormProps
      })
        .concatMap(({ data: { result, token } }: AxiosResponse) => {
          if (nextPage) {
            if (token) {
              localStorage.setItem("accessToken", token);
            }
            return [actions.loadApplicantSuccess(result), push(nextPage)];
          } else {
            return [actions.loadApplicantSuccess(result)];
          }
        })
        .catch((err: AxiosError) =>
          Observable.of(
            actions.profileAjaxFailure(
              !err.response ? err.message : err.response.data.message
            )
          )
        )
    );

export default [createOrUpdateApplicantEpic];
