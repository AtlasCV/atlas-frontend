import * as React from "react";
import { Formik } from "formik";
import Input from "../Shared/Input";
import Select from "../Shared/Select";
import { loadIndustriesRequest } from "../../actions/industries";
import { UpdateApplicantFormProps, Industry } from "../../types";
import "../../styles/input.css";
import Button from "../Shared/Button";

type Props = {
  handleSubmit: (
    applicantId: number,
    applicantFormProps: UpdateApplicantFormProps
  ) => void;
  loadIndustriesRequest: typeof loadIndustriesRequest;
  applicantId: number;
  industries: Industry[];
};

class PageThree extends React.Component<Props> {
  componentDidMount() {
    this.props.loadIndustriesRequest();
  }

  render() {
    const { handleSubmit, applicantId, industries } = this.props;

    return (
      <Formik
        initialValues={{
          industryId: 0,
          city: "",
          jobType: ""
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
            <Button type="submit">Next</Button>
          </form>
        )}
      />
    );
  }
}

export default PageThree;
