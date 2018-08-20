import * as authActions from 'login/actions/auth'
import reducer from 'login/reducers/auth'

describe('auth reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(
      {
        loggedIn: false,
        loginInProgress: false,
        errors: {}
      }
    )
  })

  it('should handle LOGIN_REQUEST', () => {
    expect(
      reducer({}, {
        type: authActions.LOGIN_REQUEST
      })
    ).toEqual(
      {
        loginInProgress: true
      }
    )

    expect(
      reducer(
        {
          loginInProgress: false
        }
        ,
        {
          type: authActions.LOGIN_REQUEST
        }
      )
    ).toEqual(
      {
        loginInProgress: true
      }
    )
  })

  it('should handle TOKEN_REQUEST', () => {
    expect(
      reducer({}, {
        type: authActions.TOKEN_REQUEST
      })
    ).toEqual(
      {
        loginInProgress: true
      }
    )

    expect(
      reducer(
        {
          loginInProgress: false
        }
        ,
        {
          type: authActions.TOKEN_REQUEST
        }
      )
    ).toEqual(
      {
        loginInProgress: true
      }
    )
  })

  it('should handle LOGIN_SUCCESS', () => {
    expect(
      reducer({}, {
        type: authActions.LOGIN_SUCCESS,
        payload: {
          login: true
        }
      })
    ).toEqual(
      {
        loggedIn: true,
        loginInProgress: false,
        errors: {}
      }
    )

    expect(
      reducer(
        {
          loggedIn: true,
          loginInProgress: false,
          errors: {}
        }
        ,
        {
          type: authActions.LOGIN_SUCCESS,
          payload: {
            login: true

          }
        }
      )
    ).toEqual(
      {
        loggedIn: true,
        loginInProgress: false,
        errors: {}
      }
    )
  })

  it('should handle TOKEN_RECEIVED', () => {
    expect(
      reducer({}, {
        type: authActions.TOKEN_RECEIVED,
        payload: {
          login: true
        }
      })
    ).toEqual(
      {
        loggedIn: true,
        loginInProgress: false,
        errors: {}
      }
    )

    expect(
      reducer(
        {
          loggedIn: true,
          loginInProgress: false,
          errors: {}
        }
        ,
        {
          type: authActions.TOKEN_RECEIVED,
          payload: {
            login: true

          }
        }
      )
    ).toEqual(
      {
        loggedIn: true,
        loginInProgress: false,
        errors: {}
      }
    )
  })

  it('should handle LOGIN_FAILURE', () => {
    expect(
      reducer({}, {
        type: authActions.LOGIN_FAILURE,
        payload: {
          response: 'An error happened'
        }
      })
    ).toEqual(
      {error: {message: "Unknown error", statusCode: 999}, loggedIn: false, loginInProgress: false}
    )

    expect(
      reducer(
        {
          loggedIn: false,
          loginInProgress: false,
          errors: {}
        }
        ,
        {
          type: authActions.LOGIN_FAILURE,
          payload: {

          }
        }
      )
    ).toEqual(
      {error: {message: "Unknown error", statusCode: 999}, errors: {}, loggedIn: false, loginInProgress: false}
    )
  })

  it('should handle TOKEN_FAILURE', () => {
    expect(
      reducer({}, {
        type: authActions.TOKEN_FAILURE,
        payload: {
          response: 'An error happened'
        }
      })
    ).toEqual(
      {error: {message: "Unknown error", statusCode: 999}, loggedIn: false, loginInProgress: false}
    )

    expect(
      reducer(
        {
          loggedIn: false,
          loginInProgress: false,
          error: {}
        }
        ,
        {
          type: authActions.TOKEN_FAILURE,
          payload: {

          }
        }
      )
    ).toEqual(
      {error: {message: "Unknown error", statusCode: 999}, loggedIn: false, loginInProgress: false}
    )
  })
})
