import * as React from "react";
import { connect } from "react-redux";
import Question from "../components/Question";
import * as actions from "../actions/questions";

import {
  AnswerQuestion,
  NextQuestionSet,
  PreviousQuestionSet,
  CalculateResults
} from "../actions/types";
import { AppState } from "../reducers/index";
import { QuestionState } from "../reducers/questions";
import "../styles/personality-evaluator.css";

type Props = {
  answerQuestion: (index: number, score: number) => AnswerQuestion;
  nextQuestionSet: () => NextQuestionSet;
  previousQuestionSet: () => PreviousQuestionSet;
  calculateResults: () => CalculateResults;
  questions: QuestionState;
};

class PersonalityEvaluator extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const {
      questions: {
        questionList,
        currentQuestionIndex,
        evaluatorCompleted,
        finalScore
      },
      nextQuestionSet,
      previousQuestionSet,
      calculateResults,
      answerQuestion
    } = this.props;

    const disableNext = questionList
      .slice(currentQuestionIndex, currentQuestionIndex + 5)
      .some(question => !question.userResponse);

    return (
      <div className="container personality-evaluator">
        <div className="row">
          <div className="col-sm-3 navigation no-padding">
            <div className="profile-picture-container">ATLAS LOGO HERE</div>
            <ul className="navigation-steps">
              <li className="active">Personality Evaluator</li>
              <li>Qualifications</li>
              <li>Distinguishing Criteria</li>
            </ul>
          </div>
          <div className="col-sm-9 no-padding question-container">
            <h3>Personality Evalulator</h3>
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
            {evaluatorCompleted && (
              <div>
                <p>Independent: {finalScore.independent}</p>
                <p>Collaborative: {finalScore.collaborative}</p>
                <p>Client Facing: {finalScore.clientFacing}</p>
                <p>Back Office: {finalScore.backOffice}</p>
                <p>Formal: {finalScore.formal}</p>
                <p>Casual: {finalScore.casual}</p>
                <p>Task Oriented: {finalScore.taskOriented}</p>
                <p>Improvisor: {finalScore.improvisor}</p>
              </div>
            )}
            {!evaluatorCompleted && (
              <div>
                <button
                  disabled={currentQuestionIndex === 0}
                  onClick={previousQuestionSet}
                  className="prev-btn"
                >
                  Previous
                </button>
                <button
                  disabled={currentQuestionIndex > 39 || disableNext}
                  onClick={nextQuestionSet}
                  className="next-btn"
                >
                  Next
                </button>
                {currentQuestionIndex > 39 && (
                  <button onClick={calculateResults}>Finish</button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default connect(({ questions }: AppState) => ({ questions }), {
  ...actions
})(PersonalityEvaluator);
