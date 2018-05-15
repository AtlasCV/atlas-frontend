import * as React from "react";
import Fragment = React.Fragment;
import { Formik } from "formik";
import TextArea from "../Shared/TextArea";
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
  <Fragment>
    <p>
      This section will be presented to applicants as your company bio. Here you
      can describe the typical operations of your office, the culture of your
      work environment, and indicate to potential employees why your company is
      an attractive place to work.
    </p>
    <Formik
      initialValues={{
        companyDescription: ""
      }}
      onSubmit={employerFormProps =>
        handleSubmit(employerId, {
          ...employerFormProps,
          currentPageOfSignup: 4
        })
      }
      validate={values => {
        let errors: EmployerFormProps = {};
        Object.keys(errors).forEach(key => {
          if (!values[key]) {
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
          <TextArea
            label="DESCRIBE YOUR COMPANY"
            name="companyDescription"
            type="tel"
            value={values.companyDescription}
            handleChange={handleChange}
            handleBlur={handleBlur}
            error={touched.companyDescription && errors.companyDescription}
            height="300px"
          />
          <Button type="submit">Next</Button>
        </form>
      )}
    />
  </Fragment>
);
