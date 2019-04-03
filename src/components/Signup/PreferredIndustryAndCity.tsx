import * as React from "react";
import { connect } from "react-redux";
import { Formik } from "formik";
import Select from "../Shared/Select";
import {
  loadIndustriesRequest,
  addIndustriesToApplicantRequest
} from "../../actions/industries";
import { UpdateApplicantFormProps } from "../../types";
import "../../styles/input.css";
import Button from "../Shared/Button";
import { Link } from "react-router-dom";
import { ProfileState } from "../../reducers/profile";
import { AppState } from "src/reducers";
import { updateApplicantRequest } from "src/actions/profile";
import { IndustryState } from "src/reducers/industries";

type MapStateProps = {
  industries: IndustryState;
  profile: ProfileState;
};

type MapDispatchProps = {
  loadIndustriesRequest: typeof loadIndustriesRequest;
  updateApplicantRequest: typeof updateApplicantRequest;
  addIndustriesToApplicantRequest: typeof addIndustriesToApplicantRequest;
};

type Props = MapStateProps & MapDispatchProps;

class PageThree extends React.Component<Props> {
  componentDidMount() {
    this.props.loadIndustriesRequest();
  }

  render() {
    const {
      updateApplicantRequest,
      addIndustriesToApplicantRequest,
      industries: { list: industries },
      profile
    } = this.props;
    const {
      info: {
        Applicant: { id: applicantId }
      }
    } = profile;
    return (
      <div>
        <h5>Select the industries you want to seek jobs in:</h5>
        <Formik
          initialValues={{
            industryId:
              (profile.info.Applicant.Industries[0] &&
                profile.info.Applicant.Industries[0].id) ||
              0,
            city: profile.info.Applicant.city || "",
            jobType: profile.info.Applicant.jobType || ""
          }}
          onSubmit={(applicantFormProps: UpdateApplicantFormProps) => {
            updateApplicantRequest(
              applicantId,
              { ...applicantFormProps, currentPageOfSignup: 4 },
              "/onboarding/signup/4/"
            );
            if (applicantFormProps.industryId) {
              addIndustriesToApplicantRequest(applicantId, [
                +applicantFormProps.industryId
              ]);
            }
          }}
          validate={values => {
            let errors: UpdateApplicantFormProps = {};
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
            <form onSubmit={handleSubmit}>
              <Select
                label="INDUSTRY"
                name="industryId"
                value={values.industryId}
                handleChange={handleChange}
                handleBlur={handleBlur}
                error={touched.industryId && errors.industryId}
              >
                <option value={0}>{` `}</option>
                {industries.map(industry => (
                  <option key={industry.id} value={industry.id}>
                    {industry.name}
                  </option>
                ))}
              </Select>
              <Select
                label="REGION"
                name="city"
                value={values.city}
                handleChange={handleChange}
                handleBlur={handleBlur}
                error={touched.city && errors.city}
              >
                <option value={""}>{` `}</option>
                <option value="NYC">NYC</option>
                <option value="Brooklyn">Brooklyn</option>
                <option value="Queens">Queens</option>
                <option value="Long Island">Long Island</option>
                <option value="Rye/White Plains">Rye/White Plains</option>
              </Select>
              <Select
                label="JOB TYPE"
                name="jobType"
                value={values.jobType}
                handleChange={handleChange}
                handleBlur={handleBlur}
                error={touched.jobType && errors.jobType}
              >
                <option value="">{` `}</option>
                <option value="fullTime">Full Time</option>
                <option value="partTime">Part Time</option>
                <option value="internship">Internship</option>
              </Select>
              <Link to="/onboarding/signup/2">
                <Button styles={{ float: "left" }}>PREVIOUS</Button>
              </Link>
              <Button styles={{ float: "right" }} type="submit">
                NEXT
              </Button>
            </form>
          )}
        />
      </div>
    );
  }
}

const mapState = ({ profile, industries }: AppState) => ({
  profile,
  industries
});

const mapDispatch = {
  updateApplicantRequest,
  addIndustriesToApplicantRequest,
  loadIndustriesRequest
};

export default connect<MapStateProps, MapDispatchProps, {}>(
  mapState,
  mapDispatch
)(PageThree);
