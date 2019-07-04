import { apiMiddleware, isRSAA, RSAA } from 'redux-api-middleware';
import { authActions, authActionFactory, util } from 'dial-core';

import { logMessage } from 'common/utils/logs';

import config from 'config';

const { JwtTokenHandlerMobile } = util.tokens;

const apiEndpoint = config.api.ENDPOINT;

function checkNextAction(next, postponedRSAAs, rsaaMiddleware) {
  return nextAction => {
    // Run postponed actions after token refresh
    if (nextAction.type === authActions.TOKEN_RECEIVED) {
      logMessage('Token received from API');
      next(nextAction);
      postponedRSAAs.forEach(postponed => {
        rsaaMiddleware(next)(postponed);
      });
    } else {
      next(nextAction);
    }
  };
}

function processNextAction(postponedRSAAs, rsaaMiddleware) {
  return next => action => {
    const nextCheckPostponed = checkNextAction(
      next,
      postponedRSAAs,
      rsaaMiddleware
    );

    if (isRSAA(action)) {
      const refreshToken = JwtTokenHandlerMobile.getRefreshToken();
      // If it is a LOGIN_REQUEST or LOGOUT_REQUEST we don't try to refresh the token
      if (
        action[RSAA].types.indexOf(authActions.LOGOUT_REQUEST) > -1 ||
        action[RSAA].types.indexOf(authActions.LOGIN_REQUEST) > -1
      ) {
        return rsaaMiddleware(next)(action);
      }

      if (refreshToken && JwtTokenHandlerMobile.isAccessTokenExpired()) {
        logMessage('Access token is expired but we have refresh token');
        postponedRSAAs.push(action);
        logMessage('postponed RSAAs: ', postponedRSAAs);
        if (postponedRSAAs.length > 0) {
          return rsaaMiddleware(nextCheckPostponed)(
            authActionFactory(apiEndpoint).refreshAccessToken()
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

export default createApiMiddleware();
