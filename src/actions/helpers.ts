import { ActionCreatorsMapObject } from "redux";

export interface Action<T extends string> {
  type: T;
}

export interface ActionWithPayloadAndError<T extends string, P, E = false>
  extends Action<T> {
  payload: P;
  error: E;
}

export function createAction<T extends string>(type: T): Action<T>;
export function createAction<T extends string, P, E>(
  type: T,
  payload?: P,
  error?: E
): ActionWithPayloadAndError<T, P, E>;
export function createAction<T extends string, P, E>(
  type: T,
  payload?: P,
  error?: E
) {
  if (payload === undefined && error === undefined) {
    return { type };
  } else if (payload === undefined) {
    return { type, error };
  } else if (error === undefined) {
    return { type, payload };
  } else {
    return { type, payload, error };
  }
}

export type ActionUnion<T extends ActionCreatorsMapObject> = ReturnType<
  T[keyof T]
>;
