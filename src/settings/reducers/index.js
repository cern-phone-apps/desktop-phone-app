import { combineReducers } from 'redux';

import devices from 'settings/reducers/devices';
import modal from 'settings/reducers/modal';
import settings from 'settings/reducers/settings';

const settingsReducer = combineReducers({
  devices,
  modal,
  settings
});

export default settingsReducer;
