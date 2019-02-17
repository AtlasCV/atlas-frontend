import { Observable } from "rxjs/Rx";
import { AxiosResponse, AxiosError } from "axios";
import { AnyAction } from "redux";
import { Epic } from "redux-observable";
import { AppState } from "../reducers";
import { Dependencies } from "../init";
import endpoint from "../constants/endpoint";
import {
  loadApplicantsRequest,
  loadApplicantsSuccess,
  applicantAjaxFailure,
} from "../actions/applicants";
import * as actionTypes from "../constants/actionTypes";
import * as types from "../types";
import { Applicant } from "../types";

type LoadApplicantsEpic = Epic<AnyAction, AppState, Dependencies>;
export const loadApplicantsEpic: LoadApplicantsEpic = (action$, store, { ajax }) =>
  action$
    .ofType(actionTypes.LOAD_APPLICANTS_REQUEST)
    .mergeMap((action: ReturnType<typeof loadApplicantsRequest>) =>
      ajax({
        method: "GET",
        url: endpoint.applicants
      })
        .map(
          ({
            data: { result }
          }: AxiosResponse<types.AxiosResponseData<Applicant[]>>) =>
            loadApplicantsSuccess(result)
        )
        .catch((err: AxiosError) =>
          Observable.of(
            applicantAjaxFailure(
              !err.response ? err.message : err.response.data.message
            )
          )
        )
    );

export default [
  loadApplicantsEpic,
];
