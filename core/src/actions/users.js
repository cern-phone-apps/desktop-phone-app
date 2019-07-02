import { RSAA } from 'redux-api-middleware';
import { JwtTokenHandlerWeb, JwtTokenHandlerMobile } from '../util/tokens';

export const SEARCH_REQUEST = '@@search/SEARCH_REQUEST';
export const SEARCH_SUCCESS = '@@search/SEARCH_SUCCESS';
export const SEARCH_FAILURE = '@@search/SEARCH_FAILURE';

export const PROFILE_REQUEST = '@@search/PROFILE_REQUEST';
export const PROFILE_SUCCESS = '@@search/PROFILE_SUCCESS';
export const PROFILE_FAILURE = '@@search/PROFILE_FAILURE';

const API_PATH = '/api/v1';

export default function(apiEndpoint, type = 'mobile') {
  const buildApiURL = (path, name) => `${apiEndpoint}${API_PATH}${path}${name}`;

  let authHandlerClass;
  if (type === 'web') {
    authHandlerClass = JwtTokenHandlerWeb;
  } else {
    authHandlerClass = JwtTokenHandlerMobile;
  }

  return {
    findUserByUsername: name => ({
      [RSAA]: {
        endpoint: buildApiURL('/users/findByUsername/', name),
        method: 'GET',
        credentials: 'include',
        headers: authHandlerClass.withAuth({
          'Content-Type': 'application/json'
        }),
        types: [PROFILE_REQUEST, PROFILE_SUCCESS, PROFILE_FAILURE]
      }
    }),

    findUserById: personId => ({
      [RSAA]: {
        endpoint: buildApiURL('/users/findById/', personId),
        method: 'GET',
        credentials: 'include',
        headers: authHandlerClass.withAuth({
          'Content-Type': 'application/json'
        }),
        types: [PROFILE_REQUEST, PROFILE_SUCCESS, PROFILE_FAILURE]
      }
    }),

    searchUsers: name => ({
      [RSAA]: {
        endpoint: buildApiURL('/users/search/', name),
        method: 'GET',
        credentials: 'include',
        headers: authHandlerClass.withAuth({
          'Content-Type': 'application/json'
        }),
        types: [SEARCH_REQUEST, SEARCH_SUCCESS, SEARCH_FAILURE]
      }
    })
  };
}
