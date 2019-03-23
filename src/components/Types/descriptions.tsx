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
            <b>
              {results[resultType] && results[resultType].name} ({resultType})
            </b>
          </h1>
          <h3 className="results-list">
            {resultType[0] === "I" ? "Independent, " : "Collaborative, "}
            {resultType[0] === "B"
              ? "Business Formal Culture, "
              : "Casual Creative Culture, "}
            {resultType[0] === "T" ? "Task Oriented, " : "Improvisational, "}
            {resultType[0] === "O" ? "Back Office" : "Client Facing"}
          </h3>
        </div>
        <div className="results-body row">
          <div className="col-md-6">
            <img
              src={`/assets/trophies/${resultType}.png`}
              alt={resultType}
              className="trophy-img"
            />
          </div>
          <div className="description col-md-6">
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
