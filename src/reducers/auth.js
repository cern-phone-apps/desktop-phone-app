import * as authActions from 'actions/auth'
import Cookies from 'js-cookie'

const initialState = {
  refresh: false,
  loggedIn: false,
  loginInProgress: false,
  errors: {}
}

export function getAccessToken () {
  return Cookies.get('csrf_access_token')
}

export function isAccessTokenExpired () {
  console.debug('isAccessTokenExpired?: ', !getAccessToken())
  return !getAccessToken()
}

export function getRefreshToken () {
  return Cookies.get('csrf_refresh_token')
}

export function isRefreshTokenExpired () {
  console.debug('isRefreshTokenExpired?: ', !getRefreshToken())
  return !getRefreshToken()
}

export function isAuthenticated () {
  return !isRefreshTokenExpired()
}

export function errors (state) {
  return state.errors
}

export function withAuth (headers = {}) {
  return (state) => ({
    ...headers,
    'X-CSRF-TOKEN': getAccessToken()
  })
}

export function withRefresh (headers = {}) {
  return (state) => ({
    ...headers,
    'X-CSRF-TOKEN': getRefreshToken()
  })
}

export default (state = initialState, action) => {
  switch (action.type) {
    case authActions.LOGIN_REQUEST:
      return {
        ...state,
        loginInProgress: true
      }
    case authActions.LOGIN_SUCCESS:
      return {
        ...state,
        loggedIn: action.payload.login,
        loginInProgress: false,
        errors: {}
      }
    case authActions.TOKEN_RECEIVED:
      return {
        ...state,
        refresh: action.payload.refresh
      }
    case authActions.LOGIN_FAILURE:
      return {
        refresh: false,
        loggedIn: false,
        loginInProgress: false,
        errors: action.payload.response || {'non_field_errors': action.payload.statusText}
      }
    case authActions.TOKEN_FAILURE:
      return {
        ...state,
        refresh: false,
        loggedIn: false,
        errors: action.payload.response || {'non_field_errors': action.payload.statusText}
      }
    case authActions.LOGOUT_SUCCESS:
      return {
        refresh: false,
        loggedIn: false,
        errors: {}
      }
    default:
      return state
  }
}
