import { combineReducers } from "redux";
import { cacheReducer } from "./cache";
import { localizationReducer } from "./localization";
import { periodReducer } from "./period";

export const allReducers = combineReducers({
  cache: cacheReducer,
  period: periodReducer,
  place: localizationReducer
});