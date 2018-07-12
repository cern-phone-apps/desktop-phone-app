import { isRSAA, apiMiddleware } from 'redux-api-middleware'

import { TOKEN_RECEIVED, refreshAccessToken } from './login/actions/auth'
import { getRefreshToken, isAccessTokenExpired } from './login/reducers/auth'

export function createApiMiddleware () {
  const postponedRSAAs = []

  return ({ dispatch, getState }) => {
    const rsaaMiddleware = apiMiddleware({ dispatch, getState })

    return (next) => (action) => {
      const nextCheckPostponed = (nextAction) => {
        // Run postponed actions after token refresh
        if (nextAction.type === TOKEN_RECEIVED) {
          console.debug('nextCheckPostponed')
          console.debug(nextAction.type)
          next(nextAction)
          postponedRSAAs.forEach((postponed) => {
            rsaaMiddleware(next)(postponed)
          })
        } else {
          next(nextAction)
        }
      }

      if (isRSAA(action)) {
        console.debug('Is RSAA -> True')
        const refreshToken = getRefreshToken()

        if (refreshToken && isAccessTokenExpired()) {
          console.debug('Access token is expired but we have refresh token')
          postponedRSAAs.push(action)
          console.debug('postponed RSAAs: ', postponedRSAAs)
          if (postponedRSAAs.length > 0) {
            return rsaaMiddleware(nextCheckPostponed)(refreshAccessToken())
          } else {
            return
          }
        }

        return rsaaMiddleware(next)(action)
      }
      return next(action)
    }
  }
}

export default createApiMiddleware()
