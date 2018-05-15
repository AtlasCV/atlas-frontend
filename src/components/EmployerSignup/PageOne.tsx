import * as React from "react";
import { Formik } from "formik";
import Input from "../Shared/Input";
import Button from "../Shared/Button";
import validatePhone from "../../utils/validatePhone";
import { EmployerFormProps } from "../../types";

type Props = {
  employerId: number;
  handleSubmit: (
    employerId: number,
    employerFormProps: EmployerFormProps
  ) => void;
};

export default ({ employerId, handleSubmit }: Props) => (
  <Formik
    initialValues={{
      companyName: "",
      email: "",
      phone: "",
      companyWebsite: ""
    }}
    onSubmit={employerFormProps =>
      handleSubmit(employerId, {
        ...employerFormProps,
        currentPageOfSignup: 2
      })
    }
    validate={values => {
      let errors: EmployerFormProps = {};
      Object.keys(errors).forEach(key => {
        if (!values[key]) {
          errors[key] = "Required";
        }
      });
      if (validatePhone(values.phone)) {
        errors.phone = "Invalid phone number";
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
          label="COMPANY NAME"
          name="companyName"
          type="tel"
          value={values.companyName}
          handleChange={handleChange}
          handleBlur={handleBlur}
          error={touched.companyName && errors.companyName}
        />
        <Input
          label="COMPANY EMAIL"
          name="email"
          type="text"
          value={values.email}
          handleChange={handleChange}
          handleBlur={handleBlur}
          error={touched.email && errors.email}
        />
        <Input
          label="COMPANY PHONE NUMBER"
          name="phone"
          type="text"
          value={values.phone}
          handleChange={handleChange}
          handleBlur={handleBlur}
          error={touched.phone && errors.phone}
        />
        <Input
          label="COMPANY WEBSITE"
          name="companyWebsite"
          type="text"
          value={values.companyWebsite}
          handleChange={handleChange}
          handleBlur={handleBlur}
          error={touched.companyWebsite && errors.companyWebsite}
        />

        <Button type="submit">Next</Button>
      </form>
    )}
  />
);
