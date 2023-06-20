import { reviewActionType } from "./reviewActionType";

const INITIAL_STATE = {
  review: [],
};

export const reviewReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case reviewActionType.ALL_REVIEW_REQUEST:
      return {
        review: [],
        loading: true,
        error: null,
      };
    case reviewActionType.ALL_REVIEW_SUCCESS:
      return {
        loading: false,
        error: null,
        review: action.payload,
      };
    case reviewActionType.ALL_REVIEW_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
