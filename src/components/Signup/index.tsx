import * as React from "react";
import { bindActionCreators, Dispatch } from "redux";
import { connect } from "react-redux";
import { Route, match } from "react-router-dom";
import * as questionActions from "../../actions/questions";
import * as profileActions from "../../actions/profile";
import { getMeRequest } from "../../actions/auth";
import { loadIndustriesRequest } from "../../actions/industries";
import { AppState } from "../../reducers";
import PageOne from "./PageOne";
import PageTwo from "./PageTwo";
import PageThree from "./PageThree";
import {
  CreateApplicantFormProps,
  UpdateApplicantFormProps
} from "../../types";
import { ProfileState } from "../../reducers/profile";
import { IndustryState } from "../../reducers/industries";
import "../../styles/signup.css";

type Props = {
  match: match<{ uuid: string }>;
  profile: ProfileState;
  industries: IndustryState;
  loadEvaluatorRequest: (
    uuid: string
  ) => ReturnType<typeof questionActions.loadEvaluatorRequest>;
  updateApplicantRequest: (
    applicantId: number,
    applicantFormProps: UpdateApplicantFormProps,
    nextPage?: string
  ) => ReturnType<typeof profileActions.updateApplicantRequest>;
  createApplicantRequest: (
    applicantFormProps: CreateApplicantFormProps,
    nextPage?: string
  ) => ReturnType<typeof profileActions.createApplicantRequest>;
  getMeRequest: () => ReturnType<typeof getMeRequest>;
  loadIndustriesRequest: () => ReturnType<typeof loadIndustriesRequest>;
};

export default connect(
  ({ profile, industries }: AppState) => ({ profile, industries }),
  (dispatch: Dispatch<AppState>) =>
    bindActionCreators(
      {
        loadEvaluatorRequest: questionActions.loadEvaluatorRequest,
        createApplicantRequest: profileActions.createApplicantRequest,
        updateApplicantRequest: profileActions.updateApplicantRequest,
        getMeRequest,
        loadIndustriesRequest
      },
      dispatch
    )
)(
  class Signup extends React.Component<Props> {
    constructor(props: Props) {
      super(props);
    }

    componentDidMount() {
      this.props.getMeRequest();
      this.props.loadEvaluatorRequest(this.props.match.params.uuid);
    }

    render() {
      const {
        match: { params },
        createApplicantRequest,
        updateApplicantRequest,
        loadIndustriesRequest,
        profile: {
          info: { id }
        },
        industries: { list: industries }
      } = this.props;

      return (
        <div className="signup-container col-sm-9">
          <h2>Tell us about your qualifications</h2>
          <Route
            path={"/onboarding/signup/1/:uuid"}
            render={() => (
              <PageOne
                uuid={params.uuid}
                handleSubmit={createApplicantRequest}
              />
            )}
          />
          <Route
            path={"/onboarding/signup/2/:uuid"}
            render={() => (
              <PageTwo
                uuid={params.uuid}
                handleSubmit={updateApplicantRequest}
                applicantId={id}
              />
            )}
          />
          <Route
            path={"/onboarding/signup/3/:uuid"}
            render={() => (
              <PageThree
                handleSubmit={updateApplicantRequest}
                loadIndustriesRequest={loadIndustriesRequest}
                applicantId={id}
                industries={industries}
                uuid={params.uuid}
              />
            )}
          />
        </div>
      );
    }
  }
);
