export interface CreateApplicantFormProps {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  linkedIn: string;
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
}
