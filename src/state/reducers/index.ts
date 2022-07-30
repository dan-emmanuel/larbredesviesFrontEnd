/* 
  this is the root reducer, it combines all the reducers
  and returns the state of the application
*/

import { combineReducers } from "redux";
import { catalogueReducer } from "./catalogue";

const reducers = combineReducers({
  catalogue: catalogueReducer,
});

export type State = ReturnType<typeof reducers>;
export default reducers;
