import * as React from "react";
import { bindActionCreators, Dispatch } from "redux";
import { connect } from "react-redux";
import { Route } from "react-router-dom";
import { AppState } from "../../reducers";
import ProgressTracker from "../ProgressTracker";
import PageOne from "./PageOne";
import { EmployerFormProps } from "../../types";

import "../../styles/signup.css";

type Props = {
  employerId: number;
  handleSubmit: (employerId: number, employerFormProps: {}) => void;
};

type State = { activePage: number };

export default connect(
  ({  }: AppState) => ({}),
  (dispatch: Dispatch<AppState>) => bindActionCreators({}, dispatch)
)(
  class EmployerUserSignup extends React.Component<Props, State> {
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
      console.log("Page One Submitted");
    };

    render() {
      const { employerId } = this.props;
      return (
        <div className="signup-container col-sm-9">
          <h2>Tell us about yourself and your role in the company</h2>
          <ProgressTracker progress={this.state.activePage / 1 * 100} />
          <Route
            path={"/employer-onboarding/profile-signup/1"}
            render={() => (
              <PageOne
                handleSubmit={this.pageOneSubmit}
                employerId={employerId}
              />
            )}
          />
        </div>
      );
    }
  }
);
