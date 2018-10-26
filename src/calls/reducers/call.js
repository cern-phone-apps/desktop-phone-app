import * as callActions from 'calls/actions/call'
import { logMessage } from 'common/utils'

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
    recipient: {
      ...recipient,
      incoming: false,
      missed: false
    }
  }
}

function processCallRejected (state, errors) {
  return {
    ...state,
    onCall: false,
    calling: false,
    receivingCall: false,
    error: { statusCode: errors.code.status_code, message: errors.description }
  }
}

function processCallFailed (state, errors) {
  return {
    ...state,
    onCall: false,
    calling: false,
    error: { statusCode: errors.code.status_code, message: errors.description }
  }
}

function processCallMissed (state) {
  return {
    ...state,
    onCall: false,
    calling: false
  }
}

function processCallReceiving (state, action) {
  logMessage(`Receiving call from`)
  logMessage(action)
  return {
    ...state,
    onCall: false,
    receivingCall: true,
    recipient: {
      name: action.callerName,
      phoneNumber: action.callerNumber,
      missed: true,
      incoming: true
    }
  }
}

function acceptIncomingCall (state) {
  logMessage(`Accept Incoming call`)
  return {
    ...state,
    onCall: true,
    receivingCall: false,
    recipient: {
      ...state.recipient,
      startTime: Date.now(),
      missed: false
    }
  }
}

function rejectIncomingCall (state) {
  logMessage(`Reject Incoming call`)
  return {
    ...state,
    onCall: false,
    receivingCall: false,
    recipient: {
      ...state.recipient,
      startTime: Date.now(),
      missed: true
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
    case callActions.OUTGOING_CALL_ACCEPTED:
      if (state.calling === true || state.receivingCall === true) {
        return processCallAccepted(state)
      } else {
        return state
      }
    case callActions.OUTGOING_CALL_REJECTED:
      return processCallRejected(state, action.errors)
    case callActions.CALL_FAILED:
      return processCallFailed(state, action.errors)
    case callActions.CALL_MISSED:
      return processCallMissed(state)
    case callActions.IS_RECEIVING_CALL:
      return processCallReceiving(state, action)
    case callActions.INCOMING_CALL_ACCEPTED:
      return acceptIncomingCall(state)
    case callActions.INCOMING_CALL_REJECTED:
      return rejectIncomingCall(state)
    case callActions.HANGUP_CALL:
      return processCallHangup(state)

    default:
      return state
  }
}

export default call
