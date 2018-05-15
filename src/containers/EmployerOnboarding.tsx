import * as React from "react";
import { bindActionCreators } from "redux";
import { connect, Dispatch } from "react-redux";
import { Route, match } from "react-router-dom";
import EmployerOnboardingSidebar from "../components/EmployerOnboardingSidebar";
import EmployerSignup from "../components/EmployerSignup";
import EmployerUserSignup from "../components/EmployerUserSignup";
import EmployerIntroduction from "../components/EmployerIntroduction";
import { AppState } from "../reducers/index";
import "../styles/onboarding.css";

type Props = {
  match: match<{ uuid: string }>;
  location: Location;
};

export default connect(
  () => ({}),
  (dispatch: Dispatch<AppState>) => bindActionCreators({}, dispatch)
)(
  class EmployerOnboarding extends React.Component<Props> {
    constructor(props: Props) {
      super(props);
    }

    render() {
      return (
        <div className="container onboarding">
          <div className="row">
            <EmployerOnboardingSidebar location={this.props.location} />
            <Route
              exact={true}
              path={this.props.match.url + "/introduction"}
              component={EmployerIntroduction}
            />
            <Route
              exact={true}
              path={this.props.match.url + "/company-signup/:page"}
              component={EmployerSignup}
            />
            <Route
              exact={true}
              path={this.props.match.url + "/profile-signup/:page"}
              component={EmployerUserSignup}
            />
          </div>
        </div>
      );
    }
  }
);
