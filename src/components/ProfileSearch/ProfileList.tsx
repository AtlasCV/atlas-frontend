import * as React from "react";
import { connect } from "react-redux";
import { AppState } from "../../reducers";
import { loadApplicantsRequest } from "../../actions/applicants";
import "../../styles/profile-list.css";

type MapDispatchProps = { loadApplicantsRequest: typeof loadApplicantsRequest };

type Props = Partial<AppState> & MapDispatchProps;

class ProfileList extends React.Component<Props> {
  componentDidMount() {
    this.props.loadApplicantsRequest();
  }

  render() {
    const { applicants } = this.props;
    return (
      <div className="profile-list">
        LIST
        <div>
          {applicants &&
            applicants.list.map(applicant => (
              <div key={applicant.id}>
                {applicant.User &&
                  `${applicant.User.firstName} ${applicant.User.lastName}`}
              </div>
            ))}
        </div>
      </div>
    );
  }
}

const mapState = ({ applicants }: AppState) => ({ applicants });

const mapDispatch = { loadApplicantsRequest };

export default connect<Partial<AppState>, MapDispatchProps>(
  mapState,
  mapDispatch
)(ProfileList);
