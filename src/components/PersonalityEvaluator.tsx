import * as React from "react";
import { bindActionCreators } from "redux";
import { connect, Dispatch } from "react-redux";
import { Link, match } from "react-router-dom";
import Question from "./Question";
import ProgressTracker from "./ProgressTracker";
import * as actions from "../actions/questions";
import { QuestionState } from "../reducers/questions";
import { AppState } from "../reducers/index";
import {
  AnswerQuestion,
  NextQuestionSet,
  PreviousQuestionSet,
  CalculateResults,
  LoadEvaluatorRequest,
  StartEvaluatorRequest
} from "../actions/types";
import "../styles/personality-evaluator.css";

type Props = {
  answerQuestion: (index: number, score: number) => AnswerQuestion;
  nextQuestionSet: () => NextQuestionSet;
  previousQuestionSet: () => PreviousQuestionSet;
  calculateResults: () => CalculateResults;
  loadEvaluatorRequest: (uuid: string) => LoadEvaluatorRequest;
  startEvaluatorRequest: () => StartEvaluatorRequest;
  questions: QuestionState;
  match: match<{ uuid: string }>;
};

export default connect(
  ({ questions }: AppState) => ({ questions }),
  (dispatch: Dispatch<AppState>) =>
    bindActionCreators(
      {
        answerQuestion: actions.answerQuestion,
        nextQuestionSet: actions.nextQuestionSet,
        previousQuestionSet: actions.previousQuestionSet,
        calculateResults: actions.calculateResults,
        loadEvaluatorRequest: actions.loadEvaluatorRequest,
        startEvaluatorRequest: actions.startEvaluatorRequest
      },
      dispatch
    )
)(
  class PersonalityEvaluator extends React.Component<Props> {
    componentDidMount() {
      const {
        match: { params: { uuid } },
        loadEvaluatorRequest,
        startEvaluatorRequest
      } = this.props;
      if (uuid) {
        loadEvaluatorRequest(uuid);
      } else {
        startEvaluatorRequest();
      }
    }

    render() {
      const {
        questions: { questionList, currentQuestionIndex, evaluatorCompleted },
        nextQuestionSet,
        previousQuestionSet,
        calculateResults,
        answerQuestion,
        match: { params: { uuid } }
      } = this.props;
      const disableNext = questionList
        .slice(currentQuestionIndex, currentQuestionIndex + 5)
        .some(question => !question.userResponse);

      return (
        <div className="col-sm-9 no-padding question-container">
          <h3>Personality Evalulator</h3>
          <ProgressTracker
            progress={currentQuestionIndex / questionList.length * 100}
          />
          <React.Fragment>
            {questionList
              .slice(currentQuestionIndex, currentQuestionIndex + 5)
              .map((question, i) => (
                <Question
                  key={question.text}
                  questionText={question.text}
                  handleAnswerSelect={answerQuestion}
                  index={currentQuestionIndex + i}
                  currentAnswer={question.userResponse}
                />
              ))}
          </React.Fragment>
          {!evaluatorCompleted && (
            <div>
              {currentQuestionIndex > 39 && (
                <React.Fragment>
                  <p>You're all done!</p>
                  <p>
                    You can go back and review and change your answers. When
                    you're comfortable with your choices, click "Finish" to
                    complete the evaluator and get your results
                  </p>
                </React.Fragment>
              )}
              <button
                disabled={currentQuestionIndex === 0}
                onClick={previousQuestionSet}
                className="prev-btn"
              >
                Previous
              </button>

              {currentQuestionIndex < 39 && (
                <button
                  disabled={currentQuestionIndex > 39 || disableNext}
                  onClick={nextQuestionSet}
                  className="next-btn"
                >
                  Next
                </button>
              )}
              {currentQuestionIndex > 39 && (
                <Link to={`/onboarding/results/${uuid}`}>
                  <button className="next-btn" onClick={calculateResults}>
                    Finish
                  </button>
                </Link>
              )}
            </div>
          )}
        </div>
      );
    }
  }
);
