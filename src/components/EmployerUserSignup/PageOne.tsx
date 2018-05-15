import * as React from "react";
import { Formik } from "formik";
import { Link } from "react-router-dom";
import Input from "../Shared/Input";
import Button from "../Shared/Button";
import validatePhone from "../../utils/validatePhone";
import { EmployerUserFormProps } from "../../types";

type Props = {
  employerId: number;
  handleSubmit: (
    employerId: number,
    employerFormProps: EmployerUserFormProps
  ) => void;
};

export default ({ employerId, handleSubmit }: Props) => (
  <Formik
    initialValues={{
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      title: "",
      password: "",
      confirmPassword: ""
    }}
    onSubmit={employerFormProps => handleSubmit(employerId, employerFormProps)}
    validate={values => {
      let errors: EmployerUserFormProps = {};
      Object.keys(errors).forEach(key => {
        if (!values[key]) {
          errors[key] = "Required";
        }
      });
      if (validatePhone(values.phone)) {
        errors.phone = "Invalid phone number";
      }
      if (values.password !== values.confirmPassword) {
        errors.password = "Password fields must match";
      }

      return errors;
    }}
    render={({
      values,
      errors,
      touched,
      handleBlur,
      handleChange,
      handleSubmit,
      isSubmitting
    }) => (
      <form onSubmit={handleSubmit}>
        <Input
          label="FIRST NAME"
          name="firstName"
          type="tel"
          value={values.firstName}
          handleChange={handleChange}
          handleBlur={handleBlur}
          error={touched.firstName && errors.firstName}
        />
        <Input
          label="LAST EMAIL"
          name="email"
          type="text"
          value={values.email}
          handleChange={handleChange}
          handleBlur={handleBlur}
          error={touched.email && errors.email}
        />
        <Input
          label="PHONE NUMBER"
          name="phone"
          type="text"
          value={values.phone}
          handleChange={handleChange}
          handleBlur={handleBlur}
          error={touched.phone && errors.phone}
        />
        <Input
          label="EMAIL"
          name="email"
          type="text"
          value={values.email}
          handleChange={handleChange}
          handleBlur={handleBlur}
          error={touched.email && errors.email}
        />
        <Input
          label="TITLE"
          name="title"
          type="text"
          value={values.title}
          handleChange={handleChange}
          handleBlur={handleBlur}
          error={touched.title && errors.title}
        />
        <Input
          label="PASSWORD"
          name="password"
          type="password"
          value={values.password}
          handleChange={handleChange}
          handleBlur={handleBlur}
          error={touched.password && errors.password}
        />
        <Input
          label="CONFIRM PASSWORD"
          name="confirmPassword"
          type="password"
          value={values.confirmPassword}
          handleChange={handleChange}
          handleBlur={handleBlur}
          error={touched.confirmPassword && errors.confirmPassword}
        />
        <Link to="/employer-onboarding/company-signup/2">
          <Button styles={{ marginTop: "0px" }} type="submit">
            Next
          </Button>
        </Link>
      </form>
    )}
  />
);
