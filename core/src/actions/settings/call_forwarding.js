import { RSAA } from 'redux-api-middleware';
import { JwtTokenHandlerWeb, JwtTokenHandlerMobile } from '../../util/tokens';

export const ADD_LOCAL_FORWARD_NUMBER = '@@settings/ADD_LOCAL_FORWARD_NUMBER';

export const CALL_FORWARDING_REQUEST = '@@settings/CALL_FORWARDING_REQUEST';
export const CALL_FORWARDING_SUCCESS = '@@settings/CALL_FORWARDING_SUCCESS';
export const CALL_FORWARDING_FAILURE = '@@settings/CALL_FORWARDING_FAILURE';

export function addLocalForwardNumber(number) {
  return {
    number,
    type: ADD_LOCAL_FORWARD_NUMBER
  };
}
const API_PATH = '/api/v1';

export default function(apiEndpoint, type = 'web') {
  const buildApiURL = path => `${apiEndpoint}${API_PATH}${path}`;
  let authHandlerClass;
  if (type === 'web') {
    authHandlerClass = JwtTokenHandlerWeb;
  } else {
    authHandlerClass = JwtTokenHandlerMobile;
  }
  return {
    getCallForwardingStatus: () => ({
      [RSAA]: {
        endpoint: buildApiURL('/call-forwarding/'),
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
    })
  };
}
