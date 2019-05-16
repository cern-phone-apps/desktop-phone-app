import { RSAA } from 'redux-api-middleware';
import { JwtTokenHandlerWeb, JwtTokenHandlerMobile } from '../util/tokens';

export const SEARCH_REQUEST = '@@search/SEARCH_REQUEST';
export const SEARCH_SUCCESS = '@@search/SEARCH_SUCCESS';
export const SEARCH_FAILURE = '@@search/SEARCH_FAILURE';
export const SEARCH_END = '@@search/SEARCH_END';
export const SEARCH_CLEAR = '@@search/SEARCH_CLEAR';

export const USER_SELECTED = '@@search/USER_SELECTED';
export const USER_NOT_SELECTED = '@@search/USER_NOT_SELECTED';

const API_PATH = '/api/v1';

export default function(apiEndpoint, type = 'web') {
  const buildApiURL = (path, name) =>
    `${apiEndpoint}${API_PATH}${path}?username=${name}`;
  let authHandlerClass;
  if (type === 'web') {
    authHandlerClass = JwtTokenHandlerWeb;
  } else {
    authHandlerClass = JwtTokenHandlerMobile;
  }
  return {
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

/**
 * Action triggered when a user is selected on the users dropdown
 *
 * @returns {{type: string}} A dict
 */
export function selectUser(user) {
  return {
    user,
    type: USER_SELECTED
  };
}

/**
 * Action triggered when a user is not sa valid elected user on the dropdown
 * @returns {{type: string}} A dict
 */
export function unSelectUser() {
  return {
    type: USER_NOT_SELECTED
  };
}

export function endSearch() {
  return {
    type: SEARCH_END
  };
}

export function clearSearchResults() {
  return {
    type: SEARCH_CLEAR
  };
}
