// redux/questionReducer.js
const initialState = {
  questions: [],
  currentQuestionIndex: 0,
  status: "", // Example field for status
  flaggedForReview: false, // Example field for flaggedForReview
};

// Action Types
const SET_QUESTIONS = "SET_QUESTIONS";
const NEXT_QUESTION = "NEXT_QUESTION";
const PREV_QUESTION = "PREV_QUESTION";
const END_SECTION = "END_SECTION";
const FLAG_FOR_REVIEW = "FLAG_FOR_REVIEW";

// Action Creators
export const setQuestions = (questions: any) => ({
  type: SET_QUESTIONS,
  payload: questions,
});

export const nextQuestion = () => ({
  type: NEXT_QUESTION,
});

export const prevQuestion = () => ({
  type: PREV_QUESTION,
});

export const endSection = () => ({
  type: END_SECTION,
});

export const flagForReview = (index: any) => ({
  type: FLAG_FOR_REVIEW,
  payload: index,
});

// Reducer
const questionReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_QUESTIONS:
      return { ...state, questions: action.payload };
    case NEXT_QUESTION:
      return {
        ...state,
        currentQuestionIndex: Math.min(
          state.currentQuestionIndex + 1,
          state.questions.length - 1
        ),
      };
    case PREV_QUESTION:
      return {
        ...state,
        currentQuestionIndex: Math.max(state.currentQuestionIndex - 1, 0),
      };
    case END_SECTION:
      return {
        ...state,
        status: "ended",
      };
    case FLAG_FOR_REVIEW:
      return {
        ...state,
        questions: state.questions.map((question: any, index) =>
          index === action.payload
            ? { ...question, flaggedForReview: true }
            : question
        ),
      };
    default:
      return state;
  }
};

export default questionReducer;
