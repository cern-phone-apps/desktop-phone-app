import {RSAA} from 'redux-api-middleware'
import {withAuth} from 'login/reducers/auth'
export const NUMBERS_REQUEST = '@@search/NUMBERS_REQUEST'
export const NUMBERS_SUCCESS = '@@search/NUMBERS_SUCCESS'
export const NUMBERS_FAILURE = '@@search/NUMBERS_FAILURE'

export const NUMBERS_SET_ACTIVE = '@@search/NUMBERS_SET_ACTIVE'

/**
 * Creates an endpoint URL to retrieve the user phones
 *
 * @param name Name or surname of the user to search
 * @returns {string} A URL for the request
 */
export function buildPhonesEndpoint () {
  console.log(`${process.env.REACT_APP_API_PHONES_API_ENDPOINT}`)
  return `${process.env.REACT_APP_API_PHONES_API_ENDPOINT}`
}

/**
 * Action that triggers a retrieval of the user's phones on the backend.
 * It requires authentication with access token
 *
 * @param name username of the user to search
 * @returns {{}} The RSAA action
 */
export const getUserPhoneNumbers = () => ({
  [RSAA]: {
    endpoint: buildPhonesEndpoint(),
    method: 'GET',
    credentials: 'include',
    headers: withAuth({'Content-Type': 'application/json'}),
    types: [
      NUMBERS_REQUEST, NUMBERS_SUCCESS, NUMBERS_FAILURE
    ]
  }
})

export function setActiveNumber (phoneNumber) {
  return {
    phoneNumber,
    type: NUMBERS_SET_ACTIVE
  }
}