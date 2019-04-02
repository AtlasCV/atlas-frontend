import * as React from "react";
import "../styles/landing-page.css";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { connect } from "react-redux";
import { getMeRequest } from "../actions/auth";
import { AuthState } from "../reducers/auth";
import { AppState } from "../reducers";

type Props = {
  getMeRequest: typeof getMeRequest;
  auth: AuthState;
};

class LandingPage extends React.Component<Props> {
  componentDidMount() {
    const { getMeRequest, auth } = this.props;
    if (auth.token) {
      getMeRequest();
    }
  }

  render() {
    return (
      <div className="container-fluid">
        <Navbar />
        <div className="hero-section row">
          <h1 className="display-4">
            One application <br /> to end all applications.
          </h1>
        </div>
        <div className="explainer-section row">
          <div className="offset-lg-2 col-lg-5">
            <h3 className="display-5">
              Consider us your 'Common App' for the job hunt.
            </h3>
            <p>
              We build one detailed profile to showcase all of your talents,
              qualifications, and professional culture preferences.
            </p>
            <p>
              Our ‘Culture Fit’ questionnaire identifies your professional
              strengths based on your personality & desired work environment.
            </p>
            <p>
              Using your results & credentials, your 'Showcase' can be shared
              with compatible companies, who can see which type of role you may
              be best suited for.
            </p>
            <Link to="/onboarding/introduction">
              <button className="get-started-button">GET STARTED</button>
            </Link>
          </div>
          <div className="col-lg-5">
            <img
              className="matched-jobs"
              src="/assets/EmployeeMatchedJobs.png"
              alt=""
            />
          </div>
        </div>
        <div className="boring-resume-section">
          <h3 className="display-5">Say goodbye to boring resumes.</h3>
          <h5>
            We believe that being fitted to the right role in the right company
            is just as important as getting in the door.
          </h5>
          <div className="col-md-12">
            <div className="steps-container row">
              <div className="step col-md-4">
                <img src="/assets/writing.png" alt="writing" />
                <h4>EVALUATE</h4>
                <h5>
                  your personality honestly to find the best roles for you.
                </h5>
              </div>
              <div className="step col-md-4">
                <img src="/assets/documents.png" alt="documents" />
                <h4>CURATE</h4>
                <h5>your details & professional attributes</h5>
              </div>
              <div className="step col-md-4">
                <img src="/assets/checkmark.png" alt="checkmark" />
                <h4>SHARE</h4>
                <h5>
                  your ‘Showcase’ results & never write another resume again
                </h5>
              </div>
            </div>
          </div>
          <div className="boring-resume-footer">
            <h5>
              We are changing the traditional process of cover letters & boring
              resumes. Share your eye-catching showcase profile anywhere to get
              noticed.
            </h5>
            <h3 className="display-5">Say goodbye to boring resumes.</h3>
          </div>
        </div>
        <div className="employer-section row">
          <h2 className="col-xs-12">More insight for employers</h2>
          <p className="col-xs-12">
            Culture fit is just as important as credentials in today’s job
            markets. Now you can not only see the qualifications & attributes of
            your candidate, but you can see the person behind the numbers. Our
            culture fit evaluator will make sure that you know the personality
            and tendencies of an applicant, in order to place them in the best
            roles.
          </p>
          <p className="col-xs-12">
            Looking for back office staff? We've got you covered. Looking for
            outgoing, client-facing reps in the field? We can point out the
            ideal candidates for you.
          </p>
          <p className="col-xs-12">
            Our detailed questionnaire will give an honest insight into your
            potential new hire, so that you can determine if they may be the
            right fit before taking an interview. We separate our applicants
            into different personality types, and explain them to you in detail
            so that you can gauge whether they will gel into your organization.
          </p>
          <div className="employer-section-footer row">
            <div className="col-xl-6">
              <button>GET STARTED AS AN EMPLOYER</button>
            </div>
            <div className="col-xl-6">
              <img
                className="employer-listings"
                src="/assets/EmployerListings.png"
                alt="employer-listings"
              />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

const mapState = ({ auth }: Partial<AppState>) => ({ auth });
const mapDispatch = { getMeRequest };

export default connect(
  mapState,
  mapDispatch
)(LandingPage);
