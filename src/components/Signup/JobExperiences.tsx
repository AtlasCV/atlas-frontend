import * as React from "react";
import { connect } from "react-redux";
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
import { DatePicker } from "../Shared/DatePicker";

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
      isInProfile
    } = this.props;

    return (
      <>
        <div className="edit-profile-header">
          {JobExperiences.length > 0 &&
            JobExperiences.map(this._renderAddedJobExperiences)}
        </div>
        <h1>Show off your work experience</h1>
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
            onSubmit={(
              {
                fromYear,
                toYear,
                currentlyWorkingHere,
                name,
                companyName,
                description
              }: any,
              { resetForm }
            ) => {
              createJobExperienceRequest(id, {
                name,
                companyName,
                description,
                currentlyWorkingHere: currentlyWorkingHere === "yes",
                numOfYears: +toYear - +fromYear
              });
              resetForm();
              window.scrollTo(0, 0);
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
                  label="OFFICIAL COMPANY NAME"
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
                <label style={{ color: "#fff" }}>FROM</label>
                <DatePicker
                  values={values}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  errors={errors}
                  namePrefix="from"
                />
                <label style={{ color: "#fff" }}>TO</label>
                <DatePicker
                  values={values}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  errors={errors}
                  namePrefix="to"
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
                    {isInProfile ? "SAVE" : "ADD ANOTHER"}
                  </Button>
                  {!isInProfile && (
                    <Button
                      type="button"
                      onClick={() => {
                        createJobExperienceRequest(id, {
                          name: values.name,
                          companyName: values.companyName,
                          description: values.description,
                          currentlyWorkingHere:
                            values.currentlyWorkingHere === "yes",
                          numOfYears: +values.toYear - +values.fromYear
                        });
                        updateApplicantRequest(
                          id,
                          {
                            currentPageOfSignup: 6
                          },
                          "/onboarding/signup/6"
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

  private _renderAddedJobExperiences = (job: JobExperience) => (
    <div
      className="added-job-experience"
      key={`${job.name} -${job.companyName}`}
    >
      <p>
        {job.name} - {job.companyName}
        <span
          className="delete-job-experience"
          onClick={() =>
            this.props.deleteJobExperienceRequest(
              job.id || 0,
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
  createJobExperienceRequest,
  updateApplicantRequest,
  deleteJobExperienceRequest
};

export default connect<MapStateProps, MapDispatchProps, {}>(
  mapState,
  mapDispatch
)(Jobs);
