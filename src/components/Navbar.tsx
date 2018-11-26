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
  <div className="navbar">
    <img src="/assets/logo.png" alt="logo" />
    <div className="nav-links">
      <Link to="/#how-it-works">how it works</Link>
      <Link to="/faq">FAQ</Link>
      <Link to="/support">support</Link>
      {auth.authenticated ? (
        <>
          <Link to="/my-profile">view my profile</Link>
          <Link to="/" onClick={logout}>
            logout
          </Link>
        </>
      ) : (
        <>
          <Link to="/login">login</Link>
          <Link to="/onboarding/introduction">create an account</Link>
        </>
      )}
    </div>
  </div>
);

const mapState = ({ auth }: AppState) => ({ auth });
const mapDispatch = { logout: actions.logoutRequest };

export default connect<MapStateProps, MapDispatchProps, void>(
  mapState,
  mapDispatch
)(Navbar);
