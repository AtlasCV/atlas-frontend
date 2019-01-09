import { combineEpics } from "redux-observable";
import personalityEvaluations from "./personalityEvaluations";
import profile from "./profile";
import industries from "./industries";
import auth from "./auth";
import skills from "./skills";
import industrySectors from "./industrySectors";
import certifications from './certifications';

export default combineEpics(
  ...personalityEvaluations,
  ...profile,
  ...industries,
  ...auth,
  ...skills,
  ...industrySectors,
  ...certifications
);
