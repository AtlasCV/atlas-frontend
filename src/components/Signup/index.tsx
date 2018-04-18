import * as React from "react";
import { bindActionCreators, Dispatch } from "redux";
import { connect } from "react-redux";
import { Route, match } from "react-router-dom";
import * as questionActions from "../../actions/questions";
import * as profileActions from "../../actions/profile";
import { getMeRequest } from "../../actions/auth";
import * as industryActions from "../../actions/industries";
import { AppState } from "../../reducers";
import PageOne from "./PageOne";
import PageTwo from "./PageTwo";
import PageThree from "./PageThree";
import PageFour from "./PageFour";
import { ProfileState } from "../../reducers/profile";
import { IndustryState } from "../../reducers/industries";
import { AuthState } from "../../reducers/auth";
import "../../styles/signup.css";
import { UpdateApplicantFormProps, EducationDetails } from "../../types";

type Props = {
  match: match<{ uuid: string }>;
  profile: ProfileState;
  auth: AuthState;
  industries: IndustryState;
  loadEvaluatorRequest: typeof questionActions.loadEvaluatorRequest;
  updateApplicantRequest: typeof profileActions.updateApplicantRequest;
  createApplicantRequest: typeof profileActions.createApplicantRequest;
  getMeRequest: typeof getMeRequest;
  loadIndustriesRequest: typeof industryActions.loadIndustriesRequest;
  addIndustriesToApplicantRequest: typeof industryActions.addIndustriesToApplicantRequest;
  createEducationExperience: typeof profileActions.createEducationExperience;
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
        loadIndustriesRequest: industryActions.loadIndustriesRequest,
        addIndustriesToApplicantRequest:
          industryActions.addIndustriesToApplicantRequest
      },
      dispatch
    )
)(
  class Signup extends React.Component<Props> {
    constructor(props: Props) {
      super(props);
    }

    componentDidMount() {
      const {
        match: {
          params: { uuid }
        },
        getMeRequest,
        loadEvaluatorRequest
      } = this.props;
      getMeRequest();
      loadEvaluatorRequest(uuid);
    }

    submitPageThreeInformation = (
      applicantId: number,
      { industryId, ...applicantFormProps }: UpdateApplicantFormProps
    ) => {
      this.props.updateApplicantRequest(
        applicantId,
        applicantFormProps,
        `/onboarding/signup/4/${this.props.match.params.uuid}`
      );
      if (industryId) {
        console.log("hey");
        this.props.addIndustriesToApplicantRequest(applicantId, [+industryId]);
      }
    };

    submitPageFourInformation = (
      applicantId: number,
      educationDetails: EducationDetails
    ) => {
      this.props.createEducationExperience(applicantId, educationDetails);
    };

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
                handleSubmit={this.submitPageThreeInformation}
                loadIndustriesRequest={loadIndustriesRequest}
                applicantId={id}
                industries={industries}
                uuid={params.uuid}
              />
            )}
          />
          <Route
            path={"/onboarding/signup/4/:uuid"}
            render={() => (
              <PageFour
                handleSubmit={this.submitPageFourInformation}
                applicantId={id}
                education={education}
                uuid={params.uuid}
              />
            )}
          />
        </div>
      );
    }
  }
);
