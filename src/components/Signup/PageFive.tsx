import * as React from "react";
import * as moment from "moment";
import { Formik } from "formik";
import Input from "../Shared/Input";
import { JobExperience } from "../../types";
import "../../styles/input.css";
import Select from "../Shared/Select";
import TextArea from "../Shared/TextArea";

type Props = {
  handleSubmit: (applicantId: number, jobExperience: JobExperience) => void;
  applicantId: number;
  uuid: string;
};

class PageFive extends React.Component<Props> {
  render() {
    const { handleSubmit, applicantId } = this.props;

    return (
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
          handleSubmit(applicantId, {
            name,
            companyName,
            description,
            currentlyWorkingHere: currentlyWorkingHere === "yes",
            numOfYears: moment(from).year() - moment(to).year()
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
              name="areaOfStudy"
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
              name="to"
              type="text-area"
              value={values.description}
              handleChange={handleChange}
              handleBlur={handleBlur}
              error={touched.description && errors.description}
            />
            <button type="submit">Add Another</button>
            <button style={{ float: "right" }} type="submit">
              Finished
            </button>
          </form>
        )}
      />
    );
  }
}

export default PageFive;
