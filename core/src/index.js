// Api Actions and actions
import authActionFactory, * as authActions from './actions/auth';
import callForwardingActionFactory, * as callForwardingActions from './actions/call_forwarding';
import meActionFactory, * as meActions from './actions/me';
import numbersActionFactory, * as numbersActions from './actions/numbers';
import contactsActionFactory, * as contactsActions from './actions/contacts';
import usersActionFactory from './actions/users';

// Only actions
import * as callActions from './actions/call';
import * as dialpadActions from './actions/dialpad';
import * as connectionActions from './actions/connection';
import * as recentCallsActions from './actions/recent_calls';
import * as searchActions from './actions/search';

// Reducers
import authReducer from './reducers/auth';
import callsReducer from './reducers';
import meReducer from './reducers/me';
import recentCallsReducer from './reducers/recent';
import doNotDisturbReducer from './reducers/do_not_disturb';
import profileReducer from './reducers/profile';

import callForwardingReducer from './reducers/call_forwarding';
import contactsReducer from './reducers/contacts';

import * as util from './util';

export {
  util,
  /* Authentication */
  authActionFactory,
  authActions,
  authReducer,
  callActions,
  callsReducer,
  /* Calls related reducers */
  recentCallsReducer,
  doNotDisturbReducer,
  profileReducer,
  callForwardingActionFactory,
  callForwardingActions,
  callForwardingReducer,
  /* Actions */
  connectionActions,
  contactsActionFactory,
  contactsActions,
  contactsReducer,
  dialpadActions,
  meActionFactory,
  meActions,
  meReducer,
  numbersActionFactory,
  numbersActions,
  recentCallsActions,
  searchActions,
  usersActionFactory
};
