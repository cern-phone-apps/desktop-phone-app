import * as recentCallsActions from '../actions/recent_calls';

const INITIAL_STATE = {
  lastRecentId: 0,
  recentCalls: []
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case recentCallsActions.ADD_RECENT_CALL: {
      const { remote } = action;
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
            startTime: remote.startTime || Date.now(),
            missed: remote.missed,
            incoming: remote.incoming
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
