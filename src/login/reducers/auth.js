import * as authActions from "login/actions/auth";
import { handleErrorWithToken } from "login/utils/errors";
import { logMessage } from "common/utils";
import { handleErrorWithLogin } from "login/utils/errors";

const initialState = {
  loggedIn: false,
  token: undefined,
  loginInProgress: false,
  error: {}
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
      if (action.error) {
        return handleErrorWithLogin(state, action);
      }
      return {
        ...state,
        loginInProgress: true
      };
    case authActions.TOKEN_REQUEST:
      if (action.error) {
        return handleErrorWithToken(state, action);
      }
      return state;
    case authActions.LOGIN_SUCCESS:
      return {
        ...state,
        loggedIn: action.payload.login,
        token: action.payload.token,
        loginInProgress: false,
        error: {}
      };
    case authActions.TOKEN_RECEIVED:
      return {
        ...state,
        loggedIn: true,
        loginInProgress: false,
        error: {}
      };
    case authActions.LOGIN_FAILURE:
    case authActions.TOKEN_FAILURE:
      return handleErrorWithToken(state, action);

    case authActions.LOGOUT_REQUEST:
      if (action.error) {
        logMessage(`Handling error on LOGOUT_REQUEST`);
        return handleErrorWithToken(state, action);
      }

      return {
        ...state,
        loggedIn: false,
        token: undefined,
        loginInProgress: false,
        error: {}
      };
    case authActions.LOGOUT_SUCCESS:
      return state;
    case authActions.CLEAR_TOKEN:
      return {
        ...state,
        token: undefined,
      };
    default:
      return state;
  }
};
