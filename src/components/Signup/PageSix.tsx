import * as React from "react";
import SkillToken from "../Shared/SkillToken";
import Button from "../Shared/Button";
import { ProfileState } from "../../reducers/profile";
import { SkillState } from "../../reducers/skills";
import { Link } from "react-router-dom";

type Props = {
  profile: ProfileState;
  skills: SkillState;
  loadSkillsRequest: () => void;
  selectSkillForApplicant: (
    applicantId: number,
    skill: { id: number; yearsExperience: string }
  ) => void;
  removeSkillFromApplicant: (applicantId: number, skillId: number) => void;
  completePageSix: (applicantId: number) => void;
};

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
            this.props.completePageSix(this.props.profile.info.Applicant.id)
          }
          styles={{ float: "right", marginTop: "40px" }}
        >
          NEXT
        </Button>
      </React.Fragment>
    );
  }
}

export default PageSix;
