import * as callForwardingActions from '../actions/call_forwarding';

const INITIAL_STATE = {
  localForwardList: [],
  localRingingList: [],
  fetchingStatus: false,
  status: {},
  lastOperationResult: null
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case callForwardingActions.ADD_LOCAL_FORWARD_NUMBER:
      return {
        ...state,
        localForwardList: [
          { text: action.number, value: action.number },
          ...state.localForwardList
        ]
      };

    case callForwardingActions.ADD_LOCAL_RINGING_NUMBER:
      return {
        ...state,
        localRingingList: [
          { text: action.number, value: action.number },
          ...state.localRingingList
        ]
      };

    case callForwardingActions.CALL_FORWARDING_REQUEST:
      return {
        ...state,
        fetchingStatus: true
      };

    case callForwardingActions.CALL_FORWARDING_SUCCESS:
      return {
        ...state,
        fetchingStatus: false,
        status: action.payload
      };

    case callForwardingActions.CALL_FORWARDING_FAILURE:
      return {
        ...state,
        fetchingStatus: false
      };

    case callForwardingActions.ENABLE_CALL_FORWARDING_ACTIONS.SUCCESS:
    case callForwardingActions.ENABLE_CALL_FORWARDING_ACTIONS.FAILURE:
    case callForwardingActions.ENABLE_SIMULTANEOUS_RINGING_ACTIONS.SUCCESS:
    case callForwardingActions.ENABLE_SIMULTANEOUS_RINGING_ACTIONS.FAILURE:
    case callForwardingActions.DISABLE_CALL_FORWARDING_ACTIONS.SUCCESS:
    case callForwardingActions.DISABLE_CALL_FORWARDING_ACTIONS.FAILURE:
      return {
        ...state,
        lastOperationResult: action.payload
      };

    case callForwardingActions.CLEAR_LAST_OPERATION:
      return {
        ...state,
        lastOperationResult: null
      };

    default:
      return state;
  }
};
