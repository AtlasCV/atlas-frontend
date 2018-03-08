import * as redux from "redux";
import combineReducers = redux.combineReducers;
import { routerReducer } from "react-router-redux";
import questions, { QuestionState } from "./questions";

export type AppState = {
  questions: QuestionState;
};

const reducers: redux.ReducersMapObject = {
  questions,
  routing: routerReducer
};

const rootReducer: redux.Reducer<AppState> = combineReducers(reducers);

export default rootReducer;
