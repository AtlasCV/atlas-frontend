import * as React from "react";
import { connect } from "react-redux";
import { Formik } from "formik";
import * as moment from "moment";
import Input from "../Shared/Input";
import "../../styles/input.css";
import Button from "../Shared/Button";
import { ProfileState } from "../../reducers/profile";
import {
  updateApplicantRequest,
  addResumeRequest,
  addProfilePictureRequest
} from "../../actions/profile";
import { AppState } from "src/reducers";
import { DatePicker } from "../Shared/DatePicker";
import Select from "../Shared/Select";
import { Link } from "react-router-dom";

type MapStateProps = { profile: ProfileState };

type MapDispatchProps = {
  updateApplicantRequest: typeof updateApplicantRequest;
  addResumeRequest: typeof addResumeRequest;
  addProfilePictureRequest: typeof addProfilePictureRequest;
};

type OtherProps = {
  uuid?: string;
  isInProfile?: boolean;
};

type Props = MapStateProps & MapDispatchProps & OtherProps;

const PersonalInformation = ({
  updateApplicantRequest,
  addResumeRequest,
  addProfilePictureRequest,
  profile
}: Props) => {
  if (profile.fetchingApplicant) {
    return null;
  }

  let resumeFileUpload: any;
  const onResumeDrop = (event: any) => {
    const file = resumeFileUpload.files[0];
    addResumeRequest(file, profile.info.Applicant.id);
  };

  let fileUpload: any;
  const onDrop = (event: any) => {
    const file = fileUpload.files[0];
    addProfilePictureRequest(file, profile.info.Applicant.id);
  };

  return (
    <div>
      <Formik
        initialValues={{
          firstName: profile.info.firstName || "",
          lastName: profile.info.lastName || "",
          email: profile.info.email || "",
          linkedIn: profile.info.Applicant.linkedIn || "",
          phone: profile.info.phone || "",
          profileImgUrl: profile.info.profileImgUrl || "",
          birthdayMonth: profile.info.birthday
            ? moment(profile.info.birthday).format("MM")
            : "",
          birthdayDay: profile.info.birthday
            ? moment(profile.info.birthday).format("D")
            : "",
          birthdayYear: profile.info.birthday
            ? moment(profile.info.birthday).format("YYYY")
            : "",
          gender: profile.info.gender || "",
          website: profile.info.Applicant.website
        }}
        onSubmit={(values: any) => {
          const { birthdayMonth, birthdayDay, birthdayYear } = values;

          updateApplicantRequest(profile.info.Applicant.id, {
            ...values,
            birthday: `${birthdayMonth}/${birthdayDay}/${birthdayYear}`
          });
        }}
        validate={(values: any) => {
          let errors: {
            firstName?: string;
            lastName?: string;
            email?: string;
          } = {};
          Object.keys(errors).forEach(key => {
            if (values[key] !== "linkedIn" && !values[key]) {
              errors[key] = "Required";
            }
          });
          if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
            errors.email = "Invalid email address";
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
              <Input
                label="PHONE"
                name="phone"
                type="tel"
                value={values.phone}
                handleChange={handleChange}
                handleBlur={handleBlur}
                error={touched.phone && errors.phone}
              />

              {!profile.info.profileImgUrl ? (
                <Input
                  type="file"
                  handleChange={onDrop}
                  reference={ref => (fileUpload = ref)}
                  accept="image/*"
                  id="profile-img-upload"
                  label="PROFILE PICTURE"
                  handleBlur={handleBlur}
                  name="profileImgUrl"
                  error={false}
                  value=""
                />
              ) : (
                <div className="">
                  <a href={profile.info.profileImgUrl} target="_blank">
                    View Uploaded Profile Picture
                  </a>
                  <Input
                    type="file"
                    handleChange={onDrop}
                    reference={ref => (fileUpload = ref)}
                    accept="image/*"
                    id="profile-img-upload"
                    label="CHANGE PROFILE PICTURE"
                    handleBlur={handleBlur}
                    name="profileImgUrl"
                    error={false}
                    value=""
                  />
                </div>
              )}

              {!profile.info.Applicant.resumeUrl ? (
                <Input
                  type="file"
                  handleChange={onResumeDrop}
                  reference={ref => (resumeFileUpload = ref)}
                  accept="application/pdf"
                  id="resume-upload"
                  label="ADD RESUME"
                  handleBlur={handleBlur}
                  name="resume"
                  error={false}
                  value=""
                />
              ) : (
                <div className="">
                  <a href={profile.info.Applicant.resumeUrl} target="_blank">
                    View Uploaded Resume
                  </a>
                  <Input
                    type="file"
                    handleChange={onResumeDrop}
                    reference={ref => (resumeFileUpload = ref)}
                    accept="application/pdf"
                    id="resume-upload"
                    label="CHANGE RESUME"
                    handleBlur={handleBlur}
                    name="resume"
                    error={false}
                    value=""
                  />
                </div>
              )}

              <label>BIRTHDAY</label>
              <DatePicker
                values={values}
                handleChange={handleChange}
                handleBlur={handleBlur}
                errors={errors}
                namePrefix="birthday"
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

              <Link to={"/my-profile"}>
                <Button styles={{ float: "left" }}>BACK</Button>
              </Link>
              <Button
                styles={{ float: "right" }}
                disabled={isSubmitting}
                type="submit"
              >
                SAVE
              </Button>
            </form>
          );
        }}
      />
    </div>
  );
};

const mapState = ({ profile }: AppState) => ({ profile });

const mapDispatch = {
  addResumeRequest,
  addProfilePictureRequest,
  updateApplicantRequest
};

export default connect<
  MapStateProps,
  MapDispatchProps,
  { uuid?: string; isInProfile?: boolean }
>(
  mapState,
  mapDispatch
)(PersonalInformation);
