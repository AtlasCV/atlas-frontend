import * as React from "react";
import { Formik } from "formik";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Input from "../Shared/Input";
import { EducationExperience } from "../../types";
import { ProfileState } from "../../reducers/profile";
import Button from "../Shared/Button";
import {
  createEducationExperienceRequest,
  updateApplicantRequest,
  deleteEducationExperienceRequest
} from "../../actions/profile";
import { AppState } from "../../reducers";
import "../../styles/edit-profile.css";

type MapStateProps = {
  profile: ProfileState;
};

type MapDispatchProps = {
  createEducationExperienceRequest: typeof createEducationExperienceRequest;
  updateApplicantRequest: typeof updateApplicantRequest;
  deleteEducationExperienceRequest: typeof deleteEducationExperienceRequest;
};

type Props = MapStateProps & MapDispatchProps & { isInProfile?: boolean };

class PageFour extends React.Component<Props> {
  render() {
    const {
      createEducationExperienceRequest,
      profile: {
        info: {
          Applicant: { id, EducationExperiences }
        }
      },
      updateApplicantRequest,
      deleteEducationExperienceRequest,
      isInProfile
    } = this.props;

    return (
      <>
        <div className="edit-profile-header">
          {EducationExperiences.length > 0 &&
            EducationExperiences.map(education => (
              <p key={education.id}>
                {education.university} - {education.educationLevel}{" "}
                {education.areaOfStudy} {education.graduationYear}{" "}
                <span
                  onClick={() =>
                    deleteEducationExperienceRequest(education.id || 0, id)
                  }
                >
                  ( X )
                </span>
              </p>
            ))}
          <h1>Show off your education</h1>
        </div>
        <div className="edit-profile-container">
          <Formik
            initialValues={{
              university: "",
              areaOfStudy: "",
              gpa: "",
              educationLevel: "",
              graduationYear: ""
            }}
            onSubmit={educationExperience =>
              createEducationExperienceRequest(id, educationExperience)
            }
            validate={values => {
              let errors: EducationExperience = {};
              return errors;
            }}
            render={({
              values,
              errors,
              touched,
              handleBlur,
              handleChange,
              handleSubmit
            }: any) => (
              <form onSubmit={handleSubmit} className="edit-profile">
                <h2>Tell us a little about the degrees you've earned.</h2>
                <Input
                  label="LEVEL OF EDUCATION"
                  name="educationLevel"
                  type="text"
                  value={values.educationLevel}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  error={touched.educationLevel && errors.educationLevel}
                />
                <Input
                  label="SCHOOL"
                  type="text"
                  name="university"
                  value={values.university}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  error={touched.university && errors.university}
                />
                <Input
                  label="MAJOR"
                  name="areaOfStudy"
                  type="text"
                  value={values.areaOfStudy}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  error={touched.areaOfStudy && errors.areaOfStudy}
                />
                <Input
                  label="GRADUATION YEAR"
                  name="graduationYear"
                  type="text"
                  value={values.graduationYear}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  error={touched.graduationYear && errors.graduationYear}
                />
                <Input
                  label="GPA"
                  name="gpa"
                  type="text"
                  value={values.gpa}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  error={touched.gpa && errors.gpa}
                />
                <Link to={isInProfile ? "/my-profile" : "/onboarding/signup/3"}>
                  <Button
                    styles={{
                      float: "left",
                      color: "#fff",
                      backgroundColor: "rgb(223, 69, 67)",
                      border: "rgb(223, 69, 67) 1px solid"
                    }}
                  >
                    {isInProfile ? "BACK" : "PREVIOUS"}
                  </Button>
                </Link>
                <div style={{ float: "right" }}>
                  <Button
                    styles={{
                      marginRight: isInProfile ? "" : "20px",
                      backgroundColor: "#1e719d",
                      color: "#fff"
                    }}
                    type="submit"
                  >
                    {isInProfile ? "SAVE" : "ADD EDUCATION"}
                  </Button>
                  {!isInProfile && (
                    <Button
                      type="button"
                      onClick={() =>
                        updateApplicantRequest(
                          id,
                          {
                            currentPageOfSignup: 5
                          },
                          "/onboarding/signup/5/"
                        )
                      }
                    >
                      FINISHED
                    </Button>
                  )}
                </div>
              </form>
            )}
          />
        </div>
      </>
    );
  }
}

const mapState = ({ profile }: AppState) => ({ profile });

const mapDispatch = {
  createEducationExperienceRequest,
  updateApplicantRequest,
  deleteEducationExperienceRequest
};

export default connect<MapStateProps, MapDispatchProps, {}>(
  mapState,
  mapDispatch
)(PageFour);
