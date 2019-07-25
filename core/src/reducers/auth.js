import * as authActions from '../actions/auth';
import { createError } from '../util/errors';

const INITIAL_STATE = {
  authInProgress: false,
  loggedIn: false,
  authToken: undefined,
  accessToken: undefined,
  refreshToken: undefined,
  loginInProgress: false,
  requestingToken: false,
  toneToken: '',
  error: null
};

/**
 * Reducer function for the authentication actions
 *
 * @param state Authentication state
 * @param action
 * @returns {{loggedIn, loginInProgress, error}}
 */
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case authActions.AUTH_START:
      return {
        ...state,
        authInProgress: true,
        error: null
      };
    case authActions.LOGIN_REQUEST:
      return {
        ...state,
        loginInProgress: true,
        error: null
      };
    case authActions.LOGIN_FAILURE:
      return {
        ...state,
        loggedIn: false,
        loginInProgress: false,
        authInProgress: false,
        error: createError(action)
      };
    case authActions.TOKEN_FAILURE:
      return {
        ...state,
        loggedIn: false,
        loginInProgress: false,
        authInProgress: false,
        requestingToken: false,
        authToken: undefined,
        error: createError(action)
      };
    case authActions.LOGIN_SUCCESS:
      return {
        ...state,
        authToken: JSON.stringify(action.payload.token),
        accessToken: action.payload.access_token,
        refreshToken: action.payload.refresh_token,
        loginInProgress: false,
        authInProgress: false,
        error: null
      };
    case authActions.TOKEN_REQUEST:
      return {
        requestingToken: true,
        ...state
      };
    case authActions.TOKEN_RECEIVED:
      return {
        ...state,
        requestingToken: false,
        loggedIn: true,
        loginInProgress: false,
        authInProgress: false,
        accessToken: action.payload.access_token,
        error: {}
      };
    case authActions.LOGOUT_REQUEST:
      return {
        ...state,
        loggedIn: false,
        loginInProgress: false,
        authInProgress: false,
        accessToken: undefined,
        refreshToken: undefined,
        authToken: undefined
      };
    case authActions.LOGOUT_SUCCESS:
      return {
        ...state,
        loggedIn: false
      };
    case authActions.CLEAR_TOKEN:
      return {
        ...state,
        authToken: undefined
      };
    case authActions.SET_TONE_TOKEN:
      return {
        ...state,
        toneToken: action.toneToken
      };
      case authActions.authActionsTypes.SET_AUTHENTICATED:
        return{
          ...state,
          loggedIn: true,
          accessToken: undefined,
          refreshToken: undefined,
          toneToken: undefined
        }
    default:
      return state;
  }
};
