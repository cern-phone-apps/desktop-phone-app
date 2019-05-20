import { combineReducers } from 'redux';
import {
  authReducer,
  callsReducer,
  usersReducer,
  contactsReducer
} from 'dial-core';

export default combineReducers({
  calls: callsReducer,
  auth: authReducer,
  users: usersReducer,
  contacts: contactsReducer
});
