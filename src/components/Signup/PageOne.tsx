import * as React from "react";
import { Formik } from "formik";
import Input from "../Shared/Input";
import { CreateApplicantFormProps } from "../../types";
import "../../styles/input.css";
import Button from "../Shared/Button";

type Props = {
  handleSubmit: (
    applicantFormProps: CreateApplicantFormProps,
    nextPage?: string
  ) => void;
  uuid: string;
};

export default ({ handleSubmit, uuid }: Props) => (
  <Formik
    initialValues={{
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      linkedIn: ""
    }}
    onSubmit={values =>
      handleSubmit({ ...values, uuid, currentPageOfSignup: 2 })
    }
    validate={values => {
      let errors: {
        firstName?: string;
        lastName?: string;
        email?: string;
        password?: string;
      } = {};
      Object.keys(errors).forEach(key => {
        if (values[key] !== "linkedIn" && !values[key]) {
          errors[key] = "Required";
        }
      });
      if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = "Invalid email address";
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
    }) => {
      return (
        <form onSubmit={handleSubmit}>
          <Input
            label="FIRST NAME"
            name="firstName"
            type="text"
            value={values.firstName}
            handleChange={handleChange}
            handleBlur={handleBlur}
            error={touched.firstName && errors.firstName}
          />

          <Input
            label="LAST NAME"
            name="lastName"
            type="text"
            value={values.lastName}
            handleChange={handleChange}
            handleBlur={handleBlur}
            error={touched.lastName && errors.lastName}
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
            label="LINKED IN URL"
            name="linkedIn"
            type="text"
            value={values.linkedIn}
            handleChange={handleChange}
            handleBlur={handleBlur}
            error={touched.linkedIn && errors.linkedIn}
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
          <Button disabled={isSubmitting} type="submit">
            Next
          </Button>
        </form>
      );
    }}
  />
);
