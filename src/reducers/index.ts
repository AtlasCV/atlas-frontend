import * as redux from "redux";
import combineReducers = redux.combineReducers;
import { routerReducer, RouterState } from "react-router-redux";
import questions, { QuestionState } from "./questions";
import profile, { ProfileState } from "./profile";
import industries, { IndustryState } from "./industries";
import auth, { AuthState } from "./auth";
import skills, { SkillState } from "./skills";

export type AppState = {
  questions: QuestionState;
  router: RouterState;
  profile: ProfileState;
  industries: IndustryState;
  auth: AuthState;
  skills: SkillState;
};

const reducers: redux.ReducersMapObject = {
  questions,
  profile,
  router: routerReducer,
  industries,
  auth,
  skills
};

const rootReducer: redux.Reducer<AppState> = combineReducers(reducers);

export default rootReducer;
