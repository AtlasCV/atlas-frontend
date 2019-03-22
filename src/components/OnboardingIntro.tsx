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
          What have you done in your professional and educational life? This is
          the resume section.
        </p>
      </div>
      <div className="step-explanation col-md-4">
        <div className="step-number">
          <h3>3</h3>
        </div>
        <h5>Distinguish Yourself</h5>
        <p>
          Say goodbye to the days of writing repetitive cover letters. Let
          employers know just how unique you are once and for all!
        </p>
      </div>
    </div>
    <div className="button-container">
      <Link to="/onboarding/personality-evaluator">
        <Button>LET'S GET STARTED</Button>
      </Link>
    </div>
  </div>
);
