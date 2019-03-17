import { Reducer } from "redux";
import { User } from "../types";
import * as profileActions from "../actions/profile";
import * as authActions from "../actions/auth";
import * as industryActions from "../actions/industries";
import * as actionTypes from "../constants/actionTypes";

export type ProfileState = {
  info: User;
  fetchingApplicant: boolean;
  error?: Error;
};

export const PROFILE_INITIAL_STATE: ProfileState = {
  info: {
    id: 0,
    firstName: "",
    lastName: "",
    email: "",
    activated: false,
    userType: "",
    Applicant: {
      id: 0,
      Industries: [{ id: 0, name: "" }],
      EducationExperiences: [],
      Certifications: [],
      JobExperiences: [],
      ApplicantSkills: [],
      ApplicantIndustrySectors: [],
      PersonalityEvaluation: {
        uuid: "",
        answers: [],
        currentQuestionIndex: 0,
        scoreSignature: "",
        completed: false
      }
    }
  },
  fetchingApplicant: false
};

const createApplicantRequest = (
  state: ProfileState,
  action: ReturnType<typeof profileActions.createApplicantRequest>
) => ({
  ...state,
  fetchingApplicant: true
});

const updateApplicantRequest = (
  state: ProfileState,
  action: ReturnType<typeof profileActions.updateApplicantRequest>
) => ({
  ...state,
  fetchingApplicant: true
});

const loadApplicantSuccess = (
  state: ProfileState,
  { payload: { user } }: ReturnType<typeof profileActions.loadApplicantSuccess>
) => ({
  ...state,
  info: user,
  fetchingApplicant: false
});

const profileAjaxFailure = (
  state: ProfileState,
  { payload: { error } }: ReturnType<typeof profileActions.profileAjaxFailure>
) => ({
  ...state,
  error,
  fetchingApplicant: false
});

const getMeRequest = (state: ProfileState) => ({
  ...state,
  fetchingApplicant: true,
});

const getMeSuccess = (
  state: ProfileState,
  { payload: { user } }: ReturnType<typeof authActions.getMeSuccess>
) => ({
  ...state,
  info: user,
  fetchingApplicant: false,
});

const addIndustriesToApplicantSuccess = (
  state: ProfileState,
  {
    payload: { industries }
  }: ReturnType<typeof industryActions.addIndustriesToApplicantSuccess>
) => ({
  ...state
});

const createEducationExperienceSuccess = (
  state: ProfileState,
  {
    payload: { educationExperience }
  }: ReturnType<typeof profileActions.createEducationExperienceSuccess>
) => ({
  ...state,
  info: {
    ...state.info,
    Applicant: {
      ...state.info.Applicant,
      EducationExperiences: [
        ...state.info.Applicant.EducationExperiences,
        educationExperience
      ]
    }
  }
});

const createJobExperienceSuccess = (
  state: ProfileState,
  {
    payload: { jobExperience }
  }: ReturnType<typeof profileActions.createJobExperienceSuccess>
) => ({
  ...state,
  info: {
    ...state.info,
    Applicant: {
      ...state.info.Applicant,
      JobExperiences: [...state.info.Applicant.JobExperiences, jobExperience]
    }
  }
});

const deleteJobExperienceSuccess = (
  state: ProfileState, 
  { 
    payload: { jobExperienceId }
  }: ReturnType<typeof profileActions.deleteJobExperienceSuccess>) => ({
    ...state,
    info: {
      ...state.info,
      Applicant: {
        ...state.info.Applicant,
        JobExperiences: state.info.Applicant.JobExperiences.filter(je => je.id !== jobExperienceId),
      }
    }
  });

const deleteEducationExperienceSuccess = (
  state: ProfileState, 
  { 
    payload: { educationId }
  }: ReturnType<typeof profileActions.deleteEducationExperienceSuccess>) => ({
    ...state,
    info: {
      ...state.info,
      Applicant: {
        ...state.info.Applicant,
        EducationExperiences: state.info.Applicant.EducationExperiences.filter(ee => ee.id !== educationId),
      }
    }
  });

const loginSuccess = (
  state: ProfileState, 
  action: ReturnType<typeof authActions.loginSuccess>) => ({
  ...state,
  info: action.payload.user,
});

const profileReducer: Reducer<ProfileState> = (
  state = PROFILE_INITIAL_STATE,
  action: any
) => {
  switch (action.type) {
    case actionTypes.CREATE_APPLICANT_REQUEST:
      return createApplicantRequest(state, action);
    case actionTypes.UPDATE_APPLICANT_REQUEST:
      return updateApplicantRequest(state, action);
    case actionTypes.LOAD_APPLICANT_SUCCESS:
      return loadApplicantSuccess(state, action);
    case actionTypes.PROFILE_AJAX_FAILURE:
      return profileAjaxFailure(state, action);
    case actionTypes.GET_ME_REQUEST:
      return getMeRequest(state);
    case actionTypes.GET_ME_SUCCESS:
      return getMeSuccess(state, action);
    case actionTypes.ADD_INDUSTRIES_TO_APPLICANT_SUCCESS:
      return addIndustriesToApplicantSuccess(state, action);
    case actionTypes.CREATE_EDUCATION_EXPERIENCE_SUCCESS:
      return createEducationExperienceSuccess(state, action);
    case actionTypes.CREATE_JOB_EXPERIENCE_SUCCESS:
      return createJobExperienceSuccess(state, action);
    case actionTypes.DELETE_JOB_EXPERIENCE_SUCCESS:
      return deleteJobExperienceSuccess(state, action);
    case actionTypes.DELETE_EDUCATION_EXPERIENCE_SUCCESS:
      return deleteEducationExperienceSuccess(state, action);
    case actionTypes.LOGIN_SUCCESS:
      return loginSuccess(state, action);
    case actionTypes.ADD_PROFILE_PICTURE_REQUEST:
      return { ...state, fetchingApplicant: true };
    case actionTypes.ADD_PROFILE_PICTURE_SUCCESS:
      return { ...state, info: { ...state.info, profileImgUrl: action.payload.imageLink} };
    default:
      return state;
  }
};

export default profileReducer;
