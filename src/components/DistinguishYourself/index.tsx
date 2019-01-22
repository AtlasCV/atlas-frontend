import * as React from "react";
import { connect } from "react-redux";
import { AppState } from "../../reducers";
import "../../styles/distingish-yourself.css";
import Button from "../Shared/Button";
import * as profileActions from "../../actions/profile";
import { ProfileState } from "src/reducers/profile";

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
    const { updateApplicantRequest, profile, noMarginLeft } = this.props;
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
                onBlur={() => ({})}
                disabled={!isEditable}
              />
              <Button
                disabled={
                  !!(distinguishYourself && distinguishYourself.length < 1)
                }
                styles={{
                  position: "absolute",
                  right: 120,
                  bottom: 125
                }}
                onClick={() => {
                  if (isEditable) {
                    updateApplicantRequest(profile.info.Applicant.id, {
                      aboutMe: distinguishYourself,
                      signupComplete: true
                    });
                    this.setState({ isEditable: false });
                  } else {
                    this.setState({ isEditable: true });
                  }
                }}
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
}
export default connect(
  ({ profile }: AppState) => ({ profile }),
  { updateApplicantRequest: profileActions.updateApplicantRequest }
)(DistinguishYourself);
