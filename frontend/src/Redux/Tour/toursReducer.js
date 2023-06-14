import { tourActionType } from './toursActionType';
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
