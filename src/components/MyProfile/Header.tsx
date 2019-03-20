import * as React from "react";
import { connect } from "react-redux";
import { AppState } from "../../reducers";
import { ProfileState } from "../../reducers/profile";
import Button from "../Shared/Button";
import { ApplicantState } from "src/reducers/applicants";
// import Modal from "../Modal";
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
      Applicant: { JobExperiences, city },
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
      profileImgUrl
    };
  } else {
    profileDetail = {
      firstName: detail.User ? detail.User.firstName : "",
      lastName: detail.User ? detail.User.lastName : "",
      JobExperiences: detail.JobExperiences,
      profileImgUrl: detail.User ? detail.User.profileImgUrl : "",
      city: detail.city
    };
  }

  let fileUpload: any;
  const onDrop = (event: any) => {
    console.log(fileUpload.files);
    const file = fileUpload.files[0];
    addProfilePicture(file, profileDetail.id);
  };

  return (
    <div className="header">
      <div className="name-and-photo">
        {profileDetail.profileImgUrl ? (
          <img
            className="profile-image"
            src={profileDetail.profileImgUrl}
            alt="profile-image"
          />
        ) : (
          isMyProfile && (
            <React.Fragment>
              <input
                type="file"
                onChange={onDrop}
                ref={ref => (fileUpload = ref)}
                accept="image/*"
                className="profile-upload"
                id="profile-upload"
              />
              <label htmlFor="profile-upload" />
            </React.Fragment>
          )
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
    </div>
  );
};

export default connect(
  ({ profile, applicants }: AppState) => ({ profile, applicants }),
  { addProfilePicture: addProfilePictureRequest }
)(Header);
