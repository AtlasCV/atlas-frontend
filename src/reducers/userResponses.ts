import { Reducer } from "redux";
import * as Actions from "../actions/types";
import {
  RECORD_BACK_OFFICE,
  RECORD_CASUAL,
  RECORD_CLIENT_FACING,
  RECORD_COLLABORATIVE,
  RECORD_FORMAL,
  RECORD_IMPROVISOR,
  RECORD_INDEPENDENT,
  RECORD_TASK_ORIENTED
} from "../constants/actionTypes";

export type UserResponseState = {
  collaborative: number;
  independent: number;
  formal: number;
  casual: number;
  taskOriented: number;
  improvisor: number;
  backOffice: number;
  clientFacing: number;
};

const USER_RESPONSE_INITIAL_STATE = {
  collaborative: 0,
  independent: 0,
  formal: 0,
  casual: 0,
  taskOriented: 0,
  improvisor: 0,
  backOffice: 0,
  clientFacing: 0
};

const recordCollaborative = (
  state: UserResponseState,
  { payload: { score } }: Actions.RecordCollaborative
) => ({
  ...state,
  collaborative: state.collaborative + score
});

const recordIndependent = (
  state: UserResponseState,
  { payload: { score } }: Actions.RecordIndependent
) => ({
  ...state,
  independent: state.independent + score
});

const recordFormal = (
  state: UserResponseState,
  { payload: { score } }: Actions.RecordFormal
) => ({
  ...state,
  formal: state.formal + score
});

const recordCasual = (
  state: UserResponseState,
  { payload: { score } }: Actions.RecordCasual
) => ({
  ...state,
  casual: state.casual + score
});

const recordTaskOriented = (
  state: UserResponseState,
  { payload: { score } }: Actions.RecordTaskOriented
) => ({
  ...state,
  taskOriented: state.taskOriented + score
});

const recordImprovisor = (
  state: UserResponseState,
  { payload: { score } }: Actions.RecordImprovisor
) => ({
  ...state,
  improvisor: state.improvisor + score
});

const recordBackOffice = (
  state: UserResponseState,
  { payload: { score } }: Actions.RecordBackOffice
) => ({
  ...state,
  backOffice: state.backOffice + score
});

const recordClientFacing = (
  state: UserResponseState,
  { payload: { score } }: Actions.RecordClientFacing
) => ({
  ...state,
  clientFacing: state.clientFacing + score
});

const userResponseReducer: Reducer<UserResponseState> = (
  state = USER_RESPONSE_INITIAL_STATE,
  action: Actions.UserResponseActions
) => {
  switch (action.type) {
    case RECORD_COLLABORATIVE:
      return recordCollaborative(state, action);
    case RECORD_INDEPENDENT:
      return recordIndependent(state, action);
    case RECORD_FORMAL:
      return recordFormal(state, action);
    case RECORD_CASUAL:
      return recordCasual(state, action);
    case RECORD_IMPROVISOR:
      return recordImprovisor(state, action);
    case RECORD_TASK_ORIENTED:
      return recordTaskOriented(state, action);
    case RECORD_BACK_OFFICE:
      return recordBackOffice(state, action);
    case RECORD_CLIENT_FACING:
      return recordClientFacing(state, action);
    default:
      return state;
  }
};

export default userResponseReducer;
