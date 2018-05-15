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

const call = (state = initialState, action) => {
  function processCall () {
    return {
      ...state,
      calling: true,
      onCall: false,
      recipient: action.recipient
    }
  }

  function processCallRejected () {
    return {
      ...state,
      onCall: false,
      calling: false
    }
  }

  function processCallMissed () {
    return {
      ...state,
      onCall: false,
      calling: false
    }
  }

  function processCallReceiving () {
    return {
      ...state,
      onCall: false,
      receivingCall: true
    }
  }

  function processCallHangup () {
    return {
      ...state,
      onCall: false,
      calling: false,
      recipient: {}
    }
  }

  function processCallAccepted () {
    return {
      ...state,
      onCall: true,
      calling: false,
      receivingCall: false
    }
  }

  switch (action.type) {
    case callActions.CALL:
      return processCall()
    case callActions.CALL_ACCEPTED:
      if (state.calling === true) {
        return processCallAccepted()
      } else {
        return state
      }
    case callActions.CALL_REJECTED:
      return processCallRejected()
    case callActions.CALL_MISSED:
      return processCallMissed()
    case callActions.IS_RECEIVING_CALL:
      return processCallReceiving()
    case callActions.HANGUP_CALL:
      return processCallHangup()

    default:
      return state
  }
}

export default call
