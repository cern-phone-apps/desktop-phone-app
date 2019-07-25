import * as callActions from '../actions/call';

const initialState = {
  /** whether we're on a call */
  onCall: false,
  /** whether we're calling someone */
  calling: false,
  /** UUID of the current call */
  uuid: null,
  /** whether we're receiving a call */
  receivingCall: false,
  /** the identity of the caller/recipient (ongoing call) */
  remote: null,
  /** the identity of the caller/recipient (queued call) */
  tempRemote: null,
  /** error information */
  error: {},
  /** number of queued up calls */
  additionalCalls: 0,
  additionalCall: undefined
};

/**
 * Start an outgoing call
 * @param {Object} state
 * @param {Object} recipient - recipient that we're trying to reach
 */
function processCallOutgoing(state, { recipient, uuid }) {
  return {
    ...state,
    calling: true,
    uuid,
    onCall: false,
    receivingCall: false,
    tempRemote: {
      ...recipient,
      missed: true
    }
  };
}

/**
 * Set call as rejected
 * @param {Object} state
 * @param {Object} errors - errors that led to rejection
 */
function processCallRejected(state, errors) {
  return {
    ...state,
    onCall: false,
    calling: false,
    error: { statusCode: errors.code.status_code, message: errors.description }
  };
}

/**
 * Set call as failed
 * @param {Object} state
 * @param {Object} errors - errors that led to failure
 */
function processCallFailed(state, errors) {
  return {
    ...state,
    calling: false,
    error: { statusCode: errors.code.status_code, message: errors.description }
  };
}

/**
 * Set call as missed (didn't answer)
 * @param {Object} state
 */
function processCallMissed(state) {
  return {
    ...state,
    tempRemote: {
      ...state.tempRemote,
      missed: true
    }
  };
}

/**
 * Handle an incoming call
 * @param {Object} state
 * @param {Object} action
 */
function processCallReceived(state, { callerName, callerNumber, uuid }) {
  return {
    ...state,
    receivingCall: true,
    uuid,
    tempRemote: {
      name: callerName,
      phoneNumber: callerNumber,
      incoming: true,
      missed: true
    }
  };
}

/**
 * Handle an accepted incoming call
 * @param {Object} state
 * @param {Object} action
 */
function processCallAccepted(state, { startTime }) {
  const { tempRemote } = state;
  return {
    ...state,
    onCall: true,
    calling: false,
    receivingCall: false,
    startTime,
    remote: {
      ...tempRemote,
      startTime,
      missed: false
    },
    tempRemote: undefined
  };
}

function processCallFinished(state) {
  return {
    ...state,
    calling: false,
    receivingCall: false,
    tempRemote: undefined
  };
}

const call = (state = initialState, action) => {
  switch (action.type) {
    case callActions.CALL_REQUEST:
      return processCallOutgoing(state, action);
    case callActions.CALL_REJECTED:
      return processCallRejected(state, action.errors);
    case callActions.CALL_FAILED:
      return processCallFailed(state, action.errors);
    case callActions.CALL_MISSED:
      return processCallMissed(state);
    case callActions.CALL_RECEIVED:
      return processCallReceived(state, action);
    case callActions.CALL_ACCEPTED:
      return processCallAccepted(state, action);
    case callActions.CALL_FINISHED_ACTIONS.FINISH_TEMP_CALL:
      return processCallFinished(state, action);
    case callActions.CALL_FINISHED_ACTIONS.FINISH_ONGOING_CALL:
      return {
        ...state,
        remote: undefined,
        onCall: false
      }
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
      case callActions.ADDITIONAL_CALL_ACTIONS.SET_ADDITIONAL_CALL:
      return {
        ...state,
        additionalCall: action.additionalCall
      };
    case callActions.SET_CALL_ID:
      return {
        ...state,
        tempRemote: {
          ...state.tempRemote,
          callId: action.callId
        }
      }
    default:
      return state;
  }
};

export default call;
