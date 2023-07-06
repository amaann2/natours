import { reviewActionType } from "./reviewActionType";
import axios from "axios";

export const getReview = (id) => async (dispatch) => {
  try {
    dispatch({
      type: reviewActionType.TOUR_REVIEW_REQUEST,
    });
    const { data } = await axios.get(`/api/v1/tours/${id}/reviews`);

    dispatch({
      type: reviewActionType.TOUR_REVIEW_SUCCESS,
      payload: data.data.data,
    });
  } catch (error) {
    dispatch({
      type: reviewActionType.TOUR_REVIEW_FAIL,
      payload: error.response.data.message,
    });
  }
};
export const getAllReview = () => async (dispatch) => {
  try {
    dispatch({
      type: reviewActionType.ALL_REVIEW_REQUEST,
    });
    const { data } = await axios.get(`/api/v1/reviews`);

    dispatch({
      type: reviewActionType.ALL_REVIEW_SUCCESS,
      payload: data.data.data,
    });
  } catch (error) {
    dispatch({
      type: reviewActionType.ALL_REVIEW_FAIL,
      payload: error.response.data.message,
    });
  }
};
