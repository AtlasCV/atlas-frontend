import * as React from "react";
import { Link } from "react-router-dom";
import "../styles/onboarding-intro.css";
import Button from "./Shared/Button";

export default ({ uuid }: { uuid?: string }) => (
  <div className="introduction col-sm-9">
    <h2>Welcome to AtlasCV</h2>
    <p>There are just three easy steps to finding the perfect candidates...</p>
    <div className="row">
      <div className="col-md-4 step-explanation">
        <h1>1</h1>
        <h5>Create or Join A Company</h5>
        <p>
          If you're new to the service, create your company's information. You
          can also join an existing company.
        </p>
      </div>
      <div className="col-md-4 step-explanation">
        <h1>2</h1>
        <h5>Create Your Profile</h5>
        <p>
          Create your profile information including your name and contact
          information.
        </p>
      </div>
      <div className="col-md-4 step-explanation">
        <h1>3</h1>
        <h5>Post Jobs</h5>
        <p>Post your open positions and match with the perfect applicant.</p>
      </div>
    </div>
    <Link to="/employer-onboarding/company-signup/1">
      <Button>Get Started</Button>
    </Link>
  </div>
);
