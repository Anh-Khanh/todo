import { combineReducers } from "redux";

import completedReducer  from "./completed";

export const allReducers = combineReducers({
  completedReducer,
});