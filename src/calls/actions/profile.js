import { RSAA } from 'redux-api-middleware'
import { withAuth } from 'login/utils/tokens'
import {buildCallsApiEndpoint} from 'calls/actions/numbers'

export const PROFILE_REQUEST = '@@search/PROFILE_REQUEST'
export const PROFILE_SUCCESS = '@@search/PROFILE_SUCCESS'
export const PROFILE_FAILURE = '@@search/PROFILE_FAILURE'

/**
 * Creates an endpoint URL for the user search
 *
 * @param name Name or surname of the user to search
 * @returns {string} A URL for the request
 */
export function buildProfileEndpoint (name) {
  return `${buildCallsApiEndpoint('/api/v1/users/')}?username=${name}`
}

export const getUserProfile = (name) => ({
  [RSAA]: {
    endpoint: buildProfileEndpoint(name),
    method: 'GET',
    credentials: 'include',
    headers: withAuth({'Content-Type': 'application/json'}),
    types: [
      PROFILE_REQUEST, PROFILE_SUCCESS, PROFILE_FAILURE
    ]
  }
})
