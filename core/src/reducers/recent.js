import * as recentCallsActions from '../actions/recent_calls';

const initialState = {
  lastRecentId: 0,
  recentCalls: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case recentCallsActions.ADD_RECENT_CALL: {
      const { remote, incoming, missed, startTime } = action;
      const lastRecentId = state.lastRecentId + 1;

      return {
        ...state,
        lastRecentId,
        recentCalls: [
          {
            id: lastRecentId,
            name: remote.name,
            phoneNumber: remote.phoneNumber,
            endTime: Date.now(),
            startTime,
            missed,
            incoming
          },
          ...state.recentCalls
        ]
      };
    }

    case recentCallsActions.CLEAR_RECENT_CALLS:
      return {
        ...state,
        lastRecentId: 0,
        recentCalls: []
      };
    default:
      return state;
  }
};
