import { combineReducers } from "redux";

import devices from "settings/reducers/devices";
import modal from "settings/reducers/modal";

const settingsReducer = combineReducers({
  devices,
  modal
});

export default settingsReducer;