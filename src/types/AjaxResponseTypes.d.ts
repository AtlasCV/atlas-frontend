export interface AxiosResponseData<T> {
  successful: true;
  result: T;
  status: number;
}

export interface AxiosResponseError {
  successful: false;
  reason: string;
  status: number;
}
