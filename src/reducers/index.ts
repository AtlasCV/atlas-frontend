import * as redux from "redux";
import combineReducers = redux.combineReducers;
import { routerReducer, RouterState } from "react-router-redux";
import questions, { QuestionState } from "./questions";
import profile, { ProfileState } from "./profile";

export type AppState = {
  questions: QuestionState;
  router: RouterState;
  profile: ProfileState;
};

const reducers: redux.ReducersMapObject = {
  questions,
  profile,
  router: routerReducer
};

const rootReducer: redux.Reducer<AppState> = combineReducers(reducers);

export default rootReducer;
