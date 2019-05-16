import * as callActions from '../actions/call';

const initialState = {
  onCall: false,
  calling: false,
  receivingCall: false,
  caller: null,
  recipient: null,
  missed: true,
  error: {}
};

function processCall(state, recipient) {
  return {
    ...state,
    calling: true,
    onCall: false,
    recipient: {
      ...recipient
    }
  };
}

function processCallRejected(state, errors) {
  return {
    ...state,
    onCall: false,
    calling: false,
    error: { statusCode: errors.code.status_code, message: errors.description }
  };
}

function processCallFailed(state, errors) {
  return {
    ...state,
    onCall: false,
    calling: false,
    error: { statusCode: errors.code.status_code, message: errors.description }
  };
}

function processCallMissed(state) {
  return {
    ...state,
    onCall: false,
    caller: {
      ...state.caller,
      missed: true
    }
  };
}

function processCallReceiving(state, action) {
  return {
    ...state,
    onCall: false,
    receivingCall: true,
    caller: {
      name: action.callerName,
      phoneNumber: action.callerNumber,
      incoming: true
    }
  };
}

function incomingCallAccepted(state) {
  return {
    ...state,
    onCall: true,
    calling: false,
    startTime: Date.now()
  };
}

function processCallHangup(state) {
  return {
    ...state,
    onCall: false,
    calling: false,
    receivingCall: false,
    caller: null,
    recipient: null
  };
}

function outgoingCallAccepted(state) {
  return {
    ...state,
    onCall: true,
    calling: false,
    receivingCall: false,
    startTime: Date.now()
  };
}

const call = (state = initialState, action) => {
  switch (action.type) {
    case callActions.CALL_REQUEST:
      return processCall(state, action.recipient);
    case callActions.CALL_REJECTED:
      return processCallRejected(state, action.errors);
    case callActions.CALL_FAILED:
      return processCallFailed(state, action.errors);
    case callActions.CALL_MISSED:
      return processCallMissed(state);
    case callActions.CALL_RECEIVED:
      return processCallReceiving(state, action);
    case callActions.CALL_ACCEPTED:
      return incomingCallAccepted(state);
    case callActions.CALL_FINISHED:
      return processCallHangup(state);

    default:
      return state;
  }
};

export default call;
