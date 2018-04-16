import { User } from "./User";
import { PersonalityEvaluator } from "./PersonalityEvaluator";

export interface Applicant {
  id: number;
  linkedIn?: string;
  aboutMe?: string;
  transcript?: string;
  city?: string;
  user?: User;
  personalityEvaluation: PersonalityEvaluator;
}
