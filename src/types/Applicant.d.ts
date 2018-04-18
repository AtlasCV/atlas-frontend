import { User, Industry, PersonalityEvaluator } from "./";

export interface Applicant {
  id: number;
  linkedIn?: string;
  aboutMe?: string;
  transcript?: string;
  city?: string;
  user?: User;
  personalityEvaluation: PersonalityEvaluator;
  industries: Industry[];
}
