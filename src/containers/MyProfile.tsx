import * as React from "react";
import { connect } from "react-redux";
import { AppState } from "../reducers";
import { ProfileState } from "..//reducers/profile";
import { getMeRequest } from "../actions/auth";

interface Props {
  profile: ProfileState;
  getMeRequest: typeof getMeRequest;
}

class MyProfile extends React.Component<Props> {
  componentDidMount() {
    this.props.getMeRequest();
  }

  render() {
    return <div>{JSON.stringify(this.props.profile)}</div>;
  }
}

export default connect(
  ({ profile }: AppState) => ({ profile }),
  { getMeRequest }
)(MyProfile);
