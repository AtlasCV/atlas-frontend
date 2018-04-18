import { Applicant } from "./";

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  gender?: "M" | "F";
  birthday?: string;
  profileImgUrl?: string;
  activated: boolean;
  userType: string;
  token?: string;
  applicant: Applicant;
}
