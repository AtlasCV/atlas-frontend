import { User, Industry, PersonalityEvaluator } from "./";

export interface Applicant {
  id: number;
  linkedIn?: string;
  aboutMe?: string;
  transcript?: string;
  city?: string;
  user?: User;
  personalityEvaluation?: PersonalityEvaluator;
  industries: Industry[];
  educationExperiences: EducationExperience[];
  jobExperiences: JobExperience[];
}

export interface EducationExperience {
  id?: number;
  areaOfStudy?: string;
  gpa?: string;
  educationLevel?: string;
  university?: string;
  graduationYear?: string;
}

export interface JobExperience {
  name?: string;
  numOfYears?: number;
  currentlyWorkingHere?: boolean;
  description?: string;
  companyName?: string;
}
