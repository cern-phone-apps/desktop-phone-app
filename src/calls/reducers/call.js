import * as callActions from 'calls/actions/call'

const initialState = {
  onCall: false,
  calling: false,
  receivingCall: false,
  recipient: {
    name: '',
    phoneNumber: '',
    startTime: null,
    incoming: false,
    missed: false
  },
  error: {}
}

function processCall (state, recipient) {
  return {
    ...state,
    calling: true,
    onCall: false,
    recipient: recipient
  }
}

function processCallRejected (state, errors) {
  return {
    ...state,
    onCall: false,
    calling: false,
    receivingCall: false,
    error: {statusCode: errors.code.status_code, message: errors.description}
  }
}

function processCallFailed (state, errors) {
  return {
    ...state,
    onCall: false,
    calling: false,
    error: {statusCode: errors.code.status_code, message: errors.description}
  }
}

function processCallMissed (state) {
  return {
    ...state,
    onCall: false,
    calling: false
  }
}

function processCallReceiving (state) {
  return {
    ...state,
    onCall: false,
    receivingCall: true,
    recipient: {
      name: "Receiving User",
      phoneNumber: "123 123 123",
      startTime: Date.now(),
      incoming: true,
      missed: false
    }
  }
}

function processCallHangup (state) {
  return {
    ...state,
    onCall: false,
    calling: false,
    recipient: {}
  }
}

function processCallAccepted (state) {
  return {
    ...state,
    onCall: true,
    calling: false,
    receivingCall: false
  }
}

const call = (state = initialState, action) => {
  switch (action.type) {
    case callActions.CALL:
      return processCall(state, action.recipient)
    case callActions.CALL_ACCEPTED:
      if (state.calling === true || state.receivingCall === true) {
        return processCallAccepted(state)
      } else {
        return state
      }
    case callActions.CALL_REJECTED:
      return processCallRejected(state, action.errors)
    case callActions.CALL_FAILED:
      return processCallFailed(state, action.errors)
    case callActions.CALL_MISSED:
      return processCallMissed(state)
    case callActions.IS_RECEIVING_CALL:
      return processCallReceiving(state)
    case callActions.HANGUP_CALL:
      return processCallHangup(state)

    default:
      return state
  }
}

export default call
