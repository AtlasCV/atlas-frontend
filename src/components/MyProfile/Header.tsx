import * as React from "react";
import { connect } from "react-redux";
import { AppState } from "../../reducers";
import { ProfileState } from "../../reducers/profile";
import Button from "../Shared/Button";
import { ApplicantState } from "src/reducers/applicants";
import { addProfilePictureRequest } from "src/actions/profile";

interface Props {
  profile: ProfileState;
  applicants: ApplicantState;
  isMyProfile: boolean;
  addProfilePicture: typeof addProfilePictureRequest;
}

const messageMeButtonStyle = {
  backgroundColor: "rgb(36, 114, 155)",
  color: "#fff",
  height: "48px",
  width: "100%",
  borderRadius: "10px",
  marginTop: "10px"
};

const contactButtons = {
  color: "rgb(36, 114, 155)",
  backgroundColor: "#fff",
  marginTop: "10px",
  height: "36px",
  width: "50%",
  borderRadius: "10px"
};

const Header = ({
  profile,
  applicants: { detail },
  isMyProfile,
  addProfilePicture
}: Props) => {
  let profileDetail: any;

  const {
    info: {
      firstName,
      lastName,
      Applicant: { JobExperiences, city, PersonalityEvaluation },
      id,
      profileImgUrl
    }
  } = profile;
  if (isMyProfile) {
    profileDetail = {
      firstName,
      lastName,
      JobExperiences,
      city,
      id,
      profileImgUrl,
      scoreSignature: PersonalityEvaluation
        ? PersonalityEvaluation.scoreSignature
        : ""
    };
  } else {
    profileDetail = {
      firstName: detail.User ? detail.User.firstName : "",
      lastName: detail.User ? detail.User.lastName : "",
      JobExperiences: detail.JobExperiences,
      profileImgUrl: detail.User ? detail.User.profileImgUrl : "",
      city: detail.city,
      scoreSignature:
        detail.PersonalityEvaluation &&
        detail.PersonalityEvaluation.scoreSignature
    };
  }

  let fileUpload: any;
  const onDrop = (event: any) => {
    console.log(fileUpload.files);
    const file = fileUpload.files[0];
    addProfilePicture(file, profileDetail.id);
  };

  return (
    <div className="header row">
      <div className="name-and-photo col-lg-6">
        {profileDetail.profileImgUrl ? (
          <React.Fragment>
            <div className="center-content">
              <img
                className="profile-image"
                src={profileDetail.profileImgUrl}
                alt="profile-image"
              />
              {isMyProfile && (
                <>
                  <input
                    type="file"
                    onChange={onDrop}
                    ref={ref => (fileUpload = ref)}
                    accept="image/*"
                    className="profile-upload"
                    id="profile-upload"
                  />
                  <label htmlFor="profile-upload">Change Photo</label>
                </>
              )}
            </div>
          </React.Fragment>
        ) : (
          <React.Fragment>
            {isMyProfile ? (
              <>
                <input
                  type="file"
                  onChange={onDrop}
                  ref={ref => (fileUpload = ref)}
                  accept="image/*"
                  className="profile-upload"
                  id="profile-upload"
                />
                <label htmlFor="profile-upload">Add Photo</label>
              </>
            ) : (
              <div className="circle" />
            )}
          </React.Fragment>
        )}

        <div className="name-and-title">
          <h1>
            {profileDetail.firstName} {profileDetail.lastName}
          </h1>
          <h2 className="sans-serif">
            {profileDetail.JobExperiences[0] &&
              profileDetail.JobExperiences[0].name}
          </h2>
          <h2 className="sans-serif">{profileDetail.city}</h2>
          <Button styles={messageMeButtonStyle}>Message</Button>
          <div className="contact-buttons-container">
            <Button styles={contactButtons}>Website</Button>
            <Button styles={contactButtons}>Resume</Button>
          </div>
        </div>
      </div>
      <div className="col-lg-5 offset-lg-1">
        <img
          className="my-personality-type-img"
          src={`/assets/trophies/${profileDetail.scoreSignature}.png`}
          alt={profileDetail.scoreSignature}
        />
      </div>
    </div>
  );
};

export default connect(
  ({ profile, applicants }: AppState) => ({ profile, applicants }),
  { addProfilePicture: addProfilePictureRequest }
)(Header);
