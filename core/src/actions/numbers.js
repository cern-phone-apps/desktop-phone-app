import { RSAA } from 'redux-api-middleware';
import { JwtTokenHandlerWeb, JwtTokenHandlerMobile, JwtTokenHandlerDesktop } from '../util/tokens';

export const NUMBERS_REQUEST = '@@calls/NUMBERS_REQUEST';
export const NUMBERS_SUCCESS = '@@calls/NUMBERS_SUCCESS';
export const NUMBERS_FAILURE = '@@calls/NUMBERS_FAILURE';
export const NUMBERS_SET_ACTIVE = '@@calls/NUMBERS_SET_ACTIVE';

const API_PATH = '/api/v1';

/**
 * Action that triggers a retrieval of the user's phones on the backend.
 * It requires authentication with access token
 *
 * @param name username of the user to search
 * @returns {{}} The RSAA action
 */
export default function(apiEndpoint, type = 'mobile') {
  const buildCallsApiEndpoint = path => `${apiEndpoint}${API_PATH}${path}`;
  let authHandlerClass;
  if (type === 'web') {
    authHandlerClass = JwtTokenHandlerWeb;
  } else if (type === 'desktop') {
    authHandlerClass = JwtTokenHandlerDesktop;
  } else {
    authHandlerClass = JwtTokenHandlerMobile;
  }
  return {
    getUserPhoneNumbers: () => ({
      [RSAA]: {
        endpoint: buildCallsApiEndpoint('/numbers/'),
        method: 'GET',
        credentials: 'include',
        options: { timeout: 3000 },
        headers: authHandlerClass.withAuth({
          'Content-Type': 'application/json'
        }),
        types: [NUMBERS_REQUEST, NUMBERS_SUCCESS, NUMBERS_FAILURE]
      }
    })
  };
}

export function setActiveNumber(phoneNumber) {
  return {
    phoneNumber,
    type: NUMBERS_SET_ACTIVE
  };
}
