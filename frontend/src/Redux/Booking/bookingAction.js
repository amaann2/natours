import axios from "axios";
import { bookingActionType } from "./bookingActionTypes";

export const getAllBooking = () => async (dispatch) => {
  try {
    dispatch({
      type: bookingActionType.ALL_BOOKING_REQUEST,
    });
    const { data } = await axios.get("/api/v1/bookings", {
      withCredentials: true,
    });
    dispatch({
      type: bookingActionType.ALL_BOOKING_SUCCESS,
      payload: data.data.data,
    });
  } catch (error) {
    dispatch({
      type: bookingActionType.ALL_BOOKING_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getUserBooking = (id) => async (dispatch) => {
  try {
    dispatch({
      type: bookingActionType.USER_BOOKING_REQUEST,
    });
    const { data } = await axios.get(`/api/v1/bookings?user=${id}`, {
      withCredentials: true,
    });
    dispatch({
      type: bookingActionType.USER_BOOKING_SUCCESS,
      payload: data.data.data,
    });
  } catch (error) {
    dispatch({
      type: bookingActionType.USER_BOOKING_FAIL,
      payload: error.response.data.message,
    });
  }
};
