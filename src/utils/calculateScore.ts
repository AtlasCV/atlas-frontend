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
  const {
    collaborative,
    independent,
    formal,
    casual,
    taskOriented,
    improvisor,
    backOffice,
    clientFacing
  } = finalScoreCopy;
  let scoreSignature = "";
  scoreSignature += collaborative > independent ? "L" : "I";
  scoreSignature += formal > casual ? "B" : "C";
  scoreSignature += taskOriented > improvisor ? "T" : "M";
  scoreSignature += backOffice > clientFacing ? "O" : "F";

  finalScoreCopy.scoreSignature = scoreSignature;
  return finalScoreCopy;
};

export default calculateScore;
