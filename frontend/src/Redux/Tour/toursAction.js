import axios from "axios";
import { tourActionType } from "./toursActionType";

export const getTours = () => async (dispatch) => {
  try {
    dispatch({
      type: tourActionType.ALL_TOURS_REQUEST,
    });

    const { data } = await axios.get("http://localhost:8000/api/v1/tours/");
    dispatch({
      type: tourActionType.ALL_TOURS_SUCCESS,
      payload: data.data.data,
    });
  } catch (error) {
    dispatch({
      type: tourActionType.ALL_TOURS_FAIL,
      payload: error.response.data.message,
    });
  }
};
export const getSingleTours = (id) => async (dispatch) => {
  try {
    dispatch({
      type: tourActionType.TOUR_REQUEST,
    });

    const { data } = await axios.get(
      `http://localhost:8000/api/v1/tours/${id}`
    );
    dispatch({
      type: tourActionType.TOUR_SUCCESS,
      payload: data.data.data,
    });
  } catch (error) {
    dispatch({
      type: tourActionType.TOUR_FAIL,
      payload: error.response.data.message,
    });
  }
};
export const getTopThreeCheapTour = (id) => async (dispatch) => {
  try {
    dispatch({
      type: tourActionType.TOP_TOUR_REQUEST,
    });

    const { data } = await axios.get(
      `http://localhost:8000/api/v1/tours/top-3-cheap`
    );
    dispatch({
      type: tourActionType.TOP_TOUR_SUCCESS,
      payload: data.data.data,
    });
  } catch (error) {
    dispatch({
      type: tourActionType.TOP_TOUR_FAIL,
      payload: error.response.data.message,
    });
  }
};
