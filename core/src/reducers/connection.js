import * as connectionActions from '../actions/connection';

const initialState = {
  connected: false,
  activeNumber: '',
  connecting: false,
  disconnecting: false,
  error: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case connectionActions.REGISTRATION_REQUEST:
      return {
        ...state,
        connected: false,
        connecting: true,
        error: {}
      };
    case connectionActions.REGISTRATION_SUCCESS:
      return {
        ...state,
        connected: true,
        connecting: false,
        error: {}
      };
    case connectionActions.DISCONNECTION_REQUEST:
      return {
        ...state,
        disconnecting: true
      };
    case connectionActions.DISCONNECTION_SUCCESS:
      return {
        ...state,
        connected: false,
        disconnecting: false,
        error: {}
      };
    case connectionActions.REGISTRATION_FAILURE:
    case connectionActions.DISCONNECTION_FAILURE:
      return {
        ...state,
        connected: false,
        connecting: false,
        error: {
          statusCode: action.errors.code.status_code,
          message: action.errors.description
        }
      };

    default:
      return state;
  }
};
