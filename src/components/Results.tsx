import * as React from "react";
import { bindActionCreators } from "redux";
import { Link, match } from "react-router-dom";
import { connect } from "react-redux";
import { push, RouterAction } from "react-router-redux";
import { AppState } from "../reducers/index";
import * as actions from "../actions/questions";
import results from "../constants/results";
import "../styles/results.css";
import { QuestionState } from "../reducers/questions";
import Button from "./Shared/Button";

type ResultsProps = {
  questions: QuestionState;
  loadEvaluatorRequest: (
    uuid: string
  ) => ReturnType<typeof actions.loadEvaluatorRequest>;
  match: match<{ uuid: string }>;
  push: () => RouterAction;
};

export default connect(
  ({ questions }: AppState) => ({ questions }),
  dispatch =>
    bindActionCreators(
      {
        loadEvaluatorRequest: actions.loadEvaluatorRequest,
        push
      },
      dispatch
    )
)(
  class Results extends React.Component<ResultsProps> {
    componentDidMount() {
      const {
        match: {
          params: { uuid }
        },
        loadEvaluatorRequest
      } = this.props;
      if (uuid) {
        loadEvaluatorRequest(uuid);
      } else {
        push("/onboarding/personality-evaluator");
      }
    }
    render() {
      const {
        questions: { finalScore },
        match: {
          params: { uuid }
        }
      } = this.props;
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
        <div className="results-container">
          <h2>
            You are{" "}
            <b>
              {results[scoreSignature] && results[scoreSignature].name} (
              {scoreSignature})
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
              {backOffice > clientFacing
                ? "Back Office (O)"
                : "Collaborative (F)"}
            </li>
          </ul>
          <div className="description">
            <h5>Description</h5>
            <p>
              {results[scoreSignature] && results[scoreSignature].description}
            </p>
          </div>
          <Link to={`/onboarding/signup/1/${uuid}`}>
            <Button>Next</Button>
          </Link>
        </div>
      );
    }
  }
);
