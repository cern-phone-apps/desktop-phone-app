import { RSAA } from 'redux-api-middleware';
import { JwtTokenHandlerWeb, JwtTokenHandlerMobile } from '../util/tokens';

export const PROFILE_REQUEST = '@@search/PROFILE_REQUEST';
export const PROFILE_SUCCESS = '@@search/PROFILE_SUCCESS';
export const PROFILE_FAILURE = '@@search/PROFILE_FAILURE';

const API_PATH = '/api/v1';

export default function(apiEndpoint, type = 'web') {
  const buildApiURL = (path, name) =>
    `${apiEndpoint}${API_PATH}${path}?username=${name}`;

  const buildApiURLWithId = (path, personId) =>
    `${apiEndpoint}${API_PATH}${path}?personId=${personId}`;

  let authHandlerClass;
  if (type === 'web') {
    authHandlerClass = JwtTokenHandlerWeb;
  } else {
    authHandlerClass = JwtTokenHandlerMobile;
  }
  return {
    getUserProfile: name => ({
      [RSAA]: {
        endpoint: buildApiURL('/api/v1/users/', name),
        method: 'GET',
        credentials: 'include',
        headers: authHandlerClass.withAuth({
          'Content-Type': 'application/json'
        }),
        types: [PROFILE_REQUEST, PROFILE_SUCCESS, PROFILE_FAILURE]
      }
    }),

    getUserProfileById: personId => ({
      [RSAA]: {
        endpoint: buildApiURLWithId('/contacts/', personId),
        method: 'GET',
        credentials: 'include',
        headers: authHandlerClass.withAuth({
          'Content-Type': 'application/json'
        }),
        types: [PROFILE_REQUEST, PROFILE_SUCCESS, PROFILE_FAILURE]
      }
    })
  };
}
