import * as React from "react";
import { Route, match } from "react-router";
import { AppState } from "../reducers";
import Navbar from "../components/Navbar";
import ProfileList from "../components/ProfileSearch/ProfileList";
import ProfileDetail from "../components/ProfileSearch/ProfileDetail";
import "../styles/profile-container.css";

type Props = Partial<AppState> & { match: match<{}> };

class Search extends React.Component<Props> {
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
            path={this.props.match.url + "/:applicantId"}
            component={ProfileDetail}
          />
        </div>
      </div>
    );
  }
}

export default Search;
