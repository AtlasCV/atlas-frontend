import * as React from "react";
import "../styles/question.css";

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
  <div className="question">
    <p className="question-text">{questionText}</p>
    <div className="row">
      <label className="col-lg-3">
        <input
          id="answerResponseStronglyAgree"
          name={`${index} - answerResponse`}
          type="radio"
          onChange={() => handleAnswerSelect(index, 4)}
          checked={currentAnswer === 4}
        />
        Strongly Agree
      </label>
      <label className="col-lg-3">
        <input
          id="answerResponseAgree"
          name={`${index} - answerResponse`}
          type="radio"
          onChange={() => handleAnswerSelect(index, 2)}
          checked={currentAnswer === 2}
        />
        Agree
      </label>
      <label className="col-lg-3">
        <input
          id="answerResponseDisagree"
          name={`${index} - answerResponse`}
          type="radio"
          onChange={() => handleAnswerSelect(index, -2)}
          checked={currentAnswer === -2}
        />
        Disagree
      </label>
      <label className="col-lg-3">
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
  </div>
);
