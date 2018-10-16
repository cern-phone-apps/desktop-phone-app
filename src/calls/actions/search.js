import { RSAA } from 'redux-api-middleware'
import { withAuth } from 'login/reducers/auth'
import {buildCallsApiEndpoint} from 'calls/actions/numbers'

export const SEARCH_REQUEST = '@@search/SEARCH_REQUEST'
export const SEARCH_SUCCESS = '@@search/SEARCH_SUCCESS'
export const SEARCH_FAILURE = '@@search/SEARCH_FAILURE'
export const SEARCH_END = '@@search/SEARCH_END'
export const SEARCH_CLEAR = '@@search/SEARCH_CLEAR'

export const USER_SELECTED = '@@search/USER_SELECTED'
export const USER_NOT_SELECTED = '@@search/USER_NOT_SELECTED'

/**
 * Creates an endpoint URL for the user search
 *
 * @param name Name or surname of the user to search
 * @returns {string} A URL for the request
 */
export function buildSearchEndpoint (name) {
  return `${buildCallsApiEndpoint('/api/v1/users/search/')}?username=${name}`
}

/**
 * Action triggered when a user is selected on the users dropdown
 *
 * @returns {{type: string}} A dict
 */
export function selectUser (user) {
  return {
    user,
    type: USER_SELECTED
  }
}

// /**
//  * Action triggered when the input on the user name's field changes
//  * @param value
//  * @returns {{type: string, value: *}} A dict
//  */
// export function updateSearchValue (value) {
//   return {
//     type: SEARCH_UPDATED,
//     value
//   }
// }

/**
 * Action triggered when a user is not sa valid elected user on the dropdown
 * @returns {{type: string}} A dict
 */
export function unSelectUser () {
  return {
    type: USER_NOT_SELECTED
  }
}


export function endSearch () {
  return {
    type: SEARCH_END
  }
}

export function clearSearchResults () {
  return {
    type: SEARCH_CLEAR
  }
}

/**
 * Action that triggers a user search on the backend.
 * It requires authentication with access token
 *
 * @param name Name or surname of the user to search
 * @returns {{}} The RSAA action
 */
export const searchUsers = (name) => ({
  [RSAA]: {
    endpoint: buildSearchEndpoint(name),
    method: 'GET',
    credentials: 'include',
    headers: withAuth({'Content-Type': 'application/json'}),
    types: [
      SEARCH_REQUEST, SEARCH_SUCCESS, SEARCH_FAILURE
    ]
  }
})
