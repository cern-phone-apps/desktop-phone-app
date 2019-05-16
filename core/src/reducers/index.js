import { combineReducers } from 'redux';

import connection from './connection';
import call from './call';
import recent from './recent';
import numbers from './numbers';
import status from './status';
import dialpad from './dialpad';
import search from './search';
import profile from './profile';
import contacts from './contacts/index';

const callsReducer = combineReducers({
  connection,
  call,
  recent,
  numbers,
  status,
  dialpad,
  search,
  profile,
  contacts
});

export default callsReducer;
