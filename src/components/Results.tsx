import * as React from "react";
import { connect } from "react-redux";
import { AppState } from "../reducers/index";
import * as actions from "../actions/questions";
import results from "../constants/results";
import "../styles/results.css";

export default connect(({ questions }: AppState) => ({ questions }), {
  ...actions
})(({ questions: { evaluatorCompleted, finalScore } }) => {
  const {
    scoreSignature,
    independent,
    collaborative,
    clientFacing,
    backOffice,
    formal,
    casual,
    taskOriented,
    improvisor
  } = finalScore;
  return (
    <div className="col-sm-9 results-container">
      <h2>
        You are{" "}
        <b>
          {results[scoreSignature] && results[scoreSignature].name} ({
            scoreSignature
          })
        </b>
      </h2>
      <ul className="results-list">
        <li>
          {independent > collaborative
            ? "Independent (I)"
            : "Collaborative (L)"}
        </li>
        <li>
          {formal > casual
            ? "Business Formal Culture (B)"
            : "Casual Creative Culture (C)"}
        </li>
        <li>
          {taskOriented > improvisor
            ? "Task Oriented (T)"
            : "Improvisational (M)"}
        </li>
        <li>
          {backOffice > clientFacing ? "Back Office (O)" : "Collaborative (F)"}
        </li>
      </ul>
      <div className="description">
        <h5>Description</h5>
        <p>{results[scoreSignature] && results[scoreSignature].description}</p>
      </div>
      <button>Next</button>
    </div>
  );
});
