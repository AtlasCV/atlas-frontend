import * as React from "react";
import { Link } from "react-router-dom";
import Modal from "../Modal";
import { EducationExperience } from "../../types";

export default ({ profileDetail, isMyProfile }: any) => {
  return (
    <div className="medium-white-rectangle">
      <h2>Education</h2>
      {profileDetail.EducationExperiences.map(
        (education: EducationExperience) => (
          <div key={education.id}>
            <Modal
              openModalComponent={
                <div className="list-item">
                  <p>{education.educationLevel}</p>
                  <p>
                    {education.university} {education.graduationYear}
                  </p>
                </div>
              }
            >
              <div>
                <h2>
                  {education.university} {education.graduationYear}
                </h2>
                <h2>{education.educationLevel}</h2>
                <p>GPA: {education.gpa}</p>
                <p>Major: {education.areaOfStudy}</p>
              </div>
            </Modal>
          </div>
        )
      )}
      {isMyProfile && (
        <Link className="view-more" to="/my-profile/education">
          <p>EDIT</p>
        </Link>
      )}
    </div>
  );
};
