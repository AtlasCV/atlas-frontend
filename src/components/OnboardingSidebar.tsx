import * as React from "react";
import "../styles/onboarding-sidebar.css";

type Props = {
  location: Location;
};

export default ({ location: { pathname } }: Props) => {
  return (
    <div className="navigation">
      <ul className="navigation-steps">
        <li
          className={
            pathname.includes("personality-evaluator") ||
            pathname.includes("results")
              ? "active"
              : ""
          }
        >
          <div className="sidebar-step-number">
            <h4>1</h4>
          </div>
          Culture Fit
        </li>
        <li className={pathname.includes("signup") ? "active" : ""}>
          <div className="sidebar-step-number">
            <h4>2</h4>
          </div>
          Qualifications
        </li>
        <li
          className={pathname.includes("distinguish-yourself") ? "active" : ""}
        >
          <div className="sidebar-step-number">
            <h4>3</h4>
          </div>
          Distinguish Yourself
        </li>
      </ul>
    </div>
  );
};
