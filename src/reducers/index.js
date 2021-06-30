import { combineReducers } from "redux";
import { localizationReducer } from "./localization";

export const allReducers = combineReducers({
  localization: localizationReducer
});