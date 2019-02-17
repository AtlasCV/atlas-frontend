import * as React from "react";
import { connect } from "react-redux";
import { AppState } from "../../reducers";
import { ProfileState } from "../../reducers/profile";
import Button from "../Shared/Button";

interface Props {
  profile: ProfileState;
}

const messageMeButtonStyle = {
  backgroundColor: "rgb(36, 114, 155)",
  color: "#fff",
  height: "48px",
  width: "100%",
  borderRadius: "10px"
};

const contactButtons = {
  color: "rgb(36, 114, 155)",
  backgroundColor: "#fff",
  marginTop: "20px",
  height: "36px",
  width: "48%",
  borderRadius: "10px"
};

const Header = ({ profile }: Props) => {
  const {
    info: {
      firstName,
      lastName,
      Applicant: { Industries, city }
    }
  } = profile;
  return (
    <div className="header">
      <div className="name-and-photo">
        <div className="image-placeholder" />
        <div>
          <h1>
            {firstName} {lastName}
          </h1>
          <h2>{Industries[0] && Industries[0].name}</h2>
          <h2>{city}</h2>
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
  ({ profile }: AppState) => ({ profile }),
  {}
)(Header);
