import * as React from "react";
import "../styles/onboarding-sidebar.css";

export default () => (
  <div className="col-sm-3 navigation no-padding">
    <div className="profile-picture-container">
      <img src="/assets/logo-white.png" alt="logo-white" />
    </div>
    <ul className="navigation-steps">
      <li className="active">Personality Evaluator</li>
      <li>Qualifications</li>
      <li>Distinguishing Criteria</li>
    </ul>
  </div>
);
