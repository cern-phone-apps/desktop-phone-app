import Cookies from 'js-cookie';

import JwtTokenHandlerBase from './JwtTokenHandlerBase';

export default class JwtTokenHandlerWeb extends JwtTokenHandlerBase {
  /**
   * Gets the access token csrf from the cookies
   * @returns {*|{}} The cookie value
   */
  static getAccessToken() {
    return Cookies.get('csrf_access_token') || null;
  }

  static isAccessTokenExpired() {
    return !JwtTokenHandlerWeb.getAccessToken();
  }

  static getRefreshToken() {
    return Cookies.get('csrf_refresh_token') || null;
  }

  static isRefreshTokenExpired() {
    return !JwtTokenHandlerWeb.getRefreshToken();
  }

  static isAuthenticated() {
    return !JwtTokenHandlerWeb.isRefreshTokenExpired();
  }

  static withAuth(headers = {}) {
    return () => ({
      ...headers,
      'X-CSRF-TOKEN': JwtTokenHandlerWeb.getAccessToken()
    });
  }

  /**
   * Adds a X-CSRF-TOKEN with the refresh token attribute to the headers
   * @param headers dict with http headers
   * @returns {function(*): {'X-CSRF-TOKEN': (*|{})}} A function that returns a dict with
   * the new headers
   */
  static withRefresh(headers = {}) {
    return () => ({
      ...headers,
      'X-CSRF-TOKEN': JwtTokenHandlerWeb.getRefreshToken()
    });
  }
}
