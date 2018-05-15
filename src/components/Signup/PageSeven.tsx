import * as React from "react";
import { style } from "typestyle";
import { Link } from "react-router-dom";
import SkillToken from "../Shared/SkillToken";
import Button from "../Shared/Button";
import { ProfileState } from "../../reducers/profile";
import { IndustrySectorState } from "../../reducers/industrySectors";

type Props = {
  profile: ProfileState;
  industrySectors: IndustrySectorState;
  loadIndustrySectorsRequest: (industryId: number) => void;
  selectIndustrySectorForApplicant: (
    applicantId: number,
    industrySector: { id: number; yearsExperience: string }
  ) => void;
  removeIndustrySectorFromApplicant: (
    applicantId: number,
    industrySectorId: number
  ) => void;
};

type State = {
  selectedIndustrySector: number;
};

class PageSeven extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      selectedIndustrySector: 0
    };
  }

  componentDidMount() {
    this.props.loadIndustrySectorsRequest(
      this.props.profile.info.Applicant.Industries[0].id
    );
  }

  static getDerivedStateFromProps(nextProps: Props, prevState: State) {
    if (!nextProps.industrySectors.savedIndustrySectors) {
      return { selectedIndustrySector: 0 };
    } else {
      return null;
    }
  }

  selectIndustrySector = (industrySectorId: number) => {
    this.setState({ selectedIndustrySector: industrySectorId });
  };

  render() {
    const applicantIndustrySectors = this.props.profile.info.Applicant.ApplicantIndustrySectors.map(
      appIndustrySector => appIndustrySector.IndustrySectorId
    );
    return (
      <React.Fragment>
        <div className={style({ overflow: "scroll", maxHeight: "500px" })}>
          {this.props.industrySectors.list.map(industrySector => {
            const hasIndustrySector =
              applicantIndustrySectors.indexOf(industrySector.id) > -1;
            return (
              <SkillToken
                key={industrySector.id}
                skill={industrySector}
                selectSkillForApplicant={
                  this.props.selectIndustrySectorForApplicant
                }
                removeSkillFromApplicant={
                  this.props.removeIndustrySectorFromApplicant
                }
                applicantId={this.props.profile.info.Applicant.id}
                selected={
                  this.state.selectedIndustrySector === industrySector.id
                }
                selectSkill={this.selectIndustrySector}
                hasSkill={hasIndustrySector}
              />
            );
          })}
        </div>
        <Link to="/onboarding/distinguish-yourself">
          <Button styles={{ float: "right" }}>NEXT</Button>
        </Link>
      </React.Fragment>
    );
  }
}

export default PageSeven;
