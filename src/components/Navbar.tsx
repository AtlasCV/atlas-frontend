import * as React from "react";
import { Link } from "react-router-dom";

export default () => (
  <div className="navbar">
    <img src="/assets/logo.png" alt="logo" />
    <div className="nav-links">
      <Link to="/onboarding/introduction">create an account</Link>
      <Link to="/login">login</Link>
      <Link to="/#how-it-works">how it works</Link>
      <Link to="/faq">FAQ</Link>
      <Link to="/support">support</Link>
    </div>
  </div>
);
