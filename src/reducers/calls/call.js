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
  switch (action.type) {
    case callActions.CALL:
      return {
        ...state,
        calling: true,
        onCall: false,
        recipient: action.recipient
      }
    case callActions.CALL_ACCEPTED:
      if (state.calling === true) {
        return {
          ...state,
          onCall: true,
          calling: false,
          receivingCall: false
        }
      } else {
        return state
      }
    case callActions.CALL_REJECTED:
      return {
        ...state,
        onCall: false,
        calling: false
      }
    case callActions.CALL_MISSED:
      return {
        ...state,
        onCall: false,
        calling: false
      }
    case callActions.IS_RECEIVING_CALL:
      return {
        ...state,
        onCall: false,
        receivingCall: true
      }
    case callActions.HANGUP_CALL:
      return {
        ...state,
        onCall: false,
        calling: false,
        recipient: {}
      }

    default:
      return state
  }
}

export default call
