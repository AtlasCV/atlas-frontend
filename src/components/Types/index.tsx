import * as React from "react";
import { match, Link } from "react-router-dom";
import { connect } from "react-redux";
import Navbar from "../Navbar";
import { push } from "react-router-redux";
import "../../styles/results.css";

type ResultTypesProps = {
  match: match<{ resultType: string }>;
  push: typeof push;
};

export const formatDescription = (description: string) => {
  return description
    .split(`\n`)
    .map((sentance, i) => <p key={i}>{sentance}</p>);
};

const ResultTypes: React.SFC<ResultTypesProps> = () => {
  window.scrollTo({ top: 0 });
  return (
    <div>
      <Navbar />
      <div className="results-container descriptor-page">
        <div className="results-header">
          <h1>
            <b>Showcase Personality Types</b>
          </h1>
        </div>
        <div className="types-row">
          <Link to="/personality-types/LBTO">
            <img
              src="/assets/trophies/LBTO.png"
              alt="LBTO"
              className="trophy-img-md"
            />
          </Link>
          <Link to="/personality-types/LBTF">
            <img
              src="/assets/trophies/LBTF.png"
              alt="LBTF"
              className="trophy-img-md"
            />
          </Link>
          <Link to="/personality-types/LBMF">
            <img
              src="/assets/trophies/LBMF.png"
              alt="LBMF"
              className="trophy-img-md"
            />
          </Link>
          <Link to="/personality-types/LCMF">
            <img
              src="/assets/trophies/LCMF.png"
              alt="LCMF"
              className="trophy-img-md"
            />
          </Link>
        </div>

        <div className="types-row">
          <Link to="/personality-types/ICMF">
            <img
              src="/assets/trophies/ICMF.png"
              alt="ICMF"
              className="trophy-img-md"
            />
          </Link>
          <Link to="/personality-types/ICMO">
            <img
              src="/assets/trophies/ICMO.png"
              alt="ICMO"
              className="trophy-img-md"
            />
          </Link>
          <Link to="/personality-types/ICTO">
            <img
              src="/assets/trophies/ICTO.png"
              alt="ICTO"
              className="trophy-img-md"
            />
          </Link>
          <Link to="/personality-types/IBTO">
            <img
              src="/assets/trophies/IBTO.png"
              alt="IBTO"
              className="trophy-img-md"
            />
          </Link>
        </div>

        <div className="types-row">
          <Link to="/personality-types/LCTF">
            <img
              src="/assets/trophies/LCTF.png"
              alt="LCTF"
              className="trophy-img-md"
            />
          </Link>
          <Link to="/personality-types/IBMO">
            <img
              src="/assets/trophies/IBMO.png"
              alt="IBMO"
              className="trophy-img-md"
            />
          </Link>
          <Link to="/personality-types/LCMO">
            <img
              src="/assets/trophies/LCMO.png"
              alt="LCMO"
              className="trophy-img-md"
            />
          </Link>
          <Link to="/personality-types/IBTF">
            <img
              src="/assets/trophies/IBTF.png"
              alt="IBTF"
              className="trophy-img-md"
            />
          </Link>
        </div>

        <div className="types-row">
          <Link to="/personality-types/LBMO">
            <img
              src="/assets/trophies/LBMO.png"
              alt="LBMO"
              className="trophy-img-md"
            />
          </Link>
          <Link to="/personality-types/ICTF">
            <img
              src="/assets/trophies/ICTF.png"
              alt="ICTF"
              className="trophy-img-md"
            />
          </Link>
          <Link to="/personality-types/LCTO">
            <img
              src="/assets/trophies/LCTO.png"
              alt="LCTO"
              className="trophy-img-md"
            />
          </Link>
          <Link to="/personality-types/IBMF">
            <img
              src="/assets/trophies/IBMF.png"
              alt="IBMF"
              className="trophy-img-md"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default connect(
  null,
  {
    push
  }
)(ResultTypes);
