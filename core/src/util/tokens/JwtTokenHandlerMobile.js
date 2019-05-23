import jwtDecode from 'jwt-decode';

import JwtTokenHandlerBase from './JwtTokenHandlerBase';

export default class JwtTokenHandlerMobile extends JwtTokenHandlerBase {
  static getAccessToken(state) {
    return state.auth.accessToken || null;
  }

  static isAccessTokenExpired(state) {
    if (state && state.auth.accessToken) {
      const token = jwtDecode(state.auth.accessToken);

      if (token && token.exp) {
        return 1000 * token.exp - new Date().getTime() < 5000;
      }
    }

    return true;
  }

  static getRefreshToken(state) {
    return (state && state.auth.refreshToken) || null;
  }

  static isRefreshTokenExpired(state) {
    if (state && state.auth.refreshToken) {
      const token = jwtDecode(state.auth.refreshToken);
      if (token && token.exp) {
        return 1000 * token.exp - new Date().getTime() < 5000;
      }
    }
    return true;
  }

  static isAuthenticated(state) {
    return !JwtTokenHandlerMobile.isRefreshTokenExpired(state);
  }

  static withAuth(headers = {}) {
    return state => ({
      ...headers,
      Authorization: `Bearer ${JwtTokenHandlerMobile.getAccessToken(state)}`,
      Cookie: '' // This line is needed or else the refresh will fail
    });
  }

  static withRefresh(headers = {}) {
    return state => ({
      ...headers,
      Authorization: `Bearer ${JwtTokenHandlerMobile.getRefreshToken(state)}`,
      Cookie: '' // This line is needed or else the refresh will fail
    });
  }
}
