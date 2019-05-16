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
export function addRecentCall(remote, incoming, missed, startTime) {
  const newRemote = remote || {};

  console.log('Adding recent call:');
  console.log(newRemote);
  if (remote && !remote.name) {
    newRemote.name = remote.phoneNumber;
  }

  return {
    remote: newRemote,
    missed,
    incoming: newRemote.incoming,
    startTime,
    type: ADD_RECENT_CALL
  };
}

export function clearRecentCalls() {
  return {
    type: CLEAR_RECENT_CALLS
  };
}
