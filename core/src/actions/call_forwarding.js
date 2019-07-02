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

export const DISABLE_CALL_FORWARDING_ACTIONS = {
  REQUEST: '@@settings/DISABLE_CALL_FORWARDING_REQUEST',
  SUCCESS: '@@settings/DISABLE_CALL_FORWARDING_SUCCESS',
  FAILURE: '@@settings/DISABLE_CALL_FORWARDING_FAILURE'
};

export const ENABLE_SIMULTANEOUS_RINGING_ACTIONS = {
  REQUEST: '@@settings/ENABLE_SIMULTANEOUS_RINGING_REQUEST',
  SUCCESS: '@@settings/ENABLE_SIMULTANEOUS_RINGING_SUCCESS',
  FAILURE: '@@settings/ENABLE_SIMULTANEOUS_RINGING_FAILURE'
};

export const ENABLE_CALL_FORWARDING_ACTIONS = {
  REQUEST: '@@settings/ENABLE_CALL_FORWARDING_REQUEST',
  SUCCESS: '@@settings/ENABLE_CALL_FORWARDING_SUCCESS',
  FAILURE: '@@settings/ENABLE_CALL_FORWARDING_FAILURE'
};

export const CLEAR_LAST_OPERATION = '@@settings/CLEAR_LAST_OPERATION';

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

export function clearLastOperation() {
  return {
    type: CLEAR_LAST_OPERATION
  };
}

export default function(apiEndpoint, type = 'mobile') {
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
          DISABLE_CALL_FORWARDING_ACTIONS.REQUEST,
          DISABLE_CALL_FORWARDING_ACTIONS.SUCCESS,
          DISABLE_CALL_FORWARDING_ACTIONS.FAILURE
        ]
      }
    }),
    enableSimultaneousRinging: (extension, destinations) => ({
      [RSAA]: {
        endpoint: buildApiURL('/simultaneous-ring/enable/'),
        method: 'POST',
        credentials: 'include',
        headers: authHandlerClass.withAuth({
          'Content-Type': 'application/json'
        }),
        body: JSON.stringify({ extension, destinations }),
        types: [
          ENABLE_SIMULTANEOUS_RINGING_ACTIONS.REQUEST,
          ENABLE_SIMULTANEOUS_RINGING_ACTIONS.SUCCESS,
          ENABLE_SIMULTANEOUS_RINGING_ACTIONS.FAILURE
        ]
      }
    }),
    enableCallForwarding: (extension, destination) => ({
      [RSAA]: {
        endpoint: buildApiURL('/enable/'),
        method: 'POST',
        credentials: 'include',
        headers: authHandlerClass.withAuth({
          'Content-Type': 'application/json'
        }),
        body: JSON.stringify({ extension, destination }),
        types: [
          ENABLE_CALL_FORWARDING_ACTIONS.REQUEST,
          ENABLE_CALL_FORWARDING_ACTIONS.SUCCESS,
          ENABLE_CALL_FORWARDING_ACTIONS.FAILURE
        ]
      }
    })
  };
}
