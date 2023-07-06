import { bookingActionType } from "./bookingActionTypes";

export const bookingReducer = (state = { booking: [] }, action) => {
  switch (action.type) {
    case bookingActionType.ALL_BOOKING_REQUEST:
    case bookingActionType.USER_BOOKING_REQUEST:
      return {
        loading: true,
        booking: [],
      };
    case bookingActionType.ALL_BOOKING_SUCCESS:
    case bookingActionType.USER_BOOKING_SUCCESS:
      return {
        loading: false,
        booking: action.payload,
      };
    case bookingActionType.ALL_BOOKING_FAIL:
    case bookingActionType.USER_BOOKING_FAIL:
      return {
        loading: false,
        booking: [],
      };

    default:
      return state;
  }
};
