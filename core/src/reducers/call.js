import * as callActions from '../actions/call';

const initialState = {
  onCall: false,
  calling: false,
  receivingCall: false,
  caller: null,
  tempCaller: null,
  missed: true,
  error: {},
  additionalCalls: 0
};

function processCall(state, tempCaller) {
  return {
    ...state,
    calling: true,
    onCall: false,
    missed: true,
    tempCaller: {
      ...tempCaller
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
    calling: false,
    error: { statusCode: errors.code.status_code, message: errors.description }
  };
}

function processCallMissed(state) {
  return {
    ...state,
    missed: true,
    tempCaller: {
      ...state.tempCaller
    }
  };
}

function processCallReceiving(state, action) {
  return {
    ...state,
    receivingCall: true,
    tempCaller: {
      name: action.callerName,
      phoneNumber: action.callerNumber,
      incoming: true
    }
  };
}

function incomingCallAccepted(state, action) {
  const { tempCaller } = state;
  return {
    ...state,
    onCall: true,
    calling: false,
    missed: false,
    receivingCall: action.receivingCall,
    startTime: action.startTime,
    caller: tempCaller,
    tempCaller: null
  };
}

function processCallHangup(state, action) {
  return {
    ...state,
    onCall: action.onCall,
    calling: false,
    receivingCall: false,
    caller: action.caller,
    tempCaller: null
  };
}

const call = (state = initialState, action) => {
  switch (action.type) {
    case callActions.CALL_REQUEST:
      return processCall(state, action.caller);
    case callActions.CALL_REJECTED:
      return processCallRejected(state, action.errors);
    case callActions.CALL_FAILED:
      return processCallFailed(state, action.errors);
    case callActions.CALL_MISSED:
      return processCallMissed(state);
    case callActions.CALL_RECEIVED:
      return processCallReceiving(state, action);
    case callActions.CALL_ACCEPTED:
      return incomingCallAccepted(state, action);
    case callActions.CALL_FINISHED:
      return processCallHangup(state, action);
    case callActions.ADD_ADDITIONAL_CALL:
      return {
        ...state,
        additionalCalls: state.additionalCalls + 1
      };
    case callActions.REMOVE_ADDITIONAL_CALL:
      return {
        ...state,
        additionalCalls: state.additionalCalls - 1
      };

    default:
      return state;
  }
};

export default call;
