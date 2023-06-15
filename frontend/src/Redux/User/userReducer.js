import { userActionType } from "./userActionType";

const INITIAL_STATE = {
  currentUser: null,
  isAuthenticated: false,
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case userActionType.set_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload,
        isAuthenticated: true,
      };
    case userActionType.LOAD_USER_REQUEST:
      return {
        isAuthenticated: false,
      };
    case userActionType.LOAD_USER_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        currentUser: action.payload,
      };

    case userActionType.LOAD_USER_FAIL:
      return {
        isAuthenticated: false,
        currentUser: null,
        error: action.payload,
      };
    case userActionType.LOGOUT_SUCCESS:
      return {
        isAuthenticated: false,
        currentUser: null,
      };
    case userActionType.LOGOUT_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default userReducer;
