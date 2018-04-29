import * as React from "react";
import { Formik } from "formik";
import Input from "../Shared/Input";
import Select from "../Shared/Select";
import { UpdateApplicantFormProps } from "../../types";
import validatePhone from "../../utils/validatePhone";
import "../../styles/input.css";

type Props = {
  handleSubmit: (
    applicantId: number,
    applicantFormProps: UpdateApplicantFormProps,
    nextPage?: string
  ) => void;
  applicantId: number;
};

export default ({ handleSubmit, applicantId }: Props) => (
  <Formik
    initialValues={{
      phone: "",
      profileImgUrl: "",
      birthday: "",
      gender: ""
    }}
    onSubmit={applicantFormProps =>
      handleSubmit(applicantId, {
        ...applicantFormProps,
        currentPageOfSignup: 3
      })
    }
    validate={values => {
      let errors: UpdateApplicantFormProps = {};
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
          label="PHONE"
          name="phone"
          type="tel"
          value={values.phone}
          handleChange={handleChange}
          handleBlur={handleBlur}
          error={touched.phone && errors.phone}
        />
        <Input
          label="PROFILE PICTURE"
          name="profileImgUrl"
          type="text"
          value={values.profileImgUrl}
          handleChange={handleChange}
          handleBlur={handleBlur}
          error={touched.profileImgUrl && errors.profileImgUrl}
        />
        <Input
          label="BIRTHDAY"
          name="birthday"
          type="text"
          value={values.birthday}
          handleChange={handleChange}
          handleBlur={handleBlur}
          error={touched.birthday && errors.birthday}
        />
        <Select
          label="GENDER"
          name="gender"
          value={values.gender}
          handleChange={handleChange}
          handleBlur={handleBlur}
          error={errors.gender}
        >
          <option />
          <option value="M">Male</option>
          <option value="F">Female</option>
        </Select>
        <button type="submit">Next</button>
      </form>
    )}
  />
);
