import * as React from "react";
import { Formik } from "formik";
import Input from "../Shared/Input";
import Button from "../Shared/Button";
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
      companyAddress: "",
      companyAddress2: "",
      companyCity: "",
      companyState: "",
      companyZipcode: ""
    }}
    onSubmit={employerFormProps =>
      handleSubmit(employerId, {
        ...employerFormProps,
        currentPageOfSignup: 3
      })
    }
    validate={values => {
      let errors: EmployerFormProps = {};
      Object.keys(errors).forEach(key => {
        if (!values[key] && key !== "address2") {
          errors[key] = "Required";
        }
      });
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
          label="COMPANY ADDRESS"
          name="companyAddress"
          type="tel"
          value={values.companyAddress}
          handleChange={handleChange}
          handleBlur={handleBlur}
          error={touched.companyAddress && errors.companyAddress}
        />
        <Input
          label="SUITE OR FLOOR"
          name="companyAddress2"
          type="text"
          value={values.companyAddress2}
          handleChange={handleChange}
          handleBlur={handleBlur}
          error={touched.companyAddress2 && errors.companyAddress2}
        />
        <Input
          label="CITY"
          name="companyCity"
          type="text"
          value={values.companyCity}
          handleChange={handleChange}
          handleBlur={handleBlur}
          error={touched.companyCity && errors.companyCity}
        />
        <Input
          label="STATE"
          name="companyState"
          type="text"
          value={values.companyState}
          handleChange={handleChange}
          handleBlur={handleBlur}
          error={touched.companyState && errors.companyState}
        />
        <Input
          label="ZIPCODE"
          name="companyZipcode"
          type="text"
          value={values.companyZipcode}
          handleChange={handleChange}
          handleBlur={handleBlur}
          error={touched.companyZipcode && errors.companyZipcode}
        />
        <Button type="submit">Next</Button>
      </form>
    )}
  />
);
