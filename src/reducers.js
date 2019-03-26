import { routerReducer } from "react-router-redux/reducer";
import { combineReducers } from "redux";
import auth from "./auth/reducers/auth";
import userReducer from "./auth/reducers/index";
import common from "./common/reducers/index";
import callsReducer from "calls/reducers/index";
import settings from "settings/reducers/index";

/**
 * All the reducers of the application combined to store the status of the
 * application organized by screens or logic if it affects other parts of the application.
 *
 * @type {Reducer<any>}
 */
const rootReducer = combineReducers({
  auth,
  user: userReducer,
  common,
  settings,
  calls: callsReducer,
  router: routerReducer
});

export default rootReducer;
