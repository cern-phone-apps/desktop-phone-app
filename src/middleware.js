import { apiMiddleware, isRSAA, RSAA } from "redux-api-middleware";

import {
  LOGOUT_REQUEST,
  refreshAccessToken,
  TOKEN_RECEIVED
} from "./login/actions/auth";
import { getRefreshToken, isAccessTokenExpired } from "./login/reducers/auth";

function checkNextAction(next, postponedRSAAs, rsaaMiddleware) {
  return nextAction => {
    // Run postponed actions after token refresh
    if (nextAction.type === TOKEN_RECEIVED) {
      console.debug("nextCheckPostponed");
      console.debug(nextAction.type);
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
      const refreshToken = getRefreshToken();
      const isOauthEnabled = process.env.REACT_APP_OAUTH_ENABLED;

      if (isOauthEnabled === "false") {
        return rsaaMiddleware(next)(action);
      }
      // If it is a LOGOUT_REQUEST we don't try to refresh the token
      if (action[RSAA].types.indexOf(LOGOUT_REQUEST) > -1) {
        return rsaaMiddleware(next)(action);
      }

      if (refreshToken && isAccessTokenExpired()) {
        console.debug("Access token is expired but we have refresh token");
        postponedRSAAs.push(action);
        console.debug("postponed RSAAs: ", postponedRSAAs);
        if (postponedRSAAs.length > 0) {
          return rsaaMiddleware(nextCheckPostponed)(refreshAccessToken());
        } else {
          return;
        }
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

    return processNextAction(postponedRSAAs, rsaaMiddleware);
  };
}

export default createApiMiddleware();
