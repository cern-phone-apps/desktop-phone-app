import { combineReducers } from "redux";

import devices from "settings/reducers/devices";
import modal from "settings/reducers/modal";
import callForwarding from "settings/reducers/call_forwarding";

const settingsReducer = combineReducers({
  devices,
  modal,
  callForwarding
});

export default settingsReducer;