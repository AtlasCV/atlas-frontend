import * as React from "react";
import { Provider } from "react-redux";
import { ConnectedRouter } from "react-router-redux";
import { Route, Switch } from "react-router-dom";

import Onboarding from "./containers/Onboarding";
import EmployerOnboarding from "./containers/EmployerOnboarding";
import LandingPage from "./containers/LandingPage";
import Login from "./containers/Login";
import MyProfile from "./containers/MyProfile";
import ProfileSearch from "./containers/ProfileSearch";
import Description from "./components/Types/descriptions";
import ResultTypes from "./components/Types";

const init = require("./init").default;

const { store, history } = init();

const App = () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/onboarding" component={Onboarding} />
        <Route path="/employer-onboarding" component={EmployerOnboarding} />
        <Route path="/my-profile" component={MyProfile} />
        <Route path="/profiles" component={ProfileSearch} />
        <Route exact={true} path="/personality-types" component={ResultTypes} />
        <Route
          exact={true}
          path="/personality-types/:resultType"
          component={Description}
        />
        <Route path="/" component={LandingPage} />
      </Switch>
    </ConnectedRouter>
  </Provider>
);

export default App;
