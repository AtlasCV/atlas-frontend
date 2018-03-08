import * as React from "react";

type Props = {
  handleAnswerSelect: (index: number, score: number) => void;
  questionText: string;
  currentAnswer: number;
  index: number;
};

export default ({
  questionText,
  handleAnswerSelect,
  currentAnswer,
  index
}: Props) => (
  <div>
    <p>{questionText}</p>
    <label>
      <input
        id="answerResponseStronglyAgree"
        name={`${index} - answerResponse`}
        type="radio"
        onChange={() => handleAnswerSelect(index, 4)}
        checked={currentAnswer === 4}
      />
      Strongly Agree
    </label>
    <label>
      <input
        id="answerResponseAgree"
        name={`${index} - answerResponse`}
        type="radio"
        onChange={() => handleAnswerSelect(index, 2)}
        checked={currentAnswer === 2}
      />
      Agree
    </label>
    <label>
      <input
        id="answerResponseDisagree"
        name={`${index} - answerResponse`}
        type="radio"
        onChange={() => handleAnswerSelect(index, -2)}
        checked={currentAnswer === -2}
      />
      Disagree
    </label>
    <label>
      <input
        id="answerResponseStronglyDisagree"
        name={`${index} - answerResponse`}
        type="radio"
        onChange={() => handleAnswerSelect(index, -4)}
        checked={currentAnswer === -4}
      />
      Strongly Disagree
    </label>
  </div>
);
