import { Store, createStore, applyMiddleware, Middleware } from "redux";
import { createEpicMiddleware } from "redux-observable";
import { createLogger } from "redux-logger";
import createHistory from "history/createBrowserHistory";
import { History } from "history";
import { Observable } from "rxjs";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { fromPromise } from "rxjs/observable/fromPromise";
import epics from "../epics";
import reducers, { AppState } from "../reducers";

export interface Dependencies {
  ajax: (options: AxiosRequestConfig) => Observable<AxiosResponse>;
}

export default (): { store: Store<AppState>; history: History } => {
  const history = createHistory();
  const epicMiddleware = createEpicMiddleware(epics, {
    dependencies: {
      ajax: (options: AxiosRequestConfig): Observable<AxiosResponse> =>
        fromPromise(axios(options))
    }
  });
  const middleware: Middleware[] = [
    epicMiddleware,
    createLogger()
  ] as Middleware[];

  const enhancer = applyMiddleware(...middleware);

  const store: Store<AppState> = createStore(reducers, enhancer);

  return { store, history };
};
