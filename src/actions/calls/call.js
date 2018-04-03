export const CALL = '@@call/CALL'
export const IS_CALLING = '@@call/IS_CALLING'
export const CALL_ACCEPTED = '@@call/CALL_ACCEPTED'
export const CALL_REJECTED = '@@call/CALL_REJECTED'
export const CALL_MISSED = '@@call/CALL_MISSED'
export const IS_RECEIVING_CALL = '@@call/IS_RECEIVING_CALL'
export const HANGUP_CALL = '@@call/HANGUP_CALL'

export function makeCall (recipient) {
  console.debug('dispatching makeCall')
  return {
    type: CALL,
    recipient
  }
}

export function isCalling () {
  console.debug('dispatching isCalling')
  return {
    type: IS_CALLING
  }
}

export function isReceivingCall () {
  console.debug('dispatching isReceivingCall')
  return {
    type: IS_RECEIVING_CALL
  }
}

export function acceptCall () {
  console.debug('dispatching isCalling')
  return {
    type: CALL_ACCEPTED
  }
}

export function rejectCall () {
  console.debug('dispatching isCalling')
  return {
    type: CALL_REJECTED
  }
}

export function missCall () {
  console.debug('dispatching isCalling')
  return {
    type: CALL_MISSED
  }
}

export function hangupCall () {
  console.debug('dispatching hangupCall')
  return {
    type: HANGUP_CALL
  }
}
