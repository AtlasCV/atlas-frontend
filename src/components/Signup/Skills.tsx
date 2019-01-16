import * as React from "react";
import { connect } from "react-redux";
import SkillToken from "../Shared/SkillToken";
import Button from "../Shared/Button";
import { ProfileState } from "../../reducers/profile";
import { SkillState } from "../../reducers/skills";
import { Link } from "react-router-dom";
import {
  addSkillsToApplicantRequest,
  removeSkillFromApplicantRequest,
  loadSkillsRequest
} from "../../actions/skills";
import { updateApplicantRequest } from "../../actions/profile";
import { AppState } from "../../reducers";

type MapStateProps = { profile: ProfileState; skills: SkillState };

type MapDispatchProps = {
  loadSkillsRequest: typeof loadSkillsRequest;
  selectSkillForApplicant: typeof addSkillsToApplicantRequest;
  removeSkillFromApplicant: typeof removeSkillFromApplicantRequest;
  completeSkills: typeof updateApplicantRequest;
};

type Props = MapStateProps & MapDispatchProps;

type State = {
  selectedSkill: number;
};

class PageSix extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      selectedSkill: 0
    };
  }

  componentDidMount() {
    this.props.loadSkillsRequest();
  }

  static getDerivedStateFromProps(nextProps: Props, prevState: State) {
    if (!nextProps.skills.savedSkills) {
      return { selectedSkill: 0 };
    } else {
      return null;
    }
  }

  selectSkill = (skillId: number) => {
    this.setState({ selectedSkill: skillId });
  };

  render() {
    const applicantSkills = this.props.profile.info.Applicant.ApplicantSkills.map(
      appSkill => appSkill.SkillId
    );
    return (
      <React.Fragment>
        <div>
          <h1 className="profile-header">Tell us about your skills...</h1>
          {this.props.skills.list.map(skill => {
            const hasSkill = applicantSkills.indexOf(skill.id) > -1;
            return (
              <SkillToken
                key={skill.id}
                skill={skill}
                selectSkillForApplicant={this.props.selectSkillForApplicant}
                removeSkillFromApplicant={this.props.removeSkillFromApplicant}
                applicantId={this.props.profile.info.Applicant.id}
                selected={this.state.selectedSkill === skill.id}
                selectSkill={this.selectSkill}
                hasSkill={hasSkill}
              />
            );
          })}
        </div>
        <Link to="/onboarding/signup/5">
          <Button styles={{ float: "left", marginTop: "40px" }}>
            PREVIOUS
          </Button>
        </Link>
        <Button
          onClick={() =>
            this.props.completeSkills(
              this.props.profile.info.Applicant.id,
              {
                currentPageOfSignup: 7
              },
              "/onboarding/signup/7"
            )
          }
          styles={{ float: "right", marginTop: "40px" }}
        >
          NEXT
        </Button>
      </React.Fragment>
    );
  }
}

const mapState = ({ profile, skills }: AppState) => ({ profile, skills });

const mapDispatch = {
  selectSkillForApplicant: addSkillsToApplicantRequest,
  removeSkillFromApplicant: removeSkillFromApplicantRequest,
  loadSkillsRequest,
  completeSkills: updateApplicantRequest
};

export default connect<MapStateProps, MapDispatchProps, {}>(
  mapState,
  mapDispatch
)(PageSix);
