import Cookies from "js-cookie";
import { logMessage } from "common/utils";

/**
 * Gets the access token csrf from the cookies
 * @returns {*|{}} The cookie value
 */
export function getAccessToken () {
  return Cookies.get("csrf_access_token");
}

/**
 * Checks if the access token csrf cookie is present (not expired) or not present (expired)
 * @returns {boolean} (true|false)
 */
export function isAccessTokenExpired () {
  return !getAccessToken();
}

/**
 * Gets the refresh token csrf from the cookies
 * @returns {*|{}} The cookie value
 */
export function getRefreshToken () {
  return Cookies.get("csrf_refresh_token");
}

/**
 * Checks if the refresh token csrf cookie is present (not expired) or not present (expired)
 * @returns {boolean} (true|false)
 */
export function isRefreshTokenExpired () {
  return !getRefreshToken();
}

/**
 * Checks if the user is authenticated on the application. Refresh token must be present.
 * @returns {boolean} (true|false)
 */
export function isAuthenticated (state) {
  const refreshToken = !isRefreshTokenExpired();
  const isOauthEnabled = process.env.REACT_APP_OAUTH_ENABLED;
  const loggedIn = state.loggedIn ? state.loggedIn : false;

  logMessage(`LoggedIn is ${loggedIn}`);
  logMessage(`isOauthEnabled is ${isOauthEnabled}`);

  // if (isOauthEnabled === "false" && loggedIn === true) {
  //   return true;
  // }

  // // This check will log the user out every time the page loads.
  // // For now we want to log the user in every time the application starts
  // // to let him/her choose a new phone number.
  // // It works in combination with the redux store blacklist for auth
  // if(loggedIn === false){
  //   return false
  // }


  return (refreshToken && loggedIn);
}

/**
 * Adds a X-CSRF-TOKEN with the access token attribute to the headers
 * @param headers dict with http headers
 * @returns {function(*): {'X-CSRF-TOKEN': (*|{})}} A function that returns a dict with
 * the new headers
 */
export function withAuth (headers = {}) {
  return state => ({
    ...headers,
    "X-CSRF-TOKEN": getAccessToken()
  });
}

/**
 * Adds a X-CSRF-TOKEN with the refresh token attribute to the headers
 * @param headers dict with http headers
 * @returns {function(*): {'X-CSRF-TOKEN': (*|{})}} A function that returns a dict with
 * the new headers
 */
export function withRefresh (headers = {}) {
  return state => ({
    ...headers,
    "X-CSRF-TOKEN": getRefreshToken()
  });
}

/**
 * Clears the application cookies
 */
export const clearCookies = () => {
  // Cookies.remove("csrf_refresh_token");
  // Cookies.remove("csrf_access_token");
};

/**
 * Handles the error with the token
 * @param state
 * @param action
 * @returns {{[p: string]: *}}
 */
export function handleErrorWithToken (state, action) {
  let message;
  let statusCode;
  logMessage(action);

  if (action.payload.message) {
    if (action.payload.name === "RequestError") {
      message = "Dial backend is not currently available.";
      statusCode = 31;
    } else if (action.payload.name === "ApiError") {
      message = action.payload.message;
      statusCode = action.payload.status ? action.payload.status : -1;
    } else {
      message = action.payload.message;
      statusCode = -1;
    }
  } else {
    message = "Unknown error";
    statusCode = 999;
  }
  return {
    ...state,
    error: { message: message, statusCode: statusCode }
  };
}

export function handleErrorWithLogin (state, action) {
  let message;
  let statusCode;
  logMessage(action);

  if (action.payload.message) {
    if (action.payload.name === "RequestError") {
      message = "Currently It is not possible to log in. Please, try again in a few minutes.";
      statusCode = 31;
    } else if (action.payload.name === "ApiError") {
      message = action.payload.message;
      statusCode = action.payload.status ? action.payload.status : -1;
    } else {
      message = action.payload.message;
      statusCode = -1;
    }
  } else {
    message = "Unknown error";
    statusCode = 999;
  }
  return {
    ...state,
    loginInProgress: false,
    error: { message: message, statusCode: statusCode }
  };
}

/**
 * Gets the errors from the state
 * @param state An state dict
 * @returns {*} A dict of errors
 */
export function errors (state) {
  return state.error;
}