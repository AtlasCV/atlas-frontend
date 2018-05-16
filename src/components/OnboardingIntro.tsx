import * as React from "react";
import { Link } from "react-router-dom";
import "../styles/onboarding-intro.css";
import Button from "./Shared/Button";

export default ({ uuid }: { uuid?: string }) => (
  <div className="introduction col-sm-9">
    <h2>Welcome to AtlasCV</h2>
    <p>
      There are just three easy steps to joining the only job hunting site you
      will ever need...
    </p>
    <div className="row">
      <div className="col-md-4 step-explanation">
        <h1>1</h1>
        <h5>Culture Fit</h5>
        <p>
          Through a quick evaluation, we'll identify the ideal culture and
          position to suit your strengths and preferences.
        </p>
      </div>
      <div className="col-md-4 step-explanation">
        <h1>2</h1>
        <h5>Qualifications</h5>
        <p>
          What have you done in your professional and educational life? This is
          the resume section.
        </p>
      </div>
      <div className="col-md-4 step-explanation">
        <h1>3</h1>
        <h5>Distinguish Yourself</h5>
        <p>
          Say goodbye to the days of writing repetitive cover letters. Let
          employers know just how unique you are once and for all!
        </p>
      </div>
    </div>
    <Link to="/onboarding/personality-evaluator">
      <Button>Get Started</Button>
    </Link>
  </div>
);
