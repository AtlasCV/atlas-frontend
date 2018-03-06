import { Action } from "./";
import {
  RECORD_BACK_OFFICE,
  RECORD_CASUAL,
  RECORD_CLIENT_FACING,
  RECORD_COLLABORATIVE,
  RECORD_FORMAL,
  RECORD_IMPROVISOR,
  RECORD_INDEPENDENT,
  RECORD_TASK_ORIENTED
} from "../../constants/actionTypes";

export type RecordBackOffice = Action<
  typeof RECORD_BACK_OFFICE,
  { score: number },
  {}
>;

export type RecordCasual = Action<typeof RECORD_CASUAL, { score: number }, {}>;

export type RecordClientFacing = Action<
  typeof RECORD_CLIENT_FACING,
  { score: number },
  {}
>;

export type RecordCollaborative = Action<
  typeof RECORD_COLLABORATIVE,
  { score: number },
  {}
>;

export type RecordFormal = Action<typeof RECORD_FORMAL, { score: number }, {}>;

export type RecordImprovisor = Action<
  typeof RECORD_IMPROVISOR,
  { score: number },
  {}
>;

export type RecordIndependent = Action<
  typeof RECORD_INDEPENDENT,
  { score: number },
  {}
>;

export type RecordTaskOriented = Action<
  typeof RECORD_TASK_ORIENTED,
  { score: number },
  {}
>;

export type UserResponseActions =
  | RecordBackOffice
  | RecordCasual
  | RecordClientFacing
  | RecordCollaborative
  | RecordFormal
  | RecordImprovisor
  | RecordIndependent
  | RecordTaskOriented;
