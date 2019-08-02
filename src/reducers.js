import { connectRouter } from 'connected-react-router';
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

import settings from 'settings/reducers/index';
import common from './common/reducers/index';

/**
 * All the reducers of the application combined to store the status of the
 * application organized by screens or logic if it affects other parts of the application.
 */
export default history =>
  combineReducers({
    router: connectRouter(history),
    auth: authReducer,
    user: meReducer,
    common,
    callForwarding: callForwardingReducer,
    settings,
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
