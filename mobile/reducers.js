import { combineReducers } from 'redux';
import {
  authReducer,
  meReducer,
  callsReducer,
  callForwardingReducer
} from 'dial-core';

export default combineReducers({
  auth: authReducer,
  user: meReducer,
  callForwarding: callForwardingReducer,
  calls: callsReducer
});
