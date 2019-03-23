import * as React from "react";
import moment from "moment";
import { Formik } from "formik";
import Input from "../Shared/Input";
import Select from "../Shared/Select";
import { UpdateApplicantFormProps } from "../../types";
import validatePhone from "../../utils/validatePhone";
import "../../styles/input.css";
import Button from "../Shared/Button";
import { ProfileState } from "../../reducers/profile";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { AppState } from "src/reducers";
import { updateApplicantRequest } from "src/actions/profile";

type MapStateProps = {
  profile: ProfileState;
};

type MapDispatchProps = {
  updateApplicantRequest: typeof updateApplicantRequest;
};

type Props = MapStateProps & MapDispatchProps;

const PersonalInformationContinued = ({
  updateApplicantRequest,
  profile,
  profile: {
    info: {
      Applicant: { id: applicantId }
    }
  }
}: Props) => (
  <Formik
    initialValues={{
      phone: profile.info.phone || "",
      profileImgUrl: profile.info.profileImgUrl || "",
      birthday: profile.info.birthday
        ? moment(profile.info.birthday).format("MM/DD/YYYY")
        : "",
      gender: profile.info.gender || ""
    }}
    onSubmit={applicantFormProps =>
      updateApplicantRequest(
        applicantId,
        {
          ...applicantFormProps,
          currentPageOfSignup: 3
        },
        "/onboarding/signup/3"
      )
    }
    validate={(values: any) => {
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
    }: any) => (
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
        {/* <Input
          label="PROFILE PICTURE"
          name="profileImgUrl"
          type="text"
          value={values.profileImgUrl}
          handleChange={handleChange}
          handleBlur={handleBlur}
          error={touched.profileImgUrl && errors.profileImgUrl}
        /> */}
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
        <Link to="/onboarding/signup/1">
          <Button styles={{ float: "left" }}>PREVIOUS</Button>
        </Link>
        <Button styles={{ float: "right" }} type="submit">
          NEXT
        </Button>
      </form>
    )}
  />
);

const mapState = ({ profile }: AppState) => ({ profile });

const mapDispatch = {
  updateApplicantRequest
};

export default connect<MapStateProps, MapDispatchProps, {}>(
  mapState,
  mapDispatch
)(PersonalInformationContinued);
