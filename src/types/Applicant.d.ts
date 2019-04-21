import { User, Industry, PersonalityEvaluator } from "./";

export interface Applicant {
  id: number;
  linkedIn?: string;
  aboutMe?: string;
  transcript?: string;
  city?: string;
  User?: User;
  PersonalityEvaluation?: PersonalityEvaluator;
  Industries: Industry[];
  EducationExperiences: EducationExperience[];
  JobExperiences: JobExperience[];
  currentPageOfSignup?: number;
  signupComplete?: boolean;
  jobType?: string;
  ApplicantSkills: ApplicantSkill[];
  ApplicantIndustrySectors: ApplicantIndustrySector[];
  Certifications: Certification[];
  signupComplete?: boolean;
  website?: string;
  resumeUrl?: string;
  videoUrl?: string;
}

export interface ApplicantSkill {
  ApplicantId: number;
  SkillId: number;
  yearsExperience: string;
  Skill?: Skill;
}

export interface ApplicantIndustrySector {
  ApplicantId: number;
  IndustrySectorId: number;
  yearsExperience: string;
  IndustrySector?: IndustrySector;
}

export interface Certification {
  ApplicantId: number;
  CertificationId: number;
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
  id?: number;
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
  initials?: string;

}

export interface IndustrySector {
  id: number;
  name: string;
  initials?: string;
  displayName?: string;
}

export interface Certification {
  id: number;
  name: string;
  initials?: string;
}
