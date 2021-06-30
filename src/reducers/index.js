import { combineReducers } from "redux";
import { localizationReducer } from "./localization";
import { periodReducer } from "./period";

export const allReducers = combineReducers({
  period: periodReducer,
  place: localizationReducer
});