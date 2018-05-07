import * as React from "react";
import * as moment from "moment";
import { Formik } from "formik";
import Input from "../Shared/Input";
import { JobExperience } from "../../types";
import "../../styles/input.css";
import Select from "../Shared/Select";
import TextArea from "../Shared/TextArea";
import { ProfileState } from "../../reducers/profile";

type Props = {
  handleSubmit: (applicantId: number, jobExperience: JobExperience) => void;
  completePage: (applicantId: number) => void;
  profile: ProfileState;
};

class PageFive extends React.Component<Props> {
  render() {
    const {
      handleSubmit,
      profile: {
        info: {
          Applicant: { id, JobExperiences }
        }
      },
      completePage
    } = this.props;

    return (
      <React.Fragment>
        {JobExperiences.length > 0 &&
          JobExperiences.map(job => (
            <div>
              {job.name} - {job.companyName}
            </div>
          ))}
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
          }) =>
            handleSubmit(id, {
              name,
              companyName,
              description,
              currentlyWorkingHere: currentlyWorkingHere === "yes",
              numOfYears: moment(to).year() - moment(from).year()
            })
          }
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
            handleSubmit,
            isSubmitting
          }) => (
            <form onSubmit={handleSubmit}>
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
              <button type="submit">Add Job</button>
              <button
                style={{ float: "right" }}
                type="button"
                onClick={() => completePage(id)}
              >
                Finished
              </button>
            </form>
          )}
        />
      </React.Fragment>
    );
  }
}

export default PageFive;