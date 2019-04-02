import * as React from "react";
import { Link } from "react-router-dom";
import "../styles/onboarding-intro.css";
import Button from "./Shared/Button";

export default ({ uuid }: { uuid?: string }) => (
  <div className="introduction container-fluid">
    <div className="introduction-header row">
      <h2>Welcome to Showcase</h2>
      <h3>
        There are just three easy steps to joining the only job hunting site you
        will ever need
      </h3>
    </div>
    <div className="onboarding-steps-container row">
      <div className="step-explanation col-md-4">
        <div className="step-number">
          <h3>1</h3>
        </div>
        <h5>Culture Fit</h5>
        <p>
          Through a quick evaluation, we'll identify the ideal culture and
          position to suit your strengths and preferences.
        </p>
      </div>
      <div className="step-explanation col-md-4">
        <div className="step-number">
          <h3>2</h3>
        </div>
        <h5>Qualifications</h5>
        <p>
          Say goodbye to multiple job applications – List your credentials in
          detail once, and let us do the legwork by uploading it to 3 top job
          sites for free!
        </p>
      </div>
      <div className="step-explanation col-md-4">
        <div className="step-number">
          <h3>3</h3>
        </div>
        <h5>Distinguish Yourself</h5>
        <p>
          The days of traditional cover letters are over. Distinguish yourself
          with a detailed bio or introduction video.{" "}
        </p>
      </div>
    </div>
    <div className="button-container-onboarding">
      <Link to="/onboarding/personality-evaluator">
        <Button>LET'S GET STARTED</Button>
      </Link>
    </div>
  </div>
);
