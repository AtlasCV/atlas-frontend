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
        <li className={pathname.includes("company-signup") ? "active" : ""}>
          Company Information
        </li>
        <li className={pathname.includes("profile-signup") ? "active" : ""}>
          Profile Information
        </li>
      </ul>
    </div>
  );
};
