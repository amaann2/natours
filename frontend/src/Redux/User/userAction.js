import { userActionType } from "./userActionType";
import axios from "axios";

axios.defaults.withCredentials = true;

//? login and register
export const setCurrentUser = (user) => ({
  type: userActionType.set_CURRENT_USER,
  payload: user,
});

//? Me endpoint
export const loadUser = () => async (dispatch) => {
  try {
    dispatch({
      type: userActionType.LOAD_USER_REQUEST,
    });
    const { data } = await axios.get(`/api/v1/users/getMe`, {
      withCredentials: true,
    });

    dispatch({
      type: userActionType.LOAD_USER_SUCCESS,
      payload: data.data.data,
    });
  } catch (error) {
    dispatch({
      type: userActionType.LOAD_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};

//? Logout

export const logout = () => async (dispatch) => {
  try {
    const { data } = await axios.get(`/api/v1/users/logout`, {
      withCredentials: true,
    });
    dispatch({
      type: userActionType.LOGOUT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: userActionType.LOGOUT_FAIL,
    });
  }
};

//? GET ALL USER --- ADMIN

export const getAllUser = () => async (dispatch) => {
  try {
    dispatch({
      type: userActionType.GET_ALL_USER_REQUEST,
    });
    const { data } = await axios.get("/api/v1/users", {
      withCredentials: true,
    });
    dispatch({
      type: userActionType.GET_ALL_USER_SUCCESS,
      payload: data.data.data,
    });
  } catch (error) {
    dispatch({
      type: userActionType.GET_ALL_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};
