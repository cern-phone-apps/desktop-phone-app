export const ADD_RECENT_CALL = '@@call/ADD_RECENT_CALL';
export const CLEAR_RECENT_CALLS = '@@call/CLEAR_RECENT_CALLS';

/**
 *
 * @param remote
 * @param incoming
 * @param missed
 * @param startTime
 * @returns {{incoming: *, missed: *, startTime: *, remote: *, type: string}}
 */
export function addRecentCall(remote) {
  const newRemote = remote;
  if (remote && !remote.name) {
    newRemote.name = remote.phoneNumber;
  }

  return {
    remote: newRemote,
    missed: newRemote.missed,
    incoming: newRemote.incoming,
    startTime: newRemote.startTime,
    type: ADD_RECENT_CALL,
    callId: newRemote.callId
  };
}

export function clearRecentCalls() {
  return {
    type: CLEAR_RECENT_CALLS
  };
}
