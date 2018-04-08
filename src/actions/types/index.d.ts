import { QuestionActions } from "./Questions";
import { ProfileActions } from "./Profile";

export interface Action<T, TPayload = {}, TMeta = {}> {
  readonly type: T;
  readonly payload: TPayload;
  readonly error: boolean;
  readonly meta?: TMeta;
}

export * from "./Questions";
export * from "./Profile";

export type RootAction = QuestionActions | ProfileActions;
