import * as React from "react";
import { Formik } from "formik";
import Input from "../Shared/Input";
import { UpdateApplicantFormProps } from "../../types";

type Props = {
  handleSubmit: (
    applicantId: number,
    applicantFormProps: UpdateApplicantFormProps
  ) => void;
  applicantId: number;
};

export default ({ handleSubmit, applicantId }: Props) => (
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
      handleSubmit(applicantId, applicantFormProps)
    }
  >
    <React.Fragment>
      <Input label="PHONE" id="phone" />
      <Input label="PROFILE PICTURE" id="profileImgUrl" />
      <Input label="WEBSITE" id="website" />
      <Input label="CITY" id="city" />
      <Input label="BIRTHDAY" id="birthday" />
      <Input label="GENDER" id="gender" />
      <button>Next</button>
    </React.Fragment>
  </Formik>
);
