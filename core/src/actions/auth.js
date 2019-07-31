import { RSAA } from 'redux-api-middleware';
import { JwtTokenHandlerWeb, JwtTokenHandlerMobile } from '../util/tokens';

export const AUTH_START = '@@auth/AUTH_START';

export const LOGIN_REQUEST = '@@auth/LOGIN_REQUEST';
export const LOGIN_SUCCESS = '@@auth/LOGIN_SUCCESS';
export const LOGIN_FAILURE = '@@auth/LOGIN_FAILURE';

export const LOGOUT_REQUEST = '@@auth/LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = '@@auth/LOGOUT_SUCCESS';
export const LOGOUT_FAILURE = '@@auth/LOGOUT_FAILURE';

export const TOKEN_REQUEST = '@@auth/TOKEN_REQUEST';
export const TOKEN_RECEIVED = '@@auth/TOKEN_RECEIVED';
export const TOKEN_FAILURE = '@@auth/TOKEN_FAILURE';

export const CLEAR_TOKEN = '@@auth/CLEAR_TOKEN';

export const SET_TONE_TOKEN = '@@connection/SET_TONE_TOKEN';

export const authActionsTypes = {
  SET_AUTHENTICATED: '@@auth/SET_AUTHENTICATED'
}

const API_PATH = '/auth/v1/token';

/**
 * Action triggered to log the user in the backend API.
 * It requires an Oauth code that will be used on the backend to authenticate the user
 * there using a secret key and the application ID.
 * @param code A string returned by Oauth to be sent to the backend
 * @returns {{}} A RSAA request with REQUEST, SUCCESS and FAILURE statuses.
 */

export default function(apiEndpoint, type = 'mobile') {
  const buildAuthURL = path => `${apiEndpoint}${API_PATH}${path}`;
  let authHandlerClass;
  if (type === 'web') {
    authHandlerClass = JwtTokenHandlerWeb;
  } else if (type === 'desktop') {
    const { JwtTokenHandlerDesktop } = require('../util/tokens');

    authHandlerClass = JwtTokenHandlerDesktop;
  }else {
    authHandlerClass = JwtTokenHandlerMobile;
  }

  return {
    /**
     * Triggered when the user clicks the "Sign in" button
     */
    startAuth: () => ({
      type: AUTH_START
    }),

    login: code => ({
      [RSAA]: {
        endpoint: buildAuthURL('/login/'),
        method: 'POST',
        options: { timeout: 3000 },
        body: JSON.stringify({ code, type }),
        credentials: type === 'web' ? 'include' : 'omit',
        headers: { 'Content-Type': 'application/json' },
        types: [LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE]
      }
    }),

    /**
     * Action triggered to logout the user. It makes a DELETE request to the backend API
     * to clear the user's cookies or tokens.
     * It requires an authentication token provided by withAuth, which contains the
     * CSRF auth token.
     * @returns {{}} A RSAA request
     */
    logout: () => ({
      [RSAA]: {
        endpoint: buildAuthURL('/logout/'),
        method: 'DELETE',
        options: { timeout: 3000 },
        credentials: type === 'web' ? 'include' : 'omit',
        headers: authHandlerClass.withAuth({
          'Content-Type': 'application/json'
        }),
        types: [LOGOUT_REQUEST, LOGOUT_SUCCESS, LOGOUT_FAILURE]
      }
    }),

    /**
     * Action triggered to refresh the access token when it has expired.
     * It requires a refresh token provided by withRefresh, which contains the CSRF
     * refresh token.
     * @returns {{}} A RSAA request
     */
    refreshAccessToken: () => ({
      [RSAA]: {
        endpoint: buildAuthURL('/refresh/'),
        method: 'POST',
        options: { timeout: 3000 },
        credentials: type === 'web' ? 'include' : 'omit',
        headers: authHandlerClass.withRefresh({
          'Content-Type': 'application/json'
        }),
        types: [TOKEN_REQUEST, TOKEN_RECEIVED, TOKEN_FAILURE]
      }
    })
  };
}

/**
 * Action triggered when a call is taking place.
 *
 * @returns {{type: string}} A dict
 */
export const clearAuthToken = () => ({
  type: CLEAR_TOKEN
});

export function setToneToken(toneToken) {
  return {
    toneToken,
    type: SET_TONE_TOKEN
  };
}

export function setAuthenticated(){
  return {
    type: authActionsTypes.SET_AUTHENTICATED
  }
}
