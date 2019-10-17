import * as settingsActions from 'settings/actions/settings';

const initialState = {
  rememberNumber: false,
  sendStats: true,
  onlineStatus: 'offline',
  error: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case settingsActions.SET_REMEMBER_NUMBER:
      return {
        ...state,
        rememberNumber: action.payload,
        error: {}
      };
    case settingsActions.SET_SEND_STATS:
      return {
        ...state,
        sendStats: action.payload,
        error: {}
      };

    case settingsActions.SET_ONLINE_STATUS:
      return {
        ...state,
        onlineStatus: action.payload,
        error: {}
      };

    default:
      return state;
  }
};
