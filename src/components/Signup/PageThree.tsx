import * as React from "react";
import { Formik } from "formik";
import Input from "../Shared/Input";
import Select from "../Shared/Select";
import { loadIndustriesRequest } from "../../actions/industries";
import { UpdateApplicantFormProps, Industry } from "../../types";
import "../../styles/input.css";
import Button from "../Shared/Button";
import { Link } from "react-router-dom";
import { ProfileState } from "../../reducers/profile";

type Props = {
  handleSubmit: (
    applicantId: number,
    applicantFormProps: UpdateApplicantFormProps
  ) => void;
  loadIndustriesRequest: typeof loadIndustriesRequest;
  applicantId: number;
  industries: Industry[];
  profile: ProfileState;
};

class PageThree extends React.Component<Props> {
  componentDidMount() {
    this.props.loadIndustriesRequest();
  }

  render() {
    const { handleSubmit, applicantId, industries, profile } = this.props;

    return (
      <Formik
        initialValues={{
          industryId:
            (profile.info.Applicant.Industries[0] &&
              profile.info.Applicant.Industries[0].id) ||
            0,
          city: profile.info.Applicant.city || "",
          jobType: profile.info.Applicant.jobType || ""
        }}
        onSubmit={applicantFormProps =>
          handleSubmit(applicantId, applicantFormProps)
        }
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
          handleSubmit,
          isSubmitting
        }) => (
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
            <Input
              label="CITY"
              name="city"
              type="text"
              value={values.city}
              handleChange={handleChange}
              handleBlur={handleBlur}
              error={touched.city && errors.city}
            />
            <Select
              label="JOB TYPE"
              name="jobType"
              value={values.jobType}
              handleChange={handleChange}
              handleBlur={handleBlur}
              error={touched.jobType && errors.jobType}
            >
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
    );
  }
}

export default PageThree;
