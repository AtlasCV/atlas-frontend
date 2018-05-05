import * as React from "react";
import "../styles/landing-page.css";
import { Link } from "react-router-dom";

export default () => (
  <div>
    <div className="header-section">
      <nav className="navbar">
        <a className="navbar-brand" href="#">
          <img className="logo" src="/assets/logo.png" />
        </a>
        <ul>
          <li className="nav-link">
            <Link to="/onboarding/introduction">Create an account</Link>
          </li>
          <li className="nav-link">
            <Link to="/login">Login</Link>
          </li>
          <li className="nav-link">
            <Link to="/#">How it works</Link>
          </li>
          <li className="nav-link">
            <Link to="/#">Support</Link>
          </li>
          <li className="nav-link">
            <Link to="/#">FAQ</Link>
          </li>
        </ul>
      </nav>
      <div className="hero-section">
        <div className="row">
          <div className="col-md-6 intro-text">
            <div className="header-text">
              <h3>ONE APPLICATION</h3>
              <h5>To End</h5>
              <h3>ALL APPLICATIONS</h3>
            </div>
            <h5>
              Consider us your 'Common App' for the job hunt. We build one
              profile to showcase your qualifications, talents & preferences,
              and allow you to apply & match with jobs that you are compatible
              with. No repeating applications, no wasting time.{" "}
            </h5>
            <Link to="/onboarding/introduction">
              <button>Get started</button>
            </Link>
          </div>
          <div className="col-md-6 image">
            <img src="/assets/EmployeeMatchedJobs.png" alt="mobile-with-hand" />
          </div>
        </div>
      </div>
    </div>
    <div className="application-section">
      <h3>We're revolutionizing the way you apply for jobs</h3>
      <div className="row">
        <div className="col-md-4">
          <img src="/assets/writing.png" alt="writing.png" />
          <h5>Sign Up</h5>
        </div>
        <div className="col-md-4">
          <img src="/assets/documents.png" alt="documents.png" />
          <h5>Curate your details</h5>
        </div>
        <div className="col-md-4">
          <img src="/assets/checkmark.png" alt="checkmark.png" />
          <h5>Match with jobs</h5>
        </div>
      </div>
      <p>
        Create one Profile to serve as your application for all jobs. Once
        complete,<br /> we algorithmically pair you directly with the perfect
        job.
      </p>
    </div>
    <div className="yellow-column" />
    <div className="employer-section">
      <div className="row">
        <div className="col-md-6 employer-info-text">
          <h3>Better quality candidates for employers</h3>
          <h5>
            As a company, you'll only be matched with applicants who meet the
            minimum requirements you need. Our curated matchmaking algorithm
            lets you filter by over 50 skills, certifications and experience
            tags.
          </h5>
          <h5>
            No more overqualified candidates. Let us find the needle in your
            haystack of resumes.
          </h5>
        </div>
        <div className="col-md-6">
          <img src="/assets/EmployerListings.png" alt="EmployerListings.png" />
        </div>
      </div>
    </div>
    <div className="find-out-more-section">
      <h2>Find out more</h2>
      <p>
        Join us along the way of becoming great! We will send you <br /> emails
        containing information of how you can help us. We don't spam.
      </p>
      <input type="text" placeholder="Your email address" />
      <button>JOIN US</button>
    </div>
    <div className="footer">
      <img src="/assets/logo-white.png" alt="logo-white.png" />
      <p>Copyright 2018 AtlasCV. All Rights Reserved.</p>
    </div>
  </div>
);
