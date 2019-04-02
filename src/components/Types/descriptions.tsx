import * as React from "react";
import { match, Link } from "react-router-dom";
import { connect } from "react-redux";
import { push } from "react-router-redux";
import results from "../../constants/results";
import "../../styles/results.css";
import Navbar from "../Navbar";

type DescriptionBodyProps = {
  match: match<{ resultType: string }>;
  push: typeof push;
};

export const formatDescription = (description: string) => {
  return description
    .split(`\n`)
    .map((sentance, i) => <p key={i}>{sentance}</p>);
};

const DescriptionBody: React.SFC<DescriptionBodyProps> = ({
  match: {
    params: { resultType }
  }
}) => {
  window.scrollTo({ top: 0 });
  return (
    <div>
      <Navbar />
      <div className="results-container descriptor-page">
        <Link to="/personality-types" className="back-to-list">
          <p>{`<< Back To List`}</p>
        </Link>
        <div className="results-header">
          <div className={`color-bar color-bar-${results[resultType].color}`} />
          <h1>
            <b>{results[resultType] && results[resultType].name}</b>
          </h1>
          <h2>{resultType}</h2>
          <ul className="results-list">
            <div style={{ marginRight: "20px" }}>
              <li>{resultType[0] === "I" ? "Independent" : "Collaborative"}</li>
              <li>
                {resultType[0] === "B"
                  ? "Business Formal Culture"
                  : "Casual Creative Culture"}
              </li>
            </div>
            <div>
              <li>
                {resultType[0] === "T" ? "Task Oriented" : "Improvisational"}
              </li>
              <li>{resultType[0] === "O" ? "Back Office" : "Client Facing"}</li>
            </div>
          </ul>
        </div>
        <div className="results-body row">
          <div className="col-md-4">
            <img
              src={`/assets/trophies/${resultType}.png`}
              alt={resultType}
              className="trophy-img"
            />
          </div>
          <div className="description col-md-8">
            {formatDescription(
              results[resultType] && results[resultType].description
            )}
          </div>
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
)(DescriptionBody);
