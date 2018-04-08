import { combineEpics } from "redux-observable";
import personalityEvaluations from "./personalityEvaluations";
import profile from "./profile";

export default combineEpics(...personalityEvaluations, ...profile);
