export interface Action<T, TPayload, TMeta> {
  readonly type: T;
  readonly payload: TPayload;
  readonly error: boolean;
  readonly meta?: TMeta;
}

export * from "./UserResponses";
export * from "./Questions";
