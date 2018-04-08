import { PersonalityQuestion } from "../types";

export default (questionList: PersonalityQuestion[], answers: number[]) => {
  return questionList.map((question, i) => ({
    ...question,
    userResponse: answers[i]
  }));
};
