import * as React from "react";
import { Provider } from "react-redux";
import { ConnectedRouter } from "react-router-redux";
import { Route, Switch } from "react-router-dom";

import PersonalityEvaluator from "./containers/PersonalityEvaluator";
import LandingPage from "./containers/LandingPage";

const init = require("./init").default;

const { store, history } = init();

const App = () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Switch>
        <Route path="/personality-evaluator" component={PersonalityEvaluator} />
        <Route path="/" component={LandingPage} />
      </Switch>
    </ConnectedRouter>
  </Provider>
);

export default App;
