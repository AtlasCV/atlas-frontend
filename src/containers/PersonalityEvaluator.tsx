import * as React from "react";
import { connect } from "react-redux";
import Question from "../components/Question";
import * as actions from "../actions/questions";

import { AnswerQuestion } from "../actions/types";
import { AppState } from "../reducers/index";
import { QuestionState } from "../reducers/questions";

type Props = {
  answerQuestion: (score: number) => AnswerQuestion;
  questions: QuestionState;
};

class PersonalityEvaluator extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  onSubmit = (score: number) => {
    return "hi";
  };

  render() {
    const { questions: { questionList, currentQuestionIndex } } = this.props;
    const currentQuestion = questionList[currentQuestionIndex];

    return (
      <div>
        This is the Personality Evaluator Container
        <Question questionText={currentQuestion.text} />
      </div>
    );
  }
}

export default connect(({ questions }: AppState) => ({ questions }), {
  ...actions
})(PersonalityEvaluator);
