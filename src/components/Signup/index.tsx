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
import ProgressTracker from "../ProgressTracker";
import { ProfileState } from "../../reducers/profile";
import { IndustryState } from "../../reducers/industries";
import { AuthState } from "../../reducers/auth";
import { SkillState } from "../../reducers/skills";
import "../../styles/signup.css";
import {
  UpdateApplicantFormProps,
  EducationExperience,
  JobExperience,
  CreateApplicantFormProps
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

type State = { activePage: number };

export default connect(
  ({ profile, industries, skills, auth }: AppState) => ({
    profile,
    industries,
    skills,
    auth
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
  class Signup extends React.Component<Props, State> {
    static getDerivedStateFromProps(nextProps: Props, prevState: State) {
      const {
        auth,
        profile: {
          info: { Applicant }
        }
      } = nextProps;
      if (!Applicant) {
        return null;
      }
      if (
        auth.authenticated &&
        prevState.activePage !== Applicant.currentPageOfSignup
      ) {
        return {
          activePage: Applicant.currentPageOfSignup
        };
      } else {
        return { activePage: prevState.activePage };
      }
    }

    constructor(props: Props) {
      super(props);
      this.state = {
        activePage: 0
      };
    }

    componentDidMount() {
      const { getMeRequest } = this.props;

      getMeRequest();
    }

    submitPageOneInformation = (formValues: CreateApplicantFormProps) => {
      const { createApplicantRequest } = this.props;
      createApplicantRequest(formValues, "/onboarding/signup/2");
    };

    submitPageTwoInformation = (
      applicantId: number,
      formValues: UpdateApplicantFormProps
    ) => {
      const { updateApplicantRequest } = this.props;
      updateApplicantRequest(applicantId, formValues, "/onboarding/signup/3");
    };

    submitPageThreeInformation = (
      applicantId: number,
      { industryId, ...applicantFormProps }: UpdateApplicantFormProps
    ) => {
      this.props.updateApplicantRequest(
        applicantId,
        { ...applicantFormProps, currentPageOfSignup: 4 },
        "/onboarding/signup/4/"
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

    completePageFour = (applicantId: number) => {
      this.props.updateApplicantRequest(
        applicantId,
        {
          currentPageOfSignup: 5
        },
        "/onboarding/signup/5/"
      );
    };

    submitPageFiveInformation = (
      applicantId: number,
      jobExperience: JobExperience
    ) => {
      this.props.createJobExperienceRequest(applicantId, jobExperience);
    };

    completePageFive = (applicantId: number) => {
      this.props.updateApplicantRequest(
        applicantId,
        {
          currentPageOfSignup: 6
        },
        "/onboarding/signup/6"
      );
    };

    addSkillToApplicant = (
      applicantId: number,
      skill: { id: number; yearsExperience: string }
    ) => {
      this.props.addSkillsToApplicantRequest(applicantId, skill);
    };

    render() {
      const {
        match: { params },
        loadIndustriesRequest,
        loadSkillsRequest,
        profile: {
          info: { Applicant }
        },
        industries: { list: industries },
        skills: { list: skills }
      } = this.props;

      return (
        <div className="signup-container col-sm-9">
          <h2>Tell us about your qualifications</h2>
          <ProgressTracker progress={this.state.activePage / 7 * 100} />
          <Route
            path={"/onboarding/signup/1/:uuid"}
            render={() => (
              <PageOne
                uuid={params.uuid}
                handleSubmit={this.submitPageOneInformation}
              />
            )}
          />
          <Route
            path={"/onboarding/signup/2"}
            render={() => (
              <PageTwo
                handleSubmit={this.submitPageTwoInformation}
                applicantId={Applicant && Applicant.id}
              />
            )}
          />
          <Route
            path={"/onboarding/signup/3"}
            render={() => (
              <PageThree
                handleSubmit={this.submitPageThreeInformation}
                loadIndustriesRequest={loadIndustriesRequest}
                applicantId={Applicant && Applicant.id}
                industries={industries}
              />
            )}
          />
          <Route
            path={"/onboarding/signup/4"}
            render={() => (
              <PageFour
                handleSubmit={this.submitPageFourInformation}
                completePage={this.completePageFour}
                profile={this.props.profile}
              />
            )}
          />
          <Route
            path={"/onboarding/signup/5"}
            render={() => (
              <PageFive
                handleSubmit={this.submitPageFiveInformation}
                completePage={this.completePageFive}
                profile={this.props.profile}
              />
            )}
          />
          <Route
            path={"/onboarding/signup/6"}
            render={() => (
              <PageSix
                selectSkillForApplicant={this.addSkillToApplicant}
                profile={this.props.profile}
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
