import * as React from "react";
import { Formik } from "formik";
import Input from "../Shared/Input";
import { CreateApplicantFormProps } from "../../types";
type Props = {
  handleSubmit: (applicantFormProps: CreateApplicantFormProps) => void;
};

export default ({ handleSubmit }: Props) => (
  <Formik
    initialValues={{
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      linkedIn: ""
    }}
    onSubmit={handleSubmit}
  >
    <React.Fragment>
      <Input label="FIRST NAME" id="firstName" />
      <Input label="LAST NAME" id="lastName" />
      <Input label="EMAIL" id="email" />
      <Input label="LINKED IN URL" id="linkedIn" />
      <Input label="PASSWORD" id="password" />
      <Input label="CONFIRM PASSWORD" id="confirmPassword" />
      <button>Next</button>
    </React.Fragment>
  </Formik>
);
