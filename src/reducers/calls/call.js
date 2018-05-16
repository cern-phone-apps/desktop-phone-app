import * as callActions from 'actions/calls/call'

const initialState = {
  onCall: false,
  calling: false,
  receivingCall: false,
  recipient: {
    name: '',
    number: '',
    startTime: null
  }
}

function processCall (state, recipient) {
  return {
    ...state,
    calling: true,
    onCall: false,
    recipient: recipient
  }
}

function processCallRejected (state) {
  return {
    ...state,
    onCall: false,
    calling: false
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
    receivingCall: true
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
      if (state.calling === true) {
        return processCallAccepted(state)
      } else {
        return state
      }
    case callActions.CALL_REJECTED:
      return processCallRejected(state)
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
