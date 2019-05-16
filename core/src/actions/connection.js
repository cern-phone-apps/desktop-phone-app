export const REGISTRATION_REQUEST = '@@connection/REGISTRATION_REQUEST';
export const REGISTRATION_SUCCESS = '@@connection/REGISTRATION_SUCCESS';
export const REGISTRATION_FAILURE = '@@connection/REGISTRATION_FAILURE';

export const DISCONNECTION_REQUEST = '@@connection/DISCONNECTION_REQUEST';
export const DISCONNECTION_SUCCESS = '@@connection/DISCONNECTION_SUCCESS';
export const DISCONNECTION_FAILURE = '@@connection/DISCONNECTION_FAILURE';

/**
 * Action that triggers a request of connection to TONE API
 * @returns {{type: string}} A dict
 */
export function requestRegistration() {
  return {
    type: REGISTRATION_REQUEST
  };
}

/**
 * Action that is triggered on a successful connection to TONE
 * @returns {{type: string}} A dict
 */
export function setRegistrationSuccess() {
  return {
    type: REGISTRATION_SUCCESS
  };
}

/**
 * Action that is triggered when a connection to TONE is unsuccessful
 * @param errors A dict with information about the errors
 * @returns {{errors: *, type: string}} A dict
 */
export function setRegistrationFailure(errors) {
  return {
    errors,
    type: REGISTRATION_FAILURE
  };
}

export function requestDisconnection() {
  return {
    type: DISCONNECTION_REQUEST
  };
}

export function setDisconnectionSuccess() {
  return {
    type: DISCONNECTION_SUCCESS
  };
}

export function setDisconnectionFailure() {
  return {
    type: DISCONNECTION_FAILURE
  };
}
