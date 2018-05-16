import { RSAA } from 'redux-api-middleware'
import { withAuth } from 'reducers/auth'

export const SEARCH_REQUEST = '@@search/SEARCH_REQUEST'
export const SEARCH_SUCCESS = '@@search/SEARCH_SUCCESS'
export const SEARCH_FAILURE = '@@search/SEARCH_FAILURE'

export const USER_SELECTED = '@@search/USER_SELECTED'
export const SEARCH_UPDATED = '@@search/SEARCH_UPDATED'
export const USER_NOT_SELECTED = '@@search/USER_NOT_SELECTED'

export function selectUser () {
  return {
    type: USER_SELECTED
  }
}

export function updateSearchValue (value) {
  return {
    type: SEARCH_UPDATED,
    value
  }
}

export function unSelectUser () {
  return {
    type: USER_NOT_SELECTED
  }
}

export function buildSearchEndpoint (username) {
  return `${process.env.REACT_APP_API_USER_SEARCH_ENDPOINT}?username=${username}`
}

export const searchUsers = (username) => console.log('Getting ldap users') || ({
  [RSAA]: {
    endpoint: buildSearchEndpoint(username),
    method: 'GET',
    credentials: 'include',
    headers: withAuth({'Content-Type': 'application/json'}),
    types: [
      SEARCH_REQUEST, SEARCH_SUCCESS, SEARCH_FAILURE
    ]
  }
})
