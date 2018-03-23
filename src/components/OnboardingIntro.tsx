import * as React from "react";
import { Link } from "react-router-dom";
import "../styles/onboarding-intro.css";

export default () => (
  <div className="introduction col-sm-9">
    <h2>Welcome to AtlasCV</h2>
    <p>
      There are just three easy steps to joining the only job hunting site you
      will ever need...
    </p>
    <div className="row">
      <div className="col-md-4 step-explanation">
        <h1>1</h1>
        <h5>Personality Evaluator</h5>
        <p>
          Through a quick evaluation, we will determine your ideal work culture.
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
        <h5>Distinguishing Criteria</h5>
        <p>
          What sets you apart from other applicants? This is the cover letter
          section.
        </p>
      </div>
    </div>
    <Link to="/onboarding/personality-evaluator">
      <button>Get Started</button>
    </Link>
  </div>
);
