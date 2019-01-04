import * as React from "react";
import { Formik } from "formik";
import Input from "../Shared/Input";
import { EducationExperience } from "../../types";
import "../../styles/input.css";
import { ProfileState } from "../../reducers/profile";
import Button from "../Shared/Button";
import { Link } from "react-router-dom";

type Props = {
  handleSubmit: (
    applicantId: number,
    educationExperience: EducationExperience
  ) => void;
  completePage: (applicantId: number) => void;
  profile: ProfileState;
};

class PageFour extends React.Component<Props> {
  render() {
    const {
      handleSubmit,
      profile: {
        info: {
          Applicant: { id, EducationExperiences }
        }
      },
      completePage
    } = this.props;

    return (
      <React.Fragment>
        {EducationExperiences.length > 0 &&
          EducationExperiences.map(education => (
            <div key={education.id}>
              {education.university} - {education.educationLevel}{" "}
              {education.areaOfStudy} {education.graduationYear}{" "}
            </div>
          ))}
        <Formik
          initialValues={{
            university: "",
            areaOfStudy: "",
            gpa: "",
            educationLevel: "",
            graduationYear: ""
          }}
          onSubmit={educationExperience =>
            handleSubmit(id, educationExperience)
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
              <Link to="/onboarding/signup/3">
                <Button styles={{ float: "left" }}>PREVIOUS</Button>
              </Link>
              <div style={{ float: "right" }}>
                <Button styles={{ marginRight: "20px" }} type="submit">
                  ADD EDUCATION
                </Button>
                <Button type="button" onClick={() => completePage(id)}>
                  FINISHED
                </Button>
              </div>
            </form>
          )}
        />
      </React.Fragment>
    );
  }
}

export default PageFour;
