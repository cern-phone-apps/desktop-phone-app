import { combineReducers } from 'redux';
import {
  authReducer,
  meReducer,
  callsReducer,
  callForwardingReducer,
  recentCallsReducer,
  doNotDisturbReducer,
  profileReducer,
  contactsReducer
} from 'dial-core';

export default combineReducers({
  auth: authReducer,
  user: meReducer,
  callForwarding: callForwardingReducer,
  call: callsReducer.callReducer,
  connection: callsReducer.connectionReducer,
  recent: recentCallsReducer,
  search: callsReducer.searchReducer,
  dialpad: callsReducer.dialpadReducer,
  numbers: callsReducer.numbersReducer,
  status: doNotDisturbReducer,
  profile: profileReducer,
  contacts: contactsReducer
});
