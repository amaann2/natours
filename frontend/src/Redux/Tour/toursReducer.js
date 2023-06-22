import { tourActionType } from "./toursActionType";
const INITIAL_STATE = {
  tours: [],
};
export const toursReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case tourActionType.ALL_TOURS_REQUEST:
      return {
        loading: true,
        tours: [],
      };
    case tourActionType.ALL_TOURS_SUCCESS:
      return {
        loading: false,
        tours: action.payload,
      };
    case tourActionType.ALL_TOURS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const singleTourReducer = (state = { tour: [] }, action) => {
  switch (action.type) {
    case tourActionType.TOUR_REQUEST:
      return {
        loading: true,
        tour: [],
      };
    case tourActionType.TOUR_SUCCESS:
      return {
        loading: false,
        tour: action.payload,
      };
    case tourActionType.TOUR_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
export const topCheapTour = (state = { topTour: [] }, action) => {
  switch (action.type) {
    case tourActionType.TOP_TOUR_REQUEST:
      return {
        loading: true,
        topTour: [],
      };
    case tourActionType.TOP_TOUR_SUCCESS:
      return {
        loading: false,
        topTour: action.payload,
      };
    case tourActionType.TOP_TOUR_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const createTourReducer = (state = { newTour: [] }, action) => {
  switch (action.type) {
    case tourActionType.CREATE_TOUR_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case tourActionType.CREATE_TOUR_SUCCESS:
      return {
        ...state,
        loading: false,
        newTour: action.payload,
      };

    case tourActionType.CREATE_TOUR_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
