import * as recentActions from 'calls/actions/recent'

const initialState = {
  lastRecentId: 0,
  recentCalls: []
}

const recent = (state = initialState, action) => {
  let recentCall, lastRecentId
  switch (action.type) {
    case recentActions.ADD_RECENT_CALL:
      recentCall = action.recentCall
      lastRecentId = ++state.lastRecentId
      return {
        ...state,
        lastRecentId: lastRecentId,
        recentCalls: [
          ...state.recentCalls,
          {
            id: lastRecentId,
            author: recentCall.author,
            phoneNumber: recentCall.phoneNumber,
            startTime: recentCall.startTime,
            endTime: recentCall.endTime,
            incoming: recentCall.incoming,
            missed: recentCall.missed
          }
        ]
      }

    default:
      return state
  }
}

export default recent
