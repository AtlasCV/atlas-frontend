import * as React from "react";
import { style } from "typestyle";
import SkillToken from "../Shared/SkillToken";
import Button from "../Shared/Button";
import { Skill } from "../../types";
import { ProfileState } from "../../reducers/profile";

type Props = {
  loadSkillsRequest: () => void;
  profile: ProfileState;
  skills: Skill[];
  selectSkillForApplicant: (
    applicantId: number,
    skill: { id: number; yearsExperience: string }
  ) => void;
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

  selectSkill = (skillId: number) => {
    this.setState({ selectedSkill: skillId });
  };

  render() {
    const applicantSkills = this.props.profile.info.Applicant.ApplicantSkills.map(
      appSkill => appSkill.SkillId
    );
    return (
      <React.Fragment>
        <div className={style({ overflow: "scroll", maxHeight: "500px" })}>
          {this.props.skills.map(skill => {
            const hasSkill = applicantSkills.indexOf(skill.id) > -1;
            return (
              <SkillToken
                key={skill.id}
                skill={skill}
                selectSkillForApplicant={this.props.selectSkillForApplicant}
                applicantId={this.props.profile.info.Applicant.id}
                selected={this.state.selectedSkill === skill.id}
                selectSkill={this.selectSkill}
                hasSkill={hasSkill}
              />
            );
          })}
        </div>
        <Button styles={{ float: "right" }}>NEXT</Button>
      </React.Fragment>
    );
  }
}

export default PageSix;