import * as React from "react";
import { bindActionCreators } from "redux";
import { connect, Dispatch } from "react-redux";
import { Link, match } from "react-router-dom";
import Question from "./Question";
import ProgressTracker from "./ProgressTracker";
import * as actions from "../actions/questions";
import { QuestionState } from "../reducers/questions";
import { AppState } from "../reducers/index";
import "../styles/personality-evaluator.css";
import Button from "./Shared/Button";

type Props = {
  answerQuestion: (
    index: number,
    score: number
  ) => ReturnType<typeof actions.answerQuestion>;
  nextQuestionSet: () => ReturnType<typeof actions.nextQuestionSet>;
  previousQuestionSet: () => ReturnType<typeof actions.previousQuestionSet>;
  calculateResults: () => ReturnType<typeof actions.calculateResults>;
  loadEvaluatorRequest: (
    uuid: string
  ) => ReturnType<typeof actions.loadEvaluatorRequest>;
  startEvaluatorRequest: () => ReturnType<typeof actions.startEvaluatorRequest>;
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
        match: {
          params: { uuid }
        },
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
        match: {
          params: { uuid }
        }
      } = this.props;
      const disableNext = questionList
        .slice(currentQuestionIndex, currentQuestionIndex + 5)
        .some(question => !question.userResponse);

      return (
        <div className="question-container">
          <div className="question-container-header">
            <h1>Personality Evalulator</h1>
            <h3>Lets start by gauging your personality & preferences.</h3>
            <h3>
              Answer the following questions honestly and accurately. They will
              help to identify your strengths & preferences, so that we can find
              you the jobs you are best suited for.
            </h3>
          </div>

          <ProgressTracker
            progress={(currentQuestionIndex / questionList.length) * 100}
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
              <Button
                disabled={currentQuestionIndex === 0}
                onClick={previousQuestionSet}
              >
                Previous
              </Button>

              {currentQuestionIndex < 39 && (
                <Button
                  disabled={currentQuestionIndex > 39 || disableNext}
                  onClick={nextQuestionSet}
                >
                  Next
                </Button>
              )}
              {currentQuestionIndex > 39 && (
                <Link to={`/onboarding/results/${uuid}`}>
                  <Button onClick={calculateResults}>Finish</Button>
                </Link>
              )}
            </div>
          )}
        </div>
      );
    }
  }
);
