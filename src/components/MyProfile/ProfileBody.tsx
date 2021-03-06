import * as React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { AppState } from "../../reducers";
import { ProfileState } from "../../reducers/profile";
import { ApplicantState } from "../../reducers/applicants";
import Header from "./Header";
import {
  Certification,
  ApplicantSkill,
  ApplicantIndustrySector
} from "src/types";
import results from "../../constants/results";
import EducationExperience from "./EducationExperience";
import JobExperience from "./JobExperience";

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
        email,
        firstName,
        lastName
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
      firstName,
      lastName,
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
      firstName: User ? User.firstName : "",
      lastName: User ? User.lastName : "",
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

  const distinguishYourselfLink = isMyProfile
    ? "/my-profile/distinguish-yourself"
    : `/profiles/${profileDetail.firstName.toLowerCase()}-${profileDetail.lastName.toLowerCase()}/${
        profileDetail.id
      }/distinguish-yourself`;
  return (
    <div>
      <Header isMyProfile={!!isMyProfile} />
      <div className="profile-body">
        <div className="profile-body-inner-section">
          <div className="row">
            <div className="large-white-rectangle about-me col-lg-6">
              <h3>Biography</h3>
              <p>{profileDetail.aboutMe}</p>
              <p className="view-more">
                <Link className="view-more" to={distinguishYourselfLink}>
                  VIEW MORE
                </Link>
              </p>
            </div>

            <div className="offset-lg-1 col-lg-5">
              <div className="my-personality-type-badge-img large-white-rectangle">
                <img
                  src={`/assets/merit_badges/${
                    profileDetail.scoreSignature
                  }.png`}
                  alt={profileDetail.scoreSignature}
                />
              </div>
              <div className="personality-info large-white-rectangle">
                <h3>
                  {results[profileDetail.scoreSignature] &&
                    results[profileDetail.scoreSignature].name}
                </h3>
                <p>
                  {results[profileDetail.scoreSignature] &&
                    results[profileDetail.scoreSignature].description}
                </p>
                <Link
                  className="view-more"
                  to={`/personality-types/${profileDetail.scoreSignature}`}
                >
                  <p>VIEW MORE</p>
                </Link>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-4">
              <EducationExperience
                isMyProfile={isMyProfile}
                profileDetail={profileDetail}
              />
            </div>
            <div className="col-lg-4">
              <JobExperience
                isMyProfile={isMyProfile}
                profileDetail={profileDetail}
              />
            </div>
            <div className="col-lg-4">
              <div className="medium-white-rectangle">
                <h2>Certifications</h2>
                {profileDetail.Certifications &&
                  profileDetail.Certifications.map((cert: Certification) => (
                    <div key={cert.id} className="list-item">
                      <p>{cert.name}</p>
                    </div>
                  ))}
                {isMyProfile && (
                  <Link className="view-more" to="/my-profile/certifications">
                    <p>EDIT</p>
                  </Link>
                )}
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-8">
              <div className="large-white-rectangle center-content">
                <h3>Skills</h3>

                <div className="skill-body">
                  {profileDetail.ApplicantSkills.map(
                    (skill: ApplicantSkill) => (
                      <div className="skill" key={skill.SkillId}>
                        <p className="skill-name">
                          {skill.Skill ? skill.Skill.displayName : ""} <br />
                          {skill.Skill ? skill.yearsExperience : ""} years
                          experience
                        </p>
                      </div>
                    )
                  )}
                  {profileDetail.ApplicantIndustrySectors.map(
                    (industrySector: ApplicantIndustrySector) => (
                      <div
                        className="skill"
                        key={industrySector.IndustrySectorId}
                      >
                        <p className="skill-name">
                          {formatIndustrySector(
                            (industrySector.IndustrySector &&
                              industrySector.IndustrySector.name) ||
                              ""
                          )}{" "}
                          <br />
                          {industrySector
                            ? industrySector.yearsExperience
                            : ""}{" "}
                          years experience
                        </p>
                      </div>
                    )
                  )}
                </div>

                {isMyProfile && (
                  <Link className="view-more" to="/my-profile/skills">
                    <p>EDIT</p>
                  </Link>
                )}
              </div>
            </div>
            <div className="col-lg-4">
              <div className="large-white-rectangle contact-information">
                <h3 className="center-content">Contact Information</h3>
                <p>
                  <img src="/assets/phone-icon.png" alt="phone-number" />{" "}
                  {profileDetail.phone}
                </p>
                <p>
                  <img src="/assets/mail-icon.png" alt="email" />{" "}
                  {profileDetail.email}
                </p>
                <p>
                  <img src="/assets/location-icon.png" alt="city" />{" "}
                  {profileDetail.city}
                </p>
              </div>
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
