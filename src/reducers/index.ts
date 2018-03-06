import * as redux from "redux";
import combineReducers = redux.combineReducers;
import { routerReducer } from "react-router-redux";
import userResponses, { UserResponseState } from "./userResponses";
import questions, { QuestionState } from "./questions";

export type AppState = {
  userResponses: UserResponseState;
  questions: QuestionState;
};

const reducers: redux.ReducersMapObject = {
  userResponses,
  questions,
  routing: routerReducer
};

const rootReducer: redux.Reducer<AppState> = combineReducers(reducers);

export default rootReducer;
