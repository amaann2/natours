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
  createTourReducer,
  singleTourReducer,
  topCheapTour,
  toursReducer,
} from "./Tour/toursReducer";
import { reviewReducer } from "./Review/reviewReducer";

const reducer = combineReducers({
  user: userReducer,
  tours: toursReducer,
  tour: singleTourReducer,
  toptour: topCheapTour,
  review: reviewReducer,
  getUser: getUser,
  newTour: createTourReducer,
});
const initialState = {};
const middleware = [logger, thunk];
export const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);
export default store;
