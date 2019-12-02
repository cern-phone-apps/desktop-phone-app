import { combineReducers } from 'redux';
import sidebar from './sidebar';
import sound from './sound';
import notifications from './notifications';

/**
 * All the reducers related to user information
 * @type {Reducer<any>}
 */
const commonReducer = combineReducers({
  sidebar,
  notifications,
  sound
});

export default commonReducer;
