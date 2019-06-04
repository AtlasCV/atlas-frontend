import * as React from "react";
import { connect } from "react-redux";
import { Formik } from "formik";
import Input from "../Shared/Input";
import "../../styles/input.css";
import Button from "../Shared/Button";
import { ProfileState } from "../../reducers/profile";
import {
  updateApplicantRequest,
  createApplicantRequest
} from "../../actions/profile";
import { AppState } from "src/reducers";

type MapStateProps = { profile: ProfileState };

type MapDispatchProps = {
  updateApplicantRequest: typeof updateApplicantRequest;
  createApplicantRequest: typeof createApplicantRequest;
};

type OtherProps = {
  uuid?: string;
};

type Props = MapStateProps & MapDispatchProps & OtherProps;

const PersonalInformation = ({
  updateApplicantRequest,
  createApplicantRequest,
  uuid,
  profile
}: Props) => (
  <div>
    <h5>Don’t worry, this is the last time you’ll have to do this!</h5>
    <Formik
      initialValues={{
        firstName: profile.info.firstName || "",
        lastName: profile.info.lastName || "",
        email: profile.info.email || "",
        password: "",
        confirmPassword: "",
        linkedIn: profile.info.Applicant.linkedIn || "",
        website: profile.info.Applicant.website || ""
      }}
      onSubmit={(values: any) => {
        if (profile.info.Applicant.id) {
          updateApplicantRequest(
            profile.info.Applicant.id,
            { ...values, uuid, currentPageOfSignup: 2 },
            "/onboarding/signup/2"
          );
        } else {
          createApplicantRequest(
            { ...values, uuid, currentPageOfSignup: 2 },
            "/onboarding/signup/2"
          );
        }
      }}
      validate={(values: any) => {
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
      }: any) => {
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
              label="WEBSITE"
              name="website"
              type="text"
              value={values.website}
              handleChange={handleChange}
              handleBlur={handleBlur}
              error={touched.website && errors.website}
            />
            <p>
              Master Password – will be used to create your login info on other
              sites
            </p>
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
            <Button
              styles={{ float: "right" }}
              disabled={isSubmitting}
              type="submit"
            >
              NEXT
            </Button>
          </form>
        );
      }}
    />
  </div>
);

const mapState = ({ profile }: AppState) => ({ profile });

const mapDispatch = {
  createApplicantRequest,
  updateApplicantRequest
};

export default connect<MapStateProps, MapDispatchProps, { uuid?: string }>(
  mapState,
  mapDispatch
)(PersonalInformation);
