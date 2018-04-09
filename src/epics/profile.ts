import { Observable } from "rxjs/Rx";
import { AxiosResponse, AxiosError } from "axios";
import { AnyAction } from "redux";
import { Epic } from "redux-observable";
import { AppState } from "../reducers";
import { Dependencies } from "../init";
import * as Actions from "../actions/types";
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
    .ofType<Actions.CreateApplicantRequest | Actions.UpdateApplicantRequest>(
      actionTypes.CREATE_APPLICANT_REQUEST,
      actionTypes.UPDATE_APPLICANT_REQUEST
    )
    .mergeMap<
      Actions.CreateApplicantRequest | Actions.UpdateApplicantRequest,
      Actions.LoadApplicantSuccess
    >(
      ({
        payload: { applicantFormProps, applicantId, nextPage }
      }: Actions.CreateApplicantRequest & Actions.UpdateApplicantRequest) =>
        ajax({
          method: applicantId ? "PUT" : "POST",
          url: `${endpoint.applicants}/${applicantId ? applicantId : ""}`,
          headers: { "content-type": "application/json" },
          data: applicantFormProps
        })
          .concatMap(({ data: { result } }: AxiosResponse) => {
            if (nextPage) {
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
