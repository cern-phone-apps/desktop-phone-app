import * as connectionActions from 'calls/actions/connection'

const initialState = {
  connected: false,
  activeNumber: '',
  connecting: false,
  disconnecting: false,
  error: {}
}

export default (state = initialState, action) => {
  switch (action.type) {
    case connectionActions.CONNECT_REQUEST:
      return {
        ...state,
        connected: false,
        connecting: true,
        error: {}
      }
    case connectionActions.CONNECT_SUCCESS:
      return {
        ...state,
        connected: true,
        connecting: false,
        error: {}
      }
    case connectionActions.DISCONNECT_REQUEST:
      return {
        ...state,
        disconnecting: true
      }
    case connectionActions.DISCONNECT_SUCCESS:
      return {
        ...state,
        connected: false,
        disconnecting: false,
        error: {}
      }
    case connectionActions.CONNECT_FAILURE:
    case connectionActions.DISCONNECT_FAILURE:
      return {
        ...state,
        connected: false,
        connecting: false,
        error: {statusCode: action.errors.code.status_code, message: action.errors.description}
      }

    default:
      return state
  }
}
