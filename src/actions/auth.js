import { RSAA } from 'redux-api-middleware'
import { withAuth, withRefresh } from 'reducers/auth'

export const LOGIN_REQUEST = '@@auth/LOGIN_REQUEST'
export const LOGIN_SUCCESS = '@@auth/LOGIN_SUCCESS'
export const LOGIN_FAILURE = '@@auth/LOGIN_FAILURE'

export const LOGOUT_REQUEST = '@@auth/LOGOUT_REQUEST'
export const LOGOUT_SUCCESS = '@@auth/LOGOUT_SUCCESS'
export const LOGOUT_FAILURE = '@@auth/LOGOUT_FAILURE'

export const TOKEN_REQUEST = '@@auth/TOKEN_REQUEST'
export const TOKEN_RECEIVED = '@@auth/TOKEN_RECEIVED'
export const TOKEN_FAILURE = '@@auth/TOKEN_FAILURE'

export const login = (code) => console.debug('login action') || ({
  [RSAA]: {
    endpoint: process.env.REACT_APP_AUTH_LOGIN_ENDPOINT,
    method: 'POST',
    body: JSON.stringify({code}),
    credentials: 'include',
    headers: {'Content-Type': 'application/json'},
    types: [
      LOGIN_REQUEST,
      LOGIN_SUCCESS,
      LOGIN_FAILURE
    ]
  }
})

export const logout = () => console.debug('logout action') || ({
  [RSAA]: {
    endpoint: process.env.REACT_APP_AUTH_LOGOUT_ENDPOINT,
    method: 'DELETE',
    credentials: 'include',
    headers: withAuth({'Content-Type': 'application/json'}),
    types: [
      LOGOUT_REQUEST,
      LOGOUT_SUCCESS,
      LOGOUT_FAILURE
    ]
  }
})

export const refreshAccessToken = () => console.debug('Refreshing access token') || ({
  [RSAA]: {
    endpoint: process.env.REACT_APP_AUTH_REFRESH_ENDPOINT,
    method: 'POST',
    credentials: 'include',
    headers: withRefresh({'Content-Type': 'application/json'}),
    types: [
      TOKEN_REQUEST,
      TOKEN_RECEIVED,
      TOKEN_FAILURE
    ]
  }
})
