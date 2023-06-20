import {
  applyMiddleware,
  combineReducers,
  legacy_createStore as createStore,
} from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import userReducer from "./User/userReducer";
import {
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
});
const initialState = {};
const middleware = [logger, thunk];
export const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);
export default store;
