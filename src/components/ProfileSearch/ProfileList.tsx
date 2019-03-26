import * as React from "react";
import { connect } from "react-redux";
import { AppState } from "../../reducers";
import { loadApplicantsRequest } from "../../actions/applicants";
import "../../styles/profile-list.css";
import Button from "../Shared/Button";
import { Link } from "react-router-dom";
import { Applicant } from "src/types";

type MapDispatchProps = { loadApplicantsRequest: typeof loadApplicantsRequest };

type Props = Partial<AppState> & MapDispatchProps;

const buttonStyles = {
  backgroundColor: "#24729b",
  color: "#fff",
  width: "100%",
  margin: "10px"
};

class ProfileList extends React.Component<Props> {
  componentDidMount() {
    this.props.loadApplicantsRequest();
  }

  render() {
    const { applicants } = this.props;
    const apps = (applicants && applicants.list) || [];
    return (
      <div>
        <div className="search-bar" />
        <div className="profile-list">
          <h4>
            Showing {apps.length} {apps.length === 1 ? "result" : "results"}
          </h4>
          {apps
            .filter(app => app && app.signupComplete)
            .map(this.renderApplicant)}
        </div>
      </div>
    );
  }

  renderApplicant = (applicant: Applicant) => {
    const profileLink = `/profiles${applicant.User &&
      `/${applicant.User.firstName.toLowerCase()}-${applicant.User.lastName.toLowerCase()}/${
        applicant.User.id
      }`}`;

    return (
      <div className="profile-card" key={applicant.id}>
        {applicant.User && applicant.User.profileImgUrl ? (
          <img
            src={applicant.User && applicant.User.profileImgUrl}
            alt="profile-image"
            className="profile-image"
          />
        ) : (
          <div className="image-placeholder" />
        )}
        <div className="identifying-information">
          <h2 className="sans-serif">
            {applicant.User &&
              `${applicant.User.firstName} ${applicant.User.lastName}`}
          </h2>
          <h3 className="sans-serif">{applicant.JobExperiences[0].name}</h3>
          <h3 className="sans-serif">
            {applicant.JobExperiences[0].numOfYears} Years Experience
          </h3>
          <h3 className="sans-serif">{applicant.city}</h3>
        </div>
        <div className="button-section">
          <Link to={profileLink}>
            <Button styles={buttonStyles}>View Profile</Button>
          </Link>
          <Button styles={buttonStyles}>Contact</Button>
        </div>
        <img
          src={`/assets/merit_badges/${applicant.PersonalityEvaluation &&
            applicant.PersonalityEvaluation.scoreSignature}.png`}
          alt="personality-type"
        />
      </div>
    );
  };
}

const mapState = ({ applicants }: AppState) => ({ applicants });

const mapDispatch = { loadApplicantsRequest };

export default connect<Partial<AppState>, MapDispatchProps>(
  mapState,
  mapDispatch
)(ProfileList);
