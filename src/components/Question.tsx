import * as React from "react";

type Props = {
  questionText: string;
};

export default ({ questionText }: Props) => (
  <div>
    <form>
      <p>{questionText}</p>
      <label>
        <input
          id="answerResponseStronglyAgree"
          name="answerResponse"
          type="radio"
        />
        Strongly Agree
      </label>
      <label>
        <input id="answerResponseAgree" name="answerResponse" type="radio" />
        Agree
      </label>
      <label>
        <input id="answerResponseDisagree" name="answerResponse" type="radio" />
        Disagree
      </label>
      <label>
        <input
          id="answerResponseStronglyDisagree"
          name="answerResponse"
          type="radio"
        />
        Strongly Disagree
      </label>
      <button>Next</button>
    </form>
  </div>
);
