import * as React from "react";
import { bindActionCreators, Dispatch } from "redux";
import { connect } from "react-redux";
import { Route, match } from "react-router-dom";
import * as questionActions from "../../actions/questions";
import * as profileActions from "../../actions/profile";
import * as skillActions from "../../actions/skills";
import * as industrySectorActions from "../../actions/industrySectors";
import { getMeRequest } from "../../actions/auth";
import * as industryActions from "../../actions/industries";
import { AppState } from "../../reducers";
import PageOne from "./PageOne";
import PageTwo from "./PageTwo";
import PageThree from "./PageThree";
import PageFour from "./PageFour";
import PageFive from "./PageFive";
import PageSix from "./PageSix";
import PageSeven from "./PageSeven";
import ProgressTracker from "../ProgressTracker";
import { ProfileState } from "../../reducers/profile";
import { IndustryState } from "../../reducers/industries";
import { AuthState } from "../../reducers/auth";
import { SkillState } from "../../reducers/skills";
import { IndustrySectorState } from "../../reducers/industrySectors";
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
  industrySectors: IndustrySectorState;
  loadEvaluatorRequest: typeof questionActions.loadEvaluatorRequest;
  updateApplicantRequest: typeof profileActions.updateApplicantRequest;
  createApplicantRequest: typeof profileActions.createApplicantRequest;
  getMeRequest: typeof getMeRequest;
  loadIndustriesRequest: typeof industryActions.loadIndustriesRequest;
  addIndustriesToApplicantRequest: typeof industryActions.addIndustriesToApplicantRequest;
  createEducationExperienceRequest: typeof profileActions.createEducationExperienceRequest;
  createJobExperienceRequest: typeof profileActions.createJobExperienceRequest;
  addSkillsToApplicantRequest: typeof skillActions.addSkillsToApplicantRequest;
  removeSkillFromApplicantRequest: typeof skillActions.removeSkillFromApplicantRequest;
  loadSkillsRequest: typeof skillActions.loadSkillsRequest;
  addIndustrySectorsToApplicantRequest: typeof industrySectorActions.addIndustrySectorsToApplicantRequest;
  removeIndustrySectorFromApplicantRequest: typeof industrySectorActions.removeIndustrySectorFromApplicantRequest;
  loadIndustrySectorsRequest: typeof industrySectorActions.loadIndustrySectorsRequest;
};

type State = { activePage: number };

export default connect(
  ({ profile, industries, skills, auth, industrySectors }: AppState) => ({
    profile,
    industries,
    skills,
    auth,
    industrySectors
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
        removeSkillFromApplicantRequest:
          skillActions.removeSkillFromApplicantRequest,
        loadSkillsRequest: skillActions.loadSkillsRequest,
        addIndustrySectorsToApplicantRequest:
          industrySectorActions.addIndustrySectorsToApplicantRequest,
        removeIndustrySectorFromApplicantRequest:
          industrySectorActions.removeIndustrySectorFromApplicantRequest,
        loadIndustrySectorsRequest:
          industrySectorActions.loadIndustrySectorsRequest
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
      console.log(applicantId);
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

    completePageSix = (applicantId: number) => {
      this.props.updateApplicantRequest(
        applicantId,
        {
          currentPageOfSignup: 7
        },
        "/onboarding/signup/7"
      );
    };

    addSkillToApplicant = (
      applicantId: number,
      skill: { id: number; yearsExperience: string }
    ) => {
      this.props.addSkillsToApplicantRequest(applicantId, skill);
    };

    removeSkillFromApplicant = (applicantId: number, skillId: number) => {
      this.props.removeSkillFromApplicantRequest(applicantId, skillId);
    };

    addIndustrySectorToApplicant = (
      applicantId: number,
      skill: { id: number; yearsExperience: string }
    ) => {
      this.props.addIndustrySectorsToApplicantRequest(applicantId, skill);
    };

    removeIndustrySectorFromApplicant = (
      applicantId: number,
      skillId: number
    ) => {
      this.props.removeIndustrySectorFromApplicantRequest(applicantId, skillId);
    };

    render() {
      const {
        match: { params },
        loadIndustriesRequest,
        loadSkillsRequest,
        loadIndustrySectorsRequest,
        profile: {
          info: { Applicant }
        },
        industries: { list: industries },
        skills,
        industrySectors
      } = this.props;

      return (
        <div className="signup-container col-sm-9">
          <h2>Tell us about your qualifications</h2>
          <ProgressTracker progress={this.state.activePage / 8 * 100} />
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
                removeSkillFromApplicant={this.removeSkillFromApplicant}
                profile={this.props.profile}
                skills={skills}
                loadSkillsRequest={loadSkillsRequest}
                completePageSix={this.completePageSix}
              />
            )}
          />
          <Route
            path={"/onboarding/signup/7"}
            render={() => (
              <PageSeven
                selectIndustrySectorForApplicant={
                  this.addIndustrySectorToApplicant
                }
                removeIndustrySectorFromApplicant={
                  this.removeIndustrySectorFromApplicant
                }
                profile={this.props.profile}
                industrySectors={industrySectors}
                loadIndustrySectorsRequest={loadIndustrySectorsRequest}
              />
            )}
          />
        </div>
      );
    }
  }
);
