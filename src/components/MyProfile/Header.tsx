import * as React from "react";
import { connect } from "react-redux";
import Dropzone from "react-dropzone";
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
      Applicant: { JobExperiences, city },
      id
    }
  } = profile;
  if (isMyProfile) {
    profileDetail = {
      firstName,
      lastName,
      JobExperiences,
      city,
      id
    };
  } else {
    profileDetail = {
      firstName: detail.User ? detail.User.firstName : "",
      lastName: detail.User ? detail.User.lastName : "",
      JobExperiences: detail.JobExperiences,
      city: detail.city
    };
  }

  const onDrop = (acceptedFiles: any) => {
    acceptedFiles.forEach((file: any) => {
      const reader = new FileReader();

      reader.onload = () => {
        const imgData = { base64Img: reader.result, file };
        addProfilePicture(imgData as any, profileDetail.id);
      };
      reader.onabort = () => console.log("file reading was aborted");
      reader.onerror = () => console.log("file reading has failed");

      reader.readAsDataURL(file);
    });
  };

  return (
    <div className="header">
      <div className="name-and-photo">
        <Dropzone onDrop={onDrop}>
          {({ getRootProps, getInputProps }) => (
            <div
              {...getRootProps()}
              style={{
                width: 200,
                height: 200,
                borderRadius: "50%",
                backgroundColor: "#f5f5f5"
              }}
            >
              <input {...getInputProps()} />
            </div>
          )}
        </Dropzone>

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
