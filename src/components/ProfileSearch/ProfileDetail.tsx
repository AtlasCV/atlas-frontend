import * as React from "react";
import { connect } from "react-redux";
import { match } from "react-router";
import { AppState } from "../../reducers";
import { loadApplicantDetailRequest } from "../../actions/applicants";
import "../../styles/profile-detail.css";

type MapDispatchProps = {
  loadApplicantDetailRequest: typeof loadApplicantDetailRequest;
};

type Props = Partial<AppState> &
  MapDispatchProps & { match: match<{ applicantId: number }> };

class ProfileDetail extends React.Component<Props> {
  componentDidMount() {
    const { match, loadApplicantDetailRequest } = this.props;
    loadApplicantDetailRequest(match.params.applicantId);
  }

  render() {
    return <div className="profile-detail">DETAILS</div>;
  }
}

const mapState = ({ applicants }: AppState) => ({ applicants });

const mapDispatch = { loadApplicantDetailRequest };

export default connect<Partial<AppState>, MapDispatchProps>(
  mapState,
  mapDispatch
)(ProfileDetail);
