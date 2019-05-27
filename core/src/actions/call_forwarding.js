import { RSAA } from 'redux-api-middleware';
import { JwtTokenHandlerWeb, JwtTokenHandlerMobile } from '../util/tokens';

export const ADD_LOCAL_FORWARD_NUMBER = '@@settings/ADD_LOCAL_FORWARD_NUMBER';
export const ADD_LOCAL_RINGING_NUMBER = '@@settings/ADD_LOCAL_RINGING_NUMBER';

export const CALL_FORWARDING_REQUEST = '@@settings/CALL_FORWARDING_REQUEST';
export const CALL_FORWARDING_SUCCESS = '@@settings/CALL_FORWARDING_SUCCESS';
export const CALL_FORWARDING_FAILURE = '@@settings/CALL_FORWARDING_FAILURE';

export const DISABLE_CALL_FORWARDING_REQUEST =
  '@@settings/DISABLE_CALL_FORWARDING_REQUEST';
export const DISABLE_CALL_FORWARDING_SUCCESS =
  '@@settings/DISABLE_CALL_FORWARDING_SUCCESS';
export const DISABLE_CALL_FORWARDING_FAILURE =
  '@@settings/DISABLE_CALL_FORWARDING_FAILURE';

export const ENABLE_SIMULTANEOUS_RINGING_REQUEST =
  '@@settings/ENABLE_SIMULTANEOUS_RINGING_REQUEST';
export const ENABLE_SIMULTANEOUS_RINGING_SUCCESS =
  '@@settings/ENABLE_SIMULTANEOUS_RINGING_SUCCESS';
export const ENABLE_SIMULTANEOUS_RINGING_FAILURE =
  '@@settings/ENABLE_SIMULTANEOUS_RINGING_FAILURE';

const API_PATH = '/api/v1/call-forwarding';

export function addLocalForwardNumber(number) {
  return {
    number,
    type: ADD_LOCAL_FORWARD_NUMBER
  };
}

export function addLocalRingingNumber(number) {
  return {
    number,
    type: ADD_LOCAL_RINGING_NUMBER
  };
}

export default function(apiEndpoint, type = 'web') {
  const buildApiURLWithParam = (path, extension) =>
    `${apiEndpoint}${API_PATH}${path}${extension}`;

  const buildApiURL = path => `${apiEndpoint}${API_PATH}${path}`;

  let authHandlerClass;
  if (type === 'web') {
    authHandlerClass = JwtTokenHandlerWeb;
  } else {
    authHandlerClass = JwtTokenHandlerMobile;
  }
  return {
    getCallForwardingStatus: extension => ({
      [RSAA]: {
        endpoint: buildApiURLWithParam('/status/', extension),
        method: 'GET',
        credentials: 'include',
        headers: authHandlerClass.withAuth({
          'Content-Type': 'application/json'
        }),
        types: [
          CALL_FORWARDING_REQUEST,
          CALL_FORWARDING_SUCCESS,
          CALL_FORWARDING_FAILURE
        ]
      }
    }),
    disableCallForwarding: extension => ({
      [RSAA]: {
        endpoint: buildApiURL('/disable/'),
        method: 'DELETE',
        credentials: 'include',
        headers: authHandlerClass.withAuth({
          'Content-Type': 'application/json'
        }),
        body: JSON.stringify({ extension }),
        types: [
          DISABLE_CALL_FORWARDING_REQUEST,
          DISABLE_CALL_FORWARDING_SUCCESS,
          DISABLE_CALL_FORWARDING_FAILURE
        ]
      }
    }),
    enableSimultaneousRinging: (extension, personId, destinations) => ({
      [RSAA]: {
        endpoint: buildApiURL('/simultaneous-ring/enable/'),
        method: 'DELETE',
        credentials: 'include',
        headers: authHandlerClass.withAuth({
          'Content-Type': 'application/json'
        }),
        body: JSON.stringify({ extension, personId, destinations }),
        types: [
          ENABLE_SIMULTANEOUS_RINGING_REQUEST,
          ENABLE_SIMULTANEOUS_RINGING_SUCCESS,
          ENABLE_SIMULTANEOUS_RINGING_FAILURE
        ]
      }
    })
  };
}
