import * as React from "react";
import { connect } from "react-redux";
import { Route, match } from "react-router-dom";
import { push } from "react-router-redux";
import OnboardingIntro from "../components/OnboardingIntro";
import PersonalityEvaluator from "../components/PersonalityEvaluator";
import Results from "../components/Results";
import Signup from "../components/Signup";
import DistinguishYourself from "../components/DistinguishYourself";
import { startEvaluatorRequest } from "../actions/questions";
import { getMeRequest } from "../actions/auth";
import { AppState } from "../reducers/index";
import "../styles/onboarding.css";
import { QuestionState } from "../reducers/questions";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { AuthState } from "../reducers/auth";
import { ProfileState } from "../reducers/profile";

type Props = {
  startEvaluatorRequest: typeof startEvaluatorRequest;
  getMeRequest: typeof getMeRequest;
  push: typeof push;
  match: match<{ uuid: string }>;
  questions: QuestionState;
  auth: AuthState;
  location: Location;
  profile: ProfileState;
};

class Onboarding extends React.Component<Props> {
  componentDidMount() {
    const { getMeRequest, auth, push, profile } = this.props;
    if (auth.authenticated && !profile.info.Applicant.signupComplete) {
      push(`/onboarding/signup/${profile.info.Applicant.currentPageOfSignup}`);
    } else if (auth.token) {
      getMeRequest();
    }
  }

  componentDidUpdate() {
    const { auth, push, profile } = this.props;
    if (auth.authenticated && profile.info.Applicant.signupComplete) {
      push("/");
    }
  }

  render() {
    return (
      <div>
        <Navbar />
        <div className="onboarding-container">
          <div className="onboarding-sections">
            <Route
              path={this.props.match.url + "/introduction"}
              component={() => (
                <OnboardingIntro uuid={this.props.questions.uuid} />
              )}
            />
            <Route
              exact={true}
              path={this.props.match.url + "/personality-evaluator/:uuid"}
              component={PersonalityEvaluator}
            />
            <Route
              exact={true}
              path={this.props.match.url + "/personality-evaluator"}
              component={PersonalityEvaluator}
            />
            <Route
              exact={true}
              path={this.props.match.url + "/results/:uuid"}
              component={Results}
            />
            <Route
              exact={true}
              path={this.props.match.url + "/signup/:page/:uuid"}
              component={Signup}
            />
            <Route
              exact={true}
              path={this.props.match.url + "/signup/:page"}
              component={Signup}
            />
            <Route
              exact={true}
              path={this.props.match.url + "/distinguish-yourself"}
              component={DistinguishYourself}
            />
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default connect(
  ({ questions, auth, profile }: AppState) => ({ questions, auth, profile }),
  {
    startEvaluatorRequest,
    getMeRequest,
    push
  }
)(Onboarding);
