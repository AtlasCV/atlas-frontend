import { Reducer } from "redux";
import { PersonalityQuestion } from "../types/PersonalityQuestion";
import * as Actions from "../actions/types";
import shuffle from "../utils/shuffle";
import questions from "../constants/questions";
import { ANSWER_QUESTION } from "../constants/actionTypes";

export type QuestionState = {
  questionList: PersonalityQuestion[];
  currentQuestionIndex: number;
};

const QUESTION_INITIAL_STATE = {
  questionList: shuffle<PersonalityQuestion>(questions),
  currentQuestionIndex: 0
};

const answerQuestion = (
  state: QuestionState,
  { payload: { score } }: Actions.AnswerQuestion
) => {
  const questionListCopy = [...state.questionList];
  questionListCopy[state.currentQuestionIndex] = {
    ...questionListCopy[state.currentQuestionIndex],
    userResponse: score
  };
  return {
    ...state,
    questionList: questionListCopy,
    currentQuestionIndex: state.currentQuestionIndex + 1
  };
};

const questionsReducer: Reducer<QuestionState> = (
  state = QUESTION_INITIAL_STATE,
  action: Actions.AnswerQuestion
) => {
  switch (action.type) {
    case ANSWER_QUESTION:
      return answerQuestion(state, action);
    default:
      return state;
  }
};

export default questionsReducer;
