import * as React from "react";
import { connect } from "react-redux";
import { AppState } from "../reducers";
import { ProfileState } from "..//reducers/profile";
import { getMeRequest } from "../actions/auth";
import Navbar from "../components/Navbar";
import "../styles/my-profile.css";
import Header from "../components/MyProfile/Header";
import ProfileBody from "../components/MyProfile/ProfileBody";

interface Props {
  profile: ProfileState;
  getMeRequest: typeof getMeRequest;
}

class MyProfile extends React.Component<Props> {
  componentDidMount() {
    this.props.getMeRequest();
  }

  render() {
    return (
      <div>
        <Navbar />
        <div className="my-profile">
          <Header />
          <ProfileBody />
        </div>
      </div>
    );
  }
}

export default connect(
  ({ profile }: AppState) => ({ profile }),
  { getMeRequest }
)(MyProfile);
