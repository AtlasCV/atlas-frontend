import * as React from "react";
import { bindActionCreators, Dispatch } from "redux";
import { connect } from "react-redux";
import { Route, match } from "react-router-dom";
import * as questionActions from "../../actions/questions";
import * as profileActions from "../../actions/profile";
import { AppState } from "../../reducers";
import "../../styles/signup.css";
import {
  LoadEvaluatorRequest,
  UpdateApplicantRequest,
  CreateApplicantRequest
} from "../../actions/types";
import PageOne from "./PageOne";
import PageTwo from "./PageTwo";
import {
  CreateApplicantFormProps,
  UpdateApplicantFormProps
} from "../../types";
import { ProfileState } from "../../reducers/profile";

type Props = {
  match: match<{ uuid: string }>;
  profile: ProfileState;
  loadEvaluatorRequest: (uuid: string) => LoadEvaluatorRequest;
  updateApplicantRequest: (
    applicantId: number,
    applicantFormProps: UpdateApplicantFormProps
  ) => UpdateApplicantRequest;
  createApplicantRequest: (
    applicantFormProps: CreateApplicantFormProps
  ) => CreateApplicantRequest;
};

export default connect(
  ({ profile }: AppState) => ({ profile }),
  (dispatch: Dispatch<AppState>) =>
    bindActionCreators(
      {
        loadEvaluatorRequest: questionActions.loadEvaluatorRequest,
        createApplicantRequest: profileActions.createApplicantRequest,
        updateApplicantRequest: profileActions.updateApplicantRequest
      },
      dispatch
    )
)(
  class Signup extends React.Component<Props> {
    constructor(props: Props) {
      super(props);
    }

    render() {
      const {
        match: { url },
        createApplicantRequest,
        updateApplicantRequest,
        profile: { info: { id } }
      } = this.props;
      return (
        <div className="signup-container col-sm-9">
          <h2>Tell us about yourself</h2>
          <Route
            path={url + "/1/:uuid"}
            component={() => <PageOne handleSubmit={createApplicantRequest} />}
          />
          <Route
            path={url + "/2/:uuid"}
            component={() => (
              <PageTwo handleSubmit={updateApplicantRequest} applicantId={id} />
            )}
          />
        </div>
      );
    }
  }
);
