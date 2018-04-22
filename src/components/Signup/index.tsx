import * as React from "react";
import { bindActionCreators, Dispatch } from "redux";
import { connect } from "react-redux";
import { Route, match } from "react-router-dom";
import * as questionActions from "../../actions/questions";
import * as profileActions from "../../actions/profile";
import * as skillActions from "../../actions/skills";
import { getMeRequest } from "../../actions/auth";
import * as industryActions from "../../actions/industries";
import { AppState } from "../../reducers";
import PageOne from "./PageOne";
import PageTwo from "./PageTwo";
import PageThree from "./PageThree";
import PageFour from "./PageFour";
import PageFive from "./PageFive";
import PageSix from "./PageSix";
import { ProfileState } from "../../reducers/profile";
import { IndustryState } from "../../reducers/industries";
import { AuthState } from "../../reducers/auth";
import { SkillState } from "../../reducers/skills";
import "../../styles/signup.css";
import {
  UpdateApplicantFormProps,
  EducationExperience,
  JobExperience
} from "../../types";

type Props = {
  match: match<{ uuid: string }>;
  profile: ProfileState;
  auth: AuthState;
  industries: IndustryState;
  skills: SkillState;
  loadEvaluatorRequest: typeof questionActions.loadEvaluatorRequest;
  updateApplicantRequest: typeof profileActions.updateApplicantRequest;
  createApplicantRequest: typeof profileActions.createApplicantRequest;
  getMeRequest: typeof getMeRequest;
  loadIndustriesRequest: typeof industryActions.loadIndustriesRequest;
  addIndustriesToApplicantRequest: typeof industryActions.addIndustriesToApplicantRequest;
  createEducationExperienceRequest: typeof profileActions.createEducationExperienceRequest;
  createJobExperienceRequest: typeof profileActions.createJobExperienceRequest;
  addSkillsToApplicantRequest: typeof skillActions.addSkillsToApplicantRequest;
  loadSkillsRequest: typeof skillActions.loadSkillsRequest;
};

export default connect(
  ({ profile, industries, skills }: AppState) => ({
    profile,
    industries,
    skills
  }),
  (dispatch: Dispatch<AppState>) =>
    bindActionCreators(
      {
        loadEvaluatorRequest: questionActions.loadEvaluatorRequest,
        createApplicantRequest: profileActions.createApplicantRequest,
        updateApplicantRequest: profileActions.updateApplicantRequest,
        getMeRequest,
        loadIndustriesRequest: industryActions.loadIndustriesRequest,
        addIndustriesToApplicantRequest:
          industryActions.addIndustriesToApplicantRequest,
        createEducationExperienceRequest:
          profileActions.createEducationExperienceRequest,
        createJobExperienceRequest: profileActions.createJobExperienceRequest,
        addSkillsToApplicantRequest: skillActions.addSkillsToApplicantRequest,
        loadSkillsRequest: skillActions.loadSkillsRequest
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
        this.props.addIndustriesToApplicantRequest(applicantId, [+industryId]);
      }
    };

    submitPageFourInformation = (
      applicantId: number,
      educationExperience: EducationExperience
    ) => {
      this.props.createEducationExperienceRequest(
        applicantId,
        educationExperience
      );
    };

    submitPageFiveInformation = (
      applicantId: number,
      jobExperience: JobExperience
    ) => {
      this.props.createJobExperienceRequest(applicantId, jobExperience);
    };

    submitPageSixInformation = (applicantId: number, skillIds: number[]) => {
      this.props.addSkillsToApplicantRequest(applicantId, skillIds);
    };

    render() {
      const {
        match: { params },
        createApplicantRequest,
        updateApplicantRequest,
        loadIndustriesRequest,
        loadSkillsRequest,
        profile: {
          info: { id }
        },
        industries: { list: industries },
        skills: { list: skills }
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
                uuid={params.uuid}
              />
            )}
          />
          <Route
            path={"/onboarding/signup/5/:uuid"}
            render={() => (
              <PageFive
                handleSubmit={this.submitPageFiveInformation}
                applicantId={id}
                uuid={params.uuid}
              />
            )}
          />
          <Route
            path={"/onboarding/signup/6/:uuid"}
            render={() => (
              <PageSix
                handleSubmit={this.submitPageSixInformation}
                applicantId={id}
                uuid={params.uuid}
                skills={skills}
                loadSkillsRequest={loadSkillsRequest}
              />
            )}
          />
        </div>
      );
    }
  }
);
