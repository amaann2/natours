import {
  applyMiddleware,
  combineReducers,
  legacy_createStore as createStore,
} from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { userReducer, getUser } from "./User/userReducer";

import {
  manageAdminTour,
  singleTourReducer,
  topCheapTour,
  toursReducer,
} from "./Tour/toursReducer";
import { reviewReducer } from "./Review/reviewReducer";
import { bookingReducer } from "./Booking/bookingReducer";

const reducer = combineReducers({
  user: userReducer,
  tours: toursReducer,
  tour: singleTourReducer,
  toptour: topCheapTour,
  review: reviewReducer,
  getUser: getUser,
  newTour: manageAdminTour,
  booking: bookingReducer,
});
const initialState = {};
const middleware = [logger, thunk];
export const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);
export default store;
