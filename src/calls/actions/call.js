export const CALL = '@@call/CALL'
export const IS_CALLING = '@@call/IS_CALLING'
export const OUTGOING_CALL_ACCEPTED = '@@call/OUTGOING_CALL_ACCEPTED'
export const OUTGOING_CALL_REJECTED = '@@call/OUTGOING_CALL_REJECTED'
export const CALL_FAILED = '@@call/CALL_FAILED'
export const CALL_MISSED = '@@call/CALL_MISSED'
export const IS_RECEIVING_CALL = '@@call/IS_RECEIVING_CALL'
export const HANGUP_CALL = '@@call/HANGUP_CALL'
export const INCOMING_CALL_ACCEPTED = '@@call/INCOMING_CALL_ACCEPTED'
export const INCOMING_CALL_REJECTED = '@@call/INCOMING_CALL_REJECTED'

/**
 * Action that triggers a call to a selected recipient
 *
 * @param recipient A dict with name, phone number and start time of the call
 * @returns {{type: string, recipient: *}} A dict
 */
export function makeCall (recipient) {
  return {
    type: CALL,
    recipient
  }
}

/**
 * Action triggered when a call is taking place.
 *
 * @returns {{type: string}} A dict
 */
export function isCalling () {
  return {
    type: IS_CALLING
  }
}

/**
 * Action triggered when a call is being received
 *
 * @returns {{type: string}} A dict
 */
export function isReceivingCall (callerNumber, callerName) {
  return {
    type: IS_RECEIVING_CALL,
    callerNumber,
    callerName
  }
}

/**
 * Action triggered when a call is accepted
 *
 * @returns {{type: string}} A dict
 */
export function acceptOutgoingCall () {
  return {
    type: OUTGOING_CALL_ACCEPTED
  }
}

/**
 * Action triggered when an incoming call is accepted
 *
 * @returns {{type: string}} A dict
 */
export function acceptIncomingCall () {
  return {
    type: INCOMING_CALL_ACCEPTED
  }
}

/**
 * Action triggered when an incoming call is rejected
 * @returns {{type: string}}
 */
export function rejectIncomingCall () {
  return {
    type: INCOMING_CALL_REJECTED
  }
}

/**
 * Action triggered when a call is rejected
 * @returns {{type: string}} A dict
 */
export function rejectOutgoingCall (errors = { code: { status_code: 0 } }) {
  return {
    type: OUTGOING_CALL_REJECTED,
    errors
  }
}

/**
 * Action triggered when a call is rejected
 * @returns {{type: string}} A dict
 */
export function callFailed (errors = { code: { status_code: 0 } }) {
  return {
    type: CALL_FAILED,
    errors
  }
}

/**
 * Action triggered when a call is not taken
 * @returns {{type: string}} A dict
 */
export function missCall () {
  return {
    type: CALL_MISSED
  }
}

/**
 * Action triggered when a call is hung up
 * @returns {{type: string}} A dict
 */
export function hangupCall () {
  return {
    type: HANGUP_CALL
  }
}
