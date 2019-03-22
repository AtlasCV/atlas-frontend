import * as React from "react";
import { connect } from "react-redux";
import * as actions from "../actions/auth";
import { Link } from "react-router-dom";
import { AuthState } from "../reducers/auth";
import { AppState } from "../reducers";

type MapStateProps = { auth: AuthState };
type MapDispatchProps = {
  logout: typeof actions.logoutRequest;
};

type ComponentProps = MapStateProps & MapDispatchProps;

const Navbar = ({ auth, logout }: ComponentProps) => (
  <nav className="navbar navbar-expand-lg navbar-light bg-light row">
    <Link className="navbar-brand" to="/">
      <img
        src="/assets/logo.png"
        width="30"
        height="30"
        className="d-inline-block align-top"
        alt=""
      />
    </Link>
    <button
      className="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarNav"
      aria-controls="navbarNav"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      {" "}
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav">
        <Link className="nav-link nav-item" to="/personality-types">
          personality types
        </Link>

        <Link className="nav-link nav-item" to="/faq">
          FAQ
        </Link>

        <Link className="nav-link nav-item" to="/support">
          support
        </Link>
        {auth.authenticated ? (
          <>
            <Link className="nav-link nav-item" to="/my-profile">
              view my profile
            </Link>

            <Link className="nav-link nav-item" to="/" onClick={logout}>
              logout
            </Link>
          </>
        ) : (
          <>
            <Link className="nav-link nav-item" to="/login">
              login
            </Link>

            <Link className="nav-link nav-item" to="/onboarding/introduction">
              create an account
            </Link>
          </>
        )}
      </ul>
    </div>
  </nav>
);

const mapState = ({ auth }: AppState) => ({ auth });
const mapDispatch = { logout: actions.logoutRequest };

export default connect<MapStateProps, MapDispatchProps, void>(
  mapState,
  mapDispatch
)(Navbar);
