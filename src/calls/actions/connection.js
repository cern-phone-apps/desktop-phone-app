export const CONNECT_REQUEST = '@@connection/CONNECT_REQUEST'
export const CONNECT_SUCCESS = '@@connection/CONNECT_SUCCESS'
export const CONNECT_FAILURE = '@@connection/CONNECT_FAILURE'

export const DISCONNECT_REQUEST = '@@connection/DISCONNECT_REQUEST'
export const DISCONNECT_SUCCESS = '@@connection/DISCONNECT_SUCCESS'
export const DISCONNECT_FAILURE = '@@connection/DISCONNECT_FAILURE'

/**
 * Action that triggers a request of connection to TONE API
 * @returns {{type: string}} A dict
 */
export function requestConnection () {
  return {
    type: CONNECT_REQUEST
  }
}

/**
 * Action that is triggered on a successful connection to TONE
 * @returns {{type: string}} A dict
 */
export function setConnected () {
  return {
    type: CONNECT_SUCCESS
  }
}

/**
 * Action that is triggered when a connection to TONE is unsuccessful
 * @param errors A dict with information about the errors
 * @returns {{errors: *, type: string}} A dict
 */
export function setConnectionFailure (errors) {
  return {
    errors,
    type: CONNECT_FAILURE
  }
}

export function requestDisconnection () {
  return {
    type: DISCONNECT_REQUEST
  }
}

export function setDisconnected () {
  return {
    type: DISCONNECT_SUCCESS
  }
}

export function setDisconnectionFailure () {
  return {
    type: DISCONNECT_FAILURE
  }
}
