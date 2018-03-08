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
      <div>
        <h3>Step 1. Personality Evalulator</h3>
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
            >
              Previous
            </button>
            <button
              disabled={currentQuestionIndex > 39 || disableNext}
              onClick={nextQuestionSet}
            >
              Next
            </button>
            {currentQuestionIndex > 39 && (
              <button onClick={calculateResults}>Finish</button>
            )}
          </div>
        )}
      </div>
    );
  }
}

export default connect(({ questions }: AppState) => ({ questions }), {
  ...actions
})(PersonalityEvaluator);
