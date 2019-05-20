import * as callForwardingActions from '../../actions/settings/call_forwarding';

const initialState = {
  localForwardList: [],
  fetchingStatus: false,
  status: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case callForwardingActions.ADD_LOCAL_FORWARD_NUMBER:
      return {
        ...state,
        localForwardList: [
          { text: action.number, value: action.number },
          ...state.localForwardList
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
    default:
      return state;
  }
};
