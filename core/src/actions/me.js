import { RSAA } from 'redux-api-middleware';
import { JwtTokenHandlerWeb, JwtTokenHandlerMobile, JwtTokenHandlerDesktop } from '../util/tokens';

export const ME_REQUEST = '@@user/ME_REQUEST';
export const ME_SUCCESS = '@@user/ME_SUCCESS';
export const ME_FAILURE = '@@user/ME_FAILURE';

export const SET_DO_NOT_DISTURB_REQUEST = '@@status/SET_DO_NOT_DISTURB_REQUEST';
export const SET_DO_NOT_DISTURB_SUCCESS = '@@status/SET_DO_NOT_DISTURB_SUCCESS';
export const SET_DO_NOT_DISTURB_FAILURE = '@@status/SET_DO_NOT_DISTURB_SUCCESS';

const API_PATH = '/api/v1';

export default function(apiEndpoint, type = 'mobile') {
  const buildApiURL = path => `${apiEndpoint}${API_PATH}${path}`;
  let authHandlerClass;
  if (type === 'web') {
    authHandlerClass = JwtTokenHandlerWeb;
  } else if (type === 'desktop') {
    authHandlerClass = JwtTokenHandlerDesktop;
  } else {
    authHandlerClass = JwtTokenHandlerMobile;
  }
  return {
    getMe: () => ({
      [RSAA]: {
        endpoint: buildApiURL('/me/'),
        method: 'GET',
        credentials: 'include',
        headers: authHandlerClass.withAuth({
          'Content-Type': 'application/json'
        }),
        types: [ME_REQUEST, ME_SUCCESS, ME_FAILURE]
      }
    }),
    setUserDoNotDisturb: value => ({
      [RSAA]: {
        endpoint: buildApiURL('/me/'),
        method: 'PUT',
        credentials: 'include',
        headers: authHandlerClass.withAuth({
          'Content-Type': 'application/json'
        }),
        body: JSON.stringify({ doNotDisturb: value }),
        types: [
          SET_DO_NOT_DISTURB_REQUEST,
          SET_DO_NOT_DISTURB_SUCCESS,
          SET_DO_NOT_DISTURB_FAILURE
        ]
      }
    })
  };
}
