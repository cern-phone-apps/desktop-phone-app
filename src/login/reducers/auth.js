import * as authActions from 'login/actions/auth'
import Cookies from 'js-cookie'
import {logMessage} from 'common/utils'

const initialState = {
  loggedIn: false,
  loginInProgress: false,
  errors: {}
}

/**
 * Gets the access token csrf from the cookies
 * @returns {*|{}} The cookie value
 */
export function getAccessToken () {
  return Cookies.get('csrf_access_token')
}

/**
 * Checks if the access token csrf cookie is present (not expired) or not present (expired)
 * @returns {boolean} (true|false)
 */
export function isAccessTokenExpired () {
  return !getAccessToken()
}

/**
 * Gets the refresh token csrf from the cookies
 * @returns {*|{}} The cookie value
 */
export function getRefreshToken () {
  return Cookies.get('csrf_refresh_token')
}

/**
 * Checks if the refresh token csrf cookie is present (not expired) or not present (expired)
 * @returns {boolean} (true|false)
 */
export function isRefreshTokenExpired () {
  return !getRefreshToken()
}

/**
 * Checks if the user is authenticated on the application. Refresh token must be present.
 * @returns {boolean} (true|false)
 */
export function isAuthenticated (state) {
  const refreshToken = !isRefreshTokenExpired()
  const isOauthEnabled = process.env.REACT_APP_OAUTH_ENABLED
  const loggedIn = state.loggedIn

  if (isOauthEnabled === 'false' && loggedIn === true) {
    return true
  }

  return refreshToken
}

/**
 * Gets the errors from the state
 * @param state An state dict
 * @returns {*} A dict of errors
 */
export function errors (state) {
  return state.errors
}

/**
 * Adds a X-CSRF-TOKEN with the access token attribute to the headers
 * @param headers dict with http headers
 * @returns {function(*): {'X-CSRF-TOKEN': (*|{})}} A function that returns a dict with
 * the new headers
 */
export function withAuth (headers = {}) {
  return (state) => ({
    ...headers,
    'X-CSRF-TOKEN': getAccessToken()
  })
}

/**
 * Adds a X-CSRF-TOKEN with the refresh token attribute to the headers
 * @param headers dict with http headers
 * @returns {function(*): {'X-CSRF-TOKEN': (*|{})}} A function that returns a dict with
 * the new headers
 */
export function withRefresh (headers = {}) {
  return (state) => ({
    ...headers,
    'X-CSRF-TOKEN': getRefreshToken()
  })
}

const clearCookies = () => {
  Cookies.remove('csrf_refresh_token')
  Cookies.remove('csrf_access_token')
}

function handleErrorWithToken (state, action) {
  logMessage(action)
  let message
  let statusCode
  if(action.payload.message){
    if(action.payload.name === "RequestError") {
      message = "Dial backend is not currently available."
      statusCode = 31

    }else if(action.payload.name === "ApiError"){
      message = action.payload.message
      statusCode = (action.payload.status? action.payload.status : -1)
    }else{
      message = action.payload.message
      statusCode = -1
    }
  }else{
    message = "Unknown error"
    statusCode = 999
  }

  clearCookies()

  return {
    ...state,
    loggedIn: false,
    loginInProgress: false,
    error: {message: message, statusCode: statusCode}
  }
}

/**
 * Reducer function for the authentication actions
 *
 * @param state Authentication state
 * @param action
 * @returns {{loggedIn, loginInProgress, error}}
 */
export default (state = initialState, action) => {
  switch (action.type) {
    case authActions.LOGIN_REQUEST:
    case authActions.TOKEN_REQUEST:
      if(action.error){
        return handleErrorWithToken (state, action)
      }
      return {
        ...state,
        loginInProgress: true
      }
    case authActions.LOGIN_SUCCESS:
    case authActions.TOKEN_RECEIVED:
      return {
        ...state,
        loggedIn: action.payload.login,
        loginInProgress: false,
        errors: {}
      }
    case authActions.LOGIN_FAILURE:
    case authActions.TOKEN_FAILURE:
      return handleErrorWithToken(state, action)
    case authActions.LOGOUT_SUCCESS:
      clearCookies()
      return {
        ...state,
        loggedIn: false,
        loginInProgress: false,
        errors: {}
      }
    default:
      return state
  }
}
