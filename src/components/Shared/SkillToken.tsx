import * as React from "react";
import { style } from "typestyle";
import { Skill } from "../../types";

const tokenContainer = style({
  display: "inline-block",
  textAlign: "center",
  width: "33%",
  height: "100px"
});

const token = (hasSkill: boolean) =>
  style({
    height: "70px",
    margin: "20px auto",
    border: "1px solid #333",
    textAlign: "center",
    fontSize: "26px",
    paddingTop: "15px",
    borderRadius: "50%",
    cursor: "pointer",
    width: "70px",
    backgroundColor: hasSkill ? "#505155" : "#fff",
    color: hasSkill ? "#fff" : "#505155"
  });

const years = style({
  height: "70px",
  margin: "20px auto",
  cursor: "pointer"
});

const yearsOption = style({
  $nest: {
    "&:hover": {
      fontWeight: 600
    }
  }
});

interface Props {
  skill: Skill;
  applicantId: number;
  selected: boolean;
  selectSkillForApplicant: (
    applicantId: number,
    skill: { id: number; yearsExperience: string }
  ) => void;
  removeSkillFromApplicant: (applicantId: number, skillId: number) => void;
  selectSkill: (skillId: number) => void;
  hasSkill: boolean;
}

class SkillToken extends React.Component<Props> {
  render() {
    const {
      skill,
      selectSkill,
      selectSkillForApplicant,
      applicantId,
      hasSkill,
      removeSkillFromApplicant
    } = this.props;

    return (
      <div className={tokenContainer}>
        {this.props.selected ? (
          hasSkill ? (
            <div className={years}>
              <div
                className={yearsOption}
                style={{ paddingTop: "10px" }}
                onClick={() => removeSkillFromApplicant(applicantId, skill.id)}
              >
                Remove <br /> Skill
              </div>
            </div>
          ) : (
            <div className={years}>
              <div
                className={yearsOption}
                onClick={() =>
                  selectSkillForApplicant(applicantId, {
                    id: skill.id,
                    yearsExperience: "1 - 3"
                  })
                }
              >
                1 - 3 years
              </div>
              <div
                className={yearsOption}
                onClick={() =>
                  selectSkillForApplicant(applicantId, {
                    id: skill.id,
                    yearsExperience: "4 - 7"
                  })
                }
              >
                4 - 7 years
              </div>
              <div
                className={yearsOption}
                onClick={() =>
                  selectSkillForApplicant(applicantId, {
                    id: skill.id,
                    yearsExperience: "7+"
                  })
                }
              >
                7+ years
              </div>
            </div>
          )
        ) : (
          <React.Fragment>
            <div
              className={token(hasSkill)}
              onClick={() => selectSkill(skill.id)}
            >
              {skill.displayName
                .split(" ")
                .map(word => word[0])
                .join("")
                .toUpperCase()}
            </div>
          </React.Fragment>
        )}
        <h6>{skill.displayName}</h6>
      </div>
    );
  }
}

export default SkillToken;
