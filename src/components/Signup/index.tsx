import * as React from "react";
import { connect } from "react-redux";
import { Route, match } from "react-router-dom";
import { AppState } from "../../reducers";
import PersonalInformation from "./PersonalInformation";
import PersonalInformationContinued from "./PersonalInformationContinued";
import PreferredIndustry from "./PreferredIndustryAndCity";
import Education from "./Education";
import JobExperiences from "./JobExperiences";
import Skills from "./Skills";
import IndustrySectors from "./IndustrySectors";
import Certifications from "./Certifications";
import ProgressTracker from "../ProgressTracker";
import { ProfileState } from "../../reducers/profile";
import { AuthState } from "../../reducers/auth";
import "../../styles/signup.css";

type Props = {
  match: match<{ uuid: string; page: string }>;
  profile: ProfileState;
  auth: AuthState;
};

type State = { activePage: number };

class Signup extends React.Component<Props, State> {
  static getDerivedStateFromProps(nextProps: Props, prevState: State) {
    const {
      auth,
      profile: {
        info: { Applicant }
      }
    } = nextProps;
    if (!Applicant) {
      return null;
    }
    if (
      auth.authenticated &&
      prevState.activePage !== Applicant.currentPageOfSignup
    ) {
      return {
        activePage: Applicant.currentPageOfSignup
      };
    } else {
      return { activePage: prevState.activePage };
    }
  }

  constructor(props: Props) {
    super(props);
    this.state = {
      activePage: 0
    };
  }

  render() {
    const {
      match: {
        params: { uuid, page }
      },
      profile: { fetchingApplicant }
    } = this.props;

    return (
      <div className="signup-container">
        <h1>Sign Up (Page {page} of 8)</h1>
        <ProgressTracker progress={(this.state.activePage / 8) * 100} />
        {fetchingApplicant ? null : (
          <>
            <Route
              path={"/onboarding/signup/1"}
              render={() => <PersonalInformation uuid={uuid} />}
            />
            <Route
              path={"/onboarding/signup/2"}
              render={() => <PersonalInformationContinued />}
            />
            <Route
              path={"/onboarding/signup/3"}
              render={() => <PreferredIndustry />}
            />
            <Route path={"/onboarding/signup/4"} render={() => <Education />} />
            <Route
              path={"/onboarding/signup/5"}
              render={() => <JobExperiences />}
            />
            <Route path={"/onboarding/signup/6"} render={() => <Skills />} />
            <Route
              path={"/onboarding/signup/7"}
              render={() => <IndustrySectors />}
            />
            <Route
              path={"/onboarding/signup/8"}
              render={() => <Certifications />}
            />
          </>
        )}
      </div>
    );
  }
}

export default connect(
  ({ profile, auth }: AppState) => ({
    profile,
    auth
  }),
  {}
)(Signup);
