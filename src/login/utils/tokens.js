import Cookies from "js-cookie";

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
  const loggedIn = state.loggedIn ? state.loggedIn : false;
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