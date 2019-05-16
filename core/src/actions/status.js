import { RSAA } from 'redux-api-middleware';
import { JwtTokenHandlerWeb, JwtTokenHandlerMobile } from '../util/tokens';

export const SET_DO_NOT_DISTURB_REQUEST = '@@status/SET_DO_NOT_DISTURB_REQUEST';
export const SET_DO_NOT_DISTURB_SUCCESS = '@@status/SET_DO_NOT_DISTURB_SUCCESS';
export const SET_DO_NOT_DISTURB_FAILURE = '@@status/SET_DO_NOT_DISTURB_SUCCESS';

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
    setUserDoNotDisturb: value => ({
      [RSAA]: {
        endpoint: buildApiURL('/users/me/'),
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
