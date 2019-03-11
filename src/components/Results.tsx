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
import { formatDescription } from "./Types/descriptions";

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
      console.log(scoreSignature);
      return (
        <div className="results-container">
          <div className="results-header">
            <h2>Your personality type is...</h2>
            <h1>
              <b>
                {results[scoreSignature] && results[scoreSignature].name} (
                {scoreSignature})
              </b>
            </h1>
            <h3 className="results-list">
              {independent > collaborative
                ? "Independent, "
                : "Collaborative, "}
              {formal > casual
                ? "Business Formal Culture, "
                : "Casual Creative Culture, "}
              {taskOriented > improvisor
                ? "Task Oriented, "
                : "Improvisational, "}
              {backOffice > clientFacing ? "Back Office" : "Client Facing"}
            </h3>
          </div>
          <div className="results-body">
            <img
              src={`/assets/trophies/${scoreSignature}.png`}
              alt={scoreSignature}
              className="trophy-img"
            />

            <div className="description">
              {formatDescription(
                results[scoreSignature] && results[scoreSignature].description
              )}
            </div>
          </div>
          <Link to={`/onboarding/signup/1/${uuid}`}>
            <Button>Next</Button>
          </Link>
        </div>
      );
    }
  }
);
