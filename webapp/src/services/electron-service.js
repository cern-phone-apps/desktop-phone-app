const electron = window.require('electron');
const { ipcRenderer } = electron;

class ElectronService {
  /**
   * Get the Oauth code from Electron
   */
  static getOauthCode = () => {
    const code = ipcRenderer.sendSync('synchronous-message', 'code');
    return code;
  };

  /**
   * Unauthenticates the user from Electron
   */
  static setUserAsUnauthenticated = () => {
    const result = ipcRenderer.sendSync(
      'synchronous-message',
      'user-unauthenticated'
    );
    return result;
  };

  /**
   * Sets the user as authenticated on Electron sending the access and refresh tokens
   */
  static setUserAsAuthenticated = (accessToken, refreshToken) => {
    const result = ipcRenderer.sendSync(
      'synchronous-message',
      'user-authenticated',
      {
        access_token: accessToken,
        refresh_token: refreshToken
      }
    );
    return result;
  };

  /**
   * Gets the toneToken from the backend
   */
  static getToneToken = () => {
    const toneToken = ipcRenderer.sendSync('synchronous-message', 'getSecret', {
      name: 'tone_token'
    });
    return toneToken;
  };

  static saveToneToken = toneToken => {
    const result = ipcRenderer.sendSync(
      'synchronous-message',
      'saveToneToken',
      {
        name: 'saveToneToken',
        tone_token: toneToken
      }
    );
    return result;
  };

  static setReceivingCall = doNotDisturbStatus => {
    const result = ipcRenderer.sendSync('synchronous-message', 'receiveCall', {
      doNotDisturb: doNotDisturbStatus
    });
    return result;
  };
}

export default ElectronService;
