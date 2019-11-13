import { apiMiddleware, isRSAA, RSAA } from 'redux-api-middleware';
import { authActions } from 'dial-core';

import dialBackendApi from 'services/api';
import ElectronService from 'services/electron-service';

import JwtTokenHandlerDesktop from 'auth/utils/token-desktop-handler';

function checkNextAction(next, postponedRSAAs, rsaaMiddleware) {
  return nextAction => {
    // Run postponed actions after token refresh
    if (nextAction.type === authActions.TOKEN_RECEIVED) {
      ElectronService.updateAccessToken(nextAction.payload.access_token);
      next(nextAction);
      postponedRSAAs.forEach(postponed => {
        rsaaMiddleware(next)(postponed);
      });
    } else {
      next(nextAction);
    }
  };
}

function processNextAction(postponedRSAAs, rsaaMiddleware, getState) {
  return next => action => {
    const nextCheckPostponed = checkNextAction(
      next,
      postponedRSAAs,
      rsaaMiddleware
    );

    if (isRSAA(action)) {
      const state = getState();
      const refreshToken = JwtTokenHandlerDesktop.getRefreshToken(state);
      // If it is a LOGIN_REQUEST or LOGOUT_REQUEST we don't try to refresh the token
      if (
        action[RSAA].types.indexOf(authActions.LOGOUT_REQUEST) > -1 ||
        action[RSAA].types.indexOf(authActions.LOGIN_REQUEST) > -1
      ) {
        return rsaaMiddleware(next)(action);
      }

      if (refreshToken && JwtTokenHandlerDesktop.isAccessTokenExpired()) {
        postponedRSAAs.push(action);
        if (postponedRSAAs.length > 0) {
          return rsaaMiddleware(nextCheckPostponed)(
            dialBackendApi().refreshAccessToken()
          );
        }
        return null;
      }

      return rsaaMiddleware(next)(action);
    }
    return next(action);
  };
}

export function createApiMiddleware() {
  const postponedRSAAs = [];

  return ({ dispatch, getState }) => {
    const rsaaMiddleware = apiMiddleware({ dispatch, getState });

    return processNextAction(postponedRSAAs, rsaaMiddleware, getState);
  };
}

let previousLoggedInState = false;
export const trayIconMiddleware = store => next => action => {
  next(action);

  if (store.auth == null) {
    return;
  }

  if (store.auth.loggedIn === true && !previousLoggedInState) {
    previousLoggedInState = true;
    JwtTokenHandlerDesktop.changeTrayIcon(true);
  }

  if (store.auth.loggedIn === false && previousLoggedInState) {
    previousLoggedInState = false;
    JwtTokenHandlerDesktop.changeTrayIcon(false);
  }
};

export default createApiMiddleware();
