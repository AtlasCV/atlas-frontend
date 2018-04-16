import { combineEpics } from "redux-observable";
import personalityEvaluations from "./personalityEvaluations";
import profile from "./profile";
import industries from "./industries";
import auth from "./auth";

export default combineEpics(
  ...personalityEvaluations,
  ...profile,
  ...industries,
  ...auth
);
