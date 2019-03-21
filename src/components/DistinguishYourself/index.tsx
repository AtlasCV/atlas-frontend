import * as React from "react";
import { connect } from "react-redux";
import { AppState } from "../../reducers";
import "../../styles/distingish-yourself.css";
import Button from "../Shared/Button";
import * as profileActions from "../../actions/profile";
import { ProfileState } from "../../reducers/profile";
import { Link, RouteComponentProps } from "react-router-dom";
import { ApplicantState } from "../../reducers/applicants";
import { loadApplicantDetailRequest } from "../../actions/applicants";

type Props = {
  updateApplicantRequest: typeof profileActions.updateApplicantRequest;
  loadApplicantDetailRequest: typeof loadApplicantDetailRequest;
  profile: ProfileState;
  applicants: ApplicantState;
  noMarginLeft?: boolean;
  isInProfile?: boolean;
  isMyProfile: boolean;
  routerProps: RouteComponentProps<{ applicantId: number }>;
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

  componentDidMount() {
    console.log(this.props);
    const {
      routerProps,
      loadApplicantDetailRequest,
      isInProfile,
      isMyProfile
    } = this.props;
    if (!isMyProfile && isInProfile) {
      loadApplicantDetailRequest(routerProps.match.params.applicantId);
    }
  }

  render() {
    const {
      profile,
      noMarginLeft,
      isInProfile,
      isMyProfile,
      applicants: { detail }
    } = this.props;
    const { distinguishYourself, isEditable } = this.state;

    const backLink = isMyProfile
      ? isInProfile
        ? "/my-profile"
        : "/onboarding/signup/8"
      : `/profiles/${detail.User &&
          `${detail.User.firstName.toLowerCase()}-${detail.User.lastName.toLowerCase()}`}/${detail.User &&
          detail.User.id}`;

    const aboutMe = isMyProfile
      ? this.props.profile.info.Applicant.aboutMe
      : this.props.applicants.detail.aboutMe;
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
            {isMyProfile ? (
              <h1>Think of this as your cover letter.</h1>
            ) : (
              detail.User && (
                <h1>
                  {detail.User.firstName} {detail.User.lastName}
                </h1>
              )
            )}
            <div
              className={`distinguish-yourself-inner-section ${
                isEditable ? "" : "not-editable"
              }`}
            >
              <h2>What makes you the ideal candidate?</h2>
              <textarea
                placeholder="Distinguish yourself..."
                name="distinguishYourself"
                defaultValue={aboutMe}
                onChange={e =>
                  this.setState({ distinguishYourself: e.currentTarget.value })
                }
                disabled={!isEditable}
              />
              <Link to={backLink}>
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
              {isMyProfile && (
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
              )}
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
export default connect<any, any, any, any>(
  ({ profile, applicants }: AppState) => ({ profile, applicants }),
  {
    updateApplicantRequest: profileActions.updateApplicantRequest,
    loadApplicantDetailRequest
  }
)(DistinguishYourself);
