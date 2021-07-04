import { combineReducers } from "redux";
import { cacheReducer } from "./cache";
import { localizationReducer } from "./localization";
import { periodReducer } from "./period";
import { themeReducer } from "./theme";

export const allReducers = combineReducers({
  cache: cacheReducer,
  period: periodReducer,
  place: localizationReducer,
  theme: themeReducer
});