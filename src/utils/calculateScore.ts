import { QuestionState } from "../reducers/questions";

const calculateScore = (questionState: QuestionState) => {
  let finalScoreCopy = { ...questionState.finalScore };

  questionState.questionList.forEach(
    question => (finalScoreCopy[question.questionType] += question.userResponse)
  );

  questionState.questionList.forEach(
    question =>
      (finalScoreCopy[question.questionOpposite] -= question.userResponse)
  );
  return finalScoreCopy;
};

export default calculateScore;
