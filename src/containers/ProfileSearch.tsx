import * as React from "react";
import { connect } from "react-redux";
import { Route, match } from "react-router";
import { AppState } from "../reducers";
import Navbar from "../components/Navbar";
import ProfileList from "../components/ProfileSearch/ProfileList";
import ProfileDetail from "../components/ProfileSearch/ProfileDetail";
import { getMeRequest } from "../actions/auth";
import "../styles/profile-container.css";
import DistinguishYourself from "src/components/DistinguishYourself";

type Props = Partial<AppState> & {
  match: match<{}>;
  getMeRequest: typeof getMeRequest;
};

class Search extends React.Component<Props> {
  componentDidMount() {
    this.props.getMeRequest();
  }
  render() {
    return (
      <div>
        <Navbar />
        <div className="search-container">
          <Route
            exact={true}
            path={this.props.match.url + "/"}
            component={ProfileList}
          />
          <Route
            exact={true}
            path={this.props.match.url + "/:applicantName/:applicantId"}
            component={ProfileDetail}
          />
          <Route
            exact={true}
            path={
              this.props.match.url +
              "/:applicantName/:applicantId/distinguish-yourself"
            }
            render={props => (
              <DistinguishYourself
                isMyProfile={false}
                isInProfile={true}
                noMarginLeft={true}
                routerProps={props}
              />
            )}
          />
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  { getMeRequest }
)(Search);
