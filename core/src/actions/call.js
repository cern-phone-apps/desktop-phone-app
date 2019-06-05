export const CALL_REQUEST = '@@call/CALL_REQUEST';
export const IS_CALLING = '@@call/IS_CALLING';
export const CALL_REJECTED = '@@call/CALL_REJECTED';
export const CALL_FAILED = '@@call/CALL_FAILED';
export const CALL_MISSED = '@@call/CALL_MISSED';
export const CALL_RECEIVED = '@@call/CALL_RECEIVED';
export const CALL_FINISHED = '@@call/CALL_FINISHED';
export const CALL_ACCEPTED = '@@call/CALL_ACCEPTED';

export const ADD_ADDITIONAL_CALL = '@@call/ADD_ADDITIONAL_CALL';
export const REMOVE_ADDITIONAL_CALL = '@@call/REMOVE_ADDITIONAL_CALL';

/**
 * Action that triggers a call to a selected caller
 *
 * @param caller A dict with name, phone number and start time of the call
 * @returns {{type: string, caller: *}} A dict
 */
export function setMakeCallRequest(caller) {
  return {
    type: CALL_REQUEST,
    caller
  };
}

/**
 * Action triggered when a call is taking place.
 *
 * @returns {{type: string}} A dict
 */
export function setIsCalling(calling) {
  return {
    type: IS_CALLING,
    calling
  };
}

/**
 * Action triggered when a call is being received
 *
 * @returns {{type: string}} A dict
 */
export function setIsReceivingCall(callerNumber, callerName) {
  return {
    type: CALL_RECEIVED,
    callerNumber,
    callerName
  };
}

/**
 * Action triggered when a call is accepted
 *
 * @returns {{type: string}} A dict
 */
export function setCallAccepted(receivingCall) {
  const startTime = Date.now();
  return {
    startTime,
    receivingCall,
    type: CALL_ACCEPTED
  };
}

/**
 * Action triggered when a call is rejected
 * @returns {{type: string}} A dict
 */
export function setCallRejected(errors = { code: { status_code: 0 } }) {
  return {
    type: CALL_REJECTED,
    errors
  };
}

/**
 * Action triggered when a call is rejected
 * @returns {{type: string}} A dict
 */
export function setCallFailed(errors = { code: { status_code: 0 } }) {
  return {
    type: CALL_FAILED,
    errors
  };
}

/**
 * Action triggered when a call is not taken
 * @returns {{type: string}} A dict
 */
export function setCallMissed() {
  return {
    type: CALL_MISSED
  };
}

/**
 * Action triggered when a call is hung up
 * @returns {{type: string}} A dict
 */
export function setCallFinished(onCall = false, caller = null) {
  return {
    onCall,
    caller,
    type: CALL_FINISHED
  };
}

/**
 *
 */
export function addAdditionalCall() {
  return {
    type: ADD_ADDITIONAL_CALL
  };
}

/**
 *
 */
export function removeAdditionalCall() {
  return {
    type: REMOVE_ADDITIONAL_CALL
  };
}
