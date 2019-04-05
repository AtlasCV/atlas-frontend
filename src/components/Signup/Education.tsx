import * as React from "react";
import { range } from "lodash";
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
import Select from "../Shared/Select";

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
      isInProfile
    } = this.props;

    return (
      <>
        <div className="edit-profile-header">
          {EducationExperiences.length > 0 &&
            EducationExperiences.map(this._renderAddedEducations)}
        </div>
        <h1>Show off your education</h1>
        <div className="edit-profile-container">
          <Formik
            initialValues={{
              university: "",
              areaOfStudy: "",
              gpa: "",
              educationLevel: "",
              graduationYear: ""
            }}
            onSubmit={(educationExperience, { resetForm }) => {
              createEducationExperienceRequest(id, educationExperience);
              resetForm();
              window.scrollTo(0, 0);
            }}
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
                <h2>
                  Be sure to list each level of your education. You never know
                  what doors it may open!
                </h2>

                <Select
                  label="LEVEL OF EDUCATION"
                  name="educationLevel"
                  value={values.educationLevel}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  error={touched.educationLevel && errors.educationLevel}
                >
                  <option value="">{` `}</option>
                  <option value="High School">High School</option>
                  <option value="Associate's Degree">Associate's Degree</option>
                  <option value="Bachelor's Degree">Bachelor's Degree</option>
                  <option value="Master's Degree">Master's Degree</option>
                  <option value="PHD">PHD</option>
                  <option value="Graduate / Professional Degree">
                    Graduate / Professional Degree
                  </option>
                </Select>

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

                <Select
                  label="GRADUATION YEAR"
                  name="graduationYear"
                  value={values.graduationYear}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  error={touched.graduationYear && errors.graduationYear}
                >
                  <option value="">{` `}</option>

                  {range(2019, 1960).map(i => (
                    <option key={i}>{i}</option>
                  ))}
                </Select>
                <Select
                  label="GPA"
                  name="gpa"
                  value={values.gpa}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  error={touched.gpa && errors.gpa}
                >
                  <option value="">{` `}</option>

                  {range(40, 0).map(i => (
                    <option key={i}>{(i / 10).toFixed(1)}</option>
                  ))}
                </Select>
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
                    {isInProfile ? "SAVE" : "ADD ANOTHER"}
                  </Button>
                  {!isInProfile && (
                    <Button
                      type="button"
                      onClick={() => {
                        createEducationExperienceRequest(id, values);
                        updateApplicantRequest(
                          id,
                          {
                            currentPageOfSignup: 5
                          },
                          "/onboarding/signup/5/"
                        );
                      }}
                    >
                      CONTINUE
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

  private _renderAddedEducations = (education: EducationExperience) => (
    <div className="added-education">
      <p key={education.id}>
        {education.university} - {education.educationLevel}{" "}
        {education.areaOfStudy} {education.graduationYear}{" "}
        <span
          className="delete-education"
          onClick={() =>
            this.props.deleteEducationExperienceRequest(
              education.id || 0,
              this.props.profile.info.Applicant.id
            )
          }
        >
          ( X )
        </span>
      </p>
    </div>
  );
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
