import * as authActions from "login/actions/auth";
import { clearCookies, handleErrorWithToken } from "login/utils";

const initialState = {
  loggedIn: false,
  token: undefined,
  loginInProgress: false,
  errors: {}
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
    case authActions.TOKEN_REQUEST:
      if (action.error) {
        return handleErrorWithToken(state, action);
      }
      return {
        ...state,
        loginInProgress: true
      };
    case authActions.LOGIN_SUCCESS:
      return {
        ...state,
        loggedIn: action.payload.login,
        token: action.payload.token,
        loginInProgress: false,
        errors: {}
      };
    case authActions.TOKEN_RECEIVED:
      return {
        ...state,
        loggedIn: true,
        loginInProgress: false,
        errors: {}
      };
    case authActions.LOGIN_FAILURE:
    case authActions.TOKEN_FAILURE:
      return handleErrorWithToken(state, action);
    case authActions.LOGOUT_SUCCESS:
      clearCookies();
      return {
        ...state,
        loggedIn: false,
        token: undefined,
        loginInProgress: false,
        errors: {}
      };
    case authActions.CLEAR_TOKEN:
      return {
        ...state,
        token: undefined,
      };
    default:
      return state;
  }
};
