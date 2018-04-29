import * as React from "react";
import { bindActionCreators } from "redux";
import { connect, Dispatch } from "react-redux";
import { Route, match } from "react-router-dom";
import OnboardingSidebar from "../components/OnboardingSidebar";
import OnboardingIntro from "../components/OnboardingIntro";
import PersonalityEvaluator from "../components/PersonalityEvaluator";
import Results from "../components/Results";
import Signup from "../components/Signup";
import * as actions from "../actions/questions";
import { AppState } from "../reducers/index";
import "../styles/onboarding.css";
import { QuestionState } from "../reducers/questions";

type Props = {
  startEvaluatorRequest: () => ReturnType<typeof actions.startEvaluatorRequest>;
  match: match<{ uuid: string }>;
  questions: QuestionState;
  location: Location;
};

export default connect(
  ({ questions }: AppState) => ({ questions }),
  (dispatch: Dispatch<AppState>) =>
    bindActionCreators(
      {
        startEvaluatorRequest: actions.startEvaluatorRequest
      },
      dispatch
    )
)(
  class Onboarding extends React.Component<Props> {
    constructor(props: Props) {
      super(props);
    }

    render() {
      return (
        <div className="container onboarding">
          <div className="row">
            <OnboardingSidebar location={this.props.location} />
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
          </div>
        </div>
      );
    }
  }
);
