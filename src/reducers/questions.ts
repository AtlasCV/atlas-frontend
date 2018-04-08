import { Reducer } from "redux";
import { PersonalityQuestion } from "../types/PersonalityQuestion";
import { FinalScore } from "../types/FinalScore";
import * as Actions from "../actions/types";
import questions from "../constants/questions";
import calculateScore from "../utils/calculateScore";
import * as actionTypes from "../constants/actionTypes";
import determineCurrentScore from "../utils/determineCurrentScore";

export type QuestionState = {
  questionList: PersonalityQuestion[];
  currentQuestionIndex: number;
  finalScore: FinalScore;
  evaluatorCompleted: boolean;
  uuid?: string;
};

const QUESTION_INITIAL_STATE: QuestionState = {
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

const loadEvaluatorSuccess = (
  state: QuestionState,
  {
    payload: {
      personalityEvaluator: {
        uuid,
        answers,
        currentQuestionIndex,
        scoreSignature
      }
    }
  }: Actions.LoadEvaluatorSuccess
) => ({
  ...state,
  uuid,
  questionList: determineCurrentScore(state.questionList, answers),
  currentQuestionIndex,
  finalScore: { ...state.finalScore, scoreSignature }
});

const questionsReducer: Reducer<QuestionState> = (
  state = QUESTION_INITIAL_STATE,
  action: Actions.QuestionActions
) => {
  switch (action.type) {
    case actionTypes.ANSWER_QUESTION:
      return answerQuestion(state, action);
    case actionTypes.NEXT_QUESTION_SET:
      return nextQuestionSet(state, action);
    case actionTypes.PREVIOUS_QUESTION_SET:
      return previousQuestionSet(state, action);
    case actionTypes.CALCULATE_RESULTS:
      return calculateResults(state, action);
    case actionTypes.LOAD_EVALUATOR_SUCCESS:
      return loadEvaluatorSuccess(state, action);
    default:
      return state;
  }
};

export default questionsReducer;
