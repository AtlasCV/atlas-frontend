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
    nextPage: string
  ) => void;
  applicantId: number;
  uuid: string;
};

export default ({ handleSubmit, applicantId, uuid }: Props) => (
  <Formik
    initialValues={{
      phone: "",
      profileImgUrl: "",
      website: "",
      city: "",
      birthday: "",
      gender: ""
    }}
    onSubmit={applicantFormProps =>
      handleSubmit(
        applicantId,
        applicantFormProps,
        `/onboarding/signup/3/${uuid}`
      )
    }
    validate={values => {
      let errors: UpdateApplicantFormProps = {
        phone: "",
        city: "",
        birthday: ""
      };
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
          label="WEBSITE"
          name="website"
          type="text"
          value={values.website}
          handleChange={handleChange}
          handleBlur={handleBlur}
          error={touched.website && errors.website}
        />
        <Input
          label="CITY"
          name="city"
          type="text"
          value={values.city}
          handleChange={handleChange}
          handleBlur={handleBlur}
          error={touched.city && errors.city}
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
        <Select label="GENDER" name="gender" value={values.gender}>
          <option>-</option>
          <option>Male</option>
          <option>Female</option>
        </Select>
        <button>Next</button>
      </form>
    )}
  />
);
