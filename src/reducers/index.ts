import * as redux from "redux";
import combineReducers = redux.combineReducers;
import { routerReducer, RouterState } from "react-router-redux";
import questions, { QuestionState, QUESTION_INITIAL_STATE } from "./questions";
import profile, { ProfileState, PROFILE_INITIAL_STATE } from "./profile";
import industries, {
  IndustryState,
  INITIAL_INDUSTRY_STATE
} from "./industries";
import auth, { AuthState, INITIAL_AUTH_STATE } from "./auth";
import skills, { SkillState, INITIAL_SKILL_STATE } from "./skills";
import industrySectors, {
  IndustrySectorState,
  INITIAL_INDUSTRY_SECTOR_STATE
} from "./industrySectors";
import certifications, { CertificationState, INITIAL_CERTIFICATION_STATE } from "./certifications";
import applicants, { ApplicantState, INITIAL_APPLICANT_STATE } from "./applicants";

export type AppState = {
  questions: QuestionState;
  router: RouterState;
  profile: ProfileState;
  industries: IndustryState;
  auth: AuthState;
  skills: SkillState;
  industrySectors: IndustrySectorState;
  certifications: CertificationState;
  applicants: ApplicantState;
};

export const initialState = {
  questions: QUESTION_INITIAL_STATE,
  profile: PROFILE_INITIAL_STATE,
  industries: INITIAL_INDUSTRY_STATE,
  auth: INITIAL_AUTH_STATE,
  skills: INITIAL_SKILL_STATE,
  industrySectors: INITIAL_INDUSTRY_SECTOR_STATE,
  certifications: INITIAL_CERTIFICATION_STATE,
  applicants: INITIAL_APPLICANT_STATE,
  router: { location: null }
};

export const reducers: redux.ReducersMapObject = {
  questions,
  profile,
  router: routerReducer,
  industries,
  auth,
  skills,
  industrySectors,
  certifications,
  applicants
};

const rootReducer: redux.Reducer<AppState> = combineReducers(reducers);

export default rootReducer;
