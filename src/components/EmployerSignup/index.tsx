import * as React from "react";
import { bindActionCreators, Dispatch } from "redux";
import { connect } from "react-redux";
import { Route } from "react-router-dom";
import { push } from "react-router-redux";
import { AppState } from "../../reducers";
import ProgressTracker from "../ProgressTracker";
import PageOne from "./PageOne";
import PageTwo from "./PageTwo";
import PageThree from "./PageThree";
import { EmployerFormProps } from "../../types";

import "../../styles/signup.css";

type Props = {
  employerId: number;
  handleSubmit: (employerId: number, employerFormProps: {}) => void;
  push: typeof push;
};

type State = { activePage: number };

export default connect(
  ({  }: AppState) => ({}),
  (dispatch: Dispatch<AppState>) => bindActionCreators({ push }, dispatch)
)(
  class EmployerSignup extends React.Component<Props, State> {
    constructor(props: Props) {
      super(props);
      this.state = {
        activePage: 0
      };
    }

    pageOneSubmit = (
      employerId: number,
      employerFormProps: EmployerFormProps
    ) => {
      this.setState({ activePage: 2 });
      this.props.push("/employer-onboarding/company-signup/2");
    };

    pageTwoSubmit = (
      employerId: number,
      employerFormProps: EmployerFormProps
    ) => {
      this.setState({ activePage: 3 });
      this.props.push("/employer-onboarding/company-signup/3");
    };

    pageThreeSubmit = (
      employerId: number,
      employerFormProps: EmployerFormProps
    ) => {
      this.setState({ activePage: 4 });
      this.props.push("/employer-onboarding/profile-signup/1");
    };

    render() {
      const { employerId } = this.props;
      return (
        <div className="signup-container col-sm-9">
          <h2>Tell us about your company</h2>
          <ProgressTracker progress={(this.state.activePage / 4) * 100} />
          <Route
            path={"/employer-onboarding/company-signup/1"}
            render={() => (
              <PageOne
                handleSubmit={this.pageOneSubmit}
                employerId={employerId}
              />
            )}
          />
          <Route
            path={"/employer-onboarding/company-signup/2"}
            render={() => (
              <PageTwo
                handleSubmit={this.pageTwoSubmit}
                employerId={employerId}
              />
            )}
          />
          <Route
            path={"/employer-onboarding/company-signup/3"}
            render={() => (
              <PageThree
                handleSubmit={this.pageThreeSubmit}
                employerId={employerId}
              />
            )}
          />
        </div>
      );
    }
  }
);
