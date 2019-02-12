import * as React from "react";
import { connect } from "react-redux";
import { AppState } from "../../reducers";
import { ProfileState } from "../../reducers/profile";

interface Props {
  profile: ProfileState;
}

const Header = ({ profile }: Props) => {
  const {
    info: {
      firstName,
      lastName,
      Applicant: { Industries, city, PersonalityEvaluation }
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
          <button className="message-me-button">Message</button>
          <div className="contact-buttons-container">
            <button className="contact-buttons">Website</button>
            <button className="contact-buttons">Resume</button>
          </div>
        </div>
      </div>
      <div>
        <h2 className="personality-evaluator">
          {PersonalityEvaluation && PersonalityEvaluation.scoreSignature}
        </h2>
      </div>
    </div>
  );
};

export default connect(
  ({ profile }: AppState) => ({ profile }),
  {}
)(Header);
