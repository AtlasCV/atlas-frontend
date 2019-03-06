import * as React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { AppState } from "../../reducers";
import { ProfileState } from "../../reducers/profile";
import { ApplicantState } from "../../reducers/applicants";
import Header from "./Header";
import {
  EducationExperience,
  JobExperience,
  Certification,
  ApplicantSkill,
  ApplicantIndustrySector
} from "src/types";

interface Props {
  profile: ProfileState;
  applicants: ApplicantState;
  isMyProfile: boolean;
}

const ProfileBody = ({ profile, applicants, isMyProfile }: Props) => {
  let profileDetail: any = {};
  if (isMyProfile) {
    const {
      info: {
        Applicant: {
          aboutMe,
          ApplicantSkills,
          ApplicantIndustrySectors,
          EducationExperiences,
          JobExperiences,
          Certifications,
          city,
          PersonalityEvaluation
        },
        phone,
        email
      }
    } = profile;
    profileDetail = {
      aboutMe,
      ApplicantSkills,
      ApplicantIndustrySectors,
      EducationExperiences,
      JobExperiences,
      Certifications,
      city,
      phone,
      email,
      scoreSignature: PersonalityEvaluation
        ? PersonalityEvaluation.scoreSignature
        : ""
    };
  } else {
    const {
      detail: {
        aboutMe,
        ApplicantSkills,
        ApplicantIndustrySectors,
        EducationExperiences,
        JobExperiences,
        Certifications,
        city,
        User,
        PersonalityEvaluation
      }
    } = applicants;
    profileDetail = {
      aboutMe,
      ApplicantSkills,
      ApplicantIndustrySectors,
      EducationExperiences,
      JobExperiences,
      Certifications,
      city,
      phone: User ? User.phone : "",
      email: User ? User.email : "",
      id: User ? User.id : "",
      scoreSignature: PersonalityEvaluation
        ? PersonalityEvaluation.scoreSignature
        : ""
    };
  }

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
    <div>
      <Header isMyProfile={!!isMyProfile} />
      <div className="profile-body">
        <div className="profile-body-inner-section">
          <div className="profile-row">
            <div className="large-white-rectangle about-me">
              <h3>Biography</h3>
              <p>{profileDetail.aboutMe}</p>
              <p className="view-more">
                <Link
                  className="view-more"
                  to={
                    isMyProfile
                      ? "/my-profile/distinguish-yourself"
                      : `/profiles/${profileDetail.id}/distinguish-yourself`
                  }
                >
                  + More
                </Link>
              </p>
            </div>
            <div>
              <img
                className="trophy-img my-personality-type-img"
                src={`/assets/trophies/${profileDetail.scoreSignature}.png`}
                alt={profileDetail.scoreSignature}
              />
              <div className="small-white-rectangle">
                <p>
                  <img src="/assets/phone-icon.png" alt="phone-number" />{" "}
                  {profileDetail.phone}
                </p>
                <p>
                  <img src="/assets/mail-icon.png" alt="email" />{" "}
                  {profileDetail.email}
                </p>
              </div>
            </div>
          </div>
          <div className="profile-row">
            <div className="medium-white-rectangle">
              <h2>Education</h2>
              {profileDetail.EducationExperiences.map(
                (education: EducationExperience) => (
                  <div key={education.id} className="list-item">
                    <p>{education.educationLevel}</p>
                    <p>
                      {education.university} {education.graduationYear}
                    </p>
                  </div>
                )
              )}
              {isMyProfile && (
                <Link className="view-more" to="/my-profile/education">
                  <p>+ More</p>
                </Link>
              )}
            </div>
            <div className="medium-white-rectangle">
              <h2>Experience</h2>
              {profileDetail.JobExperiences.map((job: JobExperience) => (
                <div key={job.id} className="list-item">
                  <p>{job.name}</p>
                  <p>{job.numOfYears} years</p>
                </div>
              ))}
              {isMyProfile && (
                <Link className="view-more" to="/my-profile/job-experiences">
                  <p>+ More</p>
                </Link>
              )}
            </div>
            <div className="medium-white-rectangle">
              <h2>Certifications</h2>
              {profileDetail.Certifications.map((cert: Certification) => (
                <div key={cert.id} className="list-item">
                  <p>{cert.name}</p>
                </div>
              ))}
              {isMyProfile && (
                <Link className="view-more" to="/my-profile/certifications">
                  <p>+ More</p>
                </Link>
              )}
            </div>
          </div>
          <div className="profile-row">
            <div className="large-white-rectangle center-content">
              <h3>Skills</h3>
              {profileDetail.ApplicantSkills.map((skill: ApplicantSkill) => (
                <div key={skill.SkillId}>
                  <p className="skill-name">
                    {skill.Skill ? skill.Skill.displayName : ""}
                  </p>
                  <p className="skill-experience">
                    {skill.Skill ? skill.yearsExperience : ""} years experience
                  </p>
                </div>
              ))}
              {profileDetail.ApplicantIndustrySectors.map(
                (industrySector: ApplicantIndustrySector) => (
                  <div key={industrySector.IndustrySectorId}>
                    <p className="skill-name">
                      {formatIndustrySector(
                        (industrySector.IndustrySector &&
                          industrySector.IndustrySector.name) ||
                          ""
                      )}
                    </p>
                    <p className="skill-experience">
                      {industrySector ? industrySector.yearsExperience : ""}{" "}
                      years experience
                    </p>
                  </div>
                )
              )}
              {isMyProfile && (
                <Link className="view-more" to="/my-profile/skills">
                  <p>+ More</p>
                </Link>
              )}
            </div>
            <div className="large-white-rectangle center-content">
              <h3>Looking for work in...</h3>
              <p>{profileDetail.city}</p>
              <p>Map will go here</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default connect(
  ({ profile, applicants }: AppState) => ({ profile, applicants }),
  {}
)(ProfileBody);
