import { routerReducer } from 'react-router-redux/reducer';
import { combineReducers } from 'redux';

import { authReducer, meReducer } from 'dial-core';

import callsReducer from 'calls/reducers/index';
import settings from 'settings/reducers/index';
import common from './common/reducers/index';

/**
 * All the reducers of the application combined to store the status of the
 * application organized by screens or logic if it affects other parts of the application.
 */
const rootReducer = combineReducers({
  auth: authReducer,
  user: meReducer,
  common,
  settings,
  calls: callsReducer,
  router: routerReducer
});

export default rootReducer;
