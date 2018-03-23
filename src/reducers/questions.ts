import { Reducer } from "redux";
import { PersonalityQuestion } from "../types/PersonalityQuestion";
import { FinalScore } from "../types/FinalScore";
import * as Actions from "../actions/types";
import questions from "../constants/questions";
import calculateScore from "../utils/calculateScore";
import {
  ANSWER_QUESTION,
  NEXT_QUESTION_SET,
  PREVIOUS_QUESTION_SET,
  CALCULATE_RESULTS
} from "../constants/actionTypes";

export type QuestionState = {
  questionList: PersonalityQuestion[];
  currentQuestionIndex: number;
  finalScore: FinalScore;
  evaluatorCompleted: boolean;
};

const QUESTION_INITIAL_STATE = {
  questionList: questions,
  currentQuestionIndex: 0,
  finalScore: {
    scoreSignature: "",
    independent: 0,
    collaborative: 0,
    clientFacing: 0,
    backOffice: 0,
    formal: 0,
    casual: 0,
    taskOriented: 0,
    improvisor: 0
  },
  evaluatorCompleted: false
};

const answerQuestion = (
  state: QuestionState,
  { payload: { score, index } }: Actions.AnswerQuestion
) => {
  const questionListCopy = [...state.questionList];
  questionListCopy[index] = {
    ...questionListCopy[index],
    userResponse: score
  };
  return {
    ...state,
    questionList: questionListCopy
  };
};

const nextQuestionSet = (
  state: QuestionState,
  action: Actions.NextQuestionSet
) => ({
  ...state,
  currentQuestionIndex: state.currentQuestionIndex + 5
});

const previousQuestionSet = (
  state: QuestionState,
  action: Actions.PreviousQuestionSet
) => ({
  ...state,
  currentQuestionIndex: state.currentQuestionIndex - 5
});

const calculateResults = (
  state: QuestionState,
  action: Actions.CalculateResults
) => ({
  ...state,
  finalScore: calculateScore(state),
  evaluatorCompleted: true
});

const questionsReducer: Reducer<QuestionState> = (
  state = QUESTION_INITIAL_STATE,
  action: Actions.QuestionActions
) => {
  switch (action.type) {
    case ANSWER_QUESTION:
      return answerQuestion(state, action);
    case NEXT_QUESTION_SET:
      return nextQuestionSet(state, action);
    case PREVIOUS_QUESTION_SET:
      return previousQuestionSet(state, action);
    case CALCULATE_RESULTS:
      return calculateResults(state, action);
    default:
      return state;
  }
};

export default questionsReducer;
