import * as authActions from "login/actions/auth";
import { handleErrorWithToken } from "login/utils/errors";
import { handleErrorWithLogin } from "login/utils/errors";

const initialState = {
  loggedIn: false,
  token: undefined,
  loginInProgress: false,
  error: {}
};

export const handleLoginRequest = (state, action) => {
  if (action.error) {
    return handleErrorWithLogin(state, action);
  }
  return {
    ...state,
    loginInProgress: true
  };
};

export const handleTokenRequest = (state, action) => {
  if (action.error) {
    return handleErrorWithToken(state, action);
  }
  return state;
};

export const handleLogoutRequest = (state, action) => {
  if (action.error) {
    return handleErrorWithToken(state, action);
  }

  return {
    ...state,
    loggedIn: false,
    token: undefined,
    loginInProgress: false,
    error: {}
  };
};

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
      return handleLoginRequest(state, action);
    case authActions.LOGIN_FAILURE:
    case authActions.TOKEN_FAILURE:
      return handleErrorWithToken(state, action);
    case authActions.LOGIN_SUCCESS:
      return {
        ...state,
        loggedIn: action.payload.login,
        token: action.payload.token,
        loginInProgress: false,
        error: {}
      };
    case authActions.TOKEN_REQUEST:
      return handleTokenRequest(state, action);
    case authActions.TOKEN_RECEIVED:
      return {
        ...state,
        loggedIn: true,
        loginInProgress: false,
        error: {}
      };
    case authActions.LOGOUT_REQUEST:
      return handleLogoutRequest(state, action);
    case authActions.LOGOUT_SUCCESS:
      return state;
    case authActions.CLEAR_TOKEN:
      return {
        ...state,
        token: undefined
      };
    default:
      return state;
  }
};
