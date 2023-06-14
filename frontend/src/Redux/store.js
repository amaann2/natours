import {
  applyMiddleware,
  combineReducers,
  legacy_createStore as createStore,
} from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import userReducer from './User/userReducer';
import { singleTourReducer, toursReducer } from './Tour/toursReducer';

const reducer = combineReducers({
  user: userReducer,
  tours: toursReducer,
  tour: singleTourReducer,
});
const initialState = {};
const middleware = [logger, thunk];
export const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);
export default store;
