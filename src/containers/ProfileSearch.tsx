import * as React from "react";
import { connect } from "react-redux";
import { AppState } from "src/reducers";
import { loadApplicantsRequest } from "../actions/applicants";

type MapDispatchProps = { loadApplicantsRequest: typeof loadApplicantsRequest };

type Props = Partial<AppState> & MapDispatchProps;

class Search extends React.Component<Props> {
  componentDidMount() {
    this.props.loadApplicantsRequest();
  }

  render() {
    return <div>Search here</div>;
  }
}

const mapState = ({ applicants }: AppState) => ({ applicants });

const mapDispatch = { loadApplicantsRequest };

export default connect<Partial<AppState>, MapDispatchProps>(
  mapState,
  mapDispatch
)(Search);
