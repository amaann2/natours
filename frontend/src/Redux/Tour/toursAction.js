import { tourActionType } from "./toursActionType";
import axios from "axios";

export const getTours = () => async (dispatch) => {
  try {
    dispatch({
      type: tourActionType.ALL_TOURS_REQUEST,
    });
    const { data } = await axios.get(`/api/v1/tours`);
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

    const { data } = await axios.get(`/api/v1/tours/${id}`);
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
export const getTopThreeCheapTour = () => async (dispatch) => {
  try {
    dispatch({
      type: tourActionType.TOP_TOUR_REQUEST,
    });

    const { data } = await axios.get(`/api/v1/tours/top-3-cheap`);
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

//? CREATE TOUR --- ADMIN

export const createTour = (formData) => async (dispatch) => {
  try {
    dispatch({
      type: tourActionType.CREATE_TOUR_REQUEST,
    });
    const res = await axios.post("/api/v1/tours", formData, {
      withCredentials: true,
    });
    dispatch({
      type: tourActionType.CREATE_TOUR_SUCCESS,
      payload: res.data.data.data,
    });
  } catch (error) {
    dispatch({
      type: tourActionType.CREATE_TOUR_FAIL,
      payload: error.response.data.message,
    });
  }
};

//? update tour --- admin
export const updateTour = (id, formData) => async (dispatch) => {
  try {
    dispatch({
      type: tourActionType.UPDATE_TOUR_REQUEST,
    });
    const res = await axios.patch(`/api/v1/tours/${id}`, formData, {
      withCredentials: true,
    });
    dispatch({
      type: tourActionType.UPDATE_TOUR_SUCCESS,
      payload: res.data.data.data,
    });
  } catch (error) {
    dispatch({
      type: tourActionType.UPDATE_TOUR_FAIL,
      payload: error.response.data.message,
    });
  }
};
