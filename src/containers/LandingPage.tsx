import * as React from "react";
import "../styles/landing-page.css";
import { Link } from "react-router-dom";

export default () => (
  <div>
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
    <div className="hero-section">
      <h1>
        One application <br /> to end all applications.
      </h1>
    </div>
    <div className="explainer-section">
      <div>
        <h3>Consider us your 'Common App' for the job hunt.</h3>
        <p>
          We build one detailed profile to showcase all of your talents,
          qualifications, and professional culture preferences.
        </p>
        <p>
          Our ‘Culture Fit’ questionnaire identifies your professional strengths
          based on your personality & desired work environment.
        </p>
        <p>
          Using your results & credentials, your 'Showcase' can be shared with
          compatible companies, who can see which type of role you may be best
          suited for.
        </p>
        <Link to="/onboarding/introduction">
          <button className="get-started-button">GET STARTED</button>
        </Link>
      </div>
      <img src="/assets/EmployeeMatchedJobs.png" alt="" />
    </div>
    <div className="boring-resume-section">
      <h2>Say goodbye to boring resumes.</h2>
      <h3>
        We believe that being fitted to the right role in the right company is
        just as important as getting in the door.
      </h3>
      <div className="steps-container">
        <div className="step">
          <img src="/assets/writing.png" alt="writing" />
          <h4>EVALUATE</h4>
          <h5>your personality honestly to find the best roles for you.</h5>
        </div>
        <div className="step">
          <img src="/assets/documents.png" alt="documents" />
          <h4>CURATE</h4>
          <h5>your details & professional attributes</h5>
        </div>
        <div className="step">
          <img src="/assets/checkmark.png" alt="checkmark" />
          <h4>SHARE</h4>
          <h5>your ‘Showcase’ results & never write another resume again</h5>
        </div>
      </div>
      <div className="boring-resume-footer">
        <h3>
          We are changing the traditional process of cover letters & boring
          resumes. Share your eye-catching showcase profile anywhere to get
          noticed.
        </h3>
        <h2>Best of all, it’s free.</h2>
      </div>
    </div>
    <div className="employer-section">
      <h2>More insight for employers</h2>
      <p>
        Culture fit is just as important as credentials in today’s job markets.
        Now you can not only see the qualifications & attributes of your
        candidate, but you can see the person behind the numbers. Our culture
        fit evaluator will make sure that you know the personality and
        tendencies of an applicant, in order to place them in the best roles.
      </p>
      <p>
        Looking for back office staff? We've got you covered. Looking for
        outgoing, client-facing reps in the field? We can point out the ideal
        candidates for you.
      </p>
      <p>
         Our detailed questionnaire will give an honest insight into your
        potential new hire, so that you can determine if they may be the right
        fit before taking an interview. We separate our applicants into
        different personality types, and explain them to you in detail so that
        you can gauge whether they will gel into your organization.
      </p>
      <div className="employer-section-footer">
        <button>GET STARTED AS AN EMPLOYER</button>
        <img src="/assets/EmployerListings.png" alt="employer-listings" />
      </div>
    </div>
    <div className="footer">
      <div className="social-icons">social icons go here</div>
      <div className="copyright-and-links">
        <p>c 2018 Showcase. All rights reserved.</p>
        <div>
          <Link to="/terms-and-conditions">terms & conditions</Link>
          <Link to="/contact-us">contact us</Link>
          <Link to="/faq">FAQ</Link>
          <Link to="/support">support</Link>
        </div>
      </div>
    </div>
  </div>
);
