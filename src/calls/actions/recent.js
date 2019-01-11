export const ADD_RECENT_CALL = '@@call/ADD_RECENT_CALL'

export function addRecentCall (recentCall) {
  return {
    recentCall,
    type: ADD_RECENT_CALL
  }
}
