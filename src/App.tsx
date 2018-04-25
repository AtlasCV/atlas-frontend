import * as React from "react";
import { Provider } from "react-redux";
import { ConnectedRouter } from "react-router-redux";
import { Route, Switch } from "react-router-dom";

import Onboarding from "./containers/Onboarding";
import LandingPage from "./containers/LandingPage";
import Login from "./containers/Login";

const init = require("./init").default;

const { store, history } = init();

const App = () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/onboarding" component={Onboarding} />
        <Route path="/" component={LandingPage} />
      </Switch>
    </ConnectedRouter>
  </Provider>
);

export default App;
