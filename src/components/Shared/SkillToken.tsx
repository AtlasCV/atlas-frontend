import * as React from "react";
import { style } from "typestyle";
import { Skill, IndustrySector } from "../../types";

const tokenContainer = style({
  display: "inline-block",
  textAlign: "center",
  width: "33%",
  height: "100px"
});

const years = style({
  height: "70px",
  margin: "20px auto",
  cursor: "pointer",
  fontFamily:
    ' -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif'
});

const yearsOption = style({
  $nest: {
    "&:hover": {
      fontWeight: 600
    }
  }
});

const tokenLabel = style({
  fontFamily:
    ' -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif',
  fontSize: "12px",
  fontWeight: 200,
  margin: "0px"
});

interface Props {
  skill: Skill | IndustrySector;
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
      removeSkillFromApplicant,
      selected
    } = this.props;

    console.log(selected);

    const tokenStyle = style({
      height: "70px",
      margin: "20px auto",
      fontSize: "26px",
      borderRadius: "50%",
      cursor: "pointer",
      width: "70px",
      backgroundColor: hasSkill ? "rgb(236, 210, 82)" : "rgb(183, 183, 183)",
      color: "#fff",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontFamily:
        ' -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif'
    });

    return (
      <div className={tokenContainer}>
        {selected ? (
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
            <div className={tokenStyle} onClick={() => selectSkill(skill.id)}>
              {skill.name
                .split("_")
                .map(word => word[0])
                .slice(0, 2)
                .join("")
                .toUpperCase()}
            </div>
          </React.Fragment>
        )}
        <h6 className={tokenLabel}>
          {skill.name
            .split("_")
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ")}
        </h6>
      </div>
    );
  }
}

export default SkillToken;
