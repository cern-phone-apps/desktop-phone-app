import * as connectionActions from 'calls/actions/connection'

const initialState = {
  connected: false,
  activeNumber: '',
  connecting: false,
  disconnecting: false,
  errors: {}
}

export default (state = initialState, action) => {
  switch (action.type) {
    case connectionActions.CONNECT_REQUEST:
      return {
        ...state,
        connected: false,
        connecting: true
      }
    case connectionActions.CONNECT_SUCCESS:
      return {
        ...state,
        connected: true,
        connecting: false,
        errors: {}
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
        errors: {}
      }
    case connectionActions.CONNECT_FAILURE:
    case connectionActions.DISCONNECT_FAILURE:
      return {
        ...state,
        connected: false,
        errors: action.errors
      }

    default:
      return state
  }
}
