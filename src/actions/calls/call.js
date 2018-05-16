
export const CALL = '@@call/CALL'
export const IS_CALLING = '@@call/IS_CALLING'
export const CALL_ACCEPTED = '@@call/CALL_ACCEPTED'
export const CALL_REJECTED = '@@call/CALL_REJECTED'
export const CALL_MISSED = '@@call/CALL_MISSED'
export const IS_RECEIVING_CALL = '@@call/IS_RECEIVING_CALL'
export const HANGUP_CALL = '@@call/HANGUP_CALL'

export function makeCall (recipient) {
  return {
    type: CALL,
    recipient
  }
}

export function isCalling () {
  return {
    type: IS_CALLING
  }
}

export function isReceivingCall () {
  return {
    type: IS_RECEIVING_CALL
  }
}

export function acceptCall () {
  return {
    type: CALL_ACCEPTED
  }
}

export function rejectCall () {
  return {
    type: CALL_REJECTED
  }
}

export function missCall () {
  return {
    type: CALL_MISSED
  }
}

export function hangupCall () {
  return {
    type: HANGUP_CALL
  }
}
