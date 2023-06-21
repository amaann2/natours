import { userActionType } from "./userActionType";

const INITIAL_STATE = {
  currentUser: null,
  isAuthenticated: false,
  role: null,
};

export const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case userActionType.set_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload,
        isAuthenticated: true,
        role: action.payload.role,
        error: null,
      };
    case userActionType.LOAD_USER_REQUEST:
      return {
        isAuthenticated: false,
        role: null,
      };
    case userActionType.LOAD_USER_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        currentUser: action.payload,
        role: action.payload.role,
      };

    case userActionType.LOAD_USER_FAIL:
      return {
        isAuthenticated: false,
        currentUser: null,
        error: action.payload,
        role: null,
      };
    case userActionType.LOGOUT_SUCCESS:
      return {
        isAuthenticated: false,
        currentUser: null,
        role: null,
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

export const getUser = (state = { users: [] }, action) => {
  switch (action.type) {
    case userActionType.GET_ALL_USER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case userActionType.GET_ALL_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        users: action.payload,
      };

    case userActionType.GET_ALL_USER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

