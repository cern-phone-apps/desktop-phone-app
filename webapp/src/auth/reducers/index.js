import { combineReducers } from "redux";
import me from "./me";

/**
 * All the reducers related to user information
 * @type {Reducer<any>}
 */
const userReducer = combineReducers({
  me
});

export default userReducer;
