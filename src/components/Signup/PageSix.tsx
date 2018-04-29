import * as React from "react";
import SkillToken from "../Shared/SkillToken";
import "../../styles/input.css";

type Props = {
  handleSubmit: (applicantId: number, skills: number[]) => void;
  loadSkillsRequest: () => void;
  applicantId: number;
  skills: Array<{ id: number; name: string }>;
};

class PageSix extends React.Component<Props> {
  componentDidMount() {
    this.props.loadSkillsRequest();
  }

  render() {
    return (
      <React.Fragment>
        {this.props.skills.map(skill => (
          <SkillToken key={skill.id} skill={skill} />
        ))}
      </React.Fragment>
    );
  }
}

export default PageSix;
