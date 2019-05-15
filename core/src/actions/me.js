import { RSAA } from 'redux-api-middleware';
import { JwtTokenHandlerWeb, JwtTokenHandlerMobile } from '../util/tokens';

export const ME_REQUEST = '@@user/ME_REQUEST';
export const ME_SUCCESS = '@@user/ME_SUCCESS';
export const ME_FAILURE = '@@user/ME_FAILURE';

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
    getMe: () => ({
      [RSAA]: {
        endpoint: buildApiURL('/users/me/'),
        method: 'GET',
        credentials: 'include',
        headers: authHandlerClass.withAuth({
          'Content-Type': 'application/json'
        }),
        types: [ME_REQUEST, ME_SUCCESS, ME_FAILURE]
      }
    })
  };
}
