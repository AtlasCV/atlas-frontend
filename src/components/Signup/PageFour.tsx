import * as React from "react";
import { Formik } from "formik";
import Input from "../Shared/Input";
import { EducationExperience } from "../../types";
import "../../styles/input.css";

type Props = {
  handleSubmit: (
    applicantId: number,
    educationExperience: EducationExperience
  ) => void;
  completePage: (applicantId: number) => void;
  applicantId: number;
};

class PageFour extends React.Component<Props> {
  render() {
    const { handleSubmit, applicantId, completePage } = this.props;

    return (
      <Formik
        initialValues={{
          university: "",
          areaOfStudy: "",
          gpa: "",
          educationLevel: "",
          graduationYear: ""
        }}
        onSubmit={educationExperience =>
          handleSubmit(applicantId, educationExperience)
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
          handleSubmit,
          isSubmitting
        }) => (
          <form onSubmit={handleSubmit}>
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
            <button type="submit">Add Education</button>
            <button
              style={{ float: "right" }}
              onClick={() => completePage(applicantId)}
            >
              Finished
            </button>
          </form>
        )}
      />
    );
  }
}

export default PageFour;
