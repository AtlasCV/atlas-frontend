import * as React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import SkillToken from "../Shared/SkillToken";
import Button from "../Shared/Button";
import { ProfileState } from "../../reducers/profile";
import { IndustrySectorState } from "../../reducers/industrySectors";
import {
  addIndustrySectorsToApplicantRequest,
  removeIndustrySectorFromApplicantRequest,
  loadIndustrySectorsRequest
} from "../../actions/industrySectors";
import { AppState } from "../../reducers";

type MapStateProps = {
  profile: ProfileState;
  industrySectors: IndustrySectorState;
};

type MapDispatchProps = {
  loadIndustrySectorsRequest: typeof loadIndustrySectorsRequest;
  addIndustrySectorToApplicant: typeof addIndustrySectorsToApplicantRequest;
  removeIndustrySectorFromApplicant: typeof removeIndustrySectorFromApplicantRequest;
};

type Props = MapStateProps & MapDispatchProps;

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
      <>
        <div>
          <h1>Tell us about your skills...</h1>
          {this.props.industrySectors.list.map(industrySector => {
            const hasIndustrySector =
              applicantIndustrySectors.indexOf(industrySector.id) > -1;
            return (
              <SkillToken
                key={industrySector.id}
                skill={industrySector}
                selectSkillForApplicant={
                  this.props.addIndustrySectorToApplicant
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
        <Link to="/onboarding/signup/6">
          <Button styles={{ float: "left", marginTop: "40px" }}>
            PREVIOUS
          </Button>
        </Link>
        <Link to="/onboarding/signup/8">
          <Button
            styles={{
              float: "right",
              marginTop: "40px"
            }}
          >
            NEXT
          </Button>
        </Link>
      </>
    );
  }
}

const mapState = ({ profile, industrySectors }: AppState) => ({
  profile,
  industrySectors
});

const mapDispatch = {
  addIndustrySectorToApplicant: addIndustrySectorsToApplicantRequest,
  removeIndustrySectorFromApplicant: removeIndustrySectorFromApplicantRequest,
  loadIndustrySectorsRequest
};

export default connect<MapStateProps, MapDispatchProps, {}>(
  mapState,
  mapDispatch
)(PageSeven);
