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
      return (
        <div className="results-container descriptor-page">
          <div className="results-header">
            <h2>Your personality type is...</h2>
            <div
              className={`color-bar color-bar-${results[scoreSignature].color}`}
            />

            <h1>
              <b>{results[scoreSignature] && results[scoreSignature].name}</b>
            </h1>
            <h2>{scoreSignature}</h2>
            <ul className="results-list">
              <div style={{ marginRight: "20px" }}>
                <li>
                  {independent > collaborative
                    ? "Independent"
                    : "Collaborative"}
                </li>
                <li>
                  {formal > casual
                    ? "Business Formal Culture"
                    : "Casual Creative Culture"}
                </li>
              </div>
              <div>
                <li>
                  {taskOriented > improvisor
                    ? "Task Oriented"
                    : "Improvisational"}
                </li>
                <li>
                  {backOffice > clientFacing ? "Back Office" : "Client Facing"}
                </li>
              </div>
            </ul>
          </div>
          <div className="results-body row">
            <div className="col-md-4">
              <img
                src={`/assets/trophies/${scoreSignature}.png`}
                alt={scoreSignature}
                className="trophy-img"
              />
            </div>

            <div className="description col-md-8">
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
