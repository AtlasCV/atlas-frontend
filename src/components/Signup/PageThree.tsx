import * as React from "react";
import { Formik } from "formik";
import Input from "../Shared/Input";
import Select from "../Shared/Select";
import * as profileActions from "../../actions/profile";
import { loadIndustriesRequest } from "../../actions/industries";
import { UpdateApplicantFormProps, Industry } from "../../types";
import "../../styles/input.css";

type Props = {
  handleSubmit: (
    applicantId: number,
    applicantFormProps: UpdateApplicantFormProps
  ) => ReturnType<typeof profileActions.updateApplicantRequest>;
  loadIndustriesRequest: () => ReturnType<typeof loadIndustriesRequest>;
  applicantId: number;
  industries: Industry[];
  uuid: string;
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
          industry: "",
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
              name="industry"
              value={values.industry}
              handleChange={handleChange}
              handleBlur={handleBlur}
              error={touched.industry && errors.industry}
            >
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
            <button type="submit">Next</button>
          </form>
        )}
      />
    );
  }
}

export default PageThree;
