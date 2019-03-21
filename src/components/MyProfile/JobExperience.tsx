import * as React from "react";
import { Link } from "react-router-dom";
import Modal from "../Modal";
import { JobExperience } from "../../types";

export default ({ profileDetail, isMyProfile }: any) => {
  return (
    <div className="medium-white-rectangle">
      <h2>Experience</h2>
      {profileDetail.JobExperiences.map((job: JobExperience) => (
        <div key={job.id}>
          <Modal
            openModalComponent={
              <div className="list-item">
                <p>{job.name}</p>
                <p>{job.numOfYears} years</p>
              </div>
            }
          >
            <div>
              <h2>{job.name}</h2>
              <h2>{job.numOfYears} years</h2>
              <p>{job.companyName}</p>
              <p>{job.description}</p>
            </div>
          </Modal>
        </div>
      ))}
      {isMyProfile && (
        <Link className="view-more" to="/my-profile/job-experiences">
          <p>EDIT</p>
        </Link>
      )}
    </div>
  );
};
