import * as React from "react";
import { connect } from "react-redux";
import { AppState } from "../../reducers";
import { ProfileState } from "../../reducers/profile";

interface Props {
  profile: ProfileState;
}

const ProfileBody = ({ profile }: Props) => {
  const {
    info: {
      Applicant: {
        aboutMe,
        ApplicantSkills,
        ApplicantIndustrySectors,
        EducationExperiences,
        JobExperiences,
        city
      },
      phone,
      email
    }
  } = profile;

  const formatIndustrySector = (sector: string) =>
    sector
      .split("_")
      .map(s =>
        s
          .slice(0, 1)
          .toUpperCase()
          .concat(s.slice(1).toLowerCase())
      )
      .join(" ");
  return (
    <div className="profile-body">
      <div className="profile-body-inner-section">
        <div className="profile-row">
          <div className="large-white-rectangle">
            <h3>Biography</h3>
            <p>{aboutMe}</p>
          </div>
          <div>
            <button className="message-me-button">Message</button>
            <div className="contact-buttons-container">
              <button className="contact-buttons">Website</button>
              <button className="contact-buttons">Resume</button>
            </div>
            <div className="small-white-rectangle">
              <p>
                <img src="/assets/phone-icon.png" alt="phone-number" /> {phone}
              </p>
              <p>
                <img src="/assets/mail-icon.png" alt="email" /> {email}
              </p>
            </div>
          </div>
        </div>
        <div className="profile-row">
          <div className="medium-white-rectangle">
            <h2>Education</h2>
            {EducationExperiences.map(education => (
              <div>
                <p>{education.educationLevel}</p>
                <p>
                  {education.university} {education.graduationYear}
                </p>
              </div>
            ))}
          </div>
          <div className="medium-white-rectangle">
            <h2>Experience</h2>
            {JobExperiences.map(job => (
              <div>
                <p>{job.name}</p>
                <p>{job.numOfYears} years</p>
              </div>
            ))}
          </div>
          <div className="medium-white-rectangle">
            <h2>Certifications</h2>
            <p>This needs to be added to the backend/signup flow</p>
          </div>
        </div>
        <div className="profile-row">
          <div className="large-white-rectangle center-content">
            <h3>Skills</h3>
            {ApplicantSkills.map(skill => (
              <div>
                <p className="skill-name">
                  {skill.Skill ? skill.Skill.displayName : ""}
                </p>
                <p className="skill-experience">
                  {skill.Skill ? skill.yearsExperience : ""} years experience
                </p>
              </div>
            ))}
            {ApplicantIndustrySectors.map(industrySector => (
              <div>
                <p className="skill-name">
                  {formatIndustrySector(
                    (industrySector.IndustrySector &&
                      industrySector.IndustrySector.name) ||
                      ""
                  )}
                </p>
                <p className="skill-experience">
                  {industrySector ? industrySector.yearsExperience : ""} years
                  experience
                </p>
              </div>
            ))}
          </div>
          <div className="large-white-rectangle center-content">
            <h3>Looking for work in...</h3>
            <p>{city}</p>
            <p>Map will go here</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default connect(
  ({ profile }: AppState) => ({ profile }),
  {}
)(ProfileBody);
