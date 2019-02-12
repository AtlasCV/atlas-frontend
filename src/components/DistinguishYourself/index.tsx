import * as React from "react";
import { connect } from "react-redux";
import { AppState } from "../../reducers";
import "../../styles/distingish-yourself.css";
import Button from "../Shared/Button";
import * as profileActions from "../../actions/profile";
import { ProfileState } from "src/reducers/profile";
import { Link } from "react-router-dom";

type Props = {
  updateApplicantRequest: typeof profileActions.updateApplicantRequest;
  profile: ProfileState;
  noMarginLeft?: boolean;
  isInProfile?: boolean;
};

type State = { distinguishYourself?: string; isEditable: boolean };

class DistinguishYourself extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      distinguishYourself: props.profile.info.Applicant.aboutMe || "",
      isEditable: !props.isInProfile
    };
  }
  render() {
    const { profile, noMarginLeft, isInProfile } = this.props;
    const { distinguishYourself, isEditable } = this.state;
    return (
      <>
        {profile.fetchingApplicant ? (
          <p>Loading...</p>
        ) : (
          <div
            className={`distinguish-yourself ${
              noMarginLeft ? "no-margin-left" : ""
            }`}
          >
            <h1>Think of this as your cover letter.</h1>
            <div
              className={`distinguish-yourself-inner-section ${
                isEditable ? "" : "not-editable"
              }`}
            >
              <h2>What makes you the ideal candidate?</h2>
              <textarea
                placeholder="Distinguish yourself..."
                name="distinguishYourself"
                defaultValue={this.props.profile.info.Applicant.aboutMe}
                onChange={e =>
                  this.setState({ distinguishYourself: e.currentTarget.value })
                }
                disabled={!isEditable}
              />
              <Link to={isInProfile ? "/my-profile" : "/onboarding/signup/8"}>
                <Button
                  styles={{
                    position: "absolute",
                    left: 120,
                    bottom: 125
                  }}
                >
                  BACK
                </Button>
              </Link>
              <Button
                disabled={
                  !!(distinguishYourself && distinguishYourself.length < 1)
                }
                styles={{
                  position: "absolute",
                  right: 120,
                  bottom: 125
                }}
                onClick={this.handleSubmitOrEdit}
              >
                {isEditable ? "Submit" : "Edit"}
              </Button>
              {isEditable && (
                <Button
                  onClick={() => this.setState({ isEditable: false })}
                  styles={{
                    position: "absolute",
                    right: 290,
                    bottom: 125,
                    border: "rgb(223, 69, 67) 1px solid",
                    color: "rgb(223, 69, 67)"
                  }}
                >
                  Cancel
                </Button>
              )}
            </div>
          </div>
        )}
      </>
    );
  }

  private handleSubmitOrEdit = () => {
    const { isEditable, distinguishYourself } = this.state;
    const { updateApplicantRequest, profile } = this.props;
    if (isEditable) {
      updateApplicantRequest(profile.info.Applicant.id, {
        aboutMe: distinguishYourself,
        signupComplete: true
      });
      this.setState({ isEditable: false });
    } else {
      this.setState({ isEditable: true });
    }
  };
}
export default connect(
  ({ profile }: AppState) => ({ profile }),
  { updateApplicantRequest: profileActions.updateApplicantRequest }
)(DistinguishYourself);
