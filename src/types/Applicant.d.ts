import { User, Industry, PersonalityEvaluator } from "./";

export interface Applicant {
  id: number;
  linkedIn?: string;
  aboutMe?: string;
  transcript?: string;
  city?: string;
  user?: User;
  personalityEvaluation?: PersonalityEvaluator;
  Industries: Industry[];
  EducationExperiences: EducationExperience[];
  JobExperiences: JobExperience[];
  currentPageOfSignup?: number;
  signupComplete?: boolean;
  jobType?: string;
  ApplicantSkills: ApplicantSkill[];
  ApplicantIndustrySectors: ApplicantIndustrySector[];
}

export interface ApplicantSkill {
  ApplicantId: number;
  SkillId: number;
  yearsExperience: string;
  Skill?: Skill;
}

export interface ApplicantIndustrySectors {
  ApplicantId: number;
  IndustrySectorId: number;
  yearsExperience: string;
  IndustrySector?: IndustrySector;
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

export interface Skill {
  name: string;
  displayName: string;
  id: number;
}

export interface IndustrySector {
  id: number;
  name: string;
}
