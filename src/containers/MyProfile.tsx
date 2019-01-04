import * as React from "react";
import { connect } from "react-redux";
import { Route, Switch } from "react-router";
import { AppState } from "../reducers";
import { ProfileState } from "..//reducers/profile";
import { getMeRequest } from "../actions/auth";
import Navbar from "../components/Navbar";
import "../styles/my-profile.css";
import Header from "../components/MyProfile/Header";
import ProfileBody from "../components/MyProfile/ProfileBody";
import DistinguishYourself from "../components/DistinguishYourself";

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
          <Switch>
            <Route
              exact={true}
              path="/my-profile/distinguish-yourself"
              render={() => <DistinguishYourself />}
            />
            <Route
              exact={true}
              path="/my-profile"
              render={() => (
                <>
                  <Header />
                  <ProfileBody />
                </>
              )}
            />
          </Switch>
        </div>
      </div>
    );
  }
}

export default connect(
  ({ profile }: AppState) => ({ profile }),
  { getMeRequest }
)(MyProfile);
