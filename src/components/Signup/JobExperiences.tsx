import * as React from "react";
import { connect } from "react-redux";
import moment from "moment";
import { Link } from "react-router-dom";
import { Formik } from "formik";
import Input from "../Shared/Input";
import { JobExperience } from "../../types";
import Select from "../Shared/Select";
import TextArea from "../Shared/TextArea";
import { ProfileState } from "../../reducers/profile";
import Button from "../Shared/Button";
import {
  createJobExperienceRequest,
  updateApplicantRequest,
  deleteJobExperienceRequest
} from "../../actions/profile";
import { AppState } from "../../reducers";
import "../../styles/edit-profile.css";

type MapStateProps = {
  profile: ProfileState;
};

type MapDispatchProps = {
  createJobExperienceRequest: typeof createJobExperienceRequest;
  updateApplicantRequest: typeof updateApplicantRequest;
  deleteJobExperienceRequest: typeof deleteJobExperienceRequest;
};

type Props = MapStateProps & MapDispatchProps & { isInProfile?: boolean };

class Jobs extends React.Component<Props> {
  render() {
    const {
      createJobExperienceRequest,
      profile: {
        info: {
          Applicant: { id, JobExperiences }
        }
      },
      updateApplicantRequest,
      deleteJobExperienceRequest,
      isInProfile
    } = this.props;

    return (
      <>
        <div className="edit-profile-header">
          {JobExperiences.length > 0 &&
            JobExperiences.map(job => (
              <div key={`${job.name} -${job.companyName}`}>
                <p>
                  {job.name} - {job.companyName}
                  <span
                    onClick={() => deleteJobExperienceRequest(job.id || 0, id)}
                  >
                    ( X )
                  </span>
                </p>
              </div>
            ))}
          <h1>Show off your work experience</h1>
        </div>
        <div className="edit-profile-container">
          <Formik
            initialValues={{
              name: "",
              from: "",
              to: "",
              currentlyWorkingHere: "",
              description: "",
              companyName: ""
            }}
            onSubmit={({
              from,
              to,
              currentlyWorkingHere,
              name,
              companyName,
              description
            }: any) => {
              console.log(to, from);
              return createJobExperienceRequest(id, {
                name,
                companyName,
                description,
                currentlyWorkingHere: currentlyWorkingHere === "yes",
                numOfYears: moment(to).year() - moment(from).year()
              });
            }}
            validate={values => {
              let errors: JobExperience = {};
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
                <h2>Tell us a little about the positions you've worked.</h2>
                <Input
                  label="COMPANY NAME"
                  name="companyName"
                  type="text"
                  value={values.companyName}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  error={touched.companyName && errors.companyName}
                />
                <Input
                  label="TITLE"
                  type="text"
                  name="name"
                  value={values.name}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  error={touched.name && errors.name}
                />
                <Input
                  label="FROM"
                  name="from"
                  type="text"
                  value={values.from}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  error={touched.from && errors.from}
                />
                <Input
                  label="TO"
                  name="to"
                  type="text"
                  value={values.to}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  error={touched.to && errors.to}
                />
                <Select
                  label="ARE YOU CURRENTLY WORKING HERE?"
                  name="currentlyWorkingHere"
                  value={values.currentlyWorkingHere}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  error={
                    touched.currentlyWorkingHere && errors.currentlyWorkingHere
                  }
                >
                  <option value={undefined} />
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </Select>
                <TextArea
                  label="JOB DESCRIPTION"
                  name="description"
                  type="text-area"
                  value={values.description}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  error={touched.description && errors.description}
                />
                <Link to={isInProfile ? "/my-profile" : "/onboarding/signup/4"}>
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
                    SAVE
                  </Button>
                  {!isInProfile && (
                    <Button
                      type="button"
                      onClick={() =>
                        updateApplicantRequest(
                          id,
                          {
                            currentPageOfSignup: 6
                          },
                          "/onboarding/signup/6"
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
  createJobExperienceRequest,
  updateApplicantRequest,
  deleteJobExperienceRequest
};

export default connect<MapStateProps, MapDispatchProps, {}>(
  mapState,
  mapDispatch
)(Jobs);
