import * as React from "react";
import { connect } from "react-redux";
import { Route, Switch } from "react-router";
import { AppState } from "../reducers";
import { ProfileState } from "..//reducers/profile";
import { getMeRequest } from "../actions/auth";
import Navbar from "../components/Navbar";
import "../styles/my-profile.css";
import ProfileBody from "../components/MyProfile/ProfileBody";
import DistinguishYourself from "../components/DistinguishYourself";
import Skills from "../components/Signup/Skills";
import Education from "../components/Signup/Education";
import JobExperiences from "../components/Signup/JobExperiences";
import Certifications from "../components/Signup/Certifications";

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
              render={() => (
                <DistinguishYourself noMarginLeft={true} isInProfile={true} />
              )}
            />
            <Route
              exact={true}
              path="/my-profile/skills"
              render={() => <Skills isInProfile={true} />}
            />
            <Route
              exact={true}
              path="/my-profile/education"
              render={() => <Education isInProfile={true} />}
            />
            <Route
              exact={true}
              path="/my-profile/job-experiences"
              render={() => <JobExperiences isInProfile={true} />}
            />
            <Route
              exact={true}
              path="/my-profile/certifications"
              render={() => <Certifications isInProfile={true} />}
            />
            <Route
              exact={true}
              path="/my-profile"
              render={() => <ProfileBody />}
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
