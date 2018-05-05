import {
  Store,
  createStore,
  applyMiddleware,
  Middleware,
  compose
} from "redux";
import { createEpicMiddleware } from "redux-observable";
import { routerMiddleware } from "react-router-redux";
import { createLogger } from "redux-logger";
import createHistory from "history/createBrowserHistory";
import { History } from "history";
import { Observable } from "rxjs";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { fromPromise } from "rxjs/observable/fromPromise";
import epics from "../epics";
import reducers, { AppState, initialState } from "../reducers";

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
    createLogger(),
    routerMiddleware(history)
  ] as Middleware[];

  const composeEnhancers =
    (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const store: Store<AppState> = createStore(
    reducers,
    initialState,
    composeEnhancers(applyMiddleware(...middleware))
  );

  return { store, history };
};
