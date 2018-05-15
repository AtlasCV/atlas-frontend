export interface EmployerFormProps {
  companyName?: string;
  phone?: string;
  email?: string;
  companyWebsite?: string;
  companyAddress?: string;
  companyAddress2?: string;
  companyCity?: string;
  companyState?: string;
  companyZipcode?: string;
  industry?: string;
  companyDescription?: string;
  currentPageOfSignup?: number;
}

export interface EmployerUserFormProps {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  title?: string;
  password?: string;
  confirmPassword?: string;
}
