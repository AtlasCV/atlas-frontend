export interface CreateApplicantFormProps {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  linkedIn: string;
  uuid: string;
  currentPageOfSignup?: number;
}

export interface UpdateApplicantFormProps {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  profileImgUrl?: string;
  website?: string;
  linkedIn?: string;
  city?: string;
  transcript?: string;
  aboutMe?: string;
  gender?: string;
  birthday?: string;
  industryId?: number;
  currentPageOfSignup?: number;
  signupComplete?: boolean;
}

export interface EducationDetails {
  areaOfStudy: string;
  gpa?: string;
  educationLevel?: string;
  university?: string;
}
