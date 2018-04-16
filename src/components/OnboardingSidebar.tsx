import * as React from "react";
import "../styles/onboarding-sidebar.css";

type Props = {
  location: Location;
};

export default ({ location: { pathname } }: Props) => {
  return (
    <div className="col-sm-3 navigation no-padding">
      <div className="profile-picture-container">
        <img src="/assets/logo-white.png" alt="logo-white" />
      </div>
      <ul className="navigation-steps">
        <li
          className={
            pathname.includes("personality-evaluator") ||
            pathname.includes("results")
              ? "active"
              : ""
          }
        >
          Personality Evaluator
        </li>
        <li className={pathname.includes("signup") ? "active" : ""}>
          Qualifications
        </li>
        <li
          className={
            pathname.includes("distinguishing-criteria") ? "active" : ""
          }
        >
          Distinguishing Criteria
        </li>
      </ul>
    </div>
  );
};
