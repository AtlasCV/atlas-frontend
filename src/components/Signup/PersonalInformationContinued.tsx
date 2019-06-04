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
import {
  updateApplicantRequest,
  addResumeRequest,
  addProfilePictureRequest
} from "src/actions/profile";
import { DatePicker } from "../Shared/DatePicker";

type MapStateProps = {
  profile: ProfileState;
};

type MapDispatchProps = {
  updateApplicantRequest: typeof updateApplicantRequest;
  addResumeRequest: typeof addResumeRequest;
  addProfilePictureRequest: typeof addProfilePictureRequest;
};

type Props = MapStateProps & MapDispatchProps;

const PersonalInformationContinued = ({
  updateApplicantRequest,
  profile,
  addResumeRequest,
  addProfilePictureRequest,
  profile: {
    info: {
      Applicant: { id: applicantId }
    }
  }
}: Props) => {
  if (profile.fetchingApplicant) {
    return null;
  }

  let resumeFileUpload: any;
  const onResumeDrop = (event: any) => {
    console.log(resumeFileUpload.files);
    const file = resumeFileUpload.files[0];
    addResumeRequest(file, applicantId);
  };

  let fileUpload: any;
  const onDrop = (event: any) => {
    console.log(fileUpload.files);
    const file = fileUpload.files[0];
    addProfilePictureRequest(file, applicantId);
  };

  return (
    <Formik
      initialValues={{
        phone: profile.info.phone || "",
        profileImgUrl: profile.info.profileImgUrl || "",
        birthdayMonth: profile.info.birthday
          ? moment(profile.info.birthday).format("YYYY")
          : "",
        birthdayDay: profile.info.birthday
          ? moment(profile.info.birthday).format("DD")
          : "",
        birthdayYear: profile.info.birthday
          ? moment(profile.info.birthday).format("MM")
          : "",
        gender: profile.info.gender || ""
      }}
      onSubmit={applicantFormProps => {
        // @ts-ignore
        const { birthdayMonth, birthdayDay, birthdayYear } = applicantFormProps;
        updateApplicantRequest(
          applicantId,
          {
            ...applicantFormProps,
            birthday: `${birthdayMonth}/${birthdayDay}/${birthdayYear}`,
            currentPageOfSignup: 3
          },
          "/onboarding/signup/3"
        );
      }}
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
      }: any) => {
        return (
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
            <Link to="/onboarding/signup/1">
              <Button styles={{ float: "left" }}>PREVIOUS</Button>
            </Link>
            <Button styles={{ float: "right" }} type="submit">
              NEXT
            </Button>
          </form>
        );
      }}
    />
  );
};

const mapState = ({ profile }: AppState) => ({ profile });

const mapDispatch = {
  updateApplicantRequest,
  addResumeRequest,
  addProfilePictureRequest
};

export default connect<MapStateProps, MapDispatchProps, {}>(
  mapState,
  mapDispatch
)(PersonalInformationContinued);
