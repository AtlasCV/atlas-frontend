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
};

export default connect(
  ({ profile }: AppState) => ({ profile }),
  { updateApplicantRequest: profileActions.updateApplicantRequest }
)(
  class DistinguishYourself extends React.Component<
    Props,
    { distinguishYourself?: string }
  > {
    constructor(props: Props) {
      super(props);
      this.state = { distinguishYourself: undefined };
    }
    render() {
      const { updateApplicantRequest, profile, noMarginLeft } = this.props;
      const { distinguishYourself } = this.state;
      console.log(this.props.profile.info.Applicant.aboutMe);
      return (
        <div
          className={`distinguish-yourself ${
            noMarginLeft ? "no-margin-left" : ""
          }`}
        >
          <h1>Think of this as your cover letter.</h1>
          <div className="distinguish-yourself-inner-section">
            <h2>What makes you the ideal candidate?</h2>
            <textarea
              placeholder="Distinguish yourself..."
              name="distinguishYourself"
              value={this.state.distinguishYourself}
              defaultValue={this.props.profile.info.Applicant.aboutMe}
              onChange={e =>
                this.setState({ distinguishYourself: e.currentTarget.value })
              }
              onBlur={() => ({})}
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
              onClick={() =>
                updateApplicantRequest(profile.info.Applicant.id, {
                  aboutMe: distinguishYourself,
                  signupComplete: true
                })
              }
            >
              Submit
            </Button>
          </div>
        </div>
      );
    }
  }
);
