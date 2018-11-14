import { combineReducers } from "redux";
import { AuthReducer } from "./modules/Auth";

export default combineReducers({
  auth: AuthReducer,
});
