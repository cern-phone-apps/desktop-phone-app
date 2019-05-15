import jwtDecode from 'jwt-decode';

/**
 * Gets the access token csrf from the cookies
 * @returns {*|{}} The cookie value
 */
export function getAccessToken(state) {
  return state.auth.accessToken || null;
}

/**
 * Checks if the access token csrf cookie is present (not expired) or not present (expired)
 * @returns {boolean} (true|false)
 */
export function isAccessTokenExpired(state) {
  if (state && state.auth.accessToken) {
    const token = jwtDecode(state.auth.accessToken);

    if (token && token.exp) {
      return 1000 * token.exp - new Date().getTime() < 5000;
    }
  }

  return true;
}

/**
 * Gets the refresh token csrf from the cookies
 * @returns {*|{}} The cookie value
 */
export function getRefreshToken(state) {
  return (state && state.auth.refreshToken) || null;
}

/**
 * Checks if the refresh token csrf cookie is present (not expired) or not present (expired)
 * @returns {boolean} (true|false)
 */
export function isRefreshTokenExpired(state) {
  if (state && state.auth.refreshToken) {
    const token = jwtDecode(state.auth.refreshToken);
    if (token && token.exp) {
      return 1000 * token.exp - new Date().getTime() < 5000;
    }
  }
  return true;
}

/**
 * Checks if the user is authenticated on the application. Refresh token must be present.
 * @returns {boolean} (true|false)
 */
export function isAuthenticated(state) {
  return !isRefreshTokenExpired(state);
}

/**
 * Adds a X-CSRF-TOKEN with the access token attribute to the headers
 * @param headers dict with http headers
 * @returns {function(*): {'X-CSRF-TOKEN': (*|{})}} A function that returns a dict with
 * the new headers
 */
export function withAuth(headers = {}) {
  return state => ({
    ...headers,
    Authorization: `Bearer ${getAccessToken(state)}`
  });
}

/**
 * Adds a X-CSRF-TOKEN with the refresh token attribute to the headers
 * @param headers dict with http headers
 * @returns {function(*): {'X-CSRF-TOKEN': (*|{})}} A function that returns a dict with
 * the new headers
 */
export function withRefresh(headers = {}) {
  return state => ({
    ...headers,
    Authorization: `Bearer ${getRefreshToken(state)}`
  });
}
