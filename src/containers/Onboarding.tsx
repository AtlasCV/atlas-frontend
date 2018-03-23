import * as React from "react";
import { Route, match } from "react-router-dom";
import OnboardingSidebar from "../components/OnboardingSidebar";
import OnboardingIntro from "../components/OnboardingIntro";
import PersonalityEvaluator from "../components/PersonalityEvaluator";
import Results from "../components/Results";
import "../styles/onboarding.css";

type Props = {
  match: match<{}>;
};

class Onboarding extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <div className="container onboarding">
        <div className="row">
          <OnboardingSidebar />
          <Route
            path={this.props.match.url + "/introduction"}
            component={OnboardingIntro}
          />
          <Route
            path={this.props.match.url + "/personality-evaluator"}
            component={PersonalityEvaluator}
          />
          <Route path={this.props.match.url + "/results"} component={Results} />
        </div>
      </div>
    );
  }
}

export default Onboarding;
