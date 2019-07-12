import jwtDecode from 'jwt-decode';

import JwtTokenHandlerBase from './JwtTokenHandlerBase';

let electron = window.require("electron");
let {ipcRenderer} = electron;

export default class JwtTokenHandlerDesktop extends JwtTokenHandlerBase {
  static getAccessToken(state) {
    return ipcRenderer.sendSync('synchronous-message', 'getSecret', { name: 'access_token' });
  }

  static isAccessTokenExpired() {
    let access_token;
    if ((access_token = JwtTokenHandlerDesktop.getAccessToken())) {
      const token = jwtDecode(access_token);

      if (token && token.exp) {
        return 1000 * token.exp - new Date().getTime() < 5000;
      }
    }

    return true;
  }

  static getRefreshToken(state) {
    return ipcRenderer.sendSync('synchronous-message', 'getSecret', { name: 'refresh_token' });
  }

  static isRefreshTokenExpired(state) {
    let access_token;
    if ((access_token = ipcRenderer.sendSync("getSecret", { name: 'refresh_token' }))) {
      const token = jwtDecode(access_token);
      console.log("\n\n\n\nTOKEN =>>>>>", token, "\n\n\n\n");
      if (token && token.exp) {
        return 1000 * token.exp - new Date().getTime() < 5000;
      }
    }
    return true;
  }

  static isAuthenticated(state) {
    return !JwtTokenHandlerDesktop.isRefreshTokenExpired(state);
  }

  static withAuth(headers = {}) {
    return state => ({
      ...headers,
      Authorization: `Bearer ${JwtTokenHandlerDesktop.getAccessToken()}`,
      Cookie: '' // This line is needed or else the refresh will fail
    });
  }

  static withRefresh(headers = {}) {
    return state => ({
      ...headers,
      Authorization: `Bearer ${JwtTokenHandlerDesktop.getRefreshToken()}`,
      Cookie: '' // This line is needed or else the refresh will fail
    });
  }
}
