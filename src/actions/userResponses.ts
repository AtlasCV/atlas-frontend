import * as Actions from "./types";
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

export const recordBackOffice = (score: number): Actions.RecordBackOffice => ({
  type: RECORD_BACK_OFFICE,
  payload: {
    score
  },
  error: false
});

export const recordCasual = (score: number): Actions.RecordCasual => ({
  type: RECORD_CASUAL,
  payload: {
    score
  },
  error: false
});

export const recordClientFacing = (
  score: number
): Actions.RecordClientFacing => ({
  type: RECORD_CLIENT_FACING,
  payload: {
    score
  },
  error: false
});

export const recordCollaborative = (
  score: number
): Actions.RecordCollaborative => ({
  type: RECORD_COLLABORATIVE,
  payload: {
    score
  },
  error: false
});

export const recordFormal = (score: number): Actions.RecordFormal => ({
  type: RECORD_FORMAL,
  payload: {
    score
  },
  error: false
});

export const recordImprovisor = (score: number): Actions.RecordImprovisor => ({
  type: RECORD_IMPROVISOR,
  payload: {
    score
  },
  error: false
});

export const recordIndependent = (
  score: number
): Actions.RecordIndependent => ({
  type: RECORD_INDEPENDENT,
  payload: {
    score
  },
  error: false
});

export const recordTaskOriented = (
  score: number
): Actions.RecordTaskOriented => ({
  type: RECORD_TASK_ORIENTED,
  payload: {
    score
  },
  error: false
});
